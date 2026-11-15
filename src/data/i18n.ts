/**
 * Zweisprachigkeit. Deutsch liegt im Wurzelverzeichnis, Englisch unter /en/.
 *
 * Der englische Zweig ist bewusst klein: sechs Seiten für die Anfragen, die
 * tatsächlich auf Englisch kommen. Die Seiten sind eigenständig geschrieben,
 * nicht übersetzt, und haben eigene Slugs. Nur Seiten, die hier als Paar
 * stehen, bekommen ein wechselseitiges hreflang.
 */
export type Locale = 'de' | 'en';

/** [deutscher Pfad, englischer Pfad] */
export const PAARE: [string, string][] = [
  ['/', '/en/'],
  ['/entruempelung-wien/', '/en/house-clearance-vienna/'],
  ['/umzug-wien/', '/en/moving-vienna/'],
  ['/raeumung-und-umzug-wien/', '/en/clearance-and-move-vienna/'],
  ['/preise/', '/en/prices/'],
  ['/kontakt/', '/en/contact/'],
  ['/danke/', '/en/thank-you/'],
];

/** Gegenstück einer Seite in der anderen Sprache, falls es eines gibt. */
export function gegenstueck(pfad: string): { de: string; en: string } | null {
  const p = PAARE.find(([de, en]) => de === pfad || en === pfad);
  return p ? { de: p[0], en: p[1] } : null;
}

export const sprache = (pfad: string): Locale => (pfad === '/en' || pfad.startsWith('/en/') ? 'en' : 'de');

/** Hauptnavigation des englischen Zweigs. */
export const NAV_EN = [
  { name: 'House clearance', url: '/en/house-clearance-vienna/' },
  { name: 'Moving', url: '/en/moving-vienna/' },
  { name: 'Clearance + move', url: '/en/clearance-and-move-vienna/' },
  { name: 'Prices', url: '/en/prices/' },
  { name: 'Contact', url: '/en/contact/' },
];
