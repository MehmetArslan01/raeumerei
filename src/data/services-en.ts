/**
 * Englische Leistungsseiten. Eigenständig geschrieben, nicht übersetzt:
 * Sie erklären, was jemandem auffällt, der das Wiener System nicht kennt
 * (Altbau ohne Lift, Kellerabteil, „besenrein“, Halteverbotszone).
 *
 * Die Wortregeln gelten auf Englisch genauso, siehe scripts/legal-lint.mjs.
 */
import type { Leistung } from './leistungen';

export const servicesEn: Leistung[] = [
  {
    slug: 'house-clearance-vienna',
    gruppe: 'raeumung',
    nav: 'House clearance',
    title: 'House Clearance Vienna: flats, houses, cellars | Räumerei',
    description:
      'House clearance in Vienna with English-speaking contact. We view the rooms, give you a written price, clear everything in one go and hand back swept rooms.',
    h1: 'House clearance in Vienna',
    eyebrow: 'Flats, houses, cellars and offices',
    lead:
      'We empty the rooms, carry everything down, load it and sweep through. You get a written price before we start and empty rooms when we finish.',
    kurz: 'Flat, house, cellar or office: emptied, carried out, loaded and swept.',
    anliegen: 'entruempelung',
    umfang: [
      'Viewing on site and a written quote',
      'Clearing all rooms we agreed on',
      'Taking apart wardrobes, beds and shelving',
      'Carrying down the stairs, with or without a lift',
      'Loading and transport',
      'Rooms handed back swept',
    ],
    abschnitte: [
      {
        h2: 'What a clearance in Vienna involves',
        text: [
          'In German this is called Entrümpelung or Räumung. It means that everything you do not keep leaves the property: furniture, boxes, the contents of cupboards, the kitchen if it is yours, and whatever is stored in the cellar. At the end the rooms are empty and swept.',
          'We always look at the rooms first. Fill level, floor, lift and the distance to the van decide how long it takes, and only then can we name a price that holds.',
        ],
      },
      {
        h2: 'Things that surprise people who are new to Vienna',
        text: ['Viennese buildings have a few habits that matter on clearance day:'],
        liste: [
          'Altbau flats have ceilings of three metres and more, and wardrobes to match. Many must be taken apart.',
          'A lift, if there is one, is often tiny or was added later and stops between floors.',
          'Almost every flat comes with a Kellerabteil, a storage cage in the basement. It has to be emptied too.',
          'Floors are counted differently: Mezzanin and Hochparterre sit between ground and first floor, so the “3rd floor” can be the fifth level.',
          'Parking in front of the house is rare. A temporary no-parking zone can be requested from the city.',
        ],
      },
      {
        h2: 'What “besenrein” means at handover',
        text: [
          'Rental contracts usually ask for the flat to be returned geräumt und besenrein: cleared and swept. That is what we deliver. It does not mean a full clean with windows and bathroom polish. If your contract asks for more, that is a job for a cleaning company.',
          'Work on pipes, wiring and the building itself is not part of a clearance either. Appliances must be disconnected by a plumber or electrician before we carry them out.',
        ],
      },
      {
        h2: 'Personal items stay with you',
        text: [
          'We open every drawer and cupboard before emptying it. Documents, photos, jewellery, keys and cash are put aside and handed to you in one box. If you are not sure about an item, tell us to keep it back and decide at the end of the day.',
        ],
      },
    ],
    faq: [
      {
        q: 'Do you speak English?',
        a: 'Yes. Phone calls, the viewing, the written quote and the handover can all be done in English.',
      },
      {
        q: 'How much does a clearance cost?',
        a: 'It depends on volume, floor and lift rather than on square metres. Guide prices are on our prices page. The binding amount comes in writing after the viewing.',
      },
      {
        q: 'Do I have to be there?',
        a: 'For the viewing it helps. On the day itself a key handover and a phone number are enough. We send photos of every room afterwards.',
      },
      {
        q: 'Can you clear just one room or the cellar?',
        a: 'Yes. A single room or a cellar compartment is a normal job, priced by the actual work.',
      },
      {
        q: 'Can you return the keys to the property manager?',
        a: 'Yes, if you have told the Hausverwaltung to expect us. You should sign the handover record yourself or name someone to do it.',
      },
    ],
    verwandt: ['clearance-and-move-vienna', 'moving-vienna'],
    vorbehalt: true,
  },
  {
    slug: 'moving-vienna',
    gruppe: 'umzug',
    nav: 'Moving',
    title: 'Moving in Vienna: movers with van and crew | Räumerei',
    description:
      'Moving within Vienna with an English-speaking crew: we take furniture apart, carry, drive and set it up again. Written quote after a visit or a video call.',
    h1: 'Moving in Vienna',
    eyebrow: 'Within Vienna and to the surrounding area',
    lead:
      'We take apart what does not fit through the door, carry it from the old flat to the new one and put it where you want it.',
    kurz: 'A move with van and crew, from taking furniture apart to setting it up.',
    anliegen: 'umzug',
    umfang: [
      'Visit or video call and a written quote',
      'Taking furniture apart and reassembling it',
      'Blankets and straps to protect furniture',
      'Carrying at both addresses, lift or no lift',
      'Transport in vans up to 3.5 tonnes',
      'Furniture placed according to your plan',
    ],
    abschnitte: [
      {
        h2: 'How moving day goes',
        text: [
          'We arrive at the agreed time and walk through the flat with you once. Boxes and small items go first, furniture after. Large wardrobes, beds and tables are taken apart and the parts labelled so they go back together quickly.',
          'At the new address we ask where each piece belongs. Be precise: a wardrobe that stands at the right wall straight away does not have to be moved twice.',
        ],
      },
      {
        h2: 'What decides time and price',
        text: ['Four things determine how long a move takes, and therefore what it costs:'],
        liste: [
          'Volume: number of boxes and large pieces of furniture.',
          'Floor and lift at both addresses.',
          'The distance from the front door to the van.',
          'Driving time between the two addresses.',
        ],
      },
      {
        h2: 'The no-parking zone (Halteverbotszone)',
        text: [
          'In many Viennese streets there is no space in front of the house. Every box is then carried a hundred metres and the move takes longer. A temporary no-parking zone for moving day solves that. The permit is issued by the city department MA 46. It needs lead time and the city charges fees for it. Current deadlines and rates are published by MA 46.',
          'Tell us when you enquire whether you will apply yourself or would like us to prepare it with you.',
        ],
      },
      {
        h2: 'After the move: registration',
        text: [
          'Anyone who moves in Austria has to register the new address. The registration form (Meldezettel) must be signed by the landlord or owner and handed in at a registration office (Meldeservice) of the city. The deadline is short, so ask your landlord for the signature on the day you get the keys. Details are on the City of Vienna website.',
        ],
      },
    ],
    faq: [
      {
        q: 'What size of vehicle do you use?',
        a: 'Vans with a maximum permitted weight of 3.5 tonnes. Larger households are moved in several trips or with two vans.',
      },
      {
        q: 'Do you move people out of Vienna?',
        a: 'To the area around Vienna, yes. Longer routes within Austria are agreed case by case.',
      },
      {
        q: 'Can you pack for us?',
        a: 'On request. Mention it in your enquiry so we plan time and boxes for it.',
      },
      {
        q: 'Do you connect the washing machine and cooker?',
        a: 'No. Water, gas and electrical connections are work for a plumber or electrician. We put the appliances in place.',
      },
      {
        q: 'How far ahead should I book?',
        a: 'Two to four weeks is sensible, more towards the end of a month, when most leases end.',
      },
    ],
    verwandt: ['clearance-and-move-vienna', 'house-clearance-vienna'],
    vorbehalt: true,
  },
  {
    slug: 'clearance-and-move-vienna',
    gruppe: 'umzug',
    nav: 'Clearance + move',
    title: 'Leaving Vienna: clearance and move in one | Räumerei',
    description:
      'Moving out or leaving Vienna? We move what you keep and clear what stays behind, then hand back the flat swept. One crew, one quote, in English.',
    h1: 'Clearance and move in one job',
    eyebrow: 'Moving out or leaving Vienna',
    lead:
      'Hardly anyone takes everything along. We move what you keep and then clear what is left in the old flat, so it is ready for handover.',
    kurz: 'First the move, then the old flat is cleared: one crew, one quote.',
    anliegen: 'beides',
    umfang: [
      'One quote for move and clearance',
      'Labels: what comes along, what is cleared',
      'Transport and set-up at the new address',
      'Clearing the old flat and its cellar',
      'Flat handed back swept',
      'Photos of the empty rooms',
    ],
    abschnitte: [
      {
        h2: 'When this is the right job',
        text: [
          'The typical case in English is a posting that ends. A few years in Vienna have filled a flat, the next job is in another country, and the shipping company takes only what fits the allowance. Beds, wardrobes, the sofa and the contents of the cellar stay behind, and the landlord expects an empty flat.',
          'The same applies when you move into a furnished or smaller place within Vienna, or when two households become one.',
        ],
      },
      {
        h2: 'How one day can cover both',
        text: ['For an average flat the day looks like this:'],
        liste: [
          'Morning: everything with a label is loaded and taken to the new address or to your shipper.',
          'Midday: furniture is set up, or the shipment is handed over.',
          'Afternoon: back at the old flat, all remaining items are cleared from flat and cellar.',
          'Evening: the old flat is swept and ready for handover.',
        ],
      },
      {
        h2: 'If you have already left',
        text: [
          'Sometimes the flight is booked before the flat is empty. Then we work with a person you trust or with the Hausverwaltung. We collect the keys, clear the flat, send photos of every room and return the keys to whoever you name. Anything personal we find is kept for you.',
          'Please settle two things before you leave: who signs the handover record on your behalf, and who gives notice on the lease. Those are legal steps we cannot take for you. For questions on tenancy law, the Mietervereinigung and the Arbeiterkammer advise tenants.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is the combination cheaper than two separate jobs?',
        a: 'Usually, because travel, viewing and parking are needed only once. The quote shows move and clearance as separate lines.',
      },
      {
        q: 'Can you deliver boxes to my international shipper?',
        a: 'Yes, to a depot or collection point in or around Vienna. The onward shipment abroad is handled by your shipper.',
      },
      {
        q: 'How do you make sure nothing wrong is cleared?',
        a: 'Everything that comes along is labelled and leaves first. Clearing starts only when you confirm nothing is missing.',
      },
      {
        q: 'Can I pay from abroad?',
        a: 'You receive an invoice with the bank details. How and when payment is due is stated in the quote before you accept.',
      },
    ],
    verwandt: ['house-clearance-vienna', 'moving-vienna'],
    vorbehalt: true,
  },
];

export const serviceEn = (slug: string) => servicesEn.find((l) => l.slug === slug)!;
