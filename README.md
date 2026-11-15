# raeumerei.at

Website der Marke „Räumerei“: Entrümpelung und Räumung in Wien, dazu Umzug.
Deutsch im Wurzelverzeichnis, ein kleiner englischer Zweig unter `/en/`.
Astro, vorgerendert, ausgeliefert über Cloudflare Workers Static Assets. Kein
Framework-JavaScript im Browser, keine Webfonts, keine Cookies, keine
Drittanbieter.

```
npm ci
npm run dev                 # Entwicklungsserver
npm run build               # Build mit allen blockierenden Prüfungen
npm run lint:placeholders   # darf vor dem Launch nichts melden
npm run cf:typegen && npm run check   # Typprüfung
node scripts/make-icons.mjs # Icons und Vorschaubild neu erzeugen
```

## Aufbau

| Pfad | Inhalt |
|---|---|
| `src/data/company.ts` | einzige Quelle für Name, Anschrift, Telefon, Gewerbe |
| `src/data/leistungen.ts` | elf Leistungsseiten, gerendert von `src/pages/[leistung].astro` |
| `src/data/ratgeber.ts` | vier Ratgeber-Beiträge |
| `src/data/i18n.ts`, `src/data/services-en.ts`, `src/pages/en/` | englischer Zweig: sechs eigenständig geschriebene Seiten, hreflang paarweise |
| `src/data/bezirke.ts` | 23 Bezirke für `/einsatzgebiet-wien/` (bewusst eine Seite) |
| `src/data/preise.ts` | Richtwerte, einzige Quelle für alle Preisangaben |
| `src/pages/api/anfrage.ts` | Formular-Endpunkt (Cloudflare Email Routing) |
| `scripts/` | Wort-, SEO-, Link- und Platzhalterprüfung |

## Regeln

1. **Sperrliste.** `scripts/legal-lint.mjs` bricht den Build ab, wenn ein Text
   eine Tätigkeit nahelegt, die von den Gewerbeberechtigungen nicht gedeckt
   ist (Begriffe aus dem Abfallrecht, Bau- und Reinigungsleistungen, Ankauf).
   Begründung und Ersatzformulierungen: `docs/08-legal-seo-guardrails.md`.
   Gelbe Treffer sind Aussagen, die stimmen müssen (z. B. „kostenlose
   Besichtigung“).
2. **Angaben ohne Gewähr.** Seiten mit rechtlichen oder behördlichen Angaben
   tragen einen sichtbaren Vorbehalt (Klasse `disclaimer`), der Fuß jeder
   Seite den Satz „Alle Angaben ohne Gewähr.“ Keine Gebühren und Fristen
   erfinden, zuständige Stelle nennen.
3. **Kein Text von den Schwesterseiten** (`entruempelung-umzug-wien.at`,
   `wien-umzugservice.at`, `team-umzug.at`) und keiner dorthin. Ausnahme:
   Impressum und Datenschutzerklärung, das sind Rechtstexte desselben Betriebs.
4. **Nichts behaupten, was nicht belegt ist:** keine Bewertungen, Kundenzahlen,
   Auszeichnungen, Versicherungsaussagen.

## Offen vor dem Launch

- **Betreiber bestätigen.** Eingetragen sind die Daten des bestehenden Betriebs.
  Bei einem eigenen Unternehmen: `src/data/company.ts` anpassen und `profiles`
  leeren.
- **Preise bestätigen** und in `src/data/preise.ts` `geprueft: true` setzen.
  Erst dann erscheinen sie in den strukturierten Daten.
- **Erreichbarkeit bestätigen** („täglich, auch am Wochenende“).
- **Mailversand:** Cloudflare Email Routing für `raeumerei.at` aktivieren,
  Zieladresse verifizieren (`wrangler.jsonc`).
- **Marke prüfen:** „Räumerei“ in TMview und im Firmenbuch.
- **Rechtstexte prüfen lassen** (Impressum, Datenschutz, Ratgeber).
- **Suchbegriffe aufteilen:** Diese Seite zielt auf dieselben Begriffe wie die
  Schwesterseiten. Solange alle demselben Betrieb gehören, nur ein Google
  Business Profile führen.
