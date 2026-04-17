/* ============================
   FLŌRA — Application Logic
   Version 1.0 MVP
   ============================*/

'use strict';

// ============================
// DATA — Recettes
// ============================
const RECETTES = [
  // --- PETITS-DÉJEUNERS (gratuit) ---
  {
    id: 1, cat: 'petit-dejeuner', premium: false,
    emoji: '🥣', nom: 'Chia pudding mangue-gingembre',
    temps: '5 min + 8h', calories: 320, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Riche en oméga-3 (chia) pour réduire l\'inflammation. Le gingembre soulage les douleurs articulaires. Idéal avant coucher pour favoriser le sommeil.',
    ingredients: [
      '40g graines de chia',
      '250ml lait de coco',
      '1/2 mangue fraîche',
      '1 cm gingembre frais râpé',
      '1 c.à.c miel ou sirop d\'agave',
      '1 pincée de curcuma'
    ],
    etapes: [
      'Mélangez le chia, le lait de coco, le gingembre râpé et le miel dans un bocal.',
      'Incorporez le curcuma et mélangez bien.',
      'Réfrigérez toute la nuit (minimum 4h).',
      'Au moment de servir, déposez les dés de mangue fraîche sur le dessus.',
      'Ajoutez quelques graines de courge si disponibles.'
    ]
  },
  {
    id: 2, cat: 'petit-dejeuner', premium: false,
    emoji: '🍌', nom: 'Porridge sarrasin banane-cannelle',
    temps: '10 min', calories: 360, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Le sarrasin est riche en magnésium, essentiel pour les jambes (SJSR). La banane apporte du tryptophane précurseur de sérotonine.',
    ingredients: [
      '60g flocons de sarrasin',
      '200ml lait d\'avoine',
      '1 banane mûre',
      '1/2 c.à.c cannelle',
      '1 c.à.s beurre d\'amande',
      '1 c.à.c miel'
    ],
    etapes: [
      'Faites chauffer le lait d\'avoine à feu moyen.',
      'Ajoutez les flocons de sarrasin et la cannelle, mélangez.',
      'Laissez cuire 5 min en remuant jusqu\'à consistance crémeuse.',
      'Écrasez la moitié de la banane dans le porridge.',
      'Servez avec le reste de banane en rondelles, le beurre d\'amande et le miel.'
    ]
  },
  {
    id: 3, cat: 'petit-dejeuner', premium: false,
    emoji: '🥑', nom: 'Toast de riz à l\'avocat & graines',
    temps: '8 min', calories: 290, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'L\'avocat est riche en vitamine E, puissant anti-oxydant. Les graines de chanvre apportent des protéines complètes et des oméga-6 équilibrés.',
    ingredients: [
      '2 galettes de riz',
      '1 avocat mûr',
      '1 c.à.c graines de chanvre',
      '1 c.à.c graines de sésame',
      '1/2 citron',
      'Sel Santé, poivre',
      'Piment d\'Espelette (optionnel)'
    ],
    etapes: [
      'Écrasez l\'avocat à la fourchette avec le jus de citron.',
      'Assaisonnez avec le Sel Santé et le poivre.',
      'Étalez sur les galettes de riz.',
      'Parsemez de graines de chanvre et sésame.',
      'Ajoutez le piment d\'Espelette selon votre tolérance.'
    ]
  },

  // --- DÉJEUNERS (gratuit + premium) ---
  {
    id: 4, cat: 'dejeuner', premium: false,
    emoji: '🐟', nom: 'Saumon gingembre graines de lin',
    temps: '20 min', calories: 480, diff: 'Moyen',
    tags: ['sg', 'sl'],
    benefices: 'Combinaison d\'oméga-3 (saumon + lin) pour une action anti-inflammatoire puissante. Le gingembre renforce l\'effet. Idéal 2-3x/semaine.',
    ingredients: [
      '150g pavé de saumon',
      '1 c.à.s huile d\'olive',
      '1 c.à.c graines de lin moulues',
      '1 cm gingembre frais',
      '1/2 citron',
      '150g épinards frais',
      'Herbes : ciboulette, persil',
      'Sel Santé'
    ],
    etapes: [
      'Préchauffez le four à 180°C ou préparez une poêle à feu moyen.',
      'Badigeonnez le saumon d\'huile d\'olive et de gingembre râpé.',
      'Assaisonnez avec le Sel Santé, enfournez 12-15 min ou poêlez 3-4 min chaque côté.',
      'Faites revenir les épinards à l\'huile d\'olive, 2 min.',
      'Dressez : épinards, saumon, graines de lin, herbes fraîches et jus de citron.'
    ]
  },
  {
    id: 5, cat: 'dejeuner', premium: false,
    emoji: '🥗', nom: 'Salade pois chiches-basilic',
    temps: '10 min', calories: 390, diff: 'Très facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Les légumineuses sont la base de l\'alimentation anti-inflammatoire. Riches en fer et en fibres, elles stabilisent la glycémie et réduisent les douleurs.',
    ingredients: [
      '200g pois chiches cuits',
      '1 bouquet de basilic',
      '1 tomate',
      '1/2 concombre',
      '1 c.à.s huile d\'olive',
      '1/2 citron',
      '1 gousse d\'ail',
      'Sel Santé, cumin'
    ],
    etapes: [
      'Rincez les pois chiches et égouttez-les.',
      'Coupez la tomate et le concombre en dés.',
      'Émincez l\'ail finement ou pressez-le.',
      'Mélangez tout dans un saladier.',
      'Assaisonnez avec l\'huile d\'olive, le jus de citron, le cumin et le Sel Santé.',
      'Ajoutez le basilic ciselé au dernier moment.'
    ]
  },
  {
    id: 6, cat: 'dejeuner', premium: true,
    emoji: '🍲', nom: 'Curry lentilles corail-curcuma',
    temps: '25 min', calories: 420, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Le curcuma + poivre noir = biodisponibilité maximale de la curcumine. Les lentilles corail apportent un fer facilement assimilable.',
    ingredients: [
      '180g lentilles corail',
      '400ml lait de coco',
      '1 c.à.c curcuma',
      '1/2 c.à.c poivre noir',
      '1 oignon',
      '2 gousses d\'ail',
      '1 c.à.c gingembre moulu',
      'Épinards, coriandre'
    ],
    etapes: [
      'Faites revenir oignon et ail dans l\'huile de coco.',
      'Ajoutez le curcuma, le gingembre, le poivre — 1 min.',
      'Incorporez les lentilles et le lait de coco.',
      'Couvrez et laissez mijoter 18-20 min.',
      'Ajoutez les épinards en fin de cuisson, servez avec la coriandre.'
    ]
  },
  {
    id: 7, cat: 'dejeuner', premium: true,
    emoji: '🥙', nom: 'Brandade morue-courgettes',
    temps: '30 min', calories: 380, diff: 'Moyen',
    tags: ['sg', 'sl'],
    benefices: 'La morue est une source de protéines légères et de vitamine D, souvent déficitaire en cas de douleurs chroniques.',
    ingredients: [
      '200g morue dessalée',
      '2 courgettes',
      '3 c.à.s huile d\'olive',
      '2 gousses d\'ail',
      '1 citron',
      'Persil frais',
      'Sel Santé'
    ],
    etapes: [
      'Pochez la morue dans l\'eau frémissante 8 min.',
      'Faites cuire les courgettes à la vapeur 10 min.',
      'Émiettez la morue, mixez les courgettes avec l\'huile d\'olive.',
      'Mélangez les deux préparations avec l\'ail pressé.',
      'Ajoutez le jus de citron et le persil. Servez tiède.'
    ]
  },

  // --- DÎNERS ---
  {
    id: 8, cat: 'diner', premium: false,
    emoji: '🐠', nom: 'Papillote saumon-légumes verts',
    temps: '25 min', calories: 350, diff: 'Facile',
    tags: ['sg', 'sl'],
    benefices: 'La cuisson en papillote préserve tous les nutriments et oméga-3. Les brocolis apportent la vitamine C qui améliore l\'absorption du fer.',
    ingredients: [
      '150g saumon',
      '100g brocolis',
      '50g haricots verts',
      '1/2 courgette',
      '1 c.à.s huile d\'olive',
      '1/2 citron',
      'Thym, romarin',
      'Sel Santé'
    ],
    etapes: [
      'Préchauffez le four à 180°C.',
      'Découpez une feuille de papier cuisson assez grande.',
      'Disposez les légumes au centre, posez le saumon dessus.',
      'Arrosez d\'huile d\'olive et de jus de citron, ajoutez les herbes.',
      'Fermez la papillote hermétiquement et enfournez 20 min.'
    ]
  },
  {
    id: 9, cat: 'diner', premium: false,
    emoji: '🥣', nom: 'Velouté poireau-patate douce',
    temps: '30 min', calories: 280, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Soupe douce pour le soir : la patate douce est riche en bêta-carotène anti-inflammatoire. Les poireaux sont prébiotiques pour le microbiote.',
    ingredients: [
      '2 poireaux',
      '1 patate douce',
      '500ml bouillon de légumes',
      '1 c.à.s huile d\'olive',
      '1 c.à.c curcuma',
      'Graines de courge',
      'Sel Santé'
    ],
    etapes: [
      'Émincez les poireaux et coupez la patate douce en cubes.',
      'Faites revenir les poireaux dans l\'huile d\'olive 5 min.',
      'Ajoutez la patate douce et le bouillon.',
      'Laissez mijoter 20 min jusqu\'à ce que les légumes soient tendres.',
      'Mixez finement, ajoutez le curcuma, rectifiez l\'assaisonnement.',
      'Servez avec les graines de courge toastées.'
    ]
  },
  {
    id: 10, cat: 'diner', premium: true,
    emoji: '🥩', nom: 'Agneau polenta pistaches',
    temps: '35 min', calories: 520, diff: 'Moyen',
    tags: ['sg', 'sl'],
    benefices: 'L\'agneau est la viande la plus riche en fer héminique (combat la fatigue SJSR). Les pistaches sont anti-inflammatoires et riches en magnésium.',
    ingredients: [
      '150g épaule d\'agneau',
      '80g polenta',
      '300ml bouillon',
      '30g pistaches',
      'Romarin, ail',
      '1 c.à.s huile d\'olive',
      'Sel Santé'
    ],
    etapes: [
      'Faites mariner l\'agneau avec le romarin, l\'ail et l\'huile d\'olive 30 min.',
      'Faites cuire la polenta dans le bouillon 5 min en remuant.',
      'Saisissez l\'agneau à feu vif 3 min de chaque côté.',
      'Laissez reposer 5 min avant de trancher.',
      'Dressez la polenta, disposez l\'agneau et parsemez de pistaches concassées.'
    ]
  },

  // --- SNACKS ---
  {
    id: 11, cat: 'snack', premium: false,
    emoji: '🟤', nom: 'Boules énergie datte-amande-cacao',
    temps: '15 min + 1h frigo', calories: 180, diff: 'Très facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Combo parfait SJSR : le magnésium des amandes + le fer des dattes + la théobromine du cacao. Snack anti-fatigue sans sucre ajouté.',
    ingredients: [
      '12 dattes Medjool dénoyautées',
      '80g amandes entières',
      '2 c.à.s cacao en poudre (non sucré)',
      '1 c.à.s beurre d\'amande',
      '1 c.à.c extrait de vanille',
      'Coco râpée pour rouler'
    ],
    etapes: [
      'Mixez les amandes jusqu\'à obtenir une poudre grossière.',
      'Ajoutez les dattes, le cacao, le beurre d\'amande et la vanille.',
      'Mixez jusqu\'à obtenir une masse homogène et collante.',
      'Formez des boules de la taille d\'une noix avec les mains humides.',
      'Roulez dans la coco râpée et réfrigérez 1h minimum.'
    ]
  },
  {
    id: 12, cat: 'snack', premium: false,
    emoji: '🍑', nom: 'Abricots rôtis miel-thym',
    temps: '20 min', calories: 150, diff: 'Très facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Les abricots rôtis concentrent le bêta-carotène et le potassium. Le thym est anti-inflammatoire et facilite la digestion.',
    ingredients: [
      '4 abricots mûrs',
      '1 c.à.s miel',
      '2 branches de thym frais',
      '1 c.à.s jus de citron',
      'Amandes effilées (optionnel)'
    ],
    etapes: [
      'Préchauffez le four à 200°C.',
      'Coupez les abricots en deux et retirez les noyaux.',
      'Disposez-les face coupée vers le haut dans un plat.',
      'Arrosez de miel et de jus de citron, déposez le thym.',
      'Enfournez 15 min jusqu\'à ce qu\'ils soient dorés et fondants.',
      'Ajoutez les amandes effilées toastées avant de servir.'
    ]
  },
  {
    id: 13, cat: 'snack', premium: true,
    emoji: '🍫', nom: 'Mousse choco noir-cerise-piment',
    temps: '15 min + 2h frigo', calories: 220, diff: 'Facile',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Le cacao à 85% est l\'un des aliments les plus riches en flavonoïdes anti-inflammatoires. La cerise réduit les marqueurs de l\'inflammation (études SJSR).',
    ingredients: [
      '80g chocolat 85%',
      '200ml lait de coco entier',
      '100g cerises dénoyautées',
      '1 pincée de piment de Cayenne',
      '1 c.à.c extrait de vanille'
    ],
    etapes: [
      'Faites fondre le chocolat au bain-marie.',
      'Fouettez le lait de coco réfrigéré jusqu\'à consistance de crème fouettée.',
      'Incorporez délicatement le chocolat fondu refroidi.',
      'Ajoutez la vanille et le piment de Cayenne.',
      'Répartissez dans des verrines avec les cerises.',
      'Réfrigérez 2h minimum avant de servir.'
    ]
  },
  {
    id: 14, cat: 'snack', premium: true,
    emoji: '🍑', nom: 'Fondant pêche-noisette-farine de riz',
    temps: '35 min', calories: 260, diff: 'Moyen',
    tags: ['sg', 'sl', 'vg'],
    benefices: 'Alternative goûteuse au gâteau classique, sans gluten ni lactose. Les noisettes apportent de la vitamine E protectrice.',
    ingredients: [
      '2 pêches mûres',
      '150g farine de riz',
      '80g noisettes moulues',
      '2 œufs',
      '60ml huile de coco',
      '60g sucre de fleur de coco',
      '1/2 c.à.c levure chimique'
    ],
    etapes: [
      'Préchauffez le four à 170°C. Beurrez un moule avec l\'huile de coco.',
      'Fouettez les œufs avec le sucre jusqu\'à blanchiment.',
      'Ajoutez l\'huile de coco fondue.',
      'Incorporez la farine de riz, les noisettes moulues et la levure.',
      'Coupez les pêches en fines tranches et intégrez-les à la pâte.',
      'Enfournez 25-28 min. Laissez refroidir avant de démouler.'
    ]
  }
];

// ============================
// DATA — Jours & Repas
// ============================
const JOURS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
const JOURS_FULL = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
const REPAS = [
  { label: 'Petit-déj', slug: 'petitdej', cat: 'petit-dejeuner' },
  { label: 'Déjeuner',  slug: 'dejeuner', cat: 'dejeuner' },
  { label: 'Dîner',     slug: 'diner',    cat: 'diner' }
];

const RECETTES_PAR_CAT = {
  'petit-dejeuner': () => RECETTES.filter(r => r.cat === 'petit-dejeuner'),
  'dejeuner':       () => RECETTES.filter(r => r.cat === 'dejeuner'),
  'diner':          () => RECETTES.filter(r => r.cat === 'diner'),
  'snack':          () => RECETTES.filter(r => r.cat === 'snack'),
};

// ============================
// STATE
// ============================
let profile       = {};
let journal       = {};
let agenda        = {};
let isPremium     = false;
let currentCatFilter = '';
let currentWeekOffset = 0;

// ============================
// INIT
// ============================
window.addEventListener('load', () => {
  loadState();
  // Hide splash after animation
  setTimeout(() => {
    document.getElementById('splash').classList.add('hidden');
    if (!profile.name) {
      document.getElementById('onboarding').classList.remove('hidden');
    } else {
      initApp();
    }
  }, 2100);
});

function loadState() {
  profile   = JSON.parse(localStorage.getItem('flora_profile') || '{}');
  journal   = JSON.parse(localStorage.getItem('flora_journal') || '{}');
  agenda    = JSON.parse(localStorage.getItem('flora_agenda')  || '{}');
  isPremium = localStorage.getItem('flora_premium') === 'true';
}

function saveState() {
  localStorage.setItem('flora_profile', JSON.stringify(profile));
  localStorage.setItem('flora_journal',  JSON.stringify(journal));
  localStorage.setItem('flora_agenda',   JSON.stringify(agenda));
}

// ============================
// ONBOARDING
// ============================
function nextStep(step) {
  document.querySelectorAll('.onboard-step').forEach(el => el.classList.remove('active'));
  document.querySelector(`[data-step="${step}"]`).classList.add('active');
}

function saveOnboarding() {
  const name = document.getElementById('ob-name').value.trim();
  if (!name) { document.getElementById('ob-name').focus(); return; }

  profile = {
    name,
    goal:      document.getElementById('ob-goal').value,
    sansGluten: document.getElementById('ob-sg').checked,
    sansLactose: document.getElementById('ob-sl').checked,
    vegetarien:  document.getElementById('ob-sv').checked,
  };

  saveState();
  document.getElementById('onboarding').classList.add('hidden');
  initApp();
}

// ============================
// APP INIT
// ============================
function initApp() {
  document.getElementById('app').classList.remove('hidden');
  updateDashboard();
  renderRecettes();
  renderAgenda();
  loadProfil();
  setJournalDate();

  // Recette du jour (aléatoire parmi gratuites)
  const free = RECETTES.filter(r => !r.premium);
  const rdj  = free[new Date().getDate() % free.length];
  document.getElementById('recette-du-jour').textContent = rdj.nom;
}

// ============================
// NAVIGATION
// ============================
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => {
    p.classList.add('hidden');
    p.classList.remove('active');
  });

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));

  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.remove('hidden');
    target.classList.add('active');
  }

  const navBtn = document.querySelector(`[data-page="${page}"]`);
  if (navBtn) navBtn.classList.add('active');

  if (page === 'journal')    setJournalDate();
  if (page === 'recettes')   renderRecettes();
  if (page === 'agenda')     renderAgenda();
  if (page === 'profil')     loadProfil();
  if (page === 'generateur') checkGenAccess();
}

// ============================
// DASHBOARD
// ============================
function updateDashboard() {
  const name = profile.name || 'vous';
  const hour = new Date().getHours();
  let greeting = 'Bonsoir';
  if (hour < 12) greeting = 'Bonjour';
  else if (hour < 18) greeting = 'Bonne après-midi';

  document.getElementById('dash-greeting').textContent = `${greeting}, ${name} 🌿`;
  document.getElementById('header-greeting').textContent = name;

  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long' };
  document.getElementById('dash-date').textContent =
    now.toLocaleDateString('fr-FR', opts);

  // Streak
  let streak = 0;
  const today = dateKey(new Date());
  let d = new Date();
  while (true) {
    const k = dateKey(d);
    if (journal[k]) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  document.getElementById('streak-count').textContent = streak;

  // Journal today status
  if (journal[today]) {
    document.getElementById('journal-today-status').textContent = '✅ Entrée enregistrée';
  }

  // Week chart
  renderWeekChart();
}

function renderWeekChart() {
  const container = document.getElementById('week-chart');
  container.innerHTML = '';
  const maxH = 56; // hauteur max en px (conteneur 96px - padding - label)

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const k = dateKey(d);
    const entry = journal[k];
    const dayLabel = JOURS[(d.getDay() + 6) % 7];

    const energie = entry ? entry.energie : 0;
    const heightPx = entry ? Math.max(3, Math.round((energie / 10) * maxH)) : 3;

    const wrap = document.createElement('div');
    wrap.className = 'chart-bar-wrap';
    wrap.innerHTML = `
      <div class="chart-bar ${entry ? 'filled' : ''}"
           style="height:${heightPx}px"
           title="${entry ? `Énergie: ${energie}/10` : 'Pas de données'}"></div>
      <div class="chart-day">${dayLabel}</div>
    `;
    container.appendChild(wrap);
  }
}

// ============================
// JOURNAL
// ============================
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function setJournalDate() {
  const now = new Date();
  const opts = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
  document.getElementById('journal-entry-date').textContent =
    now.toLocaleDateString('fr-FR', opts);
}

function updateSliderVal(sliderId, valId, isStars = false, isSjsr = false) {
  const val = parseFloat(document.getElementById(sliderId).value);
  const el  = document.getElementById(valId);

  if (isStars) {
    const stars = ['★☆☆☆☆','★★☆☆☆','★★★☆☆','★★★★☆','★★★★★'];
    el.textContent = stars[val - 1] || '';
  } else if (isSjsr) {
    const labels = ['Aucun', 'Léger', 'Modéré', 'Fort', 'Très fort', 'Insupportable'];
    el.textContent = labels[val] || val;
  } else if (sliderId === 'sl-duree') {
    el.textContent = val + 'h';
  } else {
    el.textContent = val + '/10';
  }
}

function toggleChip(el) {
  el.classList.toggle('active');
}

function saveJournal() {
  const today = dateKey(new Date());
  const symptoms = Array.from(document.querySelectorAll('#symptom-chips .chip.active'))
    .map(c => c.textContent);

  journal[today] = {
    duree:    parseFloat(document.getElementById('sl-duree').value),
    qualite:  parseInt(document.getElementById('sl-qualite').value),
    sjsr:     parseInt(document.getElementById('sl-sjsr').value),
    energie:  parseInt(document.getElementById('sl-energie').value),
    douleur:  parseInt(document.getElementById('sl-douleur').value),
    symptoms,
    notes:    document.getElementById('journal-notes').value,
    ts:       Date.now()
  };

  saveState();
  updateDashboard();

  const confirm = document.getElementById('save-confirm');
  confirm.classList.remove('hidden');
  setTimeout(() => confirm.classList.add('hidden'), 2500);
}

function switchJTab(tab, el) {
  document.querySelectorAll('.jtab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');

  document.getElementById('jtab-today').classList.add('hidden');
  document.getElementById('jtab-historique').classList.add('hidden');
  document.getElementById(`jtab-${tab}`).classList.remove('hidden');

  if (tab === 'historique') renderHistorique();
}

function renderHistorique() {
  const container = document.getElementById('historique-list');
  const entries   = Object.entries(journal).sort((a, b) => b[0].localeCompare(a[0]));

  if (!entries.length) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-light);margin-top:32px;">Aucune entrée pour l\'instant.</p>';
    return;
  }

  container.innerHTML = entries.map(([date, e]) => {
    const d     = new Date(date + 'T12:00:00');
    const label = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
    const stars = '★'.repeat(e.qualite) + '☆'.repeat(5 - e.qualite);
    return `
      <div class="hist-entry">
        <div class="hist-date">${label}</div>
        <div class="hist-stats">
          <span class="hist-stat">🌙 ${e.duree}h ${stars}</span>
          <span class="hist-stat">⚡ ${e.energie}/10</span>
          <span class="hist-stat">💢 douleur ${e.douleur}/10</span>
          ${e.sjsr > 0 ? `<span class="hist-stat">🦵 SJSR ${e.sjsr}/5</span>` : ''}
          ${e.symptoms && e.symptoms.length ? `<span class="hist-stat">🔹 ${e.symptoms.slice(0,2).join(', ')}</span>` : ''}
        </div>
        ${e.notes ? `<div style="font-size:0.8rem;color:var(--text-mid);margin-top:8px;font-style:italic;">"${e.notes}"</div>` : ''}
      </div>`;
  }).join('');
}

// ============================
// RECETTES
// ============================
function renderRecettes() {
  const search = (document.getElementById('recette-search')?.value || '').toLowerCase();
  const grid   = document.getElementById('recettes-grid');

  let recettes = RECETTES.filter(r => {
    if (currentCatFilter && r.cat !== currentCatFilter) return false;
    if (search && !r.nom.toLowerCase().includes(search)) return false;
    return true;
  });

  grid.innerHTML = recettes.map(r => {
    const locked = r.premium && !isPremium;
    return `
      <div class="recette-card" onclick="${locked ? 'showPremium()' : `openRecette(${r.id})`}">
        <div class="recette-emoji">${r.emoji}${locked ? '<span style="position:absolute;right:8px;top:8px;font-size:1rem;">🔒</span>' : ''}</div>
        <div class="recette-info">
          <div class="recette-name">${r.nom}</div>
          <div class="recette-meta">
            <span class="recette-time">⏱ ${r.temps}</span>
            ${r.premium ? '<span class="recette-tag premium">⭐ Premium</span>' : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  if (!recettes.length) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:32px;">Aucune recette trouvée.</p>';
  }
}

function filterRecettes() { renderRecettes(); }

function filterCat(cat, el) {
  currentCatFilter = cat;
  document.querySelectorAll('#cat-filters .chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  renderRecettes();
}

function openRecette(id) {
  const r = RECETTES.find(x => x.id === id);
  if (!r) return;

  const modal   = document.getElementById('recette-modal');
  const content = document.getElementById('modal-content');

  const tags = [];
  if (r.tags.includes('sg')) tags.push('Sans gluten');
  if (r.tags.includes('sl')) tags.push('Sans lactose');
  if (r.tags.includes('vg')) tags.push('Végétarien');

  content.innerHTML = `
    <div class="modal-recipe-header">
      <div class="modal-recipe-emoji">${r.emoji}</div>
      <div class="modal-recipe-title">${r.nom}</div>
      <div class="recipe-meta-row">
        <span class="chip active">⏱ ${r.temps}</span>
        <span class="chip">${r.calories} kcal</span>
        <span class="chip">${r.diff}</span>
        ${tags.map(t => `<span class="chip">${t}</span>`).join('')}
      </div>
    </div>

    <div class="recipe-benefits">🌿 ${r.benefices}</div>

    <div class="recipe-section-title">Ingrédients (1 personne)</div>
    <ul class="recipe-ingredient-list">
      ${r.ingredients.map(i => `<li>${i}</li>`).join('')}
    </ul>

    <div class="recipe-section-title">Préparation</div>
    <ol class="recipe-steps">
      ${r.etapes.map(e => `<li>${e}</li>`).join('')}
    </ol>

    <div style="margin-top:20px;">
      <button class="btn-primary full-width" onclick="addToAgenda(${r.id})">
        📅 Ajouter à l'agenda
      </button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeModal() {
  document.getElementById('recette-modal').classList.add('hidden');
}

function addToAgenda(recetteId) {
  closeModal();
  // Mémorise la recette à placer et navigue vers l'agenda
  window._pendingRecetteId = recetteId;
  showPage('agenda');
  // Petit message d'aide
  setTimeout(() => {
    const r = RECETTES.find(x => x.id === recetteId);
    if (r) {
      const msg = document.createElement('div');
      msg.style.cssText = 'position:fixed;top:70px;left:50%;transform:translateX(-50%);background:var(--green-deep);color:var(--cream);padding:10px 18px;border-radius:99px;font-size:0.85rem;z-index:999;white-space:nowrap;box-shadow:0 4px 16px rgba(0,0,0,0.2)';
      msg.textContent = `Tapez un repas pour placer "${r.nom}"`;
      document.body.appendChild(msg);
      setTimeout(() => msg.remove(), 3000);
    }
  }, 300);
}

// ============================
// AGENDA
// ============================
function getWeekDates(offset = 0) {
  const now   = new Date();
  const dow   = (now.getDay() + 6) % 7; // 0=lundi
  const start = new Date(now);
  start.setDate(now.getDate() - dow + offset * 7);

  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

function renderAgenda() {
  const dates = getWeekDates(currentWeekOffset);
  const today = dateKey(new Date());

  // Week label
  const startLabel = dates[0].toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
  const endLabel   = dates[6].toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  document.getElementById('week-label').textContent = `${startLabel} – ${endLabel}`;

  const grid = document.getElementById('agenda-grid');
  grid.innerHTML = dates.map((d, i) => {
    const k       = dateKey(d);
    const isToday = k === today;
    const dayData = agenda[k] || {};
    const dayName = JOURS_FULL[i];

    const repasHTML = REPAS.map(r => {
      const slug  = r.slug;
      const recId = dayData[slug];
      const rec   = recId ? RECETTES.find(x => x.id === recId) : null;
      return `
        <div class="agenda-meal" onclick="editAgendaMeal('${k}','${slug}')">
          <div class="meal-label">${r.label}</div>
          <div class="meal-content ${rec ? '' : 'meal-empty'}">${rec ? rec.emoji + ' ' + rec.nom : '+ Ajouter'}</div>
          ${rec ? `<button class="meal-edit-btn" onclick="event.stopPropagation();clearAgendaMeal('${k}','${slug}')">✕</button>` : ''}
        </div>`;
    }).join('');

    return `
      <div class="agenda-day">
        <div class="agenda-day-header ${isToday ? 'today-header' : ''}">
          <span>${dayName} ${d.getDate()}</span>
          ${isToday ? '<span style="font-size:0.7rem;opacity:0.8;">Aujourd\'hui</span>' : ''}
        </div>
        <div class="agenda-meals">${repasHTML}</div>
      </div>`;
  }).join('');
}

function changeWeek(dir) {
  currentWeekOffset += dir;
  renderAgenda();
}

function editAgendaMeal(dk, slug) {
  // Récupère la catégorie depuis l'objet REPAS
  const repasObj = REPAS.find(r => r.slug === slug);
  const cat = repasObj ? repasObj.cat : 'dejeuner';

  // Si une recette est en attente (depuis "Ajouter à l'agenda"), la placer directement
  if (window._pendingRecetteId) {
    const pendingRec = RECETTES.find(x => x.id === window._pendingRecetteId);
    if (pendingRec && pendingRec.cat === cat) {
      setAgendaMeal(dk, slug, window._pendingRecetteId);
      window._pendingRecetteId = null;
      return;
    }
  }

  const recs = RECETTES.filter(r => r.cat === cat && (!r.premium || isPremium));
  if (!recs.length) return;

  const modal   = document.getElementById('recette-modal');
  const content = document.getElementById('modal-content');

  content.innerHTML = `
    <h3 style="font-family:var(--font-display);color:var(--green-deep);margin-bottom:16px;">Choisir pour ce repas</h3>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${recs.map(r => `
        <div class="card" style="cursor:pointer;" onclick="setAgendaMeal('${dk}','${slug}',${r.id})">
          <div class="card-icon">${r.emoji}</div>
          <div class="card-body">
            <div class="card-title">${r.nom}</div>
            <div class="card-sub">⏱ ${r.temps}</div>
          </div>
        </div>`).join('')}
    </div>`;

  modal.classList.remove('hidden');
}

function setAgendaMeal(dk, repas, recId) {
  if (!agenda[dk]) agenda[dk] = {};
  agenda[dk][repas] = recId;
  saveState();
  closeModal();
  renderAgenda();
}

function clearAgendaMeal(dk, repas) {
  if (agenda[dk]) {
    delete agenda[dk][repas];
    saveState();
    renderAgenda();
  }
}

// ============================
// GÉNÉRATEUR
// ============================
function checkGenAccess() {
  // Free users get 3-day generation; premium = unlimited
}

function generateMenu() {
  const duree     = parseInt(document.getElementById('gen-duree').value);
  const priorite  = document.getElementById('gen-priorite').value;

  if (!isPremium && duree > 3) {
    document.getElementById('generated-menu').classList.add('hidden');
    document.getElementById('gen-premium-wall').classList.remove('hidden');
    return;
  }

  document.getElementById('gen-premium-wall').classList.add('hidden');

  const petitsDej = RECETTES.filter(r => r.cat === 'petit-dejeuner' && (!r.premium || isPremium));
  const dejeuners = RECETTES.filter(r => r.cat === 'dejeuner'       && (!r.premium || isPremium));
  const diners    = RECETTES.filter(r => r.cat === 'diner'           && (!r.premium || isPremium));

  const pick = arr => arr[Math.floor(Math.random() * arr.length)];

  const today = new Date();
  let html = '';

  for (let i = 0; i < duree; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });

    const pDej = pick(petitsDej);
    const dej  = pick(dejeuners);
    const din  = pick(diners);

    html += `
      <div class="gen-day-block">
        <div class="gen-day-title">📅 ${label}</div>
        <div class="gen-meal"><div class="gen-meal-label">Petit-déj</div><div class="gen-meal-name">${pDej.emoji} ${pDej.nom}</div></div>
        <div class="gen-meal"><div class="gen-meal-label">Déjeuner</div><div class="gen-meal-name">${dej.emoji} ${dej.nom}</div></div>
        <div class="gen-meal"><div class="gen-meal-label">Dîner</div><div class="gen-meal-name">${din.emoji} ${din.nom}</div></div>
      </div>`;
  }

  const generated = document.getElementById('generated-menu');
  generated.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
      <div style="font-family:var(--font-display);color:var(--green-deep);font-size:1.1rem;">Menu généré ✨</div>
      <button class="btn-primary" onclick="generateMenu()" style="padding:8px 16px;font-size:0.82rem;">🔄 Régénérer</button>
    </div>
    ${html}
    <button class="btn-primary full-width" onclick="applyMenuToAgenda()">Importer dans l'agenda</button>`;

  generated.classList.remove('hidden');
  // Store for import
  generated.dataset.duree = duree;
}

function applyMenuToAgenda() {
  // Basic: navigate to agenda
  showPage('agenda');
}

// ============================
// PROFIL
// ============================
function loadProfil() {
  document.getElementById('p-name').value    = profile.name    || '';
  document.getElementById('p-goal').value    = profile.goal    || 'global';
  document.getElementById('p-sg').checked    = !!profile.sansGluten;
  document.getElementById('p-sl').checked    = !!profile.sansLactose;
  document.getElementById('p-sv').checked    = !!profile.vegetarien;

  const initials = (profile.name || '?').charAt(0).toUpperCase();
  document.getElementById('avatar-initials').textContent   = initials;
  document.getElementById('profil-display-name').textContent = profile.name || 'Mon profil';

  const badge = document.getElementById('profil-plan-badge');
  if (isPremium) {
    badge.textContent = '⭐ Abonné·e Premium';
    badge.className = 'profil-badge premium';
  } else {
    badge.textContent = 'Version gratuite';
    badge.className = 'profil-badge';
  }
}

function saveProfil(btn) {
  profile.name        = document.getElementById('p-name').value.trim();
  profile.goal        = document.getElementById('p-goal').value;
  profile.sansGluten  = document.getElementById('p-sg').checked;
  profile.sansLactose = document.getElementById('p-sl').checked;
  profile.vegetarien  = document.getElementById('p-sv').checked;

  saveState();
  updateDashboard();
  loadProfil();

  // Feedback
  if (btn) {
    btn.textContent = '✅ Enregistré !';
    setTimeout(() => btn.textContent = 'Enregistrer', 2000);
  }
}

function resetApp() {
  if (confirm('Réinitialiser toutes les données ? Cette action est irréversible.')) {
    localStorage.clear();
    window.location.reload();
  }
}

// ============================
// PREMIUM
// ============================
function showPremium() {
  document.getElementById('premium-modal').classList.remove('hidden');
}

function closePremium() {
  document.getElementById('premium-modal').classList.add('hidden');
}

function activatePremiumDemo() {
  isPremium = true;
  localStorage.setItem('flora_premium', 'true');
  closePremium();
  loadProfil();
  renderRecettes();
  alert('✅ Essai Premium activé ! Profitez de toutes les fonctionnalités pendant 7 jours.');
}

const VALID_CODES = ['FLORA2025', 'SJSR2025', 'BIENETRE'];

function checkCode() {
  const code = document.getElementById('promo-code').value.trim().toUpperCase();
  if (VALID_CODES.includes(code)) {
    activatePremiumDemo();
  } else {
    document.getElementById('promo-code').style.borderColor = 'var(--red-soft)';
    setTimeout(() => document.getElementById('promo-code').style.borderColor = '', 2000);
  }
}

function unlockDemo() {
  document.getElementById('promo-code').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('promo-code').focus();
}

// ============================
// SERVICE WORKER
// ============================
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
