import { FamilyMember, GalleryItem, TimelineEvent } from './types';

export const FAMILY_MEMBERS: FamilyMember[] = [
  {
    id: 'lewis-father',
    name: 'Lewis Joseph Orovwigho',
    role: 'Father (Pastor & Dad)',
    birthYear: 1960,
    generation: 'boomers',
    energyBadge: '⛪ PASTOR',
    avatarUrl: '/joseph_father.jpg',
    bio: 'The wise and loving head of the family. He is a friendly local pastor who loves reading, drinking hot tea, and sharing classic stories with everyone.',
    funFacts: [
      'He loves reading books in his quiet study with a warm cup of tea every morning.',
      'He can remember historic family stories and scripture passages with absolute precision.',
      'He always coordinates fun family board game nights and makes sure everyone has a blast.'
    ],
    vibeStats: {
      wisdom: 98,
      rebellion: 10,
      techLevel: 65,
      style: 85
    },
    favVinyl: 'Donny Hathaway - Live (1972)',
    birthMonth: 7, // August (0-indexed 7)
    birthDay: 15
  },
  {
    id: 'sarah-mother',
    name: 'Sarah Joseph Orovwigho',
    role: 'Mother (Super Entrepreneur)',
    birthYear: 1969,
    generation: 'genx',
    energyBadge: '💼 BUSINESS BOSS',
    avatarUrl: '/sarah_mother.png',
    bio: 'A super creative businesswoman who runs multiple successful projects. She keeps the family organized and always cooks the most delicious weekend meals!',
    funFacts: [
      'She can calculate business budgets and plan big projects in her head in seconds.',
      'She is the master chef who organizes all massive holiday dinners and family feasts.',
      'She once signed a big merchant lease renewal in under ten minutes.'
    ],
    vibeStats: {
      wisdom: 95,
      rebellion: 45,
      techLevel: 75,
      style: 90
    },
    favVinyl: 'Whitney Houston - Whitney (1987)',
    birthMonth: 7, // August (0-indexed 7)
    birthDay: 21
  },
  {
    id: 'gift-first',
    name: 'Gift Oghenetega Orovwigho',
    role: 'Big Brother (Tech Pro & Investor)',
    birthYear: 1989,
    generation: 'millennials',
    energyBadge: '📈 TECH INVESTOR',
    avatarUrl: '/gift.jpg',
    bio: 'The family’s veteran tech expert and computer whiz. He started building computer systems as a teenager and loves analyzing digital markets and investments.',
    funFacts: [
      'He set up his first working home website back when dial-up internet was still a thing!',
      'He enjoys teaching his younger siblings how to save, invest, and manage money wisely.',
      'He is the expert on backing up memories safely and keeping the family files secure.'
    ],
    vibeStats: {
      wisdom: 84,
      rebellion: 60,
      techLevel: 98,
      style: 80
    },
    favVinyl: 'Daft Punk - Discovery (2001)',
    birthMonth: 0, // January (0-indexed 0)
    birthDay: 11
  },
  {
    id: 'racheal-second',
    name: 'Racheal Lewis',
    role: 'Big Sister (Content Creator & Designer)',
    birthYear: 1994,
    generation: 'millennials',
    energyBadge: '📹 CONTENT CREATOR',
    avatarUrl: '/racheal_lewis.png',
    bio: 'A wonderful digital storyteller and blogger. She is incredibly creative, loves aesthetic polaroids, and is the proud mother of our sweet niece, Jowoke.',
    funFacts: [
      'Her creative design ideas and helpful lifestyle blogs get thousands of views every week.',
      'She has a cool collection of vintage cameras and colorful design notebooks.',
      'She keeps a beautiful handwritten journal of positive daily quotes to feel inspired.'
    ],
    vibeStats: {
      wisdom: 80,
      rebellion: 85,
      techLevel: 88,
      style: 98
    },
    favVinyl: 'Lauryn Hill - The Miseducation of Lauryn Hill (1998)',
    birthMonth: 5, // June (0-indexed 5)
    birthDay: 5
  },
  {
    id: 'ejiro-third',
    name: 'Ejiro Orovwigho Blessing',
    role: 'Sister (Economics Whiz)',
    birthYear: 1996,
    generation: 'millennials',
    energyBadge: '📊 STATS WHIZ',
    avatarUrl: '/ejiro.png',
    bio: 'An amazing economics expert. She loves decoding market trends, studying clever behavior patterns, and discovering cozy coffee shops.',
    funFacts: [
      'She reads cool books on behavioral trends and game theory just for fun.',
      'She calculates the family holiday snack budgets using actual math equations!',
      'She is always on the hunt for the best chocolate chip cookies and warm hot cocoa.'
    ],
    vibeStats: {
      wisdom: 85,
      rebellion: 55,
      techLevel: 80,
      style: 85
    },
    favVinyl: 'Miles Davis - Kind of Blue (1959)',
    birthMonth: 0, // January (0-indexed 0)
    birthDay: 26
  },
  {
    id: 'sarah-fourth',
    name: 'Sarah Lewis Victory',
    role: 'Sister (Professional Accountant)',
    birthYear: 1998,
    generation: 'genz',
    energyBadge: '💵 NUMBERS CHAMP',
    avatarUrl: '/sarah_lewis.jpg',
    bio: 'Our certified accounting expert! She keeps all family trip plans perfectly balanced and has a great love for classic vinyl music.',
    funFacts: [
      'She can spot a math mistake on a worksheet instantly from a mile away.',
      'She creates beautiful, color-coded itineraries for all family travel adventures.',
      'She has a secret love for upbeat soul tracks and energetic modern jazz.'
    ],
    vibeStats: {
      wisdom: 79,
      rebellion: 40,
      techLevel: 85,
      style: 90
    },
    favVinyl: 'Sade - Diamond Life (1984)',
    birthMonth: 5, // June (0-indexed 5)
    birthDay: 23
  },
  {
    id: 'daniel-last',
    name: 'Daniel Lewis Oghenemaro',
    role: 'Brother (Computer Wizard & Linux Fan)',
    birthYear: 2005,
    generation: 'genz',
    energyBadge: '💻 CODER',
    avatarUrl: '/daniel.jpg',
    bio: 'A total digital native who loves coding in TypeScript. He builds custom mechanical keyboards, hosts files, and commands terminals on custom Linux setups.',
    funFacts: [
      'He runs his computers on customized Linux and doesn’t even like using a mouse!',
      'He helped code this interactive family scrapbook so everyone can stay connected.',
      'He can build a working mechanical keyboard from spare parts in an afternoon.'
    ],
    vibeStats: {
      wisdom: 72,
      rebellion: 92,
      techLevel: 99,
      style: 92
    },
    favVinyl: 'Aphex Twin - Selected Ambient Works 85-92',
    birthMonth: 7, // August (0-indexed 7)
    birthDay: 19
  },
  {
    id: 'jowoke-niece',
    name: 'Jowoke Talabi',
    role: 'Niece (Star Student & Sketcher)',
    birthYear: 2011,
    generation: 'genz',
    energyBadge: '🎓 STAR STUDENT',
    avatarUrl: '/jowoke.jpg',
    bio: 'The bright granddaughter of the family and daughter of Racheal. She is a cheerful student who loves sketching characters and writing stories.',
    funFacts: [
      'She loves coding cute animations and mini-games on platform code sites like Scratch!',
      'She possesses reading speeds and literature skills well beyond her middle school class level.',
      'She is rarely seen without her favorite messenger bag packed with sketch pads and markers.'
    ],
    vibeStats: {
      wisdom: 75,
      rebellion: 70,
      techLevel: 90,
      style: 95
    },
    favVinyl: 'Billie Eilish - When We All Fall Asleep, Where Do We Go? (2019)',
    birthMonth: 2, // March (0-indexed 2)
    birthDay: 1
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'sarah-victory-gown',
    title: "Sarah Victory's Emerald Gown",
    date: 'May 29, 2026',
    type: 'photo',
    imageUrl: '/sarah_victory_gown.jpg',
    description: "Sarah Lewis Victory looking stunning in her elegant emerald green skirt and dark top, capturing a beautiful moment of style and grace.",
    curatorNote: "This stunning portrait shows Sarah's amazing style. She designed this custom outfit combination herself!",
    tags: ['Style', 'Gown', 'Sarah Victory', 'Lewis Core'],
    votedAesthetic: 120
  },
  {
    id: 'mother-office-92',
    title: "Mother Sarah's First Office",
    date: 'August 21, 1993',
    type: 'artifact',
    imageUrl: 'https://picsum.photos/seed/retro-office/600/600',
    description: "A super cool retro photo of Mother Sarah's original startup business desk. Features heavy classic phones, paper ledgers, and organized plans.",
    curatorNote: "This shows the exact table where she planned her very first retail business! Absolute peak of classic entrepreneurial hustle.",
    tags: ['Entrepreneur', 'Business', 'Mother', 'Hustle'],
    votedAesthetic: 62
  },
  {
    id: 'gift-early-servers',
    title: "Gift's First Coding Station",
    date: 'January 11, 2002',
    type: 'artifact',
    imageUrl: 'https://picsum.photos/seed/custom-server/600/600',
    description: "A neat close-up of Gift's customized early desktop setup, displaying computer motherboards and hand-coded server programs.",
    curatorNote: "Gift used this simple system to run neighborhood local servers and teach himself computer programming.",
    tags: ['Computer Parts', 'Coder', 'Big Brother', 'Tech'],
    votedAesthetic: 95
  },
  {
    id: 'racheal-polaroids',
    title: "Racheal's Creative Sketchbook Pages",
    date: 'June 5, 2010',
    type: 'photo',
    imageUrl: 'https://picsum.photos/seed/creative-sketchbook/600/600',
    description: "Racheal's hand-sketched clothing layouts and cool instant polaroid mockups for her early custom style campaigns.",
    curatorNote: "Racheal loves physical drawings! Her beautiful scrapbook provided the ultimate visual inspiration for this entire webpage.",
    tags: ['Drawing', 'Sketches', 'Polaroid', 'Creator'],
    votedAesthetic: 110
  },
  {
    id: 'ejiro-econometrics',
    title: "Ejiro's Economy Trend Drawing",
    date: 'January 26, 2017',
    type: 'letter',
    imageUrl: 'https://picsum.photos/seed/econometrics/600/600',
    description: "Ejiro's whiteboard sketches outlining market graphs and economic formulas on vintage graph paper.",
    curatorNote: "Even in her college days, Ejiro loved sketching graphs to show how currency flows. She makes economics look easy!",
    tags: ['Economics', 'Whiteboard', 'Sister', 'Math'],
    votedAesthetic: 73
  },
  {
    id: 'daniel-linux-machine',
    title: "Daniel's Command Line Desk Setup",
    date: 'August 19, 2023',
    type: 'photo',
    imageUrl: 'https://picsum.photos/seed/linux-cli/600/600',
    description: "Daniel's awesome computer desk hosting an active Linux terminal. Glowing purple background lights highlight his customized mechanical keyboards.",
    curatorNote: "Daniel codes entirely using the terminal! He is super fast and doesn't even need a computer mouse.",
    tags: ['Linux', 'Cyberpunk', 'Mechanical Keyboard', 'Wizard'],
    votedAesthetic: 125
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'event-1',
    year: 1985,
    title: 'Establishment of the Lewis Home',
    description: 'Pastor Lewis and Mother Sarah unite, laying the happy foundation of the active Lewis household.',
    primaryActorId: 'lewis-father',
    iconName: 'Heart',
    badge: '💍 FAMILY CORNERSTONE',
    category: 'milestone'
  },
  {
    id: 'event-2',
    year: 2001,
    title: 'Gift Sets Up His First Home Server',
    description: 'Gift Oghenetega builds his first real home server network on custom spare motherboards.',
    primaryActorId: 'gift-first',
    iconName: 'Cpu',
    badge: '💻 CODING DEBUT',
    category: 'achievement'
  },
  {
    id: 'event-3',
    year: 2012,
    title: "Racheal Launches Her Design Agency",
    description: "Racheal Lewis officially opens her content agency and releases her very first lifestyle blog.",
    primaryActorId: 'racheal-second',
    iconName: 'Camera',
    badge: '📹 CREATIVE SPARK',
    category: 'vibe'
  },
  {
    id: 'event-4',
    year: 2018,
    title: 'Ejiro Publishes Economics Article',
    description: 'Ejiro Blessing publishes her groundbreaking market analysis, successfully predicting region-wide spending changes.',
    primaryActorId: 'ejiro-third',
    iconName: 'GitCommit',
    badge: '📊 ECONOMICS WIN',
    category: 'achievement'
  },
  {
    id: 'event-5',
    year: 2024,
    title: 'Daniel Launches This Digital Scrapbook',
    description: 'Daniel Oghenemaro deploys this neat interactive scrapbook to combine fifty years of photos and stories into one webpage.',
    primaryActorId: 'daniel-last',
    iconName: 'Sparkles',
    badge: '💻 SCRAPBOOK ONLINE',
    category: 'vibe'
  }
];
