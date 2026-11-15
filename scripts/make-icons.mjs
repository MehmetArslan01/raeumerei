/**
 * Erzeugt alle Icon- und Vorschaubilder aus einer Quelle.
 *
 * Warum ein Skript statt fertiger Binärdateien im Repository:
 * Das Markenzeichen ist Geometrie, keine Zeichnung. Es liegt hier als SVG,
 * ist damit versionierbar und lesbar, und die Rasterformate entstehen daraus
 * reproduzierbar. Ändert sich die Farbe oder die Form, genügt ein Lauf.
 *
 *   node scripts/make-icons.mjs
 *
 * Die Ergebnisse gehören ins Repository — der Website-Build ruft dieses
 * Skript NICHT auf. Es braucht Schriften im System (für das Vorschaubild),
 * und ein Build soll nicht davon abhängen, welche gerade installiert sind.
 */

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUB = join(ROOT, 'public');

/* ── Markenfarben, identisch zu src/styles/global.css ─────────────────── */
const ZIEGEL = '#c2401c';
const PAPIER = '#faf6f0';
const TINTE = '#1d1a17';
const GRAU = '#5a534c';

/**
 * Das Zeichen: ein Raum im Grundriss, an einer Ecke offen — die Tür, durch
 * die alles hinausgeht. Dieselbe Form wie in src/components/Logo.astro.
 */
const RAUM = 'M42 17H17v30h30V28';
const strich = (breite) =>
  `<path d="${RAUM}" fill="none" stroke="#fff" stroke-width="${breite}" stroke-linecap="round" stroke-linejoin="round"/>`;

/** Quadratisches Icon. `radius` 0 für iOS, das maskiert selbst. */
const iconSvg = (radius = 15) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="${radius}" fill="${ZIEGEL}"/>
  ${strich(6.5)}
</svg>`;

/* ── Vorschaubild für Suchergebnisse und Messenger ─────────────────────
   Nur Marke, Leistung, Ort und Kontakt. Keine Zahlen, keine Behauptungen. */
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPIER}"/>
  <rect x="0" y="0" width="24" height="630" fill="${ZIEGEL}"/>

  <g transform="translate(104 96) scale(1.75)">
    <rect width="64" height="64" rx="15" fill="${ZIEGEL}"/>
    ${strich(6.5)}
  </g>

  <text x="100" y="352" fill="${TINTE}"
        font-family="'Liberation Sans', Arial, sans-serif" font-weight="700"
        font-size="132" letter-spacing="-5">Räumerei</text>

  <text x="104" y="424" fill="${ZIEGEL}"
        font-family="'Liberation Sans', Arial, sans-serif" font-weight="700"
        font-size="40">Entrümpelung · Räumung · Umzug in Wien</text>

  <line x1="104" y1="492" x2="1096" y2="492" stroke="${TINTE}" stroke-opacity="0.18" stroke-width="2"/>

  <text x="104" y="546" fill="${GRAU}"
        font-family="'Liberation Sans', Arial, sans-serif" font-size="30">raeumerei.at</text>
  <text x="1096" y="546" fill="${TINTE}" text-anchor="end"
        font-family="'Liberation Sans', Arial, sans-serif" font-weight="700" font-size="30">+43 660 658 27 43</text>
</svg>`;

/** Kleinstes Icon: stärkerer Strich, damit die Form bei 16 px noch trägt. */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="13" fill="${ZIEGEL}"/>
  ${strich(8)}
</svg>`;

const png = (svg, size, datei, hintergrund) =>
  sharp(Buffer.from(svg))
    .resize(size, size)
    .flatten(hintergrund ? { background: hintergrund } : false)
    .png({ compressionLevel: 9 })
    .toFile(join(PUB, datei));

const pngPuffer = (svg, size) =>
  sharp(Buffer.from(svg)).resize(size, size).png({ compressionLevel: 9 }).toBuffer();

/**
 * favicon.ico aus mehreren PNG-Grössen.
 *
 * Browser fragen /favicon.ico von sich aus an, auch wenn im HTML ein SVG
 * steht. Ohne die Datei ist das bei jedem Erstbesuch ein 404 im Log.
 *
 * Das ICO-Format ist ein simpler Behälter: 6 Byte Kopf, je 16 Byte Verzeichnis
 * pro Bild, dann die Bilddaten. Seit Vista dürfen die Bilddaten PNG sein, was
 * hier alles ausser dem Zusammensetzen erspart. sharp kennt ICO nicht, deshalb
 * die paar Zeilen von Hand statt einer weiteren Abhängigkeit.
 */
async function icoSchreiben(svg, groessen, datei) {
  const bilder = await Promise.all(groessen.map((g) => pngPuffer(svg, g)));

  const kopf = Buffer.alloc(6);
  kopf.writeUInt16LE(0, 0);              // reserviert
  kopf.writeUInt16LE(1, 2);              // Typ 1 = Icon
  kopf.writeUInt16LE(bilder.length, 4);

  const verzeichnis = Buffer.alloc(16 * bilder.length);
  let versatz = kopf.length + verzeichnis.length;

  bilder.forEach((bild, i) => {
    const e = i * 16;
    // 0 steht im Format fuer 256 Pixel. Groessere Kantenlaengen kann ein ICO
    // nicht benennen, deshalb bleibt es hier bei 16/32/48.
    verzeichnis.writeUInt8(groessen[i] >= 256 ? 0 : groessen[i], e);
    verzeichnis.writeUInt8(groessen[i] >= 256 ? 0 : groessen[i], e + 1);
    verzeichnis.writeUInt8(0, e + 2);    // keine Palette
    verzeichnis.writeUInt8(0, e + 3);    // reserviert
    verzeichnis.writeUInt16LE(1, e + 4); // Ebenen
    verzeichnis.writeUInt16LE(32, e + 6);// Bit pro Pixel
    verzeichnis.writeUInt32LE(bild.length, e + 8);
    verzeichnis.writeUInt32LE(versatz, e + 12);
    versatz += bild.length;
  });

  await writeFile(join(PUB, datei), Buffer.concat([kopf, verzeichnis, ...bilder]));
}

/**
 * Web-App-Manifest. Bringt kein Ranking, aber ohne Manifest bietet Android
 * kein "Zum Startbildschirm hinzufuegen" an, und die Adressleiste faerbt sich
 * nicht mit. Beides sind Kleinigkeiten, die nichts kosten.
 */
const manifest = {
  name: 'Räumerei Wien',
  short_name: 'Räumerei',
  lang: 'de-AT',
  start_url: '/',
  scope: '/',
  display: 'browser',
  background_color: PAPIER,
  theme_color: PAPIER,
  icons: [
    { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};

await mkdir(join(PUB, 'og'), { recursive: true });

await writeFile(join(PUB, 'favicon.svg'), favicon.replace(/\n\s*/g, ''));
await writeFile(join(PUB, 'site.webmanifest'), `${JSON.stringify(manifest, null, 2)}\n`);

await Promise.all([
  // Rückfalloption für Browser ohne SVG-Icons; Google verlangt ein
  // Vielfaches von 48 px.
  png(iconSvg(13), 96, 'favicon-96.png'),
  // iOS: deckend und ohne eigene Rundung, das Betriebssystem maskiert selbst.
  png(iconSvg(0), 180, 'apple-touch-icon.png', ZIEGEL),
  png(iconSvg(0), 192, 'icon-192.png'),
  png(iconSvg(0), 512, 'icon-512.png'),
  // Das kleinste Icon traegt bei 16 px nur mit knapperem Rand.
  icoSchreiben(favicon, [16, 32, 48], 'favicon.ico'),
  sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(join(PUB, 'og', 'standard.png')),
]);

console.log('Icons erzeugt: favicon.svg, favicon.ico, favicon-96.png, apple-touch-icon.png, '
          + 'icon-192.png, icon-512.png, site.webmanifest, og/standard.png');
