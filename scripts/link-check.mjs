#!/usr/bin/env node
/**
 * link-check — interne Verlinkung, wie in docs/03 festgelegt.
 *
 *  - tote interne Links
 *  - fehlende referenzierte Dateien (Icons, Vorschaubilder, Stylesheets)
 *  - Orphan Pages (Regel R7): jede indexierbare Seite braucht einen
 *    eingehenden Link, der NICHT aus Kopf- oder Fußzeile stammt
 *  - Klicktiefe > 3 von der Startseite (Regel R9)
 *
 * Kopf- und Fußzeilenlinks werden herausgerechnet, weil sie auf jeder Seite
 * stehen und damit jede Seite formal erreichbar machen würden — sie ersetzen
 * aber keine kontextuelle Verlinkung im Inhalt (Regel R10).
 */

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const ROOT = process.cwd();
const dist = resolve(ROOT, process.argv[2] ?? 'dist');
const MAX_DEPTH = 3;

function htmlFiles(dir, out = []) {
  for (const e of readdirSync(dir)) {
    if (e === '_astro' || e === '_worker.js') continue;
    const full = join(dir, e);
    if (statSync(full).isDirectory()) htmlFiles(full, out);
    else if (e.endsWith('.html')) out.push(full);
  }
  return out;
}

const toRoute = (file) => {
  const r = '/' + relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  return r === '/' ? '/' : r.endsWith('/') ? r : r + '/';
};

let files = [];
try {
  files = htmlFiles(dist);
} catch {
  console.log('link-check: kein dist/ — übersprungen.');
  process.exit(0);
}

const routes = new Set(files.map(toRoute));
const pages = new Map();

/**
 * Eigene Adresse aus dem Canonical der Startseite. Damit lassen sich absolute
 * Verweise auf die eigene Domain (og:image) wie lokale Pfade prüfen.
 */
const origin = (() => {
  for (const file of files) {
    const m = readFileSync(file, 'utf8').match(/<link rel="canonical" href="(https?:\/\/[^/"]+)/);
    if (m) return m[1];
  }
  return null;
})();

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const route = toRoute(file);

  // Kopf-/Fußzeile für die Orphan-Prüfung ausblenden.
  const body = html
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<nav\b[^>]*class="[^"]*sticky[^"]*"[\s\S]*?<\/nav>/gi, '')
    .replace(/<div\b[^>]*class="sticky"[\s\S]*?<\/div>/gi, '');

  const collect = (src) =>
    [...src.matchAll(/href="([^"]+)"/g)]
      .map((m) => m[1])
      .filter((h) => h.startsWith('/') && !h.startsWith('//'))
      .map((h) => h.split('#')[0].split('?')[0])
      .filter(Boolean)
      // Dateien behalten ihre Endung, nur Routen bekommen den Trailing Slash.
      .map((h) => (h.endsWith('/') || /\.\w{2,5}$/.test(h) ? h : h + '/'));

  /**
   * Referenzierte Dateien einsammeln: Icons, Vorschaubilder, Stylesheets.
   * `content=` ist nötig, weil og:image eine absolute Adresse trägt — genau
   * dort fiel eine fehlende Datei bisher niemandem auf, weil sie im Browser
   * nie angefragt wird, sondern erst beim Teilen eines Links.
   */
  const assets = [...html.matchAll(/(?:href|src|content)="([^"]+)"/g)]
    .map((m) => m[1])
    .map((h) => (origin && h.startsWith(origin) ? h.slice(origin.length) : h))
    .filter((h) => h.startsWith('/') && !h.startsWith('//'))
    .map((h) => h.split('#')[0].split('?')[0]);

  pages.set(route, {
    all: [...new Set(collect(html))],
    content: [...new Set(collect(body))],
    assets: [...new Set(assets)],
    noindex: /name="robots"[^>]*content="[^"]*noindex/.test(html),
  });
}

const errors = [];
const warnings = [];

/* ── Tote interne Links ─────────────────────────────────────────────── */
// Ohne den abschliessenden Schraegstrich: trailingSlash 'always' haengt beim
// Aufloesen einen an, sonst faende sich /site.webmanifest/ als Route wieder.
const assetLike = (h) =>
  /\.(css|js|mjs|svg|png|jpe?g|webp|avif|gif|ico|xml|txt|pdf|woff2?|webmanifest)\/?$/i.test(h);
for (const [route, data] of pages) {
  for (const href of data.all) {
    if (assetLike(href)) continue;
    if (!routes.has(href)) errors.push(`Toter interner Link: ${route} → ${href}`);
  }
}

/* ── Referenzierte Dateien vorhanden? ───────────────────────────────── */
const fehlend = new Map();
for (const [route, data] of pages) {
  for (const pfad of data.assets) {
    if (!assetLike(pfad)) continue;
    if (existsSync(join(dist, pfad))) continue;
    if (!fehlend.has(pfad)) fehlend.set(pfad, route);
  }
}
for (const [pfad, route] of fehlend) {
  errors.push(`Referenzierte Datei fehlt: ${pfad} (u. a. auf ${route})`);
}

/* ── Orphan Pages (R7) ──────────────────────────────────────────────── */
const inboundContent = new Map([...routes].map((r) => [r, 0]));
for (const [, data] of pages) {
  for (const href of data.content) {
    if (inboundContent.has(href)) inboundContent.set(href, inboundContent.get(href) + 1);
  }
}
for (const [route, count] of inboundContent) {
  if (route === '/' || pages.get(route)?.noindex) continue;
  if (count === 0) {
    errors.push(`Orphan Page (kein Link aus einem Inhaltsbereich): ${route}`);
  }
}

/* ── Klicktiefe (R9) ────────────────────────────────────────────────── */
const depth = new Map([['/', 0]]);
const queue = ['/'];
while (queue.length) {
  const cur = queue.shift();
  const d = depth.get(cur);
  for (const href of pages.get(cur)?.all ?? []) {
    if (!routes.has(href) || depth.has(href)) continue;
    depth.set(href, d + 1);
    queue.push(href);
  }
}
for (const route of routes) {
  if (pages.get(route)?.noindex) continue;
  const d = depth.get(route);
  if (d === undefined) warnings.push(`Von der Startseite nicht erreichbar: ${route}`);
  else if (d > MAX_DEPTH) warnings.push(`Klicktiefe ${d} (max. ${MAX_DEPTH}): ${route}`);
}

/* ── Ausgabe ────────────────────────────────────────────────────────── */
console.log(`\nlink-check: ${routes.size} Seiten, ${[...pages.values()].reduce((n, p) => n + p.all.length, 0)} interne Links.`);
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
console.log('✓ Verlinkung in Ordnung: keine toten Links, keine Orphan Pages.\n');
