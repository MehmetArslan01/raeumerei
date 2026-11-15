/**
 * Die 23 Wiener Gemeindebezirke mit dem, was für Räumung und Umzug dort
 * praktisch zählt. Bewusst EINE Seite für alle Bezirke statt 23 fast
 * gleicher Seiten: Solche Seitenserien wertet Google als Brückenseiten.
 */
export interface Bezirk { nr: number; plz: string; name: string; notiz: string }

export const bezirke: Bezirk[] = [
  { nr: 1, plz: '1010', name: 'Innere Stadt', notiz: 'Fußgängerzonen und enge Gassen. Zufahrt und Ladezeiten müssen vorab geklärt werden, oft sind nur die frühen Stunden möglich.' },
  { nr: 2, plz: '1020', name: 'Leopoldstadt', notiz: 'Gründerzeithäuser im Karmeliter- und Stuwerviertel, daneben Neubauten im Nordbahnviertel mit Lift und Tiefgarage.' },
  { nr: 3, plz: '1030', name: 'Landstraße', notiz: 'Vom Altbau im Botschaftsviertel bis zu den Wohnanlagen in Erdberg. Parkraum ist tagsüber knapp.' },
  { nr: 4, plz: '1040', name: 'Wieden', notiz: 'Dichter Altbaubestand mit hohen Räumen und großen Kästen. Ohne Halteverbotszone wird weit getragen.' },
  { nr: 5, plz: '1050', name: 'Margareten', notiz: 'Der am dichtesten besiedelte Bezirk Wiens. Schmale Gassen, viele Häuser ohne Lift, kurze Wege zwischen den Adressen.' },
  { nr: 6, plz: '1060', name: 'Mariahilf', notiz: 'Altbau rund um die Mariahilfer Straße. In Begegnungs- und Fußgängerzone gelten eigene Lieferzeiten.' },
  { nr: 7, plz: '1070', name: 'Neubau', notiz: 'Biedermeierhäuser am Spittelberg mit niedrigen Durchgängen, sonst Gründerzeit. Transporter stehen selten direkt vor dem Tor.' },
  { nr: 8, plz: '1080', name: 'Josefstadt', notiz: 'Kleinster Bezirk, fast durchgehend Altbau. Viele Wohnungen im dritten und vierten Stock mit kleinem oder ohne Lift.' },
  { nr: 9, plz: '1090', name: 'Alsergrund', notiz: 'Gründerzeit im Servitenviertel, große Wohnungen mit Dienstbotenzimmern und entsprechend viel Inventar.' },
  { nr: 10, plz: '1100', name: 'Favoriten', notiz: 'Gemeindebauten mit langen Hofwegen, Altbau um den Reumannplatz und Neubau im Sonnwendviertel.' },
  { nr: 11, plz: '1110', name: 'Simmering', notiz: 'Unser Standort. Gemeindebauten, Siedlungshäuser und Kleingärten, die Anfahrt ist hier am kürzesten.' },
  { nr: 12, plz: '1120', name: 'Meidling', notiz: 'Altbau entlang der Meidlinger Hauptstraße, dazu große Wohnhausanlagen. Stellplätze im Hof sind oft möglich.' },
  { nr: 13, plz: '1130', name: 'Hietzing', notiz: 'Villen und Einfamilienhäuser mit Keller, Dachboden und Garten. Räumungen dauern hier meist mehrere Tage.' },
  { nr: 14, plz: '1140', name: 'Penzing', notiz: 'Vom Altbau nahe dem Gürtel bis zu Siedlungen am Wienerwald. In Hanglagen zählt jeder Meter Zufahrt.' },
  { nr: 15, plz: '1150', name: 'Rudolfsheim-Fünfhaus', notiz: 'Dichter Gründerzeitbestand, viele Häuser ohne Lift. Kellerabteile sind klein und stark gefüllt.' },
  { nr: 16, plz: '1160', name: 'Ottakring', notiz: 'Unten Zinshäuser am Brunnenmarkt, oben Einfamilienhäuser am Wilhelminenberg mit steilen Zufahrten.' },
  { nr: 17, plz: '1170', name: 'Hernals', notiz: 'Altbau in Gürtelnähe, Richtung Neuwaldegg Häuser mit Garten. Der Aufwand unterscheidet sich je nach Lage stark.' },
  { nr: 18, plz: '1180', name: 'Währing', notiz: 'Cottageviertel mit Villen und großen Altbauwohnungen. Viele Haushalte sind über Jahrzehnte gewachsen.' },
  { nr: 19, plz: '1190', name: 'Döbling', notiz: 'Villen, große Gemeindebauten und alte Ortskerne wie Grinzing und Nussdorf mit engen Gassen.' },
  { nr: 20, plz: '1200', name: 'Brigittenau', notiz: 'Gemeindebauten und Gründerzeithäuser, dazu Wohnhochhäuser mit Lastenlift, der reserviert werden muss.' },
  { nr: 21, plz: '1210', name: 'Floridsdorf', notiz: 'Großsiedlungen, Reihenhäuser und Kleingartenhäuser. Meist gute Zufahrt, dafür mehr Nebenräume.' },
  { nr: 22, plz: '1220', name: 'Donaustadt', notiz: 'Flächenmäßig der größte Bezirk: Seestadt Aspern, Einfamilienhäuser in Essling, weite Wege zwischen den Adressen.' },
  { nr: 23, plz: '1230', name: 'Liesing', notiz: 'Wohnpark Alterlaa, Einfamilienhäuser in Mauer und Rodaun, dazu Betriebsflächen und Lager.' },
];
