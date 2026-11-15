/**
 * Alle Leistungsseiten. Eine Seite je Suchabsicht, keine Varianten derselben
 * Seite. Gerendert von src/pages/[leistung].astro.
 *
 * Texte sind für diese Domain geschrieben. Nichts davon stammt von den
 * Schwesterseiten und nichts darf dorthin kopiert werden.
 *
 * Sprachregeln: scripts/legal-lint.mjs. Kurz: keine abfallrechtlichen
 * Begriffe, keine Bau- oder Reinigungsleistungen, kein Ankauf, keine
 * Superlative, keine Zahlen ohne Beleg.
 */

export interface Abschnitt {
  h2: string;
  text: string[];
  liste?: string[];
}

export interface Leistung {
  slug: string;
  gruppe: 'raeumung' | 'umzug';
  /** Kurzname für Navigation und Karten. */
  nav: string;
  /** <title>, höchstens 60 Zeichen. */
  title: string;
  /** Meta Description, 80 bis 160 Zeichen. */
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  /** Ein Satz für Karten und Verweise. */
  kurz: string;
  anliegen: 'entruempelung' | 'umzug' | 'beides';
  /** Randspalte: was im Auftrag enthalten ist. */
  umfang: string[];
  abschnitte: Abschnitt[];
  faq: { q: string; a: string }[];
  verwandt: string[];
  /** Seite enthält rechtliche oder behördliche Angaben: Vorbehalt anzeigen. */
  vorbehalt?: boolean;
}

export const leistungen: Leistung[] = [
  // ── Räumung ────────────────────────────────────────────────────────────
  {
    slug: 'entruempelung-wien',
    gruppe: 'raeumung',
    nav: 'Entrümpelung Wien',
    title: 'Entrümpelung Wien: Besichtigung, Preis, Termin | Räumerei',
    description:
      'Entrümpelung in Wien für Wohnung, Haus, Keller und Geschäft. Besichtigung vor Ort, schriftlicher Preis, Räumung an einem Termin und besenreine Übergabe.',
    h1: 'Entrümpelung in Wien',
    eyebrow: 'Räumung in allen 23 Bezirken',
    lead:
      'Wir räumen aus, tragen hinunter, laden auf und kehren durch. Sie bekommen vorher einen schriftlichen Preis und nachher einen leeren Raum.',
    kurz: 'Wohnung, Haus, Keller oder Lokal: ausräumen, tragen, verladen, kehren.',
    anliegen: 'entruempelung',
    umfang: [
      'Besichtigung vor Ort mit schriftlichem Angebot',
      'Ausräumen aller vereinbarten Räume',
      'Abbau von Kästen, Betten und Regalen, die nicht durch die Tür passen',
      'Tragen über das Stiegenhaus, auch ohne Lift',
      'Verladen und Abtransport',
      'Besenreine Übergabe',
    ],
    abschnitte: [
      {
        h2: 'Was wir bei einer Entrümpelung tun',
        text: [
          'Eine Entrümpelung besteht aus vier Handgriffen, die sich bei jedem Auftrag wiederholen: aussortieren, was bleiben soll; alles Übrige aus den Räumen holen; es über Stiege oder Lift zum Fahrzeug bringen; am Ende kehren. Der Unterschied zwischen einem guten und einem mühsamen Tag liegt in der Vorbereitung, und die übernehmen wir bei der Besichtigung.',
          'Dort sehen wir, wie voll die Räume sind, wie breit das Stiegenhaus ist, wo ein Transporter stehen kann und ob Möbel zerlegt werden müssen. Daraus ergibt sich die Zahl der Leute und die Dauer. Erst danach nennen wir einen Preis.',
        ],
      },
      {
        h2: 'Wann sich eine Firma lohnt und wann nicht',
        text: [
          'Ein Kellerabteil mit ein paar Kartons räumen viele an einem Samstag selbst. Schwieriger wird es bei drei Dingen: wenn die Menge mehrere Fahrten braucht, wenn schwere Stücke über enge Stiegen müssen oder wenn ein Übergabetermin feststeht. Dann kostet der eigene Versuch meist mehr Zeit als gedacht, und ein verschobener Übergabetermin kann teurer werden als die Räumung.',
          'Wir sagen bei der Besichtigung auch, wenn ein Auftrag kleiner ausfallen kann als angefragt, etwa weil nur zwei Räume wirklich Arbeit machen.',
        ],
      },
      {
        h2: 'Was vor dem Termin geklärt sein sollte',
        text: [
          'Je klarer die Absprache, desto ruhiger der Tag. Diese Punkte fragen wir immer ab:',
        ],
        liste: [
          'Was bleibt in der Wohnung? Markieren Sie es oder stellen Sie es in ein Zimmer.',
          'Gibt es Keller, Dachboden, Garage oder Gartenhütte, die mitgeräumt werden?',
          'Wer hat den Schlüssel, und wer nimmt die leeren Räume ab?',
          'Gibt es einen Termin mit Hausverwaltung, Käufer oder Nachmieter?',
          'Dürfen wir im Hof oder vor dem Haus halten, oder braucht es eine Halteverbotszone?',
        ],
      },
      {
        h2: 'Persönliches bleibt bei Ihnen',
        text: [
          'In fast jeder Wohnung liegt etwas, das niemand suchen würde: ein Sparbuch im Wäschekasten, Dokumente hinter Büchern, Fotos in einer Schuhschachtel. Wir sehen Laden und Fächer durch, bevor wir sie ausräumen. Papiere, Fotos, Schmuck, Schlüssel und Bargeld legen wir zur Seite und übergeben sie Ihnen gesammelt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was kostet eine Entrümpelung in Wien?',
        a: 'Das hängt vor allem von Menge, Stockwerk und Lift ab, weniger von den Quadratmetern. Richtwerte stehen auf unserer Preisseite. Den verbindlichen Betrag nennen wir schriftlich nach der Besichtigung.',
      },
      {
        q: 'Wie schnell bekommen wir einen Termin?',
        a: 'Für die Besichtigung meist innerhalb weniger Tage. Die Räumung selbst richtet sich nach dem Umfang. Zum Monatsende sind Termine knapper, weil dann viele Mietverträge enden.',
      },
      {
        q: 'Muss jemand anwesend sein?',
        a: 'Zur Besichtigung wäre es gut, damit wir besprechen können, was bleibt. Am Räumungstag genügt eine Schlüsselübergabe und eine Telefonnummer für Rückfragen.',
      },
      {
        q: 'Räumen Sie auch einzelne Räume?',
        a: 'Ja. Ein Zimmer, ein Kellerabteil oder ein Dachbodenanteil sind übliche Aufträge. Berechnet wird der tatsächliche Aufwand.',
      },
      {
        q: 'Was passiert, wenn mehr da ist als besichtigt?',
        a: 'Was bei der Besichtigung zu sehen war, ist im Preis enthalten. Taucht ein zusätzlicher voller Raum auf, rufen wir an, bevor wir weiterarbeiten.',
      },
    ],
    verwandt: ['wohnungsraeumung-wien', 'keller-dachboden-raeumen-wien', 'raeumung-und-umzug-wien'],
  },
  {
    slug: 'wohnungsraeumung-wien',
    gruppe: 'raeumung',
    nav: 'Wohnungsräumung',
    title: 'Wohnungsräumung Wien: leer und besenrein | Räumerei',
    description:
      'Wohnungsräumung in Wien vor Übergabe, Verkauf oder Neuvermietung. Wir räumen die ganze Wohnung samt Kellerabteil und übergeben sie besenrein zum Termin.',
    h1: 'Wohnungsräumung in Wien',
    eyebrow: 'Vor Übergabe, Verkauf oder Neuvermietung',
    lead:
      'Die Wohnung muss zu einem bestimmten Tag leer sein. Wir planen vom Übergabetermin rückwärts und räumen alles, was nicht mitkommt, einschließlich Kellerabteil.',
    kurz: 'Ganze Wohnung samt Kellerabteil räumen, pünktlich zum Übergabetermin.',
    anliegen: 'entruempelung',
    umfang: [
      'Alle Zimmer, Küche, Bad, Vorraum',
      'Kellerabteil und Dachbodenanteil, wenn vorhanden',
      'Abbau von Einbauschränken und Küchenzeilen nach Absprache',
      'Vorhänge, Karniesen, Teppiche, Lampenschirme',
      'Kehren aller Räume',
      'Auf Wunsch Fotos der leeren Räume',
    ],
    abschnitte: [
      {
        h2: 'Wann eine Wohnung geräumt werden muss',
        text: [
          'Drei Anlässe machen den Großteil unserer Wohnungsräumungen aus. Ein Mietverhältnis endet, und die Hausverwaltung erwartet die Wohnung leer. Eine Eigentumswohnung wird verkauft, und der Käufer übernimmt sie ohne Inventar. Oder ein Angehöriger ist ins Heim gezogen oder verstorben, und die Wohnung steht voll.',
          'In allen drei Fällen gibt es ein Datum, das nicht verhandelbar ist. Nennen Sie es uns gleich am Telefon. Wir legen die Räumung so, dass zwischen unserem letzten Handgriff und der Übergabe noch ein Tag Luft bleibt.',
        ],
      },
      {
        h2: 'Wiener Altbau, Gemeindebau, Neubau',
        text: [
          'Die Bauart entscheidet über den Aufwand. Im Gründerzeithaus sind die Räume hoch, die Kästen entsprechend groß, und der Lift, falls es einen gibt, fasst oft nur zwei Personen. Dort wird viel getragen und manches zerlegt. Im Gemeindebau sind die Wege im Hof länger, dafür die Stiegenhäuser breiter. Im Neubau gibt es Lift und Tiefgarage, aber die Durchfahrtshöhe reicht nicht immer für einen Transporter.',
          'Deshalb fragen wir schon am Telefon nach Baujahr, Stockwerk und Lift. Mit diesen drei Angaben lässt sich der Rahmen meist eingrenzen, bevor wir die Wohnung gesehen haben.',
        ],
      },
      {
        h2: 'Was „leer“ bei der Übergabe bedeutet',
        text: [
          'Üblich ist, dass eine Mietwohnung geräumt und besenrein zurückgegeben wird. Was darüber hinaus verlangt wird, steht im Mietvertrag oder im Übergabeprotokoll vom Einzug. Sehen Sie dort nach, ob Einbauten wie Küche, Karniesen oder Bodenbeläge bleiben dürfen oder hinaus müssen, und sagen Sie es uns. Einbauten, die verschraubt sind, bauen wir ab.',
          'Arbeiten an der Bausubstanz, an Leitungen und Anschlüssen gehören nicht zu einer Räumung. Dafür ist ein Installateur, Elektriker oder Baumeister zuständig.',
        ],
      },
      {
        h2: 'Wenn Sie nicht in Wien sind',
        text: [
          'Viele Auftraggeber wohnen in einem anderen Bundesland oder im Ausland. Die Besichtigung kann dann eine Vertrauensperson begleiten, oder wir bekommen den Schlüssel von der Hausverwaltung. Fragen klären wir telefonisch, und nach der Räumung schicken wir Fotos von jedem Raum.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie lange dauert eine Wohnungsräumung?',
        a: 'Eine Wohnung mit ein bis zwei Zimmern ist meist an einem Tag leer. Größere oder sehr volle Wohnungen brauchen zwei Tage. Die Dauer steht im Angebot.',
      },
      {
        q: 'Können Sie den Schlüssel bei der Hausverwaltung abholen?',
        a: 'Ja, wenn die Verwaltung von Ihnen informiert wurde. Nach der Räumung bringen wir ihn zurück oder übergeben ihn, wem Sie sagen.',
      },
      {
        q: 'Räumen Sie auch die Einbauküche?',
        a: 'Ja, wir bauen sie ab und nehmen sie mit. Wasser, Gas und Strom muss vorher ein Installateur oder Elektriker trennen.',
      },
      {
        q: 'Was ist mit dem Kellerabteil?',
        a: 'Es gehört zur Wohnung und wird bei der Übergabe mitkontrolliert. Zeigen Sie es uns bei der Besichtigung, dann ist es im Preis enthalten.',
      },
    ],
    verwandt: ['haushaltsaufloesung-wien', 'entruempelung-wien', 'raeumung-und-umzug-wien'],
    vorbehalt: true,
  },
  {
    slug: 'haushaltsaufloesung-wien',
    gruppe: 'raeumung',
    nav: 'Haushaltsauflösung',
    title: 'Haushaltsauflösung Wien: sortieren und räumen | Räumerei',
    description:
      'Haushaltsauflösung in Wien: Wir sortieren mit Ihnen, bringen Behaltenes an die neue Adresse und räumen den Rest. Ein Ansprechpartner, ein schriftlicher Preis.',
    h1: 'Haushaltsauflösung in Wien',
    eyebrow: 'Wenn ein ganzer Haushalt aufgegeben wird',
    lead:
      'Ein Haushalt ist mehr als Möbel. Wir gehen ihn mit Ihnen durch, trennen, was bleibt, von dem, was geht, und erledigen beides an einem Termin.',
    kurz: 'Den ganzen Haushalt durchgehen: Behaltenes übersiedeln, den Rest räumen.',
    anliegen: 'beides',
    umfang: [
      'Gemeinsames Durchgehen aller Räume',
      'Kennzeichnen der Stücke, die bleiben',
      'Transport von Behaltenem an eine Adresse in Wien',
      'Räumung des gesamten übrigen Hausrats',
      'Durchsicht von Kästen und Laden auf Persönliches',
      'Besenreine Übergabe',
    ],
    abschnitte: [
      {
        h2: 'Haushaltsauflösung oder Entrümpelung: der Unterschied',
        text: [
          'Bei einer Entrümpelung steht fest, was weg soll. Bei einer Haushaltsauflösung muss das erst entschieden werden, und zwar für jeden Kasten, jede Lade und jedes Regal. Geschirr, Wäsche, Bücher, Werkzeug, Erinnerungsstücke: Ein Haushalt, der über Jahrzehnte gewachsen ist, enthält ein Vielfaches dessen, was man auf den ersten Blick sieht.',
          'Darum beginnt eine Haushaltsauflösung bei uns mit einem Rundgang. Wir gehen Raum für Raum durch und halten fest, was Sie oder die Familie behalten möchten. Diese Stücke bekommen einen Aufkleber. Alles ohne Aufkleber wird geräumt.',
        ],
      },
      {
        h2: 'Eine Reihenfolge, die sich bewährt hat',
        text: [
          'Die meisten Familien verlieren Zeit, weil sie mit den Möbeln anfangen. Umgekehrt geht es schneller:',
        ],
        liste: [
          'Zuerst Dokumente, Verträge, Sparbücher, Schlüssel und Datenträger sichern.',
          'Dann Erinnerungsstücke und Wertgegenstände in der Familie aufteilen.',
          'Danach entscheiden, welche Möbel und Geräte jemand übernimmt.',
          'Zuletzt den Termin für Transport und Räumung fixieren.',
        ],
      },
      {
        h2: 'Behaltenes kommt an die richtige Adresse',
        text: [
          'Oft geht ein Teil in die neue, kleinere Wohnung, ein Teil zu den Kindern und ein Teil in ein Lagerabteil. Wir fahren diese Adressen an, tragen die Stücke hinauf und stellen sie dorthin, wo sie stehen sollen. Erst wenn alles Behaltene aus der Wohnung ist, beginnt die Räumung. So wird nichts verwechselt.',
        ],
      },
      {
        h2: 'Wenn die Entscheidung schwerfällt',
        text: [
          'Einen Haushalt aufzulösen heißt oft, das Zuhause der Eltern aufzulösen. Wir drängen niemanden. Wenn Sie bei einzelnen Dingen unsicher sind, stellen wir sie in eine Ecke, und Sie entscheiden am Ende des Tages. Was dann noch offen ist, kann in Kartons mit zu Ihnen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie viel Vorlauf braucht eine Haushaltsauflösung?',
        a: 'Planen Sie für das Aussortieren in der Familie zwei bis drei Wochen ein. Die Räumung selbst dauert je nach Größe ein bis drei Tage.',
      },
      {
        q: 'Müssen wir vorher alles ausräumen und einpacken?',
        a: 'Nein. Kästen und Laden können voll bleiben. Wir räumen sie aus und sehen dabei durch, ob Persönliches darunter ist.',
      },
      {
        q: 'Bringen Sie Möbel auch zu Verwandten außerhalb Wiens?',
        a: 'Im Umland von Wien ja. Weitere Strecken innerhalb Österreichs besprechen wir im Einzelfall.',
      },
      {
        q: 'Was geschieht mit Dokumenten und Fotos, die Sie finden?',
        a: 'Sie werden gesammelt und Ihnen übergeben. Wir werfen nichts weg, das nach Dokument, Foto oder Wertgegenstand aussieht, ohne zu fragen.',
      },
    ],
    verwandt: ['verlassenschaftsraeumung-wien', 'seniorenumzug-wien', 'wohnungsraeumung-wien'],
  },
  {
    slug: 'verlassenschaftsraeumung-wien',
    gruppe: 'raeumung',
    nav: 'Verlassenschaft räumen',
    title: 'Verlassenschaftsräumung Wien: Wohnung räumen | Räumerei',
    description:
      'Räumung nach einem Todesfall in Wien: behutsam, mit Durchsicht aller Kästen und Übergabe von Dokumenten und Erinnerungsstücken an die Familie.',
    h1: 'Verlassenschaftsräumung in Wien',
    eyebrow: 'Räumung nach einem Todesfall',
    lead:
      'Nach einem Todesfall bleibt eine Wohnung zurück, für die es Fristen gibt und in der ein ganzes Leben steht. Wir räumen sie mit der nötigen Ruhe und sagen Ihnen vorher, was es kostet.',
    kurz: 'Wohnung oder Haus eines Verstorbenen räumen, mit Durchsicht aller Kästen.',
    anliegen: 'entruempelung',
    umfang: [
      'Besichtigung mit einer Person aus der Familie',
      'Durchsicht aller Kästen, Laden und Taschen',
      'Übergabe von Dokumenten, Fotos, Schmuck und Bargeld',
      'Räumung der Wohnung samt Keller',
      'Besenreine Übergabe an Hausverwaltung oder Eigentümer',
      'Fotos der leeren Räume für Angehörige, die nicht in Wien sind',
    ],
    abschnitte: [
      {
        h2: 'Erst klären, wer räumen darf',
        text: [
          'In Österreich wird nach jedem Todesfall ein Verlassenschaftsverfahren geführt. Zuständig ist das Bezirksgericht, die Abwicklung übernimmt ein Notar als Gerichtskommissär. Bis geklärt ist, wer über den Nachlass verfügen darf, sollte aus der Wohnung nichts entfernt werden.',
          'Fragen Sie deshalb den Gerichtskommissär, ab wann und in welchem Umfang geräumt werden darf, und lassen Sie sich das bestätigen. Wir beginnen erst, wenn Sie uns sagen, dass diese Frage geklärt ist. Bei mehreren Erben sollte außerdem feststehen, wer den Auftrag erteilt.',
        ],
      },
      {
        h2: 'Die Mietwohnung läuft weiter',
        text: [
          'Bei einer Mietwohnung endet das Mietverhältnis nicht von selbst mit dem Todesfall. Welche Kündigungsfrist gilt und wer kündigen kann, hängt vom Vertrag und von der Art der Wohnung ab. Sprechen Sie früh mit der Hausverwaltung, bei Gemeindewohnungen mit Wiener Wohnen. Bei rechtlichen Fragen helfen die Mietervereinigung und die Arbeiterkammer weiter.',
          'Für uns zählt das Datum, zu dem die Wohnung zurückgegeben wird. Daran richten wir den Räumungstermin aus.',
        ],
      },
      {
        h2: 'Wie wir in der Wohnung vorgehen',
        text: [
          'Wir räumen keinen Kasten aus, ohne hineinzusehen. Ältere Menschen bewahren Wichtiges selten dort auf, wo man es vermutet: zwischen Handtüchern, in Manteltaschen, in Büchern, unter Laden. Jedes Fach wird geöffnet, jede Tasche abgetastet.',
          'Was wir finden, kommt in eine Kiste, die wir Ihnen am Ende übergeben: Ausweise, Urkunden, Polizzen und Bankunterlagen, Sparbücher, Bargeld, Schmuck, Uhren, Fotos, Briefe und Schlüssel. Bei Unterlagen entscheiden nicht wir, ob sie wichtig sind. Sie bekommen alle.',
        ],
      },
      {
        h2: 'Was die Familie vorher mitnehmen sollte',
        text: [
          'Wenn es möglich ist, gehen Sie vor unserem Termin einmal selbst durch die Wohnung. Nehmen Sie mit, was Ihnen etwas bedeutet, auch wenn es keinen Geldwert hat. Bei der Besichtigung zeigen Sie uns, was zusätzlich bleiben oder zu jemandem gebracht werden soll. Diese Stücke stellen wir getrennt und liefern sie auf Wunsch in Wien zu.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ab wann darf nach einem Todesfall geräumt werden?',
        a: 'Das klärt der Notar, der als Gerichtskommissär das Verlassenschaftsverfahren führt. Fragen Sie dort nach, bevor Sie einen Termin fixieren. Wir räumen erst, wenn Sie uns bestätigen, dass das geklärt ist.',
      },
      {
        q: 'Können Sie räumen, wenn kein Angehöriger in Wien lebt?',
        a: 'Ja. Der Schlüssel kann über die Hausverwaltung, den Notar oder eine Vertrauensperson laufen. Sie bekommen Fotos vor und nach der Räumung, und Fundstücke schicken wir Ihnen zu oder hinterlegen sie.',
      },
      {
        q: 'Was passiert mit Dokumenten, die Sie finden?',
        a: 'Alle Unterlagen werden gesammelt übergeben, ungeöffnet und unsortiert. Welche davon für das Verfahren gebraucht werden, beurteilen Sie oder der Notar.',
      },
      {
        q: 'Wer bezahlt die Räumung?',
        a: 'Auftraggeber ist die Person, die uns beauftragt. Ob und wie die Kosten innerhalb der Verlassenschaft berücksichtigt werden, besprechen Sie mit dem Gerichtskommissär.',
      },
    ],
    verwandt: ['haushaltsaufloesung-wien', 'wohnungsraeumung-wien', 'hausraeumung-wien'],
    vorbehalt: true,
  },
  {
    slug: 'keller-dachboden-raeumen-wien',
    gruppe: 'raeumung',
    nav: 'Keller & Dachboden',
    title: 'Keller und Dachboden räumen in Wien | Räumerei',
    description:
      'Kellerabteil entrümpeln oder Dachboden räumen in Wien: enge Gänge, steile Stiegen, wenig Licht. Wir räumen an einem Vormittag und kehren das Abteil aus.',
    h1: 'Keller und Dachboden räumen in Wien',
    eyebrow: 'Kellerabteil, Dachboden, Abstellraum',
    lead:
      'Im Keller und unter dem Dach landet, was oben keinen Platz hat. Wir holen es wieder heraus, auch über enge Kellerstiegen und durch niedrige Gänge.',
    kurz: 'Kellerabteil oder Dachboden an einem Vormittag leer bekommen.',
    anliegen: 'entruempelung',
    umfang: [
      'Kellerabteil, Dachbodenabteil oder Abstellraum',
      'Zerlegen von Regalen und sperrigen Stücken vor Ort',
      'Tragen über Kellerstiege und durch den Hof',
      'Eigene Beleuchtung, wo kein Licht ist',
      'Kehren des Abteils',
      'Foto des leeren Abteils für die Hausverwaltung',
    ],
    abschnitte: [
      {
        h2: 'Warum Keller mehr Arbeit machen, als sie aussehen',
        text: [
          'Ein Kellerabteil in einem Wiener Zinshaus hat oft nur wenige Quadratmeter, ist aber bis unter die Decke gefüllt. Der Weg hinaus führt durch einen Gang, in dem zwei Menschen nicht aneinander vorbeikommen, und über eine Stiege mit hohen Stufen. Jedes Stück wird einzeln getragen.',
          'Dazu kommt Feuchtigkeit. Kartons, die jahrelang auf dem Boden standen, zerfallen beim Anheben. Wir bringen deshalb Kisten und Säcke mit und packen um, bevor wir tragen.',
        ],
      },
      {
        h2: 'Dachboden: der Weg ist das Hindernis',
        text: [
          'Auf Dachböden ist selten die Menge das Thema, sondern der Zugang. Manche erreicht man nur über eine Einschubtreppe oder eine schmale Holzstiege. Schwere Truhen, alte Öfen oder Nähmaschinentische wurden vor Jahrzehnten hinaufgebracht und sind seither nicht bewegt worden.',
          'Bei der Besichtigung prüfen wir, was im Ganzen hinuntergeht und was zerlegt werden muss. Tragende Teile des Dachstuhls und Einbauten des Hauses rühren wir nicht an.',
        ],
      },
      {
        h2: 'Wenn die Hausverwaltung räumen lässt',
        text: [
          'Häufig kommt der Anstoß von außen: Das Haus wird saniert, Leitungen werden getauscht, oder die Verwaltung fordert alle Parteien auf, Gänge und Abteile bis zu einem Stichtag freizumachen. Nennen Sie uns diesen Stichtag. Wenn mehrere Parteien im Haus räumen müssen, lohnt sich ein gemeinsamer Termin, weil Anfahrt und Stellplatz nur einmal anfallen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Was kostet es, ein Kellerabteil räumen zu lassen?',
        a: 'Für ein einzelnes Abteil oder Zimmer beginnen die Richtwerte bei dem Betrag, der auf der Preisseite steht. Entscheidend ist, wie voll das Abteil ist und wie weit der Weg zum Fahrzeug ist.',
      },
      {
        q: 'Räumen Sie auch allgemeine Kellergänge?',
        a: 'Ja, im Auftrag der Hausverwaltung oder der Eigentümergemeinschaft. Was Hausparteien gehört, muss vorher geklärt sein.',
      },
      {
        q: 'Im Keller gibt es kein Licht und keinen Strom. Ein Problem?',
        a: 'Nein. Wir bringen eigene Lampen mit.',
      },
      {
        q: 'Können Sie Keller und Wohnung an einem Tag räumen?',
        a: 'Ja, das ist der übliche Fall. Zeigen Sie uns beides bei der Besichtigung, dann steht beides im Angebot.',
      },
    ],
    verwandt: ['entruempelung-wien', 'wohnungsraeumung-wien', 'hausraeumung-wien'],
  },
  {
    slug: 'hausraeumung-wien',
    gruppe: 'raeumung',
    nav: 'Hausräumung',
    title: 'Hausräumung Wien: vom Keller bis zum Dach | Räumerei',
    description:
      'Hausräumung in Wien und Umgebung: Wohnräume, Keller, Dachboden, Garage und Gartenhütte. Ein Angebot für das ganze Haus, geräumt in wenigen Tagen.',
    h1: 'Hausräumung in Wien',
    eyebrow: 'Einfamilienhaus, Reihenhaus, Kleingartenhaus',
    lead:
      'Ein Haus hat Nebenräume, an die man erst denkt, wenn man davorsteht. Wir nehmen bei der Besichtigung alles auf und räumen es in einem Zug.',
    kurz: 'Ganzes Haus samt Keller, Dachboden, Garage und Gartenhütte räumen.',
    anliegen: 'entruempelung',
    umfang: [
      'Alle Wohnräume auf allen Ebenen',
      'Keller, Dachboden, Garage, Werkstatt',
      'Gartenhütte und Gartenmöbel',
      'Abbau von Einbaumöbeln und Regalen',
      'Mehrtägiger Einsatz mit gleichem Team',
      'Besenreine Übergabe aller Räume',
    ],
    abschnitte: [
      {
        h2: 'Was ein Haus von einer Wohnung unterscheidet',
        text: [
          'In einer Wohnung räumt man drei, vier Zimmer und ein Kellerabteil. In einem Haus kommen Kellerräume, Dachboden, Garage, Werkstatt und Gartenhütte dazu, und in jedem davon hat sich über die Jahre etwas angesammelt. Die Menge ist oft doppelt so groß wie in einer Wohnung mit gleicher Wohnfläche.',
          'Dafür ist die Arbeit leichter zu organisieren: Der Transporter steht in der Einfahrt, es gibt keine Nachbarn im Stiegenhaus und keinen Lift, auf den man warten muss.',
        ],
      },
      {
        h2: 'So gehen wir durch das Haus',
        text: [
          'Wir arbeiten von oben nach unten und von hinten nach vorne. Zuerst der Dachboden, dann das Obergeschoß, dann das Erdgeschoß, zuletzt der Keller. Garage und Garten kommen am Schluss, weil dort bis dahin Platz zum Zwischenlagern ist. So wird kein Raum zweimal betreten, und am Ende jedes Tages ist eine Ebene fertig.',
        ],
      },
      {
        h2: 'Vor dem Verkauf räumen',
        text: [
          'Ein leeres Haus lässt sich leichter zeigen als ein volles. Wenn ein Verkauf ansteht, sprechen Sie den Räumungstermin mit dem Makler ab: Fotos und Besichtigungen sollten nach unserer Arbeit stattfinden. Sagen Sie uns auch, ob laut Kaufvertrag etwas im Haus bleiben soll, etwa die Küche oder Einbauschränke.',
        ],
      },
    ],
    faq: [
      {
        q: 'Wie lange dauert eine Hausräumung?',
        a: 'Je nach Größe und Füllgrad zwei bis fünf Arbeitstage. Die Dauer steht im Angebot.',
      },
      {
        q: 'Räumen Sie auch Häuser im Wiener Umland?',
        a: 'Ja, in den Gemeinden rund um Wien. Nennen Sie uns den Ort, dann sagen wir, ob eine Anfahrtspauschale anfällt.',
      },
      {
        q: 'Was ist mit Öltank, Heizung oder fest verbauten Anlagen?',
        a: 'Das gehört nicht zu einer Räumung. Dafür braucht es Betriebe mit eigener Berechtigung, etwa einen Installateur.',
      },
      {
        q: 'Nehmen Sie auch Dinge aus dem Garten mit?',
        a: 'Gartenmöbel, Werkzeug, Töpfe und den Inhalt der Gartenhütte ja. Erdarbeiten und das Fällen von Bäumen gehören nicht dazu.',
      },
    ],
    verwandt: ['verlassenschaftsraeumung-wien', 'haushaltsaufloesung-wien', 'keller-dachboden-raeumen-wien'],
  },
  {
    slug: 'messie-raeumung-wien',
    gruppe: 'raeumung',
    nav: 'Messie-Wohnung räumen',
    title: 'Messie-Wohnung räumen in Wien: diskret | Räumerei',
    description:
      'Räumung stark gefüllter Wohnungen in Wien. Diskret, ohne Vorwürfe und in neutraler Kleidung. Besichtigung und Preis vorab, Räumung in ein bis drei Tagen.',
    h1: 'Messie-Wohnung räumen in Wien',
    eyebrow: 'Stark gefüllte Wohnungen',
    lead:
      'Manche Wohnungen sind so voll, dass man nicht mehr weiß, wo man anfangen soll. Wir fangen an, ohne Fragen nach dem Warum und ohne Aufsehen im Haus.',
    kurz: 'Sehr volle Wohnungen räumen, ruhig und ohne Aufsehen im Haus.',
    anliegen: 'entruempelung',
    umfang: [
      'Besichtigung im kleinen Rahmen, auf Wunsch außerhalb der Stoßzeiten',
      'Unbeschriftetes Fahrzeug nach Absprache',
      'Räumung Raum für Raum mit festem Team',
      'Sichern von Dokumenten und Wertsachen',
      'Besenreine Übergabe',
      'Fester Ansprechpartner für Angehörige oder Hausverwaltung',
    ],
    abschnitte: [
      {
        h2: 'Wer uns in dieser Lage anruft',
        text: [
          'Selten sind es die Bewohner selbst. Meist meldet sich eine Tochter, ein Bruder, eine Erwachsenenvertretung oder die Hausverwaltung. Oft gibt es einen Auslöser: ein Spitalsaufenthalt, eine angekündigte Begehung, ein Wasserschaden in der Wohnung darunter.',
          'Am Telefon brauchen wir keine Erklärungen. Uns genügt, wie viele Räume es sind, in welchem Stock die Wohnung liegt und ob die Räume begehbar sind.',
        ],
      },
      {
        h2: 'Wie die Räumung abläuft',
        text: [
          'Wir arbeiten uns von der Eingangstür nach innen vor und schaffen zuerst Wege. Danach wird Raum für Raum geleert. Zwischen Zeitungen, Säcken und Schachteln liegen in solchen Wohnungen regelmäßig Ausweise, Bankpost, Bargeld und Schlüssel. Deshalb geht nichts ungesehen hinaus.',
          'Wenn die Bewohnerin oder der Bewohner in der Wohnung bleibt, legen wir vorher gemeinsam fest, was auf keinen Fall angerührt wird. Daran halten wir uns, auch wenn es die Arbeit verlangsamt.',
        ],
      },
      {
        h2: 'Was eine Räumung leistet und was nicht',
        text: [
          'Nach unserer Arbeit ist die Wohnung leer und gekehrt. Mehr versprechen wir nicht. Eine gründliche Reinigung, die Behandlung von Gerüchen oder Befall und Reparaturen an Böden und Wänden sind Aufgaben für Betriebe mit eigener Gewerbeberechtigung. Wenn wir bei der Besichtigung sehen, dass so etwas nötig sein wird, sagen wir es Ihnen, damit Sie es rechtzeitig beauftragen können.',
          'Die Räumung löst auch nicht, was zur vollen Wohnung geführt hat. In Wien beraten dazu unter anderem der Fonds Soziales Wien und die Psychosozialen Dienste Wien.',
        ],
      },
    ],
    faq: [
      {
        q: 'Bekommen die Nachbarn etwas mit?',
        a: 'Dass geräumt wird, lässt sich im Stiegenhaus nicht verbergen. Wir tragen aber verschlossene Säcke und Kisten, kommen auf Wunsch mit unbeschriftetem Fahrzeug und geben im Haus keine Auskunft.',
      },
      {
        q: 'Können Sie ein Angebot machen, ohne die Wohnung zu betreten?',
        a: 'Einen Rahmen können wir anhand von Fotos nennen. Für einen verbindlichen Preis müssen wir die Räume sehen.',
      },
      {
        q: 'Übernehmen Sie auch die Reinigung danach?',
        a: 'Nein. Wir übergeben besenrein. Für alles Weitere braucht es einen Reinigungsbetrieb.',
      },
      {
        q: 'Was, wenn die Bewohnerin nicht einverstanden ist?',
        a: 'Dann räumen wir nicht. Den Auftrag kann nur erteilen, wer dazu berechtigt ist: die Person selbst oder ihre gesetzliche Vertretung.',
      },
    ],
    verwandt: ['wohnungsraeumung-wien', 'entruempelung-wien', 'haushaltsaufloesung-wien'],
  },
  {
    slug: 'geschaeftsraeumung-wien',
    gruppe: 'raeumung',
    nav: 'Büro, Lokal & Lager',
    title: 'Büro, Lokal und Lager räumen in Wien | Räumerei',
    description:
      'Geschäftsräumung in Wien: Büro, Geschäftslokal, Ordination oder Lager leer zum Rückgabetermin. Räumung außerhalb der Geschäftszeiten, Rechnung an die Firma.',
    h1: 'Büro, Lokal und Lager räumen in Wien',
    eyebrow: 'Für Betriebe und Hausverwaltungen',
    lead:
      'Wenn ein Mietvertrag für eine Geschäftsfläche endet, zählt der Rückgabetermin. Wir räumen Büros, Lokale und Lager so, dass der laufende Betrieb im Haus nicht gestört wird.',
    kurz: 'Geschäftsflächen zum Rückgabetermin räumen, auch abends und am Wochenende.',
    anliegen: 'entruempelung',
    umfang: [
      'Schreibtische, Kästen, Regale, Trennwände aus Möbelsystemen',
      'Ladeneinrichtung, Theken und Vitrinen',
      'Lagerregale und deren Inhalt',
      'Abbau verschraubter Einrichtung',
      'Termine am Abend oder am Wochenende',
      'Rechnung mit ausgewiesener Umsatzsteuer',
    ],
    abschnitte: [
      {
        h2: 'Büro und Kanzlei',
        text: [
          'In Büros steht weniger, als man denkt, aber es ist schwer: Aktenschränke, höhenverstellbare Tische, Besprechungstische aus einem Stück. Vieles muss zerlegt werden, damit es durch Glastüren und in Personenlifte passt.',
          'Akten und Datenträger mit personenbezogenen Daten nehmen wir nicht ungeprüft mit. Für deren Vernichtung gibt es spezialisierte Dienstleister mit Nachweis. Bitte lassen Sie das vor unserem Termin erledigen oder stellen Sie diese Bestände getrennt.',
        ],
      },
      {
        h2: 'Geschäftslokal und Gastronomie',
        text: [
          'Im Erdgeschoß ist die Zufahrt selten das Problem, dafür die Öffentlichkeit. Wir räumen Lokale auf Wunsch früh morgens oder nach Geschäftsschluss. Regale, Theken, Vitrinen und Lagerware gehen hinaus. Was fest mit dem Gebäude verbunden ist, etwa Lüftung, Kühlzellen oder gemauerte Einbauten, ist Sache der dafür zuständigen Gewerke.',
        ],
      },
      {
        h2: 'Lager und Archiv',
        text: [
          'Bei Lagern entscheidet die Regalhöhe. Wir räumen händisch und mit Hubwagen. Schwerlastregale bauen wir ab, wenn sie verschraubt und nicht verschweißt sind. Sagen Sie uns vorher, ob Ware dabei ist, die besondere Vorschriften hat. Solche Bestände übernehmen wir nicht.',
        ],
      },
      {
        h2: 'Für Hausverwaltungen',
        text: [
          'Verwaltungen brauchen drei Dinge: einen kurzfristigen Termin, einen Ansprechpartner und einen Nachweis. Wir schicken nach jeder Räumung Fotos der leeren Fläche und stellen die Rechnung auf die Verwaltung oder die Eigentümergemeinschaft aus.',
        ],
      },
    ],
    faq: [
      {
        q: 'Können Sie außerhalb der Bürozeiten räumen?',
        a: 'Ja, am Abend und am Wochenende. Bitte klären Sie mit der Hausverwaltung, ob Lift und Zugang dann benutzbar sind.',
      },
      {
        q: 'Übersiedeln Sie einen Teil der Einrichtung an den neuen Standort?',
        a: 'Ja. Was mitkommt, transportieren wir zuerst. Danach wird die alte Fläche geräumt.',
      },
      {
        q: 'Nehmen Sie Akten mit?',
        a: 'Unterlagen ohne Personenbezug ja. Für alles andere empfehlen wir einen Dienstleister für Aktenvernichtung, der einen Nachweis ausstellt.',
      },
      {
        q: 'Bauen Sie Trennwände und Zwischendecken ab?',
        a: 'Nur Möbelsysteme, die geschraubt oder gesteckt sind. Eingriffe in das Gebäude selbst sind Arbeit für einen Baumeister.',
      },
    ],
    verwandt: ['entruempelung-wien', 'umzug-wien', 'keller-dachboden-raeumen-wien'],
  },

  // ── Umzug ──────────────────────────────────────────────────────────────
  {
    slug: 'umzug-wien',
    gruppe: 'umzug',
    nav: 'Umzug Wien',
    title: 'Umzug Wien: tragen, fahren, aufstellen | Räumerei',
    description:
      'Umzug in Wien mit Transporter und eingespieltem Team: Möbel zerlegen, tragen, fahren, aufstellen. Schriftliches Angebot nach Besichtigung oder Videoanruf.',
    h1: 'Umzug in Wien',
    eyebrow: 'Übersiedlung innerhalb Wiens und ins Umland',
    lead:
      'Wir zerlegen, was nicht durch die Tür geht, tragen aus der alten Wohnung in die neue und stellen die Möbel dort auf, wo sie stehen sollen.',
    kurz: 'Übersiedlung mit Transporter und Trägern, vom Abbau bis zum Aufstellen.',
    anliegen: 'umzug',
    umfang: [
      'Besichtigung oder Videoanruf mit schriftlichem Angebot',
      'Zerlegen und Zusammenbauen von Möbeln',
      'Decken und Gurte zum Schutz der Möbel',
      'Tragen in beiden Häusern, auch ohne Lift',
      'Transport mit Fahrzeugen bis 3,5 Tonnen',
      'Aufstellen nach Ihrem Plan',
    ],
    abschnitte: [
      {
        h2: 'Was am Umzugstag passiert',
        text: [
          'Wir kommen zur vereinbarten Zeit, gehen mit Ihnen einmal durch die Wohnung und legen die Reihenfolge fest. Zuerst gehen Kartons und Kleinteile hinaus, dann die Möbel. Große Kästen, Betten und Tische zerlegen wir und beschriften die Teile, damit der Aufbau schnell geht.',
          'In der neuen Wohnung fragen wir bei jedem Stück, wohin es soll. Sagen Sie es ruhig genau: Ein Kasten, der gleich an der richtigen Wand steht, muss nicht mehr verschoben werden.',
        ],
      },
      {
        h2: 'Wovon Dauer und Preis abhängen',
        text: [
          'Vier Dinge bestimmen, wie lange ein Umzug dauert, und damit, was er kostet:',
        ],
        liste: [
          'Menge: Zahl der Kartons und großen Möbelstücke.',
          'Stockwerk und Lift an beiden Adressen.',
          'Der Weg vom Haustor zum Fahrzeug.',
          'Die Fahrzeit zwischen alter und neuer Adresse.',
        ],
      },
      {
        h2: 'Halteverbotszone: früh daran denken',
        text: [
          'In vielen Wiener Gassen gibt es vor dem Haus keinen freien Platz. Dann wird jeder Karton hundert Meter weit getragen, und der Umzug dauert länger. Eine Halteverbotszone für den Umzugstag schafft Abhilfe. Zuständig für die Bewilligung ist in Wien die MA 46. Der Antrag braucht Vorlauf, und die Stadt verrechnet dafür Gebühren. Die aktuellen Fristen und Sätze nennt die MA 46.',
          'Sagen Sie uns bei der Anfrage, ob Sie die Zone selbst beantragen oder ob wir das mit Ihnen vorbereiten sollen.',
        ],
      },
      {
        h2: 'Was Sie selbst vorbereiten können',
        text: [
          'Packen Sie Kartons so, dass eine Person sie tragen kann: Bücher in kleine, Bettwäsche in große. Beschriften Sie jeden Karton mit dem Zimmer in der neuen Wohnung. Tauen Sie den Gefrierschrank am Vortag ab, und lassen Sie die Waschmaschine von jemandem abschließen, der sich auskennt. Wertsachen, Dokumente und Medikamente fahren am sichersten bei Ihnen im Auto mit.',
        ],
      },
    ],
    faq: [
      {
        q: 'Mit welchen Fahrzeugen fahren Sie?',
        a: 'Mit Transportern bis 3,5 Tonnen höchstzulässigem Gesamtgewicht. Bei größeren Haushalten fahren wir mehrmals oder mit zwei Fahrzeugen.',
      },
      {
        q: 'Übersiedeln Sie auch aus Wien hinaus?',
        a: 'Ins Umland von Wien regelmäßig. Weitere Strecken innerhalb Österreichs klären wir im Einzelfall.',
      },
      {
        q: 'Packen Sie auch die Kartons?',
        a: 'Auf Wunsch ja. Sagen Sie es bei der Anfrage, dann planen wir dafür Zeit und Material ein.',
      },
      {
        q: 'Schließen Sie Waschmaschine und Herd an?',
        a: 'Nein. Wasser-, Gas- und Stromanschlüsse sind Arbeit für Installateur oder Elektriker. Wir stellen die Geräte an ihren Platz.',
      },
      {
        q: 'Wie früh sollte ich buchen?',
        a: 'Zwei bis vier Wochen vorher sind sinnvoll, zum Monatsende eher mehr. Kurzfristig geht es manchmal auch, fragen Sie einfach.',
      },
    ],
    verwandt: ['raeumung-und-umzug-wien', 'seniorenumzug-wien', 'entruempelung-wien'],
    vorbehalt: true,
  },
  {
    slug: 'raeumung-und-umzug-wien',
    gruppe: 'umzug',
    nav: 'Räumung + Umzug',
    title: 'Umzug mit Entrümpelung in Wien: ein Termin | Räumerei',
    description:
      'Umzug und Räumung aus einer Hand in Wien: Erst fährt mit, was Sie behalten, dann wird die alte Wohnung geräumt und besenrein übergeben. Ein Team, ein Angebot.',
    h1: 'Umzug mit Entrümpelung in Wien',
    eyebrow: 'Beides an einem Termin',
    lead:
      'Wer umzieht, nimmt selten alles mit. Wir übersiedeln, was bleibt, und räumen danach, was in der alten Wohnung zurückgeblieben ist.',
    kurz: 'Erst übersiedeln, dann die alte Wohnung räumen: ein Team, ein Angebot.',
    anliegen: 'beides',
    umfang: [
      'Ein Angebot für Umzug und Räumung',
      'Kennzeichnung: was mitkommt, was geräumt wird',
      'Transport und Aufstellen in der neuen Wohnung',
      'Räumung der alten Wohnung samt Keller',
      'Besenreine Übergabe',
      'Ein Ansprechpartner für beide Teile',
    ],
    abschnitte: [
      {
        h2: 'Warum beides zusammengehört',
        text: [
          'Wer Umzug und Räumung getrennt vergibt, hat zwei Besichtigungen, zwei Angebote, zwei Termine und zwei Firmen im Stiegenhaus. Dazwischen liegt meist eine Woche, in der die alte Wohnung halb leer dasteht und trotzdem Miete kostet.',
          'Bei uns ist es ein Auftrag. Dasselbe Team, das am Vormittag Ihre Möbel in die neue Wohnung bringt, kommt zurück und räumt die alte. Es kennt die Wohnung dann schon und weiß, was Ihnen wichtig war.',
        ],
      },
      {
        h2: 'Der Ablauf an einem Tag',
        text: [
          'Für eine durchschnittliche Wohnung sieht der Tag so aus:',
        ],
        liste: [
          'Morgens: Alles mit Aufkleber wird verladen und in die neue Wohnung gebracht.',
          'Mittags: Aufstellen der Möbel, Sie richten sich bereits ein.',
          'Nachmittags: Rückfahrt, Räumung aller übrigen Stücke aus Wohnung und Keller.',
          'Abends: Die alte Wohnung ist gekehrt und bereit für die Übergabe.',
        ],
      },
      {
        h2: 'Typische Fälle',
        text: [
          'Am häufigsten ist der Umzug in eine kleinere Wohnung: Ein Paar zieht nach dem Auszug der Kinder von vier Zimmern in zwei. Die Hälfte der Möbel hat dort keinen Platz. Ähnlich ist es, wenn zwei Haushalte zusammenziehen und vieles doppelt vorhanden ist, oder wenn jemand ins Ausland geht und nur Koffer mitnimmt.',
          'In all diesen Fällen hilft eine einfache Regel: Entscheiden Sie zuerst, was in der neuen Wohnung Platz hat. Ein Grundriss mit eingezeichneten Möbeln erspart am Umzugstag viele Diskussionen.',
        ],
      },
    ],
    faq: [
      {
        q: 'Ist die Kombination billiger als zwei getrennte Aufträge?',
        a: 'In der Regel ja, weil Anfahrt, Besichtigung und Stellplatz nur einmal anfallen und das Team nicht zweimal neu beginnt. Den genauen Betrag sehen Sie im Angebot, getrennt nach Umzug und Räumung.',
      },
      {
        q: 'Geht wirklich beides an einem Tag?',
        a: 'Bei Wohnungen bis etwa drei Zimmern meist ja. Größere Haushalte teilen wir auf zwei aufeinanderfolgende Tage.',
      },
      {
        q: 'Wie stellen Sie sicher, dass nichts Falsches geräumt wird?',
        a: 'Alles, was mitkommt, wird vorher gekennzeichnet und fährt zuerst. Geräumt wird erst, wenn Sie bestätigt haben, dass in der neuen Wohnung nichts fehlt.',
      },
      {
        q: 'Können Sie einzelne Stücke zu Verwandten bringen?',
        a: 'Ja, innerhalb Wiens und im Umland. Nennen Sie die Adressen bei der Besichtigung.',
      },
    ],
    verwandt: ['umzug-wien', 'wohnungsraeumung-wien', 'seniorenumzug-wien'],
  },
  {
    slug: 'seniorenumzug-wien',
    gruppe: 'umzug',
    nav: 'Seniorenumzug',
    title: 'Seniorenumzug Wien: ins Heim oder kleiner | Räumerei',
    description:
      'Seniorenumzug in Wien: Übersiedlung ins Pensionistenwohnhaus, Pflegeheim oder in eine kleinere Wohnung. Danach räumen wir die bisherige Wohnung.',
    h1: 'Seniorenumzug in Wien',
    eyebrow: 'Ins Pensionistenwohnhaus, Pflegeheim oder kleiner wohnen',
    lead:
      'Ein Zimmer im Heim fasst einen Bruchteil dessen, was in der Wohnung stand. Wir bringen die ausgewählten Stücke hin, richten das Zimmer ein und kümmern uns danach um die alte Wohnung.',
    kurz: 'Übersiedlung ins Heim oder in eine kleinere Wohnung, mit Räumung danach.',
    anliegen: 'beides',
    umfang: [
      'Auswahl der Möbel nach den Maßen des neuen Zimmers',
      'Schonender Transport der Lieblingsstücke',
      'Aufstellen, Bilder aufhängen, Bett beziehen',
      'Abstimmung der Anlieferzeit mit dem Heim',
      'Räumung der bisherigen Wohnung',
      'Geduld, wenn es länger dauert',
    ],
    abschnitte: [
      {
        h2: 'Was in ein Heimzimmer passt',
        text: [
          'Die meisten Häuser stellen Bett und Kasten. Mitgebracht werden dürfen meist ein Sessel, eine Kommode, ein kleiner Tisch, Bilder, eine Lampe und der Fernseher. Fragen Sie im Haus nach den genauen Maßen des Zimmers und danach, was erlaubt ist. In Wien sind das zum Beispiel die Häuser zum Leben oder private Pflegeeinrichtungen. Jedes Haus hat eigene Regeln.',
          'Mit diesen Maßen suchen wir gemeinsam aus, was mitkommt. Der Lehnsessel, in dem jemand seit dreißig Jahren sitzt, ist wichtiger als ein neuer Kasten.',
        ],
      },
      {
        h2: 'Der Tag des Umzugs',
        text: [
          'Wir stimmen die Ankunft mit der Stationsleitung ab, damit wir nicht zur Essenszeit kommen. Im Zimmer stellen wir die Möbel, hängen Bilder auf und schließen die Lampe an die Steckdose an. Wenn die Bewohnerin oder der Bewohner einzieht, soll das Zimmer bereits nach Zuhause aussehen.',
          'Am alten Wohnort planen wir mehr Zeit ein als bei anderen Umzügen. Wer sein Zuhause nach Jahrzehnten verlässt, möchte sich umsehen, und das soll möglich sein.',
        ],
      },
      {
        h2: 'Die alte Wohnung danach',
        text: [
          'Wenn das neue Zimmer eingerichtet ist, steht die bisherige Wohnung noch fast voll da. Angehörige holen, was sie behalten möchten. Den Rest räumen wir zu einem Termin, der zur Kündigungsfrist passt. Beides steht in einem Angebot, damit Sie von Anfang an wissen, was insgesamt auf Sie zukommt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Können Sie den Umzug auch kurzfristig machen, wenn ein Heimplatz frei wird?',
        a: 'Heimplätze werden oft mit wenigen Tagen Vorlauf vergeben. Rufen Sie an, sobald Sie das Datum kennen. Der Umzug ins Zimmer ist klein und lässt sich meist rasch einplanen.',
      },
      {
        q: 'Muss die Wohnung sofort geräumt werden?',
        a: 'Nein. Der Umzug und die Räumung können Wochen auseinanderliegen. Maßgeblich ist das Ende des Mietverhältnisses.',
      },
      {
        q: 'Helfen Sie beim Aussuchen der Möbel?',
        a: 'Ja. Wir messen die Stücke aus und sagen, was im neuen Zimmer Platz hat. Die Entscheidung treffen Sie und Ihre Familie.',
      },
      {
        q: 'Was ist, wenn die Angehörigen nicht in Wien wohnen?',
        a: 'Dann stimmen wir uns telefonisch ab. Sie bekommen Fotos vom eingerichteten Zimmer und später von der geräumten Wohnung.',
      },
    ],
    verwandt: ['haushaltsaufloesung-wien', 'raeumung-und-umzug-wien', 'wohnungsraeumung-wien'],
  },
];

export const leistung = (slug: string) => leistungen.find((l) => l.slug === slug)!;
