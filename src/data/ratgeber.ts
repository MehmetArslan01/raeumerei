/**
 * Ratgeber. Jeder Beitrag beantwortet eine Frage, die vor einer Räumung
 * tatsächlich gestellt wird. Gerendert von src/pages/ratgeber/[slug].astro.
 *
 * `text` darf Links enthalten (wird als HTML ausgegeben). `faq` nicht:
 * diese Texte gehen zusätzlich ins FAQPage-Schema.
 *
 * Behördliche und rechtliche Angaben: zuständige Stelle nennen, keine
 * Beträge und Fristen erfinden, auf Mietervereinigung und Arbeiterkammer
 * verweisen. Jeder Beitrag trägt den Vorbehalt (Klasse `disclaimer`).
 */
export interface Beitrag {
  slug: string;
  nav: string;
  title: string;
  description: string;
  h1: string;
  lead: string;
  /** ISO-Datum. */
  datum: string;
  lesezeit: string;
  abschnitte: { h2: string; text: string[]; liste?: string[] }[];
  faq: { q: string; a: string }[];
  /** Slugs passender Leistungsseiten. */
  leistungen: string[];
}

export const artikel: Beitrag[] = [
  {
    slug: 'entruempelung-kosten-wien',
    nav: 'Kosten einer Entrümpelung',
    title: 'Entrümpelung Kosten Wien: was den Preis bestimmt | Räumerei',
    description:
      'Was kostet eine Entrümpelung in Wien? Die fünf Faktoren, die den Preis bestimmen, Richtwerte je Wohnungsgröße und woran Sie ein seriöses Angebot erkennen.',
    h1: 'Was kostet eine Entrümpelung in Wien?',
    lead:
      'Zwei gleich große Wohnungen können beim Räumen das Doppelte voneinander kosten. Hier steht, woran das liegt und wie Sie Angebote vergleichen.',
    datum: '2026-11-15',
    lesezeit: '5 Minuten',
    abschnitte: [
      {
        h2: 'Die kurze Antwort',
        text: [
          'Für eine Wohnung mit ein bis zwei Zimmern sollten Sie in Wien mit einem mittleren dreistelligen bis niedrigen vierstelligen Betrag rechnen, für größere Wohnungen und Häuser mit entsprechend mehr. Unsere aktuellen Richtwerte je Objektgröße stehen auf der <a href="/preise/">Preisseite</a>.',
          'Wichtiger als die Zahl ist, wie sie zustande kommt. Ein Preis, der am Telefon nach Quadratmetern genannt wird, sagt wenig aus.',
        ],
      },
      {
        h2: 'Fünf Faktoren, die den Preis bestimmen',
        text: ['Bezahlt wird Arbeitszeit und Transport. Beides hängt an diesen Punkten:'],
        liste: [
          'Füllgrad: Eine sparsam möblierte Wohnung ist in wenigen Stunden leer. Sind Kästen, Keller und Abstellraum voll, vervielfacht sich die Menge.',
          'Stockwerk und Lift: Vierter Stock ohne Lift bedeutet für jedes Stück vier Stockwerke Tragen. Das verdoppelt die Zeit gegenüber dem Erdgeschoß leicht.',
          'Weg zum Fahrzeug: Steht der Transporter vor dem Tor oder zwei Gassen weiter? Eine Halteverbotszone kostet Gebühren, spart aber Arbeitszeit.',
          'Zerlegen: Einbauschränke, Küchen und große Kästen müssen abgebaut werden, bevor sie hinausgehen.',
          'Termin: Zum Monatsende und sehr kurzfristig sind Teams knapper.',
        ],
      },
      {
        h2: 'Woran Sie ein brauchbares Angebot erkennen',
        text: [
          'Ein Angebot, auf das Sie sich verlassen können, hat drei Merkmale. Es wurde nach einer Besichtigung erstellt, vor Ort oder zumindest per Video. Es ist schriftlich. Und es nennt, was enthalten ist: welche Räume, ob Keller und Dachboden dabei sind, ob Abbau und Kehren enthalten sind und ob die Umsatzsteuer schon eingerechnet ist.',
          'Fehlt einer dieser Punkte, fragen Sie nach. Die häufigste Ursache für Streit am Räumungstag ist ein Kellerabteil, das niemand erwähnt hat.',
        ],
      },
      {
        h2: 'Was Sie selbst tun können, um zu sparen',
        text: [
          'Die Arbeit einer Räumung lässt sich nicht wegverhandeln, aber verkleinern. Nehmen Sie vorher mit, was Sie behalten oder verschenken wollen. Sagen Sie Nachbarn und Verwandten Bescheid, bevor der Termin feststeht. Sorgen Sie dafür, dass der Lift am Räumungstag funktioniert und der Schlüssel zum Keller da ist. Und legen Sie den Termin, wenn möglich, in die Monatsmitte.',
        ],
      },
      {
        h2: 'Vorsicht bei „gratis“ und bei Pauschalen ohne Besichtigung',
        text: [
          'Angebote, die eine Räumung ohne Kosten versprechen, rechnen in der Regel damit, dass in der Wohnung Dinge von Wert stehen. Ob das aufgeht, entscheidet sich erst vor Ort. Lassen Sie sich in jedem Fall schriftlich geben, was vereinbart ist, bevor jemand zu räumen beginnt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wird nach Quadratmetern oder nach Menge abgerechnet?',
        a: 'Sinnvoll ist nur die Menge und der Aufwand. Die Quadratmeter geben einen ersten Anhaltspunkt, mehr nicht.',
      },
      {
        q: 'Kostet die Besichtigung etwas?',
        a: 'Bei uns nicht. Sie ist kostenlos und verpflichtet Sie zu nichts.',
      },
      {
        q: 'Ist die Umsatzsteuer in den Richtwerten enthalten?',
        a: 'Ja, unsere Richtwerte verstehen sich inklusive Umsatzsteuer. Im Angebot ist sie eigens ausgewiesen.',
      },
    ],
    leistungen: ['entruempelung-wien', 'wohnungsraeumung-wien', 'keller-dachboden-raeumen-wien'],
  },
  {
    slug: 'besenrein-wohnungsuebergabe',
    nav: 'Besenrein übergeben',
    title: 'Besenrein: was bei der Wohnungsübergabe zählt | Räumerei',
    description:
      'Was heißt besenrein bei der Wohnungsübergabe in Wien? Was leer sein muss, was oft vergessen wird und wie Sie den Übergabetermin ohne Nachforderung schaffen.',
    h1: 'Besenrein: was bei der Wohnungsübergabe zählt',
    lead:
      'Im Mietvertrag steht „geräumt und besenrein“. Was damit gemeint ist, woran Übergaben scheitern und was Sie vor dem Termin kontrollieren sollten.',
    datum: '2026-11-15',
    lesezeit: '4 Minuten',
    abschnitte: [
      {
        h2: 'Was „besenrein“ im Alltag bedeutet',
        text: [
          'Besenrein heißt wörtlich: mit dem Besen gereinigt. Die Wohnung ist leer, die Böden sind gekehrt oder gesaugt, grober Schmutz ist entfernt. Gemeint ist kein Zustand wie nach einer gründlichen Reinigung mit Fensterputzen und poliertem Bad.',
          'Was im Einzelfall geschuldet ist, ergibt sich aus Ihrem Mietvertrag und aus dem Zustand beim Einzug. Wenn dort mehr vereinbart wurde, gilt das. Bei Zweifeln, etwa zur Frage des Ausmalens, fragen Sie die Mietervereinigung oder die Arbeiterkammer, bevor Sie Geld ausgeben.',
        ],
      },
      {
        h2: 'Was „geräumt“ umfasst',
        text: ['Geräumt bedeutet: Alles, was Sie eingebracht haben, ist draußen. Vergessen wird regelmäßig dasselbe:'],
        liste: [
          'Kellerabteil und Dachbodenanteil',
          'Vorhangstangen, Karniesen, Rollos, die Sie montiert haben',
          'Lampen und Lampenschirme',
          'Selbst verlegte Teppiche und lose Bodenbeläge',
          'Spiegelschrank, Regale und Haken im Bad',
          'Der Inhalt von Einbauschränken, die zur Wohnung gehören',
          'Fahrräder und Kinderwägen im Abstellraum des Hauses',
          'Namensschilder an Tür, Postkasten und Gegensprechanlage',
        ],
      },
      {
        h2: 'Einbauten: bleiben oder hinaus?',
        text: [
          'Für alles, was Sie selbst eingebaut haben, gibt es zwei Möglichkeiten. Entweder die Hausverwaltung oder der Nachmieter übernimmt es, dann lassen Sie sich das schriftlich bestätigen. Oder es muss entfernt werden. Klären Sie das einige Wochen vor der Übergabe, nicht am Tag selbst.',
          'Verschraubte Möbel, Küchenzeilen und Einbauschränke bauen wir bei einer <a href="/wohnungsraeumung-wien/">Wohnungsräumung</a> ab. Anschlüsse für Wasser, Gas und Strom trennt vorher ein Installateur oder Elektriker.',
        ],
      },
      {
        h2: 'So läuft die Übergabe ohne Überraschung',
        text: [
          'Vereinbaren Sie den Übergabetermin erst, wenn der Räumungstermin feststeht, und lassen Sie mindestens einen Tag dazwischen. Gehen Sie am Vortag mit einer Liste durch alle Räume. Fotografieren Sie jeden Raum, die Zählerstände und alle Schlüssel. Beim Termin selbst wird ein Protokoll geschrieben. Lesen Sie es, bevor Sie unterschreiben, und nehmen Sie eine Kopie mit.',
        ],
      },
    ],
    faq: [
      {
        q: 'Muss ich die Fenster putzen?',
        a: 'Das gehört üblicherweise nicht zu besenrein. Steht im Mietvertrag etwas anderes, gilt der Vertrag.',
      },
      {
        q: 'Muss ich ausmalen?',
        a: 'Das hängt von Vertrag, Wohnungsart und Zustand ab und lässt sich nicht allgemein beantworten. Mietervereinigung und Arbeiterkammer beraten dazu.',
      },
      {
        q: 'Übergeben Sie die Wohnung für mich an die Hausverwaltung?',
        a: 'Wir übergeben Schlüssel und Fotos, wenn Sie das mit der Verwaltung vereinbart haben. Das Protokoll sollten Sie selbst oder eine Vertrauensperson unterschreiben.',
      },
    ],
    leistungen: ['wohnungsraeumung-wien', 'raeumung-und-umzug-wien', 'entruempelung-wien'],
  },
  {
    slug: 'wohnung-raeumen-nach-todesfall',
    nav: 'Räumen nach einem Todesfall',
    title: 'Wohnung räumen nach Todesfall: Reihenfolge | Räumerei',
    description:
      'Nach einem Todesfall die Wohnung räumen: was zuerst zu klären ist, wer zuständig ist und in welcher Reihenfolge Sie vorgehen. Überblick für Angehörige in Wien.',
    h1: 'Wohnung räumen nach einem Todesfall: die Reihenfolge',
    lead:
      'In den Wochen nach einem Todesfall kommt vieles zugleich. Diese Reihenfolge hilft, bei der Wohnung nichts zu übersehen und nichts zu früh zu tun.',
    datum: '2026-11-15',
    lesezeit: '6 Minuten',
    abschnitte: [
      {
        h2: '1. Nichts überstürzen',
        text: [
          'Nach jedem Todesfall führt das Bezirksgericht ein Verlassenschaftsverfahren. Ein Notar wird als Gerichtskommissär bestellt und meldet sich bei den Angehörigen. Bis feststeht, wer über den Nachlass verfügen darf, sollte in der Wohnung nichts verschenkt, verkauft oder geräumt werden.',
          'Was Sie sofort tun dürfen und sollen: die Wohnung sichern. Fenster schließen, Wasser abdrehen, Verderbliches aus dem Kühlschrank nehmen, Post abholen und die Hausverwaltung informieren.',
        ],
      },
      {
        h2: '2. Mit dem Gerichtskommissär sprechen',
        text: [
          'Fragen Sie den Notar ausdrücklich, ab wann die Wohnung betreten, gesichtet und geräumt werden darf. Die Antwort hängt davon ab, wie die Verlassenschaft liegt und wer sie vertritt. Lassen Sie sich die Auskunft schriftlich geben, wenn mehrere Erben beteiligt sind.',
        ],
      },
      {
        h2: '3. Das Mietverhältnis klären',
        text: [
          'Eine Mietwohnung muss gekündigt oder von einer berechtigten Person übernommen werden. Wer das kann und welche Frist gilt, hängt vom Vertrag und der Art der Wohnung ab. Zuständig sind die Hausverwaltung, bei Gemeindewohnungen Wiener Wohnen. Rechtliche Fragen beantworten die Mietervereinigung und die Arbeiterkammer.',
          'Aus der Kündigung ergibt sich das Datum, zu dem die Wohnung leer sein muss. Dieses Datum bestimmt alles Weitere.',
        ],
      },
      {
        h2: '4. Dokumente und Persönliches sichern',
        text: ['Bevor Möbel bewegt werden, suchen Sie nach diesen Dingen:'],
        liste: [
          'Ausweise, Geburts- und Heiratsurkunde, Meldezettel',
          'Testament oder Hinweise darauf',
          'Bankunterlagen, Sparbücher, Polizzen, Pensionsbescheide',
          'Miet-, Strom-, Gas- und Telefonverträge',
          'Schlüssel zu Keller, Postkasten, Auto, Schließfach',
          'Fotos, Briefe und Erinnerungsstücke',
        ],
      },
      {
        h2: '5. In der Familie aufteilen',
        text: [
          'Legen Sie einen Tag fest, an dem alle, die etwas haben möchten, in die Wohnung kommen. Was mitgenommen wird, sollte notiert werden. Das erspart später Unstimmigkeiten. Stücke, die jemand will, aber noch nicht abholen kann, kennzeichnen Sie.',
        ],
      },
      {
        h2: '6. Räumen lassen',
        text: [
          'Erst jetzt ist die <a href="/verlassenschaftsraeumung-wien/">Verlassenschaftsräumung</a> an der Reihe. Vereinbaren Sie die Besichtigung, sobald das Datum der Rückgabe feststeht. Bei der Räumung sehen wir jedes Fach durch und übergeben, was wir an Papieren und Wertsachen finden. Danach ist die Wohnung besenrein und bereit für die Übergabe.',
        ],
      },
    ],
    faq: [
      {
        q: 'Darf ich als Angehöriger die Wohnung betreten?',
        a: 'Das Sichern der Wohnung ist in der Regel unproblematisch. Ob Sie darüber hinaus etwas entnehmen dürfen, klären Sie mit dem Gerichtskommissär.',
      },
      {
        q: 'Wie lange dauert ein Verlassenschaftsverfahren?',
        a: 'Das ist von Fall zu Fall verschieden und hängt davon ab, wie einfach die Verhältnisse sind. Der zuständige Notar kann eine Einschätzung geben.',
      },
      {
        q: 'Was, wenn die Miete weiterläuft und noch nicht geräumt werden darf?',
        a: 'Sprechen Sie das beim Gerichtskommissär und bei der Hausverwaltung an. Oft lässt sich eine Lösung finden, wenn beide Seiten früh informiert sind.',
      },
    ],
    leistungen: ['verlassenschaftsraeumung-wien', 'haushaltsaufloesung-wien', 'hausraeumung-wien'],
  },
  {
    slug: 'entruempelung-vorbereiten',
    nav: 'Entrümpelung vorbereiten',
    title: 'Entrümpelung vorbereiten: Checkliste | Räumerei',
    description:
      'Checkliste für die Entrümpelung: was Sie zwei Wochen, eine Woche und einen Tag vor dem Termin erledigen sollten, damit die Räumung ohne Unterbrechung läuft.',
    h1: 'Entrümpelung vorbereiten: die Checkliste',
    lead:
      'Eine Räumung dauert einen Tag. Ob dieser Tag glatt läuft, entscheidet sich in den zwei Wochen davor. Diese Liste können Sie der Reihe nach abhaken.',
    datum: '2026-11-15',
    lesezeit: '4 Minuten',
    abschnitte: [
      {
        h2: 'Zwei Wochen vorher',
        text: ['In dieser Phase geht es um Entscheidungen, noch nicht um Arbeit.'],
        liste: [
          'Besichtigung vereinbaren und alle Räume zeigen, auch Keller, Dachboden und Garage.',
          'Festlegen, was bleibt, und es kennzeichnen oder in ein Zimmer stellen.',
          'Familie und Freunde fragen, ob jemand Möbel oder Geräte übernehmen möchte.',
          'Im Mietvertrag nachsehen, welche Einbauten bleiben dürfen.',
          'Hausverwaltung über den Termin informieren und nach Liftnutzung fragen.',
        ],
      },
      {
        h2: 'Eine Woche vorher',
        text: ['Jetzt wird alles aus der Wohnung gebracht, was nicht zur Räumung gehört.'],
        liste: [
          'Dokumente, Schmuck, Bargeld, Datenträger und Schlüssel mitnehmen.',
          'Stücke abholen lassen, die jemand übernimmt.',
          'Klären, ob vor dem Haus gehalten werden kann oder eine Halteverbotszone nötig ist.',
          'Installateur oder Elektriker bestellen, wenn Geräte abgeschlossen werden müssen.',
          'Nachbarn Bescheid geben, dass an diesem Tag im Stiegenhaus getragen wird.',
        ],
      },
      {
        h2: 'Am Tag davor',
        text: ['Kleinigkeiten, die am Räumungstag eine Stunde sparen.'],
        liste: [
          'Kühl- und Gefrierschrank leeren und abtauen.',
          'Alle Schlüssel bereitlegen: Wohnung, Keller, Dachboden, Haustor, Hof.',
          'Zählerstände fotografieren.',
          'Wege freimachen: Schuhe, Teppiche und Kleinmöbel aus dem Vorraum.',
          'Eine Telefonnummer hinterlegen, unter der Sie am Räumungstag erreichbar sind.',
        ],
      },
      {
        h2: 'Am Räumungstag',
        text: [
          'Gehen Sie zu Beginn einmal mit dem Team durch und zeigen Sie, was bleibt. Danach müssen Sie nicht anwesend sein. Am Ende folgt ein gemeinsamer Rundgang oder, wenn Sie nicht vor Ort sind, eine Fotoserie. Prüfen Sie Keller und Abstellraum mit, bevor Sie die Arbeit abnehmen.',
          'Was eine Räumung im Einzelnen umfasst, steht auf der Seite zur <a href="/entruempelung-wien/">Entrümpelung in Wien</a>, der Ablauf vom ersten Anruf an unter <a href="/ablauf/">Ablauf</a>.',
        ],
      },
    ],
    faq: [
      {
        q: 'Muss ich Kästen und Laden vorher ausräumen?',
        a: 'Nein. Sie können voll bleiben. Nehmen Sie nur heraus, was Sie behalten möchten.',
      },
      {
        q: 'Was, wenn ich am Räumungstag nicht dabei sein kann?',
        a: 'Dann genügt eine Schlüsselübergabe vorab. Was bleibt, halten wir bei der Besichtigung schriftlich oder mit Fotos fest.',
      },
      {
        q: 'Wer kümmert sich um die Halteverbotszone?',
        a: 'Zuständig für die Bewilligung ist in Wien die MA 46. Sagen Sie uns, ob Sie den Antrag selbst stellen oder ob wir das mit Ihnen vorbereiten sollen.',
      },
    ],
    leistungen: ['entruempelung-wien', 'wohnungsraeumung-wien', 'haushaltsaufloesung-wien'],
  },
];

export const beitrag = (slug: string) => artikel.find((a) => a.slug === slug)!;
