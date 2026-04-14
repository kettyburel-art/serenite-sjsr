import type { DayData } from './types';

// Données de repas pour avril 2026
// Planification anti-SJSR : riche en fer, magnésium, oméga-3
// Planification anti-TDAH : repas structurés, dopamine naturelle, éviter les pics glycémiques

export const MENUS_AVRIL_2026: DayData[] = [
  {
    date: '2026-04-01',
    mode: 'normal',
    sjsrAlert: 'Penser à prendre le magnésium bisglycinate ce soir.',
    meals: [
      {
        type: 'matin',
        title: 'Porridge avoine & graines de chia',
        time: '7h30',
        ingredients: [
          { name: 'flocons d\'avoine', isFresh: false },
          { name: 'graines de chia', isFresh: false },
          { name: 'lait d\'amande', isFresh: false },
          { name: 'banane', isFresh: true },
          { name: 'miel', isFresh: false },
        ],
        nutriTags: ['mag', 'fer', 'omega3'],
        conseil: 'L\'avoine libère l\'énergie lentement — idéal pour le TDAH.',
        tdahPause: 'Avant de manger, pose ton téléphone 5 minutes. 🌸',
      },
      {
        type: 'midi',
        title: 'Salade de lentilles aux épinards et œuf mollet',
        time: '12h30',
        ingredients: [
          { name: 'lentilles vertes', isFresh: false },
          { name: 'épinards frais', isFresh: true },
          { name: 'œuf', isFresh: true },
          { name: 'tomates cerises', isFresh: true },
          { name: 'vinaigrette citron', isFresh: false },
        ],
        nutriTags: ['fer', 'vitc', 'tdah'],
        conseil: 'La vitamine C des tomates triple l\'absorption du fer des lentilles.',
        tdahPause: 'Mange assis·e, sans écran. Savoure chaque bouchée.',
      },
      {
        type: 'gouter',
        title: 'Amandes & carré de chocolat noir',
        time: '16h00',
        ingredients: [
          { name: 'amandes', isFresh: false },
          { name: 'chocolat noir 70%', isFresh: false },
        ],
        nutriTags: ['mag', 'dopa'],
        conseil: 'Le chocolat noir stimule la dopamine naturellement.',
      },
      {
        type: 'diner',
        title: 'Saumon vapeur, quinoa et brocolis',
        time: '19h30',
        ingredients: [
          { name: 'saumon', isFresh: true },
          { name: 'quinoa', isFresh: false },
          { name: 'brocolis', isFresh: true },
          { name: 'citron', isFresh: true },
          { name: 'aneth', isFresh: true },
        ],
        nutriTags: ['omega3', 'mag', 'fer', 'tdah'],
        conseil: 'Les oméga-3 du saumon réduisent les symptômes du SJSR. Dîner léger pour une nuit sereine.',
        tdahPause: 'Après le dîner, 20 min de marche légère avant de dormir.',
      },
    ],
  },
  {
    date: '2026-04-02',
    mode: 'batch',
    specialNote: 'Batch cooking du jeudi : préparer les repas pour vendredi et samedi.',
    meals: [
      {
        type: 'matin',
        title: 'Yaourt grec, granola maison & fruits rouges',
        time: '7h30',
        ingredients: [
          { name: 'yaourt grec', isFresh: true },
          { name: 'granola', isFresh: false },
          { name: 'myrtilles', isFresh: true },
          { name: 'framboises', isFresh: true },
        ],
        nutriTags: ['vitc', 'dopa', 'fun'],
        conseil: 'Les fruits rouges sont riches en antioxydants et soutiennent la concentration.',
      },
      {
        type: 'midi',
        title: 'Soupe de pois chiches au curcuma',
        time: '12h30',
        ingredients: [
          { name: 'pois chiches', isFresh: false },
          { name: 'curcuma', isFresh: false },
          { name: 'gingembre', isFresh: true },
          { name: 'lait de coco', isFresh: false },
          { name: 'épinards', isFresh: true },
        ],
        nutriTags: ['fer', 'mag', 'alk'],
        conseil: 'Le curcuma a des propriétés anti-inflammatoires bénéfiques pour le SJSR.',
      },
      {
        type: 'diner',
        title: 'Poulet rôti, patates douces et haricots verts',
        time: '19h00',
        ingredients: [
          { name: 'poulet fermier', isFresh: true },
          { name: 'patates douces', isFresh: true },
          { name: 'haricots verts', isFresh: true },
          { name: 'herbes de Provence', isFresh: false },
        ],
        nutriTags: ['fer', 'b12', 'tdah'],
        conseil: 'Repas riche en protéines pour une nuit sans agitation des jambes.',
      },
    ],
  },
  {
    date: '2026-04-03',
    mode: 'livraison',
    specialNote: 'Livraison Marché du Vendredi — légumes de saison et poissons frais.',
    meals: [
      {
        type: 'matin',
        title: 'Pain complet, avocat & œuf poché',
        time: '8h00',
        ingredients: [
          { name: 'pain complet', isFresh: false },
          { name: 'avocat', isFresh: true },
          { name: 'œuf', isFresh: true },
          { name: 'graines de sésame', isFresh: false },
        ],
        nutriTags: ['fer', 'omega3', 'tdah'],
        conseil: 'L\'avocat apporte des acides gras essentiels pour la concentration.',
      },
      {
        type: 'midi',
        title: 'Pâtes complètes au pesto de roquette',
        time: '12h30',
        ingredients: [
          { name: 'pâtes complètes', isFresh: false },
          { name: 'roquette', isFresh: true },
          { name: 'pignons de pin', isFresh: false },
          { name: 'parmesan', isFresh: false },
          { name: 'basilic', isFresh: true },
        ],
        nutriTags: ['fer', 'mag', 'fun'],
      },
      {
        type: 'diner',
        title: 'Cabillaud en papillote, riz basmati et courgettes',
        time: '19h30',
        ingredients: [
          { name: 'cabillaud', isFresh: true },
          { name: 'riz basmati', isFresh: false },
          { name: 'courgettes', isFresh: true },
          { name: 'tomates', isFresh: true },
          { name: 'citron', isFresh: true },
        ],
        nutriTags: ['omega3', 'zinc', 'tdah'],
        conseil: 'Repas léger et facile à digérer pour une nuit reposante.',
      },
    ],
  },
  {
    date: '2026-04-04',
    mode: 'normal',
    meals: [
      {
        type: 'matin',
        title: 'Smoothie vert & tartine au beurre d\'amande',
        time: '8h00',
        ingredients: [
          { name: 'épinards', isFresh: true },
          { name: 'banane', isFresh: true },
          { name: 'lait de coco', isFresh: false },
          { name: 'pain complet', isFresh: false },
          { name: 'beurre d\'amande', isFresh: false },
        ],
        nutriTags: ['fer', 'mag', 'vitc'],
        conseil: 'Le smoothie vert est une excellente source de fer non-héminique.',
      },
      {
        type: 'midi',
        title: 'Bol Buddha : riz, pois chiches rôtis, légumes',
        time: '12h30',
        ingredients: [
          { name: 'riz complet', isFresh: false },
          { name: 'pois chiches', isFresh: false },
          { name: 'carottes', isFresh: true },
          { name: 'concombre', isFresh: true },
          { name: 'sauce tahini', isFresh: false },
        ],
        nutriTags: ['fer', 'mag', 'alk', 'tdah'],
        tdahPause: 'Prépare ton assiette avec intention. C\'est un acte de soin envers toi.',
      },
      {
        type: 'gouter',
        title: 'Compote de pommes & noix',
        time: '16h30',
        ingredients: [
          { name: 'compote sans sucre', isFresh: false },
          { name: 'noix', isFresh: false },
        ],
        nutriTags: ['omega3', 'mag'],
      },
      {
        type: 'diner',
        title: 'Omelette aux champignons et salade verte',
        time: '19h30',
        ingredients: [
          { name: 'œufs', isFresh: true },
          { name: 'champignons', isFresh: true },
          { name: 'salade verte', isFresh: true },
          { name: 'fromage de chèvre', isFresh: true },
        ],
        nutriTags: ['b12', 'fer', 'zinc'],
        conseil: 'Dîner léger et protéiné. Éviter les glucides simples le soir pour le SJSR.',
      },
    ],
  },
  {
    date: '2026-04-05',
    mode: 'normal',
    sjsrAlert: 'Dimanche de repos — étirements doux des jambes ce soir avant de dormir.',
    meals: [
      {
        type: 'matin',
        title: 'Pancakes à la farine de sarrasin & sirop d\'érable',
        time: '9h00',
        ingredients: [
          { name: 'farine de sarrasin', isFresh: false },
          { name: 'œuf', isFresh: true },
          { name: 'lait', isFresh: false },
          { name: 'sirop d\'érable', isFresh: false },
          { name: 'myrtilles', isFresh: true },
        ],
        nutriTags: ['fer', 'mag', 'fun'],
        conseil: 'Le sarrasin est une excellente source de magnésium.',
        tdahPause: 'Brunch du dimanche — prends le temps de savourer sans te presser.',
      },
      {
        type: 'midi',
        title: 'Gratin de légumes d\'hiver au gruyère',
        time: '13h00',
        ingredients: [
          { name: 'courge butternut', isFresh: true },
          { name: 'poireaux', isFresh: true },
          { name: 'gruyère', isFresh: false },
          { name: 'crème légère', isFresh: false },
        ],
        nutriTags: ['vitc', 'mag', 'fun'],
      },
      {
        type: 'diner',
        title: 'Velouté de carottes au gingembre',
        time: '19h00',
        ingredients: [
          { name: 'carottes', isFresh: true },
          { name: 'gingembre', isFresh: true },
          { name: 'lait de coco', isFresh: false },
          { name: 'coriandre', isFresh: true },
        ],
        nutriTags: ['vitc', 'alk'],
        conseil: 'Soupe légère le dimanche soir pour bien commencer la semaine.',
      },
    ],
  },
  {
    date: '2026-04-06',
    mode: 'normal',
    meals: [
      {
        type: 'matin',
        title: 'Muesli aux graines & lait végétal',
        time: '7h30',
        ingredients: [
          { name: 'muesli sans sucre', isFresh: false },
          { name: 'graines de lin', isFresh: false },
          { name: 'lait d\'avoine', isFresh: false },
          { name: 'kiwi', isFresh: true },
        ],
        nutriTags: ['fer', 'omega3', 'vitc'],
      },
      {
        type: 'midi',
        title: 'Wrap au thon, avocat et légumes croquants',
        time: '12h30',
        ingredients: [
          { name: 'tortilla complète', isFresh: false },
          { name: 'thon en conserve', isFresh: false },
          { name: 'avocat', isFresh: true },
          { name: 'laitue', isFresh: true },
          { name: 'tomate', isFresh: true },
        ],
        nutriTags: ['omega3', 'fer', 'tdah'],
        tdahPause: 'Avant de manger, note une chose positive de ta matinée.',
      },
      {
        type: 'diner',
        title: 'Tajine de poulet aux olives et citron confit',
        time: '19h30',
        ingredients: [
          { name: 'poulet', isFresh: true },
          { name: 'olives vertes', isFresh: false },
          { name: 'citron confit', isFresh: false },
          { name: 'couscous', isFresh: false },
          { name: 'coriandre', isFresh: true },
        ],
        nutriTags: ['fer', 'b12', 'fun'],
      },
    ],
  },
  {
    date: '2026-04-07',
    mode: 'normal',
    meals: [
      {
        type: 'matin',
        title: 'Toast avocat & saumon fumé',
        time: '7h30',
        ingredients: [
          { name: 'pain de seigle', isFresh: false },
          { name: 'avocat', isFresh: true },
          { name: 'saumon fumé', isFresh: false },
          { name: 'câpres', isFresh: false },
          { name: 'aneth', isFresh: true },
        ],
        nutriTags: ['omega3', 'fer', 'tdah'],
        conseil: 'Le saumon fumé est riche en oméga-3 — excellent pour réduire l\'inflammation liée au SJSR.',
      },
      {
        type: 'midi',
        title: 'Salade niçoise revisitée',
        time: '12h30',
        ingredients: [
          { name: 'thon', isFresh: false },
          { name: 'haricots verts', isFresh: true },
          { name: 'œuf dur', isFresh: true },
          { name: 'tomates', isFresh: true },
          { name: 'olives noires', isFresh: false },
        ],
        nutriTags: ['fer', 'omega3', 'vitc'],
      },
      {
        type: 'diner',
        title: 'Risotto aux champignons et parmesan',
        time: '19h30',
        ingredients: [
          { name: 'riz arborio', isFresh: false },
          { name: 'champignons', isFresh: true },
          { name: 'parmesan', isFresh: false },
          { name: 'bouillon de légumes', isFresh: false },
          { name: 'vin blanc', isFresh: false },
        ],
        nutriTags: ['fer', 'zinc', 'fun'],
        conseil: 'Repas réconfortant du mardi soir. Prendre le temps de cuisiner est thérapeutique.',
      },
    ],
  },
  {
    date: '2026-04-08',
    mode: 'batch',
    specialNote: 'Batch cooking du mercredi : préparer les légumineuses pour la semaine.',
    meals: [
      {
        type: 'matin',
        title: 'Chia pudding à la mangue',
        time: '7h30',
        ingredients: [
          { name: 'graines de chia', isFresh: false },
          { name: 'lait de coco', isFresh: false },
          { name: 'mangue', isFresh: true },
          { name: 'vanille', isFresh: false },
        ],
        nutriTags: ['omega3', 'vitc', 'dopa'],
        conseil: 'Préparer la veille au soir — parfait pour les matins TDAH chargés.',
      },
      {
        type: 'midi',
        title: 'Soupe minestrone aux légumes de saison',
        time: '12h30',
        ingredients: [
          { name: 'haricots blancs', isFresh: false },
          { name: 'carottes', isFresh: true },
          { name: 'céleri', isFresh: true },
          { name: 'tomates concassées', isFresh: false },
          { name: 'pâtes complètes', isFresh: false },
        ],
        nutriTags: ['fer', 'mag', 'alk'],
      },
      {
        type: 'diner',
        title: 'Filet de truite, lentilles beluga et betterave',
        time: '19h30',
        ingredients: [
          { name: 'truite', isFresh: true },
          { name: 'lentilles beluga', isFresh: false },
          { name: 'betterave', isFresh: true },
          { name: 'crème fraîche', isFresh: false },
          { name: 'ciboulette', isFresh: true },
        ],
        nutriTags: ['omega3', 'fer', 'tdah'],
        conseil: 'Les lentilles beluga sont parmi les légumineuses les plus riches en fer.',
      },
    ],
  },
  {
    date: '2026-04-14',
    mode: 'birthday',
    isBirthday: true,
    birthdayPerson: 'Mamie Jeanne',
    specialNote: 'Anniversaire de Mamie Jeanne — repas de fête en famille !',
    meals: [
      {
        type: 'matin',
        title: 'Brunch festif : viennoiseries & jus frais',
        time: '10h00',
        ingredients: [
          { name: 'croissants', isFresh: true },
          { name: 'pain au chocolat', isFresh: true },
          { name: 'jus d\'orange pressé', isFresh: true },
          { name: 'fruits frais', isFresh: true, isBirthday: true },
        ],
        nutriTags: ['vitc', 'fun', 'bday'],
        conseil: 'Jour de fête — se faire plaisir avec modération.',
      },
      {
        type: 'midi',
        title: 'Repas d\'anniversaire : poulet rôti & tarte aux légumes',
        time: '13h00',
        ingredients: [
          { name: 'poulet fermier', isFresh: true, isBirthday: true },
          { name: 'tarte aux légumes', isFresh: true },
          { name: 'salade verte', isFresh: true },
          { name: 'vin rouge léger', isFresh: false },
        ],
        nutriTags: ['fer', 'b12', 'fun', 'bday'],
      },
      {
        type: 'diner',
        title: 'Gâteau d\'anniversaire & tisane digestive',
        time: '19h30',
        ingredients: [
          { name: 'gâteau au chocolat', isFresh: true, isBirthday: true },
          { name: 'tisane camomille', isFresh: false },
        ],
        nutriTags: ['fun', 'bday', 'dopa'],
        conseil: 'Tisane de camomille pour aider à la digestion et préparer une bonne nuit.',
      },
    ],
  },
  {
    date: '2026-04-20',
    mode: 'livraison',
    specialNote: 'Livraison Panier Bio — légumes de printemps et herbes fraîches.',
    meals: [
      {
        type: 'matin',
        title: 'Tartines au fromage blanc & radis du jardin',
        time: '7h30',
        ingredients: [
          { name: 'pain de campagne', isFresh: false },
          { name: 'fromage blanc', isFresh: true },
          { name: 'radis', isFresh: true },
          { name: 'ciboulette', isFresh: true },
        ],
        nutriTags: ['vitc', 'fun'],
      },
      {
        type: 'midi',
        title: 'Quiche aux asperges et fromage de chèvre',
        time: '12h30',
        ingredients: [
          { name: 'asperges vertes', isFresh: true },
          { name: 'fromage de chèvre', isFresh: true },
          { name: 'œufs', isFresh: true },
          { name: 'pâte brisée', isFresh: false },
        ],
        nutriTags: ['fer', 'vitc', 'fun'],
        conseil: 'Les asperges sont de saison et riches en folates — excellent pour l\'humeur.',
      },
      {
        type: 'diner',
        title: 'Dorade au four, fenouil et tomates',
        time: '19h30',
        ingredients: [
          { name: 'dorade', isFresh: true },
          { name: 'fenouil', isFresh: true },
          { name: 'tomates', isFresh: true },
          { name: 'huile d\'olive', isFresh: false },
          { name: 'citron', isFresh: true },
        ],
        nutriTags: ['omega3', 'zinc', 'tdah'],
      },
    ],
  },
  {
    date: '2026-04-25',
    mode: 'normal',
    sjsrAlert: 'Semaine de stress ? Augmenter le magnésium et réduire la caféine après 14h.',
    meals: [
      {
        type: 'matin',
        title: 'Porridge aux noix et pomme caramélisée',
        time: '7h30',
        ingredients: [
          { name: 'flocons d\'avoine', isFresh: false },
          { name: 'noix', isFresh: false },
          { name: 'pomme', isFresh: true },
          { name: 'cannelle', isFresh: false },
          { name: 'miel', isFresh: false },
        ],
        nutriTags: ['mag', 'omega3', 'dopa'],
        conseil: 'La cannelle aide à stabiliser la glycémie — bénéfique pour le TDAH.',
      },
      {
        type: 'midi',
        title: 'Salade de quinoa aux légumes rôtis et feta',
        time: '12h30',
        ingredients: [
          { name: 'quinoa', isFresh: false },
          { name: 'courgettes rôties', isFresh: true },
          { name: 'poivrons', isFresh: true },
          { name: 'feta', isFresh: false },
          { name: 'menthe fraîche', isFresh: true },
        ],
        nutriTags: ['fer', 'mag', 'vitc', 'tdah'],
        tdahPause: 'Déjeuner sans réunion — profite de ce moment de calme.',
      },
      {
        type: 'diner',
        title: 'Curry de pois chiches aux épinards',
        time: '19h30',
        ingredients: [
          { name: 'pois chiches', isFresh: false },
          { name: 'épinards', isFresh: true },
          { name: 'tomates concassées', isFresh: false },
          { name: 'lait de coco', isFresh: false },
          { name: 'curry', isFresh: false },
        ],
        nutriTags: ['fer', 'mag', 'alk', 'tdah'],
        conseil: 'Repas végétarien riche en fer. Accompagner d\'un jus de citron pour optimiser l\'absorption.',
      },
    ],
  },
  {
    date: '2026-04-30',
    mode: 'normal',
    sjsrAlert: 'Fin du mois — bilan nutritionnel. Avez-vous pris vos compléments de fer cette semaine ?',
    meals: [
      {
        type: 'matin',
        title: 'Granola maison & yaourt aux fruits',
        time: '7h30',
        ingredients: [
          { name: 'granola maison', isFresh: false },
          { name: 'yaourt nature', isFresh: true },
          { name: 'fraises', isFresh: true },
          { name: 'miel', isFresh: false },
        ],
        nutriTags: ['vitc', 'dopa', 'fun'],
      },
      {
        type: 'midi',
        title: 'Pâtes aux palourdes et persil',
        time: '12h30',
        ingredients: [
          { name: 'linguines', isFresh: false },
          { name: 'palourdes', isFresh: true },
          { name: 'ail', isFresh: false },
          { name: 'persil', isFresh: true },
          { name: 'vin blanc', isFresh: false },
        ],
        nutriTags: ['fer', 'omega3', 'zinc', 'b12'],
        conseil: 'Les palourdes sont l\'une des sources les plus riches en fer et en vitamine B12.',
      },
      {
        type: 'diner',
        title: 'Soupe miso, tofu et algues wakamé',
        time: '19h30',
        ingredients: [
          { name: 'pâte miso', isFresh: false },
          { name: 'tofu soyeux', isFresh: false },
          { name: 'algues wakamé', isFresh: false },
          { name: 'ciboulette', isFresh: true },
        ],
        nutriTags: ['fer', 'mag', 'tdah'],
        conseil: 'Le miso est un probiotique naturel — excellent pour l\'axe intestin-cerveau.',
      },
    ],
  },
];

// Obtenir les données d'un jour spécifique
export function getDayData(dateStr: string): DayData | null {
  return MENUS_AVRIL_2026.find(d => d.date === dateStr) || null;
}

// Obtenir toutes les dates avec des données pour un mois
export function getDatesWithMenus(year: number, month: number): Set<string> {
  const prefix = `${year}-${String(month).padStart(2, '0')}`;
  const result = new Set<string>();
  MENUS_AVRIL_2026.forEach(d => {
    if (d.date.startsWith(prefix)) result.add(d.date);
  });
  return result;
}

// Obtenir le prochain repas du jour
export function getNextMeal(dayData: DayData): { meal: DayData['meals'][0]; label: string } | null {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTime = hours * 60 + minutes;

  const timeToMinutes = (t: string): number => {
    const [h, m] = t.replace('h', ':').split(':').map(Number);
    return h * 60 + (m || 0);
  };

  for (const meal of dayData.meals) {
    if (meal.time) {
      const mealTime = timeToMinutes(meal.time);
      if (mealTime > currentTime) {
        const diff = mealTime - currentTime;
        const diffH = Math.floor(diff / 60);
        const diffM = diff % 60;
        const label = diffH > 0 ? `dans ${diffH}h${diffM > 0 ? diffM : ''}` : `dans ${diffM} min`;
        return { meal, label };
      }
    }
  }
  return null;
}
