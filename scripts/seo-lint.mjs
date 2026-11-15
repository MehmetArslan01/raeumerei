#!/usr/bin/env node
/**
 * seo-lint — prüft das gebaute HTML auf OnPage-Grundlagen.
 * Bricht ab, wenn eine Seite ohne Title, Description, H1 oder Canonical
 * live gehen würde. Grundlage: docs/03, Abschnitt 6.
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const dist = resolve(ROOT, process.argv[2] ?? 'dist');

const LIMITS = { titleMax: 60, descMin: 80, descMax: 160 };

function htmlFiles(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === '_astro' || e === '_worker.js') continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (e.endsWith('.html')) out.push(full);
  }
  return out;
}

const pick = (html, re) => (html.match(re)?.[1] ?? '').trim();
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ');

const errors = [];
const warnings = [];
const seenTitles = new Map();
const seenDescs = new Map();

let files = [];
try {
  files = htmlFiles(dist);
} catch {
  console.log('seo-lint: kein dist/ — übersprungen.');
  process.exit(0);
}

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const rel = relative(ROOT, file);
  const isNoindex = /name="robots"[^>]*content="[^"]*noindex/.test(html);

  const title = decode(pick(html, /<title>([\s\S]*?)<\/title>/));
  const desc = decode(pick(html, /<meta\s+name="description"\s+content="([^"]*)"/));
  const canonical = pick(html, /<link\s+rel="canonical"\s+href="([^"]*)"/);
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)];

  const E = (m) => errors.push(`${rel}: ${m}`);
  const W = (m) => warnings.push(`${rel}: ${m}`);

  if (!title) E('kein <title>');
  else if (title.length > LIMITS.titleMax) W(`Title ${title.length} Zeichen (max. ${LIMITS.titleMax}) — "${title}"`);

  if (!desc) E('keine Meta Description');
  else if (desc.length > LIMITS.descMax) W(`Description ${desc.length} Zeichen (max. ${LIMITS.descMax})`);
  else if (desc.length < LIMITS.descMin) W(`Description nur ${desc.length} Zeichen (min. ${LIMITS.descMin})`);

  if (!canonical) E('kein Canonical');

  if (h1s.length === 0) E('keine <h1>');
  else if (h1s.length > 1) E(`${h1s.length}× <h1> — genau eine pro Seite`);

  // Bilder: alt-Attribut und feste Maße (CLS-Schutz)
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g).map((m) => [m[0]])) {
    // `alt` ohne Wert ist gültiges HTML und bedeutet dasselbe wie alt="" —
    // die richtige Auszeichnung für ein dekoratives Bild. Der Minifier
    // schreibt es so. Fehlt das Attribut ganz, liest ein Screenreader
    // ersatzweise den Dateinamen vor.
    if (!/\salt(\s|=|>)/.test(tag)) E(`<img> ohne alt: ${tag.slice(0, 90)}`);
    if (!/\bwidth=/.test(tag) || !/\bheight=/.test(tag)) {
      W(`<img> ohne width/height (CLS): ${tag.slice(0, 90)}`);
    }
  }

  // Duplicate Content über Titles/Descriptions
  if (!isNoindex) {
    if (title) (seenTitles.get(title) ?? seenTitles.set(title, []).get(title)).push(rel);
    if (desc) (seenDescs.get(desc) ?? seenDescs.set(desc, []).get(desc)).push(rel);
  }
}

for (const [t, pages] of seenTitles) {
  if (pages.length > 1) errors.push(`Doppelter Title auf ${pages.join(', ')} — "${t}"`);
}
for (const [, pages] of seenDescs) {
  if (pages.length > 1) errors.push(`Doppelte Meta Description auf ${pages.join(', ')}`);
}

console.log(`\nseo-lint: ${files.length} Seiten geprüft.`);
if (warnings.length) {
  console.log(`\n\x1b[33m▲ ${warnings.length} Hinweis(e)\x1b[0m`);
  warnings.forEach((w) => console.log(`  ${w}`));
}
if (errors.length) {
  console.log(`\n\x1b[31m✖ ${errors.length} Fehler\x1b[0m`);
  errors.forEach((e) => console.log(`  ${e}`));
  console.log('\n\x1b[31mBuild abgebrochen.\x1b[0m\n');
  process.exit(1);
}
console.log('✓ OnPage-Grundlagen in Ordnung.\n');
