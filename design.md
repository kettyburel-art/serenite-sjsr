# Sérénité · Anti-SJSR & TDAH — Design Document

## Brand Identity

**Palette de couleurs :**
- Fond principal : `#faf6f3` (crème chaud)
- Fond secondaire : `#f5ede8` (rose pâle)
- Nuit / Header : `#3a2030` (prune profond)
- Accent principal : `#c45c78` (rose foncé / blossom)
- Pétale rose : `#f2c4ce`
- Feuille claire : `#a8c89a`
- Feuille foncée : `#5a8a5a`
- TDAH violet : `#7c5cbf`
- TDAH clair : `#ede8f8`
- Dopamine orange : `#e07840`
- Pistil doré : `#d4a843`
- Écorce : `#6b4c3b`

**Typographie :**
- Titres : Cormorant Garamond (serif élégant)
- Corps : Nunito (sans-serif arrondi, lisible)

---

## Screen List

1. **Accueil / Calendrier** (`index.tsx`) — Vue calendrier mensuel avec repas planifiés
2. **Détail du jour** (`day-detail.tsx`) — Panel avec repas du jour, conseils TDAH, infos nutritionnelles
3. **Outils TDAH** (`tools.tsx`) — Pause impulsion, techniques de régulation, minuteur
4. **Budget** (`budget.tsx`) — Suivi des dépenses alimentaires, historique
5. **Profil / Paramètres** (`settings.tsx`) — Préférences, rappels, mode nuit

---

## Primary Content & Functionality

### Accueil / Calendrier
- Grille 7 colonnes du mois en cours
- Chaque jour affiche : indicateur de repas planifié, livraison, batch cooking, anniversaire
- Barre budget en haut (dépensé / total)
- Alerte SJSR du jour (rappel magnésium, fer, etc.)
- Boutons d'impulsion rapide TDAH (toujours visibles)
- Navigation entre mois

### Détail du jour (Bottom Sheet)
- Repas du jour : Matin, Midi, Goûter, Dîner
- Chaque repas : titre, ingrédients (tags colorés), étiquettes nutritionnelles
- Question de pause TDAH avant chaque repas
- Bannières spéciales : livraison, batch cooking, anniversaire
- Prochain repas mis en avant

### Outils TDAH
- 4 boutons d'impulsion rapide : Pause 5 min, Liste envies, Règle 10€, Respiration
- Minuteur de pause intégré
- Journal des envies impulsives
- Techniques de régulation émotionnelle

### Budget
- Solde restant du mois
- Barre de progression visuelle
- Historique des dépenses
- Catégories : courses, livraison, restaurant

### Paramètres
- Rappels repas (notifications)
- Budget mensuel configurable
- Mode sombre / clair
- Informations SJSR personnalisées

---

## Key User Flows

**Flow 1 — Consulter les repas du jour :**
1. Ouvrir l'app → Calendrier visible
2. Taper sur le jour actuel → Bottom sheet s'ouvre
3. Voir les repas planifiés avec ingrédients et conseils

**Flow 2 — Gérer une impulsion TDAH :**
1. Envie d'achat impulsif → Taper "Liste envies"
2. Écrire l'envie → Attendre 24h
3. Revoir la liste → Décider en conscience

**Flow 3 — Suivre le budget :**
1. Onglet Budget → Voir solde restant
2. Ajouter une dépense
3. Visualiser la progression du mois

---

## Layout Principles

- **Portrait 9:16**, usage à une main
- Header sticky avec gradient prune
- Bottom sheet pour détails (évite la navigation)
- Tab bar 5 onglets : Calendrier, Aujourd'hui, Outils, Budget, Réglages
- Cartes arrondies avec ombres douces
- Couleurs sémantiques : vert = nutritif, violet = TDAH, rose = douceur, or = énergie
