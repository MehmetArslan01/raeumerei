/**
 * Formular-Endpunkt — läuft als einziger Teil der Website im Cloudflare Worker.
 *
 * Entwurfsentscheidungen (docs/07, docs/09):
 *  - Funktioniert OHNE JavaScript im Browser: klassischer POST, Weiterleitung
 *    auf /danke/. Das Skript im Formular verbessert nur die Fehleranzeige.
 *  - Spamschutz ohne reCAPTCHA: Honeypot + Zeitfalle + Rate-Limit.
 *    reCAPTCHA würde ~250 KB Drittanbieter-Code laden, Daten an Google
 *    übertragen und wäre einwilligungspflichtig.
 *  - Versand über Cloudflare Email Routing statt über einen externen
 *    Maildienst: ein Anbieter weniger, kein API-Schlüssel, kostenlos.
 *    Voraussetzung ist eine in Cloudflare verifizierte Zieladresse.
 *  - Datensparsamkeit nach Art. 5 DSGVO: keine Datenbank, keine Speicherung.
 *    Die Anfrage wird versendet und ist danach nur noch im Postfach.
 *  - Keine personenbezogenen Daten in Logs.
 */

import type { APIRoute } from 'astro';
// Seit Astro 6 ist das der Weg zu den Worker-Bindings:
// Astro.locals.runtime.env gibt es nicht mehr.
import { env } from 'cloudflare:workers';
// Versand über Cloudflare Email Routing, kein Drittanbieter nötig.
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext/browser';
import { company } from '../../data/company';

export const prerender = false;

/** Feldlängen begrenzen — schützt vor aufgeblähten Anfragen. */
const LIMIT = { name: 120, ort: 200, telefon: 40, notiz: 4000, anliegen: 32 } as const;

const ANLIEGEN: Record<string, string> = {
  entruempelung: 'Entrümpelung oder Räumung',
  umzug: 'Umzug oder Transport',
  beides: 'Beides zusammen',
  unklar: 'Noch unklar',
};

interface SendEmailBinding {
  send(message: EmailMessage): Promise<void>;
}

interface Env {
  /**
   * Cloudflare Email Routing. Verschickt an die in wrangler.jsonc
   * hinterlegte, in Cloudflare verifizierte Zieladresse.
   * Kein API-Schlüssel, kein Drittanbieter.
   */
  ANFRAGE_MAIL?: SendEmailBinding;
  /**
   * Absenderadresse. Muss auf einer Domain liegen, die in diesem
   * Cloudflare-Konto liegt. Ein Postfach dafür ist nicht nötig.
   */
  MAIL_FROM?: string;
  /** Zieladresse. Muss mit der Bindung in wrangler.jsonc übereinstimmen. */
  MAIL_TO?: string;
  /** Rate-Limit pro IP. Optional, ohne Binding wird es übersprungen. */
  ANFRAGE_LIMIT?: KVNamespace;
}

/**
 * 303 mit Anker statt Query-Parameter: Die Kontaktseite ist vorgerendert und
 * statisch. Ein Query-Parameter ließe sich dort nur mit JavaScript auswerten —
 * ein Anker greift über CSS `:target` auch ohne.
 */
const redirect = (pfad: string) =>
  new Response(null, { status: 303, headers: { Location: pfad } });

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === 'string' ? v.trim().replace(/\s+/g, ' ').slice(0, max) : '';

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const cfg = env as unknown as Env;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return redirect('/kontakt/#fehler-format');
  }

  /* Sprache des Formulars: bestimmt nur, wohin weitergeleitet wird. */
  const en = form.get('sprache') === 'en';
  const kontakt = en ? '/en/contact/' : '/kontakt/';
  const danke = en ? '/en/thank-you/' : '/danke/';

  /* ── Spamschutz 1: Honeypot ────────────────────────────────────────
     Das Feld ist für Menschen und Screenreader unsichtbar. Wer es
     ausfüllt, ist ein Bot. Stille Weiterleitung, damit der Bot keine
     Rückmeldung über den Filter bekommt. */
  if (clean(form.get('firma_zusatz'), 100)) return redirect(danke);

  /* ── Spamschutz 2: Zeitfalle ──────────────────────────────────────
     Unter drei Sekunden hat kein Mensch vier Felder ausgefüllt. */
  const ts = Number(form.get('ts'));
  if (Number.isFinite(ts) && Date.now() - ts < 3000) return redirect(danke);

  /* ── Spamschutz 3: Rate-Limit pro IP ──────────────────────────────
     Nur aktiv, wenn ein KV-Namespace gebunden ist. */
  if (cfg.ANFRAGE_LIMIT && clientAddress) {
    const key = `ip:${clientAddress}`;
    const bisher = Number((await cfg.ANFRAGE_LIMIT.get(key)) ?? '0');
    if (bisher >= 5) return redirect(`${kontakt}#fehler-zuviele`);
    // 1 Stunde Fenster
    await cfg.ANFRAGE_LIMIT.put(key, String(bisher + 1), { expirationTtl: 3600 });
  }

  /* ── Pflichtfelder ────────────────────────────────────────────────
     Serverseitig erneut prüfen, die Browser-Validierung ist nur Komfort. */
  const anliegen = clean(form.get('anliegen'), LIMIT.anliegen);
  const ort = clean(form.get('ort'), LIMIT.ort);
  const name = clean(form.get('name'), LIMIT.name);
  const telefon = clean(form.get('telefon'), LIMIT.telefon);
  const notiz = clean(form.get('notiz'), LIMIT.notiz);
  const zustimmung = form.get('zustimmung');

  if (!ANLIEGEN[anliegen] || !ort || !name || !telefon || !zustimmung) {
    return redirect(`${kontakt}#fehler-pflichtfelder`);
  }

  /* ── Nachricht ────────────────────────────────────────────────────
     Bewusst als reiner Text: kein HTML, damit nichts aus der Eingabe
     im Postfach als Markup interpretiert werden kann. */
  const text = [
    `Anliegen:  ${ANLIEGEN[anliegen]}`,
    `Ort:       ${ort}`,
    `Name:      ${name}`,
    `Telefon:   ${telefon}`,
    '',
    notiz ? `Anmerkung:\n${notiz}` : 'Keine Anmerkung.',
    '',
    en ? 'Sprache: Englisch (Anfrage kam über /en/)' : 'Sprache: Deutsch',
    '—',
    `Eingegangen über ${company.domain}`,
    new Date().toLocaleString('de-AT', { timeZone: 'Europe/Vienna' }),
  ].join('\n');

  const empfaenger = cfg.MAIL_TO || company.email;
  const absender = cfg.MAIL_FROM;

  if (!cfg.ANFRAGE_MAIL || !absender) {
    // Ohne eingerichteten Versand geht die Anfrage verloren. Der Nutzer
    // bekommt einen Hinweis mit Telefonnummer, der Betrieb sieht es im Log.
    // Kein Personenbezug im Log.
    console.error('anfrage: Versand nicht eingerichtet (send_email-Bindung oder MAIL_FROM fehlt)');
    return redirect(`${kontakt}#fehler-versand`);
  }

  try {
    const mime = createMimeMessage();
    mime.setSender({ name: 'Anfrage über die Website', addr: absender });
    mime.setRecipient(empfaenger);
    mime.setSubject(`Anfrage ${ANLIEGEN[anliegen]}, ${ort}`);
    mime.addMessage({ contentType: 'text/plain', data: text });

    await cfg.ANFRAGE_MAIL.send(new EmailMessage(absender, empfaenger, mime.asRaw()));
  } catch (fehler) {
    console.error('anfrage: Versand fehlgeschlagen', (fehler as Error)?.message ?? '');
    return redirect(`${kontakt}#fehler-versand`);
  }

  return redirect(danke);
};

/** GET auf diese Route ist kein Fehler des Nutzers — zurück zum Formular. */
export const GET: APIRoute = () => redirect('/kontakt/');
