#!/usr/bin/env node
/**
 * legal-lint — erzwingt die Sprach-Guardrails aus docs/08-legal-seo-guardrails.md.
 *
 * Hintergrund: Die Gewerbeberechtigung "Entrümpler" ersetzt NICHT die Erlaubnis
 * nach § 24a AWG 2002 für die Sammlung/Behandlung von Abfällen. Solange diese
 * Erlaubnis nicht bestätigt ist (src/data/company.ts → wasteLicence), darf die
 * Website keine erlaubnispflichtige Tätigkeit bewerben.
 *
 * Läuft zweimal:
 *   node scripts/legal-lint.mjs src    → Quelldateien, vor dem Build
 *   node scripts/legal-lint.mjs dist   → gerendertes HTML: Meta-Tags, JSON-LD,
 *                                        alt-Attribute, aria-label, sitemap.xml
 *
 * Die zweite Stufe ist die wichtigere: Sie fängt auch Begriffe, die erst durch
 * Templates, Datendateien oder Schema-Generierung entstehen.
 *
 * Ausnahmen nur mit begründeter Annotation direkt über der Zeile:
 *   <!-- legal-lint-allow: <regel-id> — <Begründung>. Freigegeben von: <Name>, <Datum> -->
 *   // legal-lint-allow: <regel-id> — <Begründung>. Freigegeben von: <Name>, <Datum>
 */

import { readdirSync, readFileSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative, extname, resolve } from 'node:path';

const ROOT = process.cwd();
const target = process.argv[2] ?? 'src';
const SCAN_EXT = new Set(['.astro', '.md', '.mdx', '.ts', '.tsx', '.js', '.mjs', '.json', '.html', '.xml', '.txt', '.css']);
const SKIP_DIR = new Set(['node_modules', '.git', '.astro', 'reports', 'scripts', 'docs', '_astro', '_worker.js']);

/* ────────────────────────────────────────────────────────────────────────
   ROT — Build bricht ab.
   Begründung je Regel steht in `why`, die Ersatzformulierung in `fix`.
   ──────────────────────────────────────────────────────────────────────── */
const RED = [
  {
    id: 'entsorgung',
    re: /entsorg\w*/gi,
    why: 'Bewirbt Abfallentsorgung — erlaubnispflichtig nach § 24a AWG 2002.',
    fix: 'Abtransport / abtransportieren / "wir nehmen es mit"',
  },
  {
    id: 'abfall',
    re: /abf(a|ä)ll\w*/gi,
    why: 'Zentralbegriff des AWG 2002. Rückt die Leistung in den abfallrechtlichen Kontext.',
    fix: 'Räumungsgut / Hausrat / Inventar',
  },
  {
    id: 'muell',
    re: /(?<![a-zäöüß])(m(ü|ue)ll)\w*|\w*?m(ü|ue)ll(?![a-zäöüß])/gi,
    why: 'Erfasst auch Sperrmüll/Restmüll. Verweist unmittelbar auf Abfall im Sinne des AWG.',
    fix: 'sperrige Gegenstände / Räumungsgut',
  },
  {
    id: 'deponie',
    re: /deponi\w*/gi,
    why: 'Abfallbehandlungsanlage — erlaubnispflichtig.',
    fix: 'ersatzlos streichen',
  },
  {
    // Ohne Lookbehind: fängt auch Komposita wie "Weiterverwertung".
    id: 'verwertung',
    re: /(ver|wieder)?verwert\w*/gi,
    why: '"Abfallverwertung" ist ein Kernbegriff des AWG 2002.',
    fix: 'Wertanrechnung / "gut erhaltene Stücke rechnen wir an"',
  },
  {
    id: 'stoffe',
    re: /(altstoff|wertstoff|schadstoff|problemstoff|gefahrgut|gefahrstoff)\w*/gi,
    why: 'Abfallrechtliche Fachbegriffe, setzen entsprechende Berechtigungen voraus. "Wertstoffsammlung" ist Abfallsammlung im Sinne des § 24a AWG 2002.',
    fix: 'ersatzlos streichen',
  },
  {
    // Ohne Lookbehind: fängt auch Komposita wie "Geruchsbeseitigung", die den
    // gesperrten Stamm sichtbar auf die Seite bringen.
    id: 'beseitigung',
    re: /beseitig\w*/gi,
    why: '"Abfallbeseitigung" — erlaubnispflichtige Tätigkeit.',
    fix: 'Abtransport / entfernen',
  },
  {
    id: 'container',
    re: /container\w*|mulden(dienst|service)|absetzmulde\w*/gi,
    why: 'Containerdienst/Muldendienst geht über die reine Entrümpelung hinaus und wird als Abfallsammlung gelesen.',
    fix: 'Abtransport / "wir nehmen es mit" / Transporter',
  },
  {
    id: 'schutt',
    re: /(bau|misch|beton|ziegel)?schutt\w*|baurestmasse\w*/gi,
    why: 'Bauschutt ist Abfall im Sinne des AWG 2002; "Bauschuttentsorgung" ist erlaubnispflichtig.',
    fix: 'ersatzlos streichen — Baurestmassen sind keine Entrümplertätigkeit',
  },
  {
    id: 'schrott',
    re: /schrott\w*|alteisen\w*/gi,
    why: 'Schrott/Alteisen ist Abfall; Sammlung und Handel setzen eigene Berechtigungen voraus.',
    fix: 'ersatzlos streichen',
  },
  {
    id: 'altfraktion',
    re: /alt(papier|metall|glas|holz|kleider|reifen|(ö|oe)l|batterie|ger(ä|ae)t|fahrzeug|lampe)\w*|elektroalt\w*/gi,
    why: 'Benannte Abfallfraktionen (u. a. EAG-VO, Batterien-VO). Sammlung und Übernahme sind eigens geregelt.',
    fix: 'ersatzlos streichen',
  },
  {
    id: 'abfuhr',
    re: /abfuhr\w*|abzuf(ü|ue)hren/gi,
    why: '"Müllabfuhr"/"Schuttabfuhr" — Abfallsammlung im Sinne des AWG 2002.',
    fix: 'Abholung / Abtransport',
  },
  {
    id: 'sammelinfrastruktur',
    re: /sammel(stelle|zentrum|insel|platz|fahrzeug|tour|behälter|behaelter)\w*|(?<![a-zäöüß])(abfall|wert|altstoff)?sammler(?![a-zäöüß])/gi,
    why: 'Städtische bzw. abfallrechtliche Sammelinfrastruktur; "Sammler" ist die Rolle nach § 24a AWG 2002.',
    fix: 'ersatzlos streichen',
  },
  {
    id: 'verbrennung',
    re: /verbrennungsanlage\w*|thermische?\s+(be|ver)\w*|verbrennen\w*/gi,
    why: 'Thermische Behandlung von Abfällen — Anlagengenehmigung erforderlich.',
    fix: 'ersatzlos streichen',
  },
  {
    id: 'recycling',
    re: /recycl\w*|recyc\w*/gi,
    why: 'Abfallwirtschaftlicher Kontext, impliziert Behandlung von Abfällen.',
    fix: 'Wiederverwendung nur bei belegtem Sachverhalt, sonst streichen',
  },
  {
    id: 'mistplatz',
    re: /mistplatz|mistpl(ä|ae)tze|mistt(o|ö)nne|mistk(ü|ue)bel/gi,
    why: 'Städtische Abfallinfrastruktur. Nur redaktionelle Nennung mit Freigabe.',
    fix: 'ersatzlos streichen',
  },
  /* ── Baugewerbe ──────────────────────────────────────────────────────
     Zweite Rechtsgrundlage, nicht das AWG: Abbruch, Abtragung und die
     Herstellung eines früheren Bauzustands sind dem reglementierten
     Baumeistergewerbe zugeordnet (§ 94 Z 5 GewO 1994). Die Berechtigungen
     des Betriebs — Güterbeförderung und Entrümpler — decken das nicht.

     Die Liste war ursprünglich nur gegen das Abfallrecht gebaut. Dass
     "Rückbau in den vertraglich vereinbarten Übergabezustand" auf der
     Büroseite stand, ist deshalb keiner der Prüfungen aufgefallen.

     GRÜN bleibt: abbauen, demontieren, zerstörungsfrei lösen, austragen.
     Das ist Räumung, kein Eingriff in die Bausubstanz.
     ──────────────────────────────────────────────────────────────────── */
  {
    id: 'baugewerbe',
    // Bewusst der Wortstamm "abbruch", nicht "abbrech": "abgebrochen" und
    // "abbrechen" sind Alltagswörter und hier nicht gemeint.
    re: /\babbruch\w*|\babriss\w*|\babreiss\w*|\babzureiss\w*|\br(ü|ue)ckbau\w*|\bentkern\w*|\bstemmarbeit\w*|\brohzustand\w*/gi,
    why: 'Abbruch, Abtragung und das Herstellen eines früheren Bauzustands sind Baumeistertätigkeit (§ 94 Z 5 GewO 1994) und von den vorhandenen Berechtigungen nicht gedeckt.',
    fix: 'Räumen, abbauen, demontieren, austragen — und offen sagen, dass bauliche Arbeiten ein Baumeister übernimmt',
  },
  {
    id: 'en-baugewerbe',
    re: /\bdemoli(tion|sh)\w*|\bstrip-?out\b|\bknock(ing)?\s+through\b|\bshell\s+condition\b/gi,
    why: 'Englisches Pendant: Abbruch und Herstellen des Rohzustands sind Baumeistertätigkeit und nicht gedeckt.',
    fix: 'clearing / dismantling / removing — bauliche Arbeiten einem Baumeister zuordnen',
  },
  {
    id: 'ma48',
    re: /\bMA\s?-?\s?48\b/g,
    why: 'Abfallwirtschaft der Stadt Wien. Nur redaktionell mit ausdrücklicher Freigabe, nie zur Beschreibung der eigenen Leistung.',
    fix: 'ersatzlos streichen',
  },

  /* ── Englisch, für den Zweig unter /en/ ──────────────────────────────
     Dieselbe Rechtslage, andere Sprache: Die fehlende Erlaubnis nach
     § 24a AWG 2002 gilt unabhängig davon, in welcher Sprache geworben wird.
     Ein englischer Text, der "waste disposal" anbietet, kündigt dieselbe
     nicht gedeckte Tätigkeit an wie ein deutscher mit "Abfallentsorgung".

     Die Ersatzformulierungen sind die englischen Entsprechungen der
     deutschen: removal statt disposal, "handed over to licensed specialist
     firms" statt "Übergabe an befugte Fachbetriebe".
     ──────────────────────────────────────────────────────────────────── */
  {
    id: 'en-waste',
    re: /\bwaste\w*/gi,
    why: 'Englisches Pendant zu "Abfall". Deckt waste disposal, waste collection und hazardous waste mit ab.',
    fix: 'items / belongings / furniture — oder den Gegenstand konkret benennen',
  },
  {
    id: 'en-disposal',
    re: /\bdispos(al|e|es|ed|ing)\b/gi,
    why: 'Englisches Pendant zu "Entsorgung".',
    fix: 'removal / transport / "we take it away"',
  },
  {
    id: 'en-muell',
    re: /\brubbish\w*|\bgarbage\w*|\btrash\b/gi,
    why: 'Englisches Pendant zu "Müll".',
    fix: 'items / belongings',
  },
  {
    id: 'en-deponie',
    re: /\blandfill\w*|\bincinerat\w*|\btip\s+run\b/gi,
    why: 'Deponierung und Verbrennung sind keine Entrümplertätigkeit.',
    fix: 'ersatzlos streichen',
  },
  {
    id: 'en-sammlung',
    re: /\brefuse\s+collection\b|\bwaste\s+carrier\b|\bskip\s+hire\b|\bscrap\s+(metal|yard)\b/gi,
    why: 'Bezeichnungen der erlaubnispflichtigen Sammel- und Containertätigkeit.',
    fix: 'ersatzlos streichen; "metal items" statt scrap metal',
  },
  {
    id: 'en-problemstoff',
    re: /\bproblem\s+material\w*|\bhazardous\s+(waste|material)\w*/gi,
    why: 'Gefährliche Abfälle sind gesondert erlaubnispflichtig.',
    fix: 'gar nicht als Leistung nennen — auch nicht konkret benannt (siehe Regel gefahrgueter)',
  },
  /* Nachtrag November 2026.
     Auf der Schwesterseite stand eine FAQ "Nehmen Sie auch Farben, Lacke und
     Batterien mit?" mit der Antwort, man übergebe sie den Annahmestellen. Kein
     einziges Wort der Sperrliste kam darin vor — die bisherigen Regeln rieten
     sogar dazu, Problemstoffe "konkret zu benennen". Genau diese Gegenstände
     sind aber gefährliche Abfälle; ihre Übernahme ist Sammlung im Sinn des
     § 24a AWG 2002, und nach Abs. 1 steht schon das Anbieten gegenüber einem
     größeren Personenkreis der Ausübung gleich. Deshalb sperrt die Regel die
     Gegenstände selbst. */
  {
    id: 'gefahrgueter',
    re: /\blacke\b|\bl(ö|oe)sungsmittel\w*|\b(alt)?batterien?\b|\bchemikalien?\b|\basbest\w*|\beternit\w*|\bspraydosen?\b/gi,
    why: 'Farben, Lacke, Lösungsmittel, Batterien, Chemikalien und Asbest sind gefährliche Abfälle. Wer ihre Mitnahme anbietet, bietet eine Sammlung nach § 24a AWG 2002 an.',
    fix: 'ersatzlos streichen; die Mitnahme solcher Gegenstände nicht als Leistung nennen',
  },
  {
    id: 'en-gefahrgueter',
    re: /\bsolvents?\b|\basbestos\b|\bbatteries\b|\bpaints\b/gi,
    why: 'Englische Entsprechung der Regel gefahrgueter: gefährliche Abfälle, deren Mitnahme nicht angeboten werden darf.',
    fix: 'ersatzlos streichen',
  },
];

/* ────────────────────────────────────────────────────────────────────────
   GELB — Warnung. Muss vor Launch einzeln belegt werden.
   ──────────────────────────────────────────────────────────────────────── */
const AMBER = [
  { id: 'gratis', re: /(?<![a-zäöüß])(kostenlos|gratis|kostenfrei)\w*/gi, why: 'Preisangabe — muss tatsächlich unentgeltlich und bedingungsfrei sein (UWG).' },
  { id: 'fixpreis', re: /(?<![a-zäöüß])(fixpreis|festpreis|preisgarantie|garantiert)\w*/gi, why: 'Muss vertraglich (AGB) gedeckt sein.' },
  { id: 'zertifikat', re: /(?<![a-zäöüß])(zertifizier|lizenzier|akkreditier|ausgezeichnet)\w*/gi, why: 'Nur mit vorliegendem Nachweis.' },
  { id: 'spitzenstellung', re: /(?<![a-zäöüß])(nr\.?\s?1|nummer\s?eins|beste[rns]?|f(ü|ue)hrend\w*|g(ü|ue)nstigste[rns]?|billigste[rns]?)(?![a-zäöüß])/gi, why: 'Spitzenstellungswerbung — nur mit belastbarem Nachweis zulässig (UWG).' },
  { id: 'erreichbarkeit', re: /24\s?\/\s?7|rund um die uhr|jederzeit erreichbar|immer erreichbar/gi, why: 'Nur wenn die Erreichbarkeit tatsächlich besteht.' },
  { id: 'versicherung', re: /(?<![a-zäöüß])(versichert|versicherung|haftpflicht|haftung)\w*/gi, why: 'Muss der tatsächlichen Polizze entsprechen.' },
  { id: 'zahlenbeleg', re: /(?<![a-zäöüß])(über|mehr als|seit)\s+\d{2,}\s*(kunden|auftr(ä|ae)ge|jahren?|r(ä|ae)umungen|umz(ü|ue)ge)/gi, why: 'Belegte Zahlen oder streichen. Nichts erfinden.' },
  { id: 'ankauf', re: /(?<![a-zäöüß])(wertanrechnung|ankauf|ank(a|ä)uf\w*|altwaren)\w*/gi, why: 'Setzt eine Handelsberechtigung (Altwarenhandel) voraus.' },
  { id: 'spende', re: /(?<![a-zäöüß])(spende|karitativ|gemeinn(ü|ue)tzig|sozialmarkt)\w*/gi, why: 'Tatsachenbehauptung — nur mit realem Partner.' },
  { id: 'partner', re: /befugte[rn]?\s+(partner|betrieb|fachbetrieb)\w*/gi, why: 'Tatsachenbehauptung — Partnerbetrieb muss real existieren (company.partnerCompany).' },
  { id: 'umweltclaim', re: /(?<![a-zäöüß])(umweltgerecht|umweltschonend|umweltfreundlich|(ö|oe)kologisch|nachhaltig|klimaneutral)\w*/gi, why: 'Umweltclaim (UWG, EmpCo-RL). Steht fast immer für "umweltgerechte Entsorgung" und rückt die Leistung in den Abfallkontext — nur mit Beleg, sonst streichen.' },
  // "ordnungsgemäß" bewusst nicht erfasst: steht hier für die Formulierung im
  // Mietvertrag ("ordnungsgemäß gereinigt"), nicht für die eigene Leistung.
  { id: 'fachgerecht', re: /(?<![a-zäöüß])(fachgerecht|sachgerecht)\w*/gi, why: 'Standardfloskel vor "Entsorgung". Als Leistungsversprechen nur mit belegter Berechtigung — bei Räumungsgut ersatzlos streichen.' },
  { id: 'sperrgut', re: /(?<![a-zäöüß])(sperrgut|sperrige\s+abf\w*|restentleerung|entr(ü|ue)mpelungsgut)\w*/gi, why: 'Umgehungsformulierung für "Sperrmüll". GRÜN ist "sperrige Gegenstände" / "Räumungsgut".' },

  /* ── Englisch: dieselben Werbeaussagen wie oben, andere Sprache ──────
     Die Muster sind bewusst so breit wie die deutschen. Eine engere Fassung
     ist keine Erleichterung, sondern eine Lücke: Wer "free on-site visit"
     schreibt statt "free visit", meint dasselbe und würde ungeprüft
     durchlaufen. Genau das ist beim ersten Entwurf dieser Regeln passiert.
     ──────────────────────────────────────────────────────────────────── */
  { id: 'en-gratis', re: /\bfree\b(?!\s+trade)|\bat\s+no\s+(cost|charge)\b/gi, why: 'Preisangabe — muss tatsächlich unentgeltlich und bedingungsfrei sein (UWG). Umfang bewusst gleich wie die deutsche Regel "gratis".' },
  { id: 'en-fixpreis', re: /\bfixed\s+price\b|\bprice\s+guarantee\b|\bguarantee[ds]?\b/gi, why: 'Muss vertraglich (AGB) gedeckt sein.' },
  { id: 'en-zertifikat', re: /\b(certified|licensed|accredited|award-winning)\b/gi, why: 'Nur mit vorliegendem Nachweis. "licensed" zusätzlich heikel: es darf sich nur auf Dritte beziehen.' },
  { id: 'en-spitzenstellung', re: /\b(no\.?\s?1|number\s+one|the\s+best|leading|cheapest|market\s+leader)\b/gi, why: 'Spitzenstellungswerbung — nur mit belastbarem Nachweis zulässig (UWG).' },
  { id: 'en-erreichbarkeit', re: /\baround\s+the\s+(clock|day)\b|\bavailable\s+(24|any\s?time)\b|\bday\s+and\s+night\b|\bincluding\s+weekends\b|\bany\s+time\b/gi, why: 'Nur wenn die Erreichbarkeit tatsächlich besteht.' },
  { id: 'en-versicherung', re: /\b(insured|insurance|liability|liable)\b/gi, why: 'Muss der tatsächlichen Polizze entsprechen.' },
  { id: 'en-ankauf', re: /\b(we\s+buy|purchase\s+your|second-?hand\s+trade|credited\s+against\s+the\s+price)\b/gi, why: 'Setzt eine Handelsberechtigung (Altwarenhandel) voraus — company.tradeAltwaren ist false.' },
  { id: 'en-umweltclaim', re: /\b(environmentally\s+friendly|eco-?friendly|sustainab\w*|green\s+(removals?|clearance)|carbon\s+(neutral|footprint)|climate\s+(neutral|friendly)|net\s+zero|circular\s+economy)\b/gi, why: 'Umweltclaim (UWG, EmpCo-RL). Der Betrieb führt die Behandlung nicht selbst durch, die Aussage ist damit nicht belegbar.' },
  { id: 'en-partner', re: /\b(licensed|specialist|partner)\s+(firms?|companies|contractors?|businesses)\b|\bfirms?\s+licensed\b|\bhanded\s+over\s+to\s+(a\s+)?licensed\b/gi, why: 'Tatsachenbehauptung — der Betrieb, der die Tätigkeit ausübt, muss real existieren (company.partnerCompany ist derzeit null). Deutsches Pendant: Regel "partner".' },
  /* ── Reglementierte Nachbargewerbe ────────────────────────────────────
     Dritte Grenze derselben Berechtigungen, wieder eine andere Rechtsgrundlage:
     Gebaeudereinigung (§ 94 Z 19 GewO 1994) und Schaedlingsbekaempfung
     (§ 94 Z 74 GewO 1994) sind reglementiert und liegen nicht vor.

     Bewusst GELB und nicht ROT: Die richtige Form steht auf mehreren Seiten
     und ist zulaessig — "organisieren wir ueber Partnerbetriebe" benennt, dass
     ein Dritter die Leistung erbringt. Eine blockierende Regel wuerde genau
     diese korrekte Verwendung verbieten. Jeder Treffer ist daraufhin
     anzusehen, ob die Zuordnung zum Dritten im Satz steht.
     ──────────────────────────────────────────────────────────────────── */
  { id: 'reinigungsgewerbe', re: /(?<![a-zäöüß])(end|grund|geb(ä|ae)ude|fassaden)reinigung\w*|(?<![a-zäöüß])desinfe(k|z)\w*|\b(final|deep)\s+clean\w*|\bdisinfect\w*/gi, why: 'Gebaeudereinigung und Desinfektion sind reglementiert (§ 94 Z 19 GewO 1994) und nicht gedeckt. Nur zulaessig als Leistung, die ein Partnerbetrieb erbringt — die Zuordnung muss im Satz stehen.' },
  { id: 'schaedlingsbekaempfung', re: /(?<![a-zäöüß])sch(ä|ae)dlingsbek(ä|ae)mpf\w*|kammerj(ä|ae)ger\w*|entwesung\w*|ungeziefer\w*|schimmelsanier\w*|\bpest\s+control\b|\bextermination\b|\bmould\s+removal\b/gi, why: 'Schaedlingsbekaempfung ist reglementiert (§ 94 Z 74 GewO 1994) und liegt nicht vor. Nicht als eigene Leistung nennen, hoechstens auf einen befugten Betrieb verweisen.' },
  { id: 'en-fachgerecht', re: /\b(properly|professionally|responsibly)\s+(removed|handled|taken|dealt)\b/gi, why: 'Standardfloskel vor "disposal". Als Leistungsversprechen nur mit belegter Berechtigung.' },
];

/* ──────────────────────────────────────────────────────────────────────── */

function walk(dir, out = []) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const entry of entries) {
    if (SKIP_DIR.has(entry)) continue;
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (SCAN_EXT.has(extname(entry))) out.push(full);
  }
  return out;
}

/** Erlaubte Ausnahme für diese Regel in den zwei Zeilen darüber? */
function isAllowed(lines, lineIdx, ruleId) {
  for (let i = Math.max(0, lineIdx - 2); i < lineIdx; i++) {
    const m = lines[i].match(/legal-lint-allow:\s*([\w-]+)\s*—\s*(.+)/);
    if (m && m[1] === ruleId && /Freigegeben von:\s*\S+/.test(m[2])) {
      return m[2].replace(/\s*(-->|\*\/)\s*$/, '').trim();
    }
  }
  return null;
}

/**
 * Reine Quellcode-Kommentarzeilen.
 *
 * In der src-Stufe werden sie übersprungen: Kommentare erreichen die
 * Ausgabe nicht, und die Guardrails selbst müssen im Code dokumentiert
 * werden dürfen — dafür sind die gesperrten Begriffe unvermeidbar.
 * In der dist-Stufe wird NICHTS übersprungen; dort zählt jedes Zeichen,
 * das ausgeliefert wird (HTML-Kommentare eingeschlossen).
 */
const COMMENT = /^\s*(\/\/|\/\*|\*(?!\/)|\*\/|<!--)/;

function scan(files, skipComments) {
  const red = [];
  const amber = [];
  const allowed = [];

  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const lines = text.split('\n');
    const rel = relative(ROOT, file);

    for (const [rules, bucket] of [[RED, red], [AMBER, amber]]) {
      for (const rule of rules) {
        lines.forEach((line, idx) => {
          if (skipComments && COMMENT.test(line)) return;
          rule.re.lastIndex = 0;
          let m;
          while ((m = rule.re.exec(line)) !== null) {
            if (m[0].trim() === '') break;
            const grant = isAllowed(lines, idx, rule.id);
            // Gebautes HTML ist minifiziert (eine Zeile) — deshalb ein Fenster
            // um den Treffer statt der ganzen Zeile.
            const from = Math.max(0, m.index - 70);
            const to = Math.min(line.length, m.index + m[0].length + 70);
            const context =
              (from > 0 ? '…' : '') + line.slice(from, to).trim() + (to < line.length ? '…' : '');
            const hit = {
              file: rel,
              line: idx + 1,
              term: m[0],
              rule: rule.id,
              why: rule.why,
              fix: rule.fix ?? '—',
              context,
            };
            if (grant && bucket === red) allowed.push({ ...hit, grant });
            else bucket.push(hit);
          }
        });
      }
    }
  }
  return { red, amber, allowed };
}

/** Mehrfach identische Treffer auf einer Seite einmal zeigen, mit Anzahl. */
function dedupe(hits) {
  const map = new Map();
  for (const h of hits) {
    const key = `${h.file}|${h.rule}|${h.term.toLowerCase()}`;
    const seen = map.get(key);
    if (seen) seen.count++;
    else map.set(key, { ...h, count: 1 });
  }
  return [...map.values()];
}

function print(label, rawHits, colour) {
  const hits = dedupe(rawHits);
  if (!hits.length) return;
  console.log(`\n${colour}${label} (${rawHits.length})\x1b[0m`);
  for (const h of hits) {
    if (h.count > 1) console.log(`\n  [${h.count}×]`);
    console.log(`\n  ${h.file}:${h.line}`);
    console.log(`    Begriff : "${h.term}"`);
    console.log(`    Kontext : ${h.context}`);
    console.log(`    Regel   : ${h.rule} — ${h.why}`);
    if (h.fix && h.fix !== '—') console.log(`    Ersatz  : ${h.fix}`);
  }
}

function writeReport({ red, amber, allowed }, scope) {
  const date = new Date().toISOString().slice(0, 10);
  const row = (h) => `| \`${h.term}\` | ${h.file}:${h.line} | ${h.context.replace(/\|/g, '\\|')} | ${h.rule} | ${h.why} | ${h.fix ?? '—'} |`;
  const md = `# Legal-Content-Audit — ${date}

Geprüfter Bereich: \`${scope}\`
Erzeugt von \`scripts/legal-lint.mjs\`. Grundlage: docs/08-legal-seo-guardrails.md

| Ebene | Treffer |
|---|---|
| ROT (Build-Abbruch) | ${red.length} |
| GELB (Beleg erforderlich) | ${amber.length} |
| Freigegebene Ausnahmen | ${allowed.length} |

## ROT — rechtlich sensible Begriffe

${red.length ? `| Begriff | Seite | Kontext | Regel | Risiko | Ersatzformulierung |\n|---|---|---|---|---|---|\n${red.map(row).join('\n')}` : '_Keine Treffer._'}

## GELB — belegpflichtige Aussagen

${amber.length ? `| Begriff | Seite | Kontext | Regel | Hinweis |\n|---|---|---|---|---|\n${amber.map((h) => `| \`${h.term}\` | ${h.file}:${h.line} | ${h.context.replace(/\|/g, '\\|')} | ${h.rule} | ${h.why} |`).join('\n')}` : '_Keine Treffer._'}

## Freigegebene Ausnahmen

${allowed.length ? `| Begriff | Seite | Regel | Freigabe |\n|---|---|---|---|\n${allowed.map((h) => `| \`${h.term}\` | ${h.file}:${h.line} | ${h.rule} | ${h.grant} |`).join('\n')}` : '_Keine._'}

---

Bei unklaren Fällen gilt: **RECHTLICH PRÜFEN** — nicht selbst interpretieren.
Dieser Bericht ersetzt keine Rechtsberatung.
`;
  const slug = scope.replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '') || 'scan';
  mkdirSync(join(ROOT, 'reports'), { recursive: true });
  writeFileSync(join(ROOT, 'reports', `legal-audit-${slug}-${date}.md`), md);
}

/* ── Lauf ─────────────────────────────────────────────────────────────── */

const files = walk(resolve(ROOT, target));
if (!files.length) {
  console.log(`legal-lint: keine Dateien in "${target}" — übersprungen.`);
  process.exit(0);
}

// Nur in der Quellcode-Stufe dürfen Kommentare übersprungen werden.
const istQuellstufe = !/(^|[/\\])dist([/\\]|$)/.test(target);
const result = scan(files, istQuellstufe);
writeReport(result, target);

console.log(`\nlegal-lint: ${files.length} Dateien in "${target}" geprüft.`);
print('✖ ROT — Build wird abgebrochen', result.red, '\x1b[31m');
print('▲ GELB — Beleg erforderlich vor Launch', result.amber, '\x1b[33m');

if (result.allowed.length) {
  console.log(`\n\x1b[36mℹ ${result.allowed.length} freigegebene Ausnahme(n)\x1b[0m`);
  for (const h of result.allowed) console.log(`  ${h.file}:${h.line}  ${h.rule} — ${h.grant}`);
}

if (result.red.length) {
  console.log(`\n\x1b[31mBuild abgebrochen: ${result.red.length} ROT-Treffer.\x1b[0m`);
  console.log('Ersatzformulierungen: docs/08-legal-seo-guardrails.md, Abschnitt 3.\n');
  process.exit(1);
}

console.log(result.amber.length ? `\n✓ Keine ROT-Treffer. ${result.amber.length} GELB-Treffer vor Launch belegen.\n` : '\n✓ Sauber.\n');
