# 08 — Legal-SEO-Guardrails

> **Ich bin kein Rechtsanwalt.** Dieses Dokument setzt die vom Auftraggeber
> vorgegebenen Guardrails technisch durch und begründet sie mit den
> zugänglichen Quellen. Es ersetzt keine Rechtsberatung durch einen
> Rechtsanwalt oder die WKO.

---

## 1. Der rechtliche Ausgangspunkt

### Was die Recherche ergeben hat

**Gewerberecht — „Entrümpler" ist ein freies Gewerbe.**
Die WKO führt „Entrümpler" in der bundeseinheitlichen Liste der freien
Gewerbe. Die WKO-Firmensuche listet über 1.000 Betriebe unter diesem
Gewerbewortlaut. Der Begriff „Entrümpelung" ist also **nicht** per se
problematisch und darf in der SEO-Strategie verwendet werden.

**Abfallrecht — die Gewerbeberechtigung reicht nicht.**
Das ist der entscheidende Punkt. Nach den WKO-Materialien gilt:

> Trotz gewerberechtlicher Berechtigung ist vor Aufnahme der Tätigkeit eine
> entsprechende Erlaubnis nach dem Abfallwirtschaftsgesetz zwingend
> erforderlich. Die Gewerbeberechtigung für Entrümpelungsarbeiten ersetzt
> **nicht** die abfallrechtliche Erlaubnis für die Abfallsammlung.

Konkret:

| Ebene | Grundlage | Zuständig |
|---|---|---|
| Gewerbe „Entrümpler" | GewO, freies Gewerbe | Bezirksverwaltungsbehörde / Magistrat |
| Erlaubnis Sammlung/Behandlung von Abfällen | **§ 24a AWG 2002** | Landeshauptmann |
| Registrierung | EDM-Portal `edm.gv.at`, GLN je Standort | BMLUK / EDM |
| Ausnahmen | § 24a Abs. 2 AWG 2002 | — |

**Güterbeförderung — für den Umzugsteil.**
Güterbeförderung mit Kfz über 3.500 kg höchstzulässigem Gesamtgewicht ist ein
**konzessioniertes** Gewerbe. Darunter (Kleintransportgewerbe, innerstaatlich)
genügt die Anmeldung eines freien Gewerbes; grenzüberschreitend gelten seit
22.05.2022 auch zwischen 2.500 und 3.500 kg Konzessions- und
EU-Lizenzpflichten. Werkverkehr ist ausgenommen, greift hier aber nicht — bei
Kundenumzügen wird fremdes Gut befördert, das ist gewerbsmäßige
Güterbeförderung.

→ **Welche Fahrzeuge und welche Berechtigung vorliegen, muss der Auftraggeber
bestätigen**, bevor Aussagen zu Fahrzeuggrößen, Schwertransporten oder Umzügen
außerhalb Wiens auf die Website kommen. Siehe Dokument 10.

### Die unbequeme Klarstellung

Die Wortsperren senken das **Kommunikationsrisiko**: Sie verhindern, dass die
Website eine Tätigkeit *bewirbt*, für die die Berechtigung fehlt — und damit
Anzeigen von Mitbewerbern, Abmahnungen und Beweismittel gegen den Betrieb.

Sie machen eine ohne Erlaubnis ausgeübte Tätigkeit **nicht zulässig**.
Wer gewerbsmäßig Abfälle sammelt, braucht die Erlaubnis nach § 24a AWG 2002 —
unabhängig davon, welche Wörter auf der Website stehen. Diese beiden Ebenen
dürfen nicht verwechselt werden.

**Empfehlung:** Vor Launch abklären lassen — WKO-Fachgruppe oder
Rechtsanwalt für Gewerbe-/Abfallrecht. Falls die Erlaubnis vorliegt oder
beantragt wird, kann ein Teil der Sperrliste kontrolliert gelockert werden
(dann würde die Kommunikation sogar zum Verkaufsargument — Mitbewerber wie
`ausraeumer.at` werben aktiv mit ihrer Abfallsammler-Registrierung).

---

## 2. Die Sperrliste

### ROT — Build bricht ab

Regex-basiert, case-insensitive, greift auf Wortstämme. Geprüft werden
`.astro`, `.md`, `.mdx`, `.ts`, `.json` **und zusätzlich das gerenderte HTML
nach dem Build** — inklusive Meta-Tags, JSON-LD, `alt`-Attributen,
`aria-label`, Button-Beschriftungen, Formularfeldern und `sitemap.xml`.

| # | Muster (Regex) | Erfasst u. a. |
|---|---|---|
| 1 | `entsorg` | Entsorgung, entsorgen, entsorgt, Entsorger, Entsorgungsfirma, Entsorgungsunternehmen, Entsorgungsbetrieb, Entsorgungsservice, Schwerlastentsorgung |
| 2 | `abfall` | Abfall, Abfälle, Abfallsammlung, Abfallsammler, Abfallbehandlung, Abfallbehandler, Abfallverwertung, Abfallbeseitigung, Abfalltransport, abfallrechtlich |
| 3 | `müll\|muell` | Müll, Müllabfuhr, Müllsammlung, Müllabholung, Sperrmüll, Restmüll, Hausmüll, Bauschutt-Müll |
| 4 | `deponie\|deponier` | Deponie, Deponierung, deponieren |
| 5 | `verwertung\|verwerten\|verwertbar` | Verwertung, Wiederverwertung, verwerten, verwertbar |
| 6 | `altstoff\|wertstoff\|schadstoff\|problemstoff\|gefahrgut` | Altstoffsammelzentrum, Wertstoff, Wertstoffsammlung, Wertstoffhof, Schadstoffe, Problemstoffe |
| 7 | `beseitigung\|beseitigen` | Beseitigung, beseitigen |
| 8 | `recycling\|recycelt\|recyceln` | Recycling, Recyclinghof |
| 9 | `mistplatz\|misttonne\|mistkübel` | Mistplatz, Mistplätze |
| 10 | `ma\s?-?\s?48` | MA 48 (nur mit begründeter Freigabe, siehe unten) |
| 11 | `container\|muldendienst\|absetzmulde` | Container, Containerdienst, Containeraufstellung, Muldenservice |
| 12 | `schutt` | Bauschutt, Bauschuttentsorgung, Schuttabfuhr, Mischschutt |
| 13 | `schrott\|alteisen` | Schrott, Schrottabholung, Schrottplatz, Alteisen |
| 14 | `alt(papier\|metall\|glas\|holz\|kleider\|reifen\|öl\|batterie\|gerät\|fahrzeug\|lampe)\|elektroalt` | Altpapier, Altmetall, Altkleider, Altgeräte, Elektroaltgeräte |
| 15 | `abfuhr\|abzuführen` | Müllabfuhr, Schuttabfuhr, Abfuhr |
| 16 | `sammel(stelle\|zentrum\|insel\|platz\|fahrzeug\|tour\|behälter)`, `\bSammler\b` | Sammelstelle, Altstoffsammelzentrum, Abfallsammler |
| 17 | `verbrennungsanlage\|verbrennen\|thermische Be-/Verwertung` | Müllverbrennung, thermische Verwertung |
| 18 | `lacke|lösungsmittel|batterie|chemikalie|asbest|eternit|spraydose`, englisch `solvent|asbestos|batteries|paints` | Farben und Lacke, Lösungsmittel, Batterien, Asbest. Gefährliche Abfälle: schon das Anbieten der Mitnahme ist nach § 24a Abs. 1 AWG 2002 der Ausübung gleichgestellt. Nachtrag November 2026, Anlass war eine FAQ auf der Schwesterseite. |

**Zu Nr. 2/3 (`wertstoff`, ergänzt in Regel `stoffe`):** „Wertstoffsammlung" ist
Abfallsammlung im Sinne des § 24a AWG 2002 — der freundlichere Begriff ändert
nichts an der Erlaubnispflicht.

**Zu Nr. 11 (`container`):** Ein Containerdienst geht über die reine
Entrümpelung hinaus (Aufstellung, Standplatzbewilligung, Verbleib des Inhalts).
Die Regel greift auch auf bildliche Verwendung („nicht in den Container
gehören") — bewusst, weil das Bild die Leistung in denselben Kontext rückt.
Sollte irgendwann eine CSS-Klasse `container` in ausgeliefertem HTML landen,
ist sie umzubenennen, nicht die Regel zu lockern.

**Zu den Komposita (`beseitig`, `verwert`):** Beide Regeln greifen ohne
Wortanfangsbedingung, damit auch „Geruchsbeseitigung" oder „Weiterverwertung"
auffallen. Der gesperrte Wortstamm soll auf der Seite gar nicht sichtbar sein.

**Zu Nr. 3 (`müll`):** Das trifft auch „Sperrmüll". Das ist Absicht. Der
Wettbewerb schreibt „Wir entsorgen Ihren Sperrmüll" — genau das dürfen wir
nach dem Briefing nicht, und der Wortstamm „Müll" verweist unmittelbar auf
Abfall im Sinne des AWG.

**Zu Nr. 5 (`verwertung`):** Nicht im Briefing gelistet, aber „Verwertung" ist
ein zentraler Begriff des AWG (Abfallverwertung) und damit riskant. Ich habe
ihn aufgenommen, weil das Briefing ausdrücklich auch Synonyme und Umgehungen
untersagt.

**Zu Nr. 8/9/11 (Recycling, Mistplatz, MA 48):** Diese hätten hohen
redaktionellen Wert (Ratgeber „MA 48 oder Firma?" ist ein starkes
Suchvolumen — der Mitbewerber hat genau diesen Artikel). Sie stehen trotzdem
auf ROT, weil sie unser Angebot in den Abfallkontext rücken. **Freigabe nur
einzeln, schriftlich, und nur für rein redaktionelle Erwähnung einer
Leistung der Stadt Wien — nie für die Beschreibung unserer eigenen
Leistung.** Der technische Mechanismus dafür ist unten beschrieben.

### GELB — Warnung, erfordert Beleg

Bricht den Build nicht ab, erscheint aber im Report und muss vor Launch
begründet werden.

| Begriff | Risiko | Bedingung |
|---|---|---|
| `kostenlos`, `gratis` | UWG, Preisangaben | Nur wenn wirklich unentgeltlich und ohne Bedingung. „Kostenlose Besichtigung" ist ok, wenn sie es ist. |
| `Fixpreis`, `Festpreis`, `garantiert` | Muss vertraglich gedeckt sein | Nur wenn die AGB das hergeben |
| `zertifiziert`, `geprüft`, `lizenziert` | Irreführung | Nur mit vorliegendem Nachweis |
| `Nr. 1`, `beste`, `führend`, `günstigste` | UWG-Spitzenstellungswerbung | Streichen |
| `24/7`, `rund um die Uhr`, `sofort` | Muss haltbar sein | Nur wenn tatsächlich besetzt |
| `versichert`, `Haftung` | Muss der Polizze entsprechen | Polizze prüfen |
| Zahlen (`über 500 Kunden`, `seit 15 Jahren`) | Erfundene Belege | Nur belegte Zahlen |
| `Ankauf`, `Wertanrechnung` | Setzt Handelsgewerbe voraus | Altwarenhandel-Berechtigung prüfen |
| `Spende`, `karitativ` | Tatsachenbehauptung | Nur mit realem Partner |
| `Partnerbetrieb`, `befugter Partner` | Tatsachenbehauptung | Nur wenn es ihn gibt |
| `umweltgerecht`, `umweltschonend`, `ökologisch`, `nachhaltig`, `klimaneutral` | Umweltclaim (UWG). Steht fast immer für „umweltgerechte Entsorgung" | Nur mit Beleg, sonst streichen |
| `fachgerecht`, `sachgerecht` | Standardfloskel vor „Entsorgung" | Als Leistungsversprechen nur mit belegter Berechtigung |
| `Sperrgut`, `Entrümpelungsgut` | Umgehungsformulierung für „Sperrmüll" | GRÜN: „sperrige Gegenstände", „Räumungsgut" |

„ordnungsgemäß" ist bewusst **nicht** erfasst: Der Begriff steht im Content für
die Formulierung im Mietvertrag („ordnungsgemäß gereinigt"), nicht für die
eigene Leistung.

### GRÜN — freigegebenes Vokabular

Damit lässt sich die Leistung vollständig und ehrlich beschreiben:

**Tätigkeiten:** räumen, Räumung, entrümpeln, Entrümpelung, ausräumen,
leerräumen, Auflösung, auflösen, abtransportieren, Abtransport, abholen,
Abholung, verladen, Verladung, tragen, Tragearbeiten, transportieren,
Transport, demontieren, Demontage, abbauen, Abbau, verpacken, Verpackung,
sortieren, Sortierung, aufstellen, montieren, kehren, besenrein übergeben

**Objekte:** Hausrat, Inventar, Einrichtung, Möbel, Räumungsgut,
sperrige Gegenstände, Altwaren, persönliche Gegenstände, Dokumente,
Erinnerungsstücke, Restbestand, Bestand

**Zustände/Ergebnis:** besenreine Übergabe, geräumt, leer, übergabefertig,
kehrsauber, geordnet

**Merke:** „Räumungsgut" und „sperrige Gegenstände" ersetzen „Sperrmüll"
vollständig und klingen sogar professioneller.

---

## 3. Ersatzformulierungen — die Tabelle für die Redaktion

| Statt … | Schreiben wir … |
|---|---|
| „Wir entsorgen alles." | „Wir räumen, verladen und transportieren ab." |
| „fachgerechte Entsorgung inklusive" | „Abtransport inklusive" |
| „Wir übernehmen die komplette Entsorgung." | „Wir übernehmen Räumung, Abtransport und die besenreine Übergabe." |
| „Wir entsorgen Ihren Sperrmüll." | „Wir nehmen auch sperrige Gegenstände mit." |
| „inkl. Entsorgungskosten" | „inkl. Abtransport" |
| „Entsorgung nach Materialart getrennt" | „Wir sortieren vor Ort, was mitgenommen wird." |
| „Wir kümmern uns um Ihren Müll." | „Wir kümmern uns darum, dass die Wohnung leer wird." |
| „Verwertbares wird recycelt." | „Gut erhaltene Stücke rechnen wir Ihnen an." |
| „Entsorgungsunternehmen Wien" | „Entrümpelungsfirma Wien" / „Räumungsfirma Wien" |
| „Wir bringen alles zum Mistplatz." | *(ersatzlos streichen)* |
| „Abfalltransport" | „Abtransport des Räumungsguts" |
| „Wir stellen einen Container auf." | „Wir laden direkt auf und nehmen es mit." |
| „Dinge, die nicht in den Container gehören" | „Dinge, die niemand ungesehen mitnehmen sollte" |
| „Containerdienst Wien" | „Räumung mit Abtransport in ganz Wien" |
| „Bauschutt inklusive" | *(ersatzlos streichen — Baurestmassen sind keine Entrümplertätigkeit)* |
| „Wertstoffe werden getrennt gesammelt." | „Wir sortieren vor Ort, was mitgenommen wird." |
| „Geruchsbeseitigung" | „Geruchsentfernung" |
| „umweltgerechte Abwicklung" | *(ersatzlos streichen, solange kein Beleg vorliegt)* |

### Der zentrale Satz — noch offen

Die Standardformulierung der Branche für den Verbleib des Räumungsguts wäre:

> „Was mitgenommen wird, übergeben wir an dafür befugte Partnerbetriebe."

Dieser Satz ist rechtlich sauber **und** informativ — **aber er ist eine
Tatsachenbehauptung.** Er darf nur auf die Website, wenn es diese
Partnerbetriebe tatsächlich gibt und die Übergabe so stattfindet.

**Status: [BESTÄTIGUNG DURCH AUFTRAGGEBER ERFORDERLICH]** — siehe Dokument 10,
Punkt 1. Bis dahin bleibt die Frage „Wo bringt ihr die Sachen hin?" auf der
Website **unbeantwortet**. Das ist eine echte inhaltliche Lücke, die Nutzer
bemerken werden. Sie lässt sich nicht durch Formulierungskunst schließen,
sondern nur durch eine Klärung des Sachverhalts.

---

## 4. Technische Durchsetzung: `legal-lint`

Guardrails in einem Dokument werden beim vierten Textupdate vergessen.
Deshalb wird die Sperrliste **im Build erzwungen**.

```
scripts/legal-lint.mjs
```

**Läuft in drei Stufen:**

1. **Pre-commit Hook** — prüft die geänderten Quelldateien.
2. **Build-Schritt** — prüft alle Quelldateien; Abbruch bei ROT.
3. **Post-Build** — prüft **das gerenderte HTML** in `dist/` inklusive
   `<title>`, `<meta>`, JSON-LD, `alt`, `aria-label`, `sitemap.xml`.
   Das ist die wichtige Stufe: Sie fängt auch Begriffe, die erst durch
   Templates, Datendateien oder Schema-Generierung entstehen.

**Ausgabe bei einem Treffer:**

```
✖ LEGAL-LINT: 2 Treffer (ROT)

  src/pages/kellerentruempelung-wien.astro:47
    Begriff : "entsorgen"
    Kontext : "…und entsorgen den Rest fachgerecht."
    Regel   : R1 (entsorg) — AWG 2002 § 24a, Erlaubnis nicht bestätigt
    Risiko  : HOCH — bewirbt eine erlaubnispflichtige Tätigkeit
    Ersatz  : "…und transportieren den Rest ab."

  dist/entruempelung-wien/index.html:1 (JSON-LD, Service.description)
    Begriff : "Abfall"
    ...

Build abgebrochen.
```

**Kontrollierte Ausnahme.** Ein Treffer kann nur mit einer expliziten,
begründeten Annotation direkt über der Zeile freigegeben werden:

```html
<!-- legal-lint-allow: ma-48 — redaktionelle Nennung des städtischen
     Angebots im Ratgeber, keine eigene Leistungsbeschreibung.
     Freigegeben von: [NAME], [DATUM] -->
```

Jede Ausnahme erscheint im Audit-Report. Ohne Namen und Datum wird sie nicht
akzeptiert. Damit ist jede Lockerung nachvollziehbar und einer Person
zugeordnet.

**Report-Datei:** Jeder Build schreibt
`reports/legal-audit-<datum>.md` mit Begriff, Seite, Kontext, Risiko,
Empfehlung und Ersatzformulierung — das ist genau der in Punkt 26 des
Briefings geforderte Bericht, nur eben automatisch und bei jedem Build neu.

---

## 5. Strukturierte Daten — Guardrails

| Feld | Regel |
|---|---|
| `@type` | `MovingCompany` (Untertyp von `LocalBusiness`). **Nicht** `RecyclingCenter`, nicht `WasteManagement`-nahe Typen. |
| `Service.serviceType` | Nur aus der GRÜN-Liste: „Entrümpelung", „Räumung", „Wohnungsauflösung", „Umzug", „Möbeltransport" |
| `description` | Läuft durch denselben Linter wie Fließtext |
| `AggregateRating` | **Nur mit echten, überprüfbaren Bewertungen.** Bis dahin: kein Rating-Schema. Erfundene Ratings sind ein Verstoß gegen die Google-Richtlinien **und** UWG-relevant. |
| `Review` | dito |
| `priceRange` | Nur wenn belegbar; sonst weglassen |
| `areaServed` | Wien + die 23 Bezirke als `PostalAddress`/`City` — faktisch korrekt |
| `FAQPage` | Nur bei echten Fragen mit echten Antworten, und nur wenn die Antwort sichtbar auf der Seite steht |
| `openingHours` | Nur reale Zeiten |

---

## 6. Weitere rechtliche Punkte (Österreich)

| Thema | Anforderung | Status |
|---|---|---|
| **Impressum** | § 5 ECG + § 24 MedienG: Name, Anschrift, UID, Firmenbuchnummer + Gericht, Gewerbe, Behörde, Kammerzugehörigkeit, Berufsrecht mit Link (RIS), Kontakt | Platzhalter — Dok. 10 |
| **Offenlegung** | § 25 MedienG: Blattlinie/Unternehmensgegenstand | Platzhalter |
| **Datenschutz** | DSGVO Art. 13: Verantwortlicher, Zwecke, Rechtsgrundlagen, Speicherdauer, Empfänger, Betroffenenrechte, Beschwerderecht (Datenschutzbehörde) | Platzhalter |
| **Formular** | Rechtsgrundlage Art. 6 Abs. 1 lit. b DSGVO (vorvertraglich). Einwilligungs-Checkbox nicht vorausgewählt, Link zur Datenschutzerklärung | eingeplant |
| **Cookies** | **Empfehlung: keine setzen.** Ohne Cookies und ohne Drittanbieter-Skripte entfällt der Cookie-Banner. Das ist gleichzeitig ein Performance- und Conversion-Vorteil. | Dok. 07 |
| **Google Fonts** | Nur selbst gehostet. Einbindung über Google-Server überträgt IP-Adressen in Drittstaaten. | eingeplant |
| **Google Maps** | Nur nach Klick (Zwei-Klick-Lösung) oder gar nicht — statisches Bild + Link | Dok. 07 |
| **AGB** | Empfohlen, insbesondere zur Fixpreis-Zusage | Auftraggeber |
| **Preisauszeichnung** | Preise inkl. USt. bei Verbrauchern; USt.-Hinweis nötig | eingeplant |

---

## 7. Legal-Audit vor Launch (Punkt 26 des Briefings)

Der geforderte Bericht entsteht automatisch. Der Launch ist blockiert, solange
nicht gilt:

- [ ] `legal-lint` läuft über `src/` **und** `dist/` ohne ROT-Treffer
- [ ] alle GELB-Treffer sind einzeln begründet und im Report abgehakt
- [ ] jede `legal-lint-allow`-Ausnahme trägt Name und Datum
- [ ] kein `AggregateRating`/`Review` ohne echte Bewertungen
- [ ] Impressum und Datenschutz enthalten keine Platzhalter mehr
- [ ] alle Zahlen-, Zeit- und Zertifikatsangaben sind belegt
- [ ] Dokument 10 vollständig beantwortet
- [ ] **Rechtliche Freigabe des Auftraggebers liegt schriftlich vor**
