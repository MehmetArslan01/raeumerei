/**
 * Preisrahmen — EINZIGE Quelle für alle Preisangaben auf der Website.
 *
 * ⚠ HERKUNFT DER ZAHLEN — bitte vor dem Launch prüfen.
 *
 * Der Auftraggeber wollte die Rahmen von team-umzug.at übernehmen. Diese
 * Domain ist vom Netzwerk-Egress dieser Umgebung blockiert und konnte nicht
 * ausgelesen werden. Die Werte unten stammen deshalb aus der Recherche zum
 * Wiener Markt (August 2026, ausgewertete Anbieterangaben und Ratgeber) und
 * sind bewusst als Spannen angelegt.
 *
 * Sie sind ein belastbarer Ausgangspunkt, aber KEINE Übernahme der
 * tatsächlichen Preise des Betriebs. Preise, die nicht gehalten werden,
 * sind ein UWG-Risiko — siehe docs/08 und docs/10, Punkt 4.
 *
 * `geprueft` auf true setzen, sobald der Auftraggeber die Zahlen bestätigt hat.
 */

/**
 * `von` und `bis` sind dieselben Zahlen wie in `rahmen`, nur maschinenlesbar
 * für das OfferCatalog-Schema. Bewusst als eigene Felder statt als Parser über
 * den Anzeigetext: „€ 600 – 1.400“ lässt sich zwar zerlegen, aber dann hinge
 * eine strukturierte Angabe an einer Zeichenkette, die jemand für die Anzeige
 * umformuliert. `bis: null` heißt „nach oben offen“ (ab-Preis), `von: null`
 * heißt, dass sich kein Betrag nennen lässt.
 */
export const preise = {
  geprueft: false,

  raeumung: [
    { objekt: 'Kellerabteil oder einzelnes Zimmer', rahmen: 'ab € 290', von: 290, bis: null },
    { objekt: '1–2-Zimmer-Wohnung', rahmen: '€ 600 – 1.400', von: 600, bis: 1400 },
    { objekt: '3–4-Zimmer-Wohnung', rahmen: '€ 1.200 – 2.500', von: 1200, bis: 2500 },
    { objekt: 'Haus, mehrtägig', rahmen: 'ab € 2.500', von: 2500, bis: null },
  ],

  umzug: [
    { objekt: 'Einzelstück oder Kleintransport', rahmen: 'ab € 150', von: 150, bis: null },
    { objekt: '1–2-Zimmer-Wohnung', rahmen: '€ 400 – 1.400', von: 400, bis: 1400 },
    { objekt: '3–4-Zimmer-Wohnung', rahmen: '€ 1.200 – 2.500', von: 1200, bis: 2500 },
    { objekt: 'Firmenumzug', rahmen: 'nach Aufwand', von: null, bis: null },
  ],

  /** Erscheint unter beiden Tabellen. */
  hinweis:
    'Alle Beträge sind unverbindliche Richtwerte inklusive Umsatzsteuer und stellen kein Angebot dar. Der tatsächliche Preis hängt vom Umfang ab und wird nach der kostenlosen Besichtigung schriftlich festgelegt. Halteverbot und behördliche Gebühren werden gesondert ausgewiesen.',
} as const;
