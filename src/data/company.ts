/**
 * EINZIGE QUELLE für alle Unternehmensdaten.
 *
 * Footer, Impressum, Kontaktseite, tel:-Links und JSON-LD werden daraus
 * gerendert, damit Name, Anschrift und Telefon nirgends auseinanderlaufen.
 *
 * ⚠ BETREIBER — VOR DEM LAUNCH BESTÄTIGEN.
 * „Räumerei“ ist die Marke des Auftritts, kein Firmenwortlaut. Eingetragen
 * sind die Stammdaten des bestehenden Betriebs (identisch mit
 * entruempelung-umzug-wien.at, wien-umzugservice.at und team-umzug.at),
 * weil nur diese belegt sind. Geht die Domain an ein eigenes Unternehmen,
 * ändern sich in dieser Datei: name, owner, address, phone*, email, vatId,
 * trades, gisa, tradeAuthority — und `profiles` wird geleert. Erfunden wird
 * hier nichts.
 */

export const company = {
  // ── Identität ──────────────────────────────────────────────────────────
  /** Firmenwortlaut exakt wie im Gewerberegister. */
  name: 'Ahmet Duran Arslan',
  /** Marke des Auftritts: Logo, Title-Zusatz, og:site_name. */
  brand: 'Räumerei',
  /** Marke mit Ortsbezug, wo ein Satz sie braucht. */
  brandLong: 'Räumerei Wien',
  owner: 'Ahmet Duran Arslan',
  /** Verfasser der Ratgeber-Artikel, für das Article-Schema. */
  author: 'Mehmet Arslan',
  legalForm: 'Einzelunternehmen',

  // ── Adresse ────────────────────────────────────────────────────────────
  address: {
    street: 'Miltnerweg 20/11/9',
    postalCode: '1110',
    city: 'Wien',
    country: 'Österreich',
    countryCode: 'AT',
  },
  /** false = Betrieb fährt zum Kunden; Anschrift nur im Impressum. */
  publicPremises: false,

  // ── Kontakt ────────────────────────────────────────────────────────────
  phoneDisplay: '+43 660 658 27 43',
  phoneHref: '+436606582743',
  /** Nur Ziffern, für wa.me. */
  whatsapp: '436606582743',
  email: 'mehmetarslan.business@hotmail.com',

  // ── Erreichbarkeit ─────────────────────────────────────────────────────
  /**
   * Übernommen vom bestehenden Auftritt (dort auf Wunsch des Inhabers).
   * Muss tatsächlich zutreffen, sonst ist es eine irreführende Angabe.
   * Die Website schreibt es bewusst zurückhaltend als „täglich erreichbar“.
   */
  hours: {
    text: 'Täglich erreichbar, auch am Wochenende',
    spec: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    ],
  },
  responseTime: 'am selben Tag',

  // ── Rechtliches (§ 5 ECG, § 25 MedienG) ────────────────────────────────
  vatId: 'ATU76329028',
  companyRegister: null as string | null,
  companyRegisterCourt: null as string | null,
  /** Gewerbewortlaute zeichengenau nach GISA-Auszug. */
  trades: [
    'Güterbeförderung mit Kraftfahrzeugen oder Kraftfahrzeugen mit Anhängern, deren höchst zulässiges Gesamtgewicht insgesamt 3.500 kg nicht übersteigt (GISA 33316116)',
    'Entrümpler (Räumung durch Entfernung wertlosen Gutes) (GISA 33316130)',
  ],
  gisa: ['33316116', '33316130'],
  tradeAuthority: 'Magistratisches Bezirksamt für den 11. Bezirk',
  chamber: 'Wirtschaftskammer Wien',
  professionalLawUrl: 'https://www.ris.bka.gv.at/',

  /**
   * ⚠ Grenzen der Berechtigungen. Sie bestimmen, was auf der Website stehen
   * darf (scripts/legal-lint.mjs setzt das durch):
   *  - Fahrzeuge bis 3.500 kg: keine Aussagen über größere Lkw.
   *  - Kein Handelsgewerbe: kein Ankauf, keine Wertanrechnung.
   *  - Keine Erlaubnis nach § 24a AWG 2002: die Sperrliste bleibt aktiv.
   *  - Kein benannter Partnerbetrieb: keine Aussage darüber, an wen
   *    Räumungsgut übergeben wird.
   */
  maxVehicleWeightKg: 3500,
  tradeAltwaren: false,
  // legal-lint-allow: en-waste — Feldname, kein Seitentext. Bezeichnet die Berechtigung, die NICHT vorliegt. Freigegeben von: Mehmet Arslan, 2026-09-05
  wasteLicence: false,
  partnerCompany: null as string | null,

  // ── Domain ─────────────────────────────────────────────────────────────
  domain: 'raeumerei.at',
  siteUrl: 'https://raeumerei.at',

  // ── Einsatzgebiet ──────────────────────────────────────────────────────
  serviceArea: {
    primary: 'Wien',
    extended: 'Wien und Umgebung',
  },

  /**
   * schema.org sameAs. Solange alle Auftritte demselben Betrieb gehören,
   * macht die Verknüpfung das für Suchmaschinen ausdrücklich. Bei einem
   * Betreiberwechsel MUSS die Liste geleert werden.
   */
  profiles: [
    'https://entruempelung-umzug-wien.at/',
    'https://wien-umzugservice.at/',
    'https://team-umzug.at/',
  ] as string[],
} as const;

/** Straße, PLZ Ort — einzeilig. */
export const addressLine = () =>
  `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;

/** Vorbefüllter WhatsApp-Link. */
export const whatsappUrl = (text = 'Guten Tag, ich hätte gerne ein Angebot für ') =>
  company.whatsapp ? `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}` : null;
