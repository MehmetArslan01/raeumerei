#!/usr/bin/env node
/**
 * placeholder-check — verhindert, dass die Seite mit Platzhaltern live geht.
 *
 * Solange Unternehmensdaten fehlen, stehen im Code Platzhalter wie
 * [UNTERNEHMENSNAME] oder [TELEFON]. Das ist bewusst so: Es wird nichts
 * erfunden und es werden keine Daten Dritter eingesetzt (docs/08, docs/10).
 *
 * Im Entwicklungs-Build sind Platzhalter erlaubt. Für den Produktions-Build
 * muss dieses Skript ohne Treffer durchlaufen:
 *     npm run lint:placeholders
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const dist = resolve(ROOT, process.argv[2] ?? 'dist');

/**
 * Alles in eckigen Klammern gilt als Platzhalter.
 *
 * Ein engeres Muster (nur Großbuchstaben) hatte eine gefährliche Lücke:
 * `[+43 XXX XXX XX XX]` und `[Mo–Sa, 07:00–19:00 Uhr]` fielen durch, weil sie
 * nicht mit einem Großbuchstaben beginnen bzw. Kleinbuchstaben enthalten.
 * Eine Prüfung, die falsche Sicherheit gibt, ist schlimmer als keine.
 *
 * In deutschem Fließtext kommen eckige Klammern praktisch nicht vor — die
 * Rate falscher Treffer ist damit vernachlässigbar.
 */
const RE = /\[[^\]\n<>]{1,200}\]/g;

/**
 * Technisch bedingte eckige Klammern im gebauten HTML, die keine Platzhalter
 * sind: Astros CSS-Scoping-Attribute, JSON-LD-Arrays und Zugriffe auf
 * Objekteigenschaften im Inline-Skript.
 */
const CODE = [
  /^data-astro-/,          // [data-astro-cid-…], [data-astro-image-pos=…] — CSS-Scoping und Bild-Layout
  /[{}]|":/,               // JSON-LD und Objektliterale (nicht jedes Anführungszeichen)
  /^[a-z][\w$]*\.[\w$]+$/, // [feld.name] — Eigenschaftszugriff im Skript
  /^\d+$/,                 // reine Indizes
  /^(open|aria-[a-z]+|hidden|disabled)$/, // CSS-Attributselektoren wie details[open], a[aria-current]
  /^"[^"]*"(\s*,\s*"[^"]*")*$/, // ["https://…"] — JSON-LD-Arrays aus Zeichenketten
];
const istCode = (inhalt) => CODE.some((re) => re.test(inhalt));

function htmlFiles(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === '_astro' || e === '_worker.js') continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (e.endsWith('.html') || e.endsWith('.xml')) out.push(full);
  }
  return out;
}

let files = [];
try {
  files = htmlFiles(dist);
} catch {
  console.log('placeholder-check: kein dist/ — übersprungen.');
  process.exit(0);
}

const found = new Map();
for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  for (const m of html.matchAll(RE)) {
    const key = m[0];
    if (istCode(key.slice(1, -1))) continue;
    if (!found.has(key)) found.set(key, new Set());
    found.get(key).add(rel);
  }
}

console.log(`\nplaceholder-check: ${files.length} Dateien geprüft.`);

if (!found.size) {
  console.log('✓ Keine Platzhalter mehr — bereit für den Produktions-Build.\n');
  process.exit(0);
}

console.log(`\n\x1b[33m▲ ${found.size} offene(r) Platzhalter\x1b[0m\n`);
const sorted = [...found.entries()].sort((a, b) => b[1].size - a[1].size);
for (const [ph, pages] of sorted) {
  console.log(`  ${ph}`);
  console.log(`      auf ${pages.size} Seite(n): ${[...pages].slice(0, 3).join(', ')}${pages.size > 3 ? ' …' : ''}`);
}
console.log('\n  Zu ersetzen in: src/data/company.ts');
console.log('  Offene Fragen dazu: README.md\n');
console.log('\x1b[31mKein Produktions-Build, solange Platzhalter offen sind.\x1b[0m\n');
process.exit(1);
