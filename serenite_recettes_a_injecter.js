// ════════════════════════════════════════════════════════════════════
// FICHIER D'INJECTION — Application Sérénité
// 13 nouvelles recettes à ajouter dans le tableau DINERS
//
// Sources :
//   - Livre "500 Recettes Sans Gluten" de Carole Garnier (Leduc.s Éditions)
//   - Fiche "Alimentation sans gluten" — Société Nationale Française
//     de Gastro-Entérologie (SNFGE)
//
// INSTRUCTIONS D'INTÉGRATION :
//
// ÉTAPE 1 — Ajouter le bouton "Brunch" dans la section filtres :
//   Chercher : <button class="diner-filter" onclick="filterDiners('entree',this)">🥗 Entrées</button>
//   Ajouter AVANT cette ligne :
//   <button class="diner-filter" onclick="filterDiners('brunch',this)">🌅 Brunch</button>
//
// ÉTAPE 2 — Ajouter les recettes ci-dessous dans le tableau DINERS :
//   Chercher la fin du tableau :
//       tags:["sjsr","soupe","anti-inflammatoire","soir"]}];
//   Remplacer "}];" par "}," et coller tout le code ci-dessous avant le "];
// ════════════════════════════════════════════════════════════════════

  // ── NOUVELLES RECETTES · Livre "500 Recettes Sans Gluten" (C. Garnier, Leduc.s) & Fiche SNFGE ──

  {cat:"brunch",time:"10 min",name:"Granola au lait de soja",
   ingr:"Lait de soja 1L · 4 abricots secs · 4 pruneaux · 2 kiwis · 100g amandes · 1cs graines de courge · 1cc cannelle",
   steps:"1. La VEILLE : couper abricots et pruneaux en dés. Couvrir d'eau minérale. Dans un autre bol, amandes + graines de courge, couvrir d'eau. Tremper 12h.\n2. Le lendemain : égoutter et mixer amandes grossièrement (grumeleux, pas en poudre).\n3. Grand bol : mélange mixé + pruneaux/abricots + kiwis en rondelles + cannelle.\n4. Verser lait de soja. Mélanger délicatement.\n5. Très consistant — idéal avant une longue journée.\n🌿 SJSR : graines de courge = magnésium + zinc. Amandes = tryptophane.",
   tags:["sjsr","vegan","brunch","magnésium"]},

  {cat:"brunch",time:"5 min",name:"Bowl quinoa aux fruits et épices",
   ingr:"500g quinoa cuit (batch) · 1 mangue · 1 banane · 4 abricots secs · 1cs sirop d'érable · 1cc cannelle · 1 pincée quatre-épices",
   steps:"1. Quinoa du batch (cuit la veille, frigo).\n2. Mangue en dés, banane en rondelles, abricots secs en lanières aux ciseaux.\n3. Grand bol : quinoa + sirop d'érable + fruits. Mélanger.\n4. Cannelle + quatre-épices. Servir frais.\n⚡ TDAH : zéro cuisson, tout vient du batch. Prêt en 5 min !\n🌿 Quinoa = protéines complètes. Mangue = vitamine C → absorption fer boostée.",
   tags:["brunch","vegan","rapide","tdah"]},

  {cat:"brunch",time:"15 min",name:"Pancakes flocons de millet",
   ingr:"200g flocons de millet (à mixer en farine) · 2 oeufs · 200ml lait avoine · 1cs huile neutre · 1 pincée sel",
   steps:"1. Mixer flocons de millet 30 sec en farine fine.\n2. Fouetter oeufs + lait avoine + huile + sel.\n3. Ajouter farine de millet. Pâte homogène. Reposer 5 min.\n4. Poêle antiadhésive légèrement huilée, feu moyen. 2-3 min jusqu'aux bulles. Retourner. 1-2 min.\n5. Servir avec fruits rouges + miel ou mangue + coco râpée.\n🌿 Millet = magnésium + silice. Excellent petit-déjeuner anti-SJSR.",
   tags:["brunch","sjsr","magnésium"]},

  {cat:"brunch",time:"50 min",name:"Muesli croustillant coco-chocolat",
   ingr:"200g flocons de riz · 30g riz soufflé · 75g pétales de maïs non sucrés · 1cs coco râpée · 75g sirop d'érable · 1cs huile de colza · 50g chocolat noir 85% râpé",
   steps:"1. Four 160°C.\n2. Chauffer sirop d'érable + huile jusqu'à fluide. Hors feu : ajouter flocons + riz soufflé + pétales de maïs + coco. Bien enrober.\n3. Fine couche sur plaque avec papier cuisson. Four 45 min en remuant toutes les 15 min.\n4. REFROIDIR COMPLÈTEMENT avant d'ajouter le chocolat râpé (sinon il fond !).\n5. Boîte hermétique 2 semaines. Servir avec lait de millet.\n🍫 Chocolat 85% = magnésium + dopamine naturelle.",
   tags:["brunch","dopamine","préparation"]},

  {cat:"brunch",time:"15 min",name:"Muesli fruits secs torréfié",
   ingr:"200g flocons de riz · 200g flocons de soja · 50g noisettes · 50g amandes effilées · 50g raisins secs · 50g cranberries séchées · 20g sucre de canne",
   steps:"1. Mélanger flocons de riz + soja + noisettes + amandes effilées.\n2. Grande poêle antiadhésive CHAUDE sans huile. Feu moyen. Dorer 5-6 min en remuant constamment.\n3. Verser dans un plat. REFROIDIR COMPLÈTEMENT.\n4. Ajouter raisins + cranberries + sucre de canne. Conserver en pot en verre.\n🌿 Cranberries = antioxydants. Raisins secs = fer naturel. Noisettes = magnésium.",
   tags:["brunch","vegan","antioxydant","préparation"]},

  {cat:"plat",time:"12 min",name:"Crêpes à l'amarante",
   ingr:"125g farine d'amarante · 25cl lait d'avoine · 3 oeufs · 1cs huile d'olive · 1 pincée sel",
   steps:"1. Farine d'amarante dans saladier. Creuser un puits.\n2. Fouetter oeufs + lait + huile + sel dans un bol. Verser dans le puits. Pâte fluide.\n3. REPOSER 30 min minimum — indispensable pour l'amarante.\n4. Poêle huilée feu moyen-vif. Louche de pâte. 2 min jusqu'à surface sèche. Retourner. 1 min.\n5. Salé : épinards + tofu + sauce soja. Sucré : miel + fruits rouges.\n🌿 Amarante = protéines complètes + fer + magnésium. Plus nutritive que le sarrasin !",
   tags:["sjsr","proteine","fer","magnésium"]},

  {cat:"plat",time:"15 min",name:"Galettes sarrasin tofu-épinards",
   ingr:"250g farine sarrasin · 1 oeuf · 500ml eau · 1cc sel · Garniture : tofu émietté + épinards surgelés + sauce soja",
   steps:"1. Farine sarrasin + sel + oeuf. Eau progressivement — pâte très fluide. Reposer 20 min.\n2. GARNITURE : tofu émietté poêle 3 min feu vif. Épinards surgelés 2 min. Sauce soja.\n3. Poêle très chaude légèrement huilée. Fine couche de pâte. 3 min — bords se détachent. Retourner. 1 min.\n4. Garniture au centre. Replier les 4 côtés en carré.\n🌿 Fer sarrasin + protéines tofu + magnésium épinards = repas anti-SJSR complet.",
   tags:["sjsr","fer","magnésium","complet"]},

  {cat:"plat",time:"25 min",name:"Curry quinoa pois chiches",
   ingr:"200g quinoa (batch ou à cuire) · 2 carottes · 1 boîte pois chiches · 400ml lait coco · 1cc curry Masala · 1cc curcuma · 1cc gingembre frais · sel",
   steps:"1. Quinoa du batch ou cuire 12 min (2x volume eau).\n2. Carottes en rondelles. Revenir dans 1cs huile 5 min.\n3. Ajouter curry + curcuma + gingembre frais râpé. Remuer 2 min.\n4. Pois chiches égouttés + lait coco. Mijoter 10 min feu moyen. Sel.\n5. Servir sur quinoa avec coco râpée optionnel.\n🌿 Trio anti-inflammatoire : curry + curcuma + gingembre. Pois chiches = protéines + magnésium.",
   tags:["sjsr","vegan","anti-inflammatoire","complet"]},

  {cat:"soupe",time:"20 min",name:"Potage froid chou-fleur à l'aneth",
   ingr:"1 chou-fleur · 400ml bouillon légumes · 2cs huile olive · 1cc aneth séché · 200ml lait avoine · sel · poivre",
   steps:"1. Chou-fleur en fleurettes. Cuire eau bouillante salée 15 min.\n2. Égoutter. Mixer avec bouillon chaud + huile d'olive + aneth.\n3. Ajouter lait d'avoine. Mixer jusqu'à texture très lisse. Sel + poivre.\n4. FROID : frigo minimum 2h. Excellent l'été.\n5. OU chaud immédiatement — les deux sont délicieux.\n🌿 Chou-fleur = vitamine C + anti-inflammatoire. Aneth = relaxe les muscles lisses.",
   tags:["sjsr","vegan","vitC","soupe"]},

  {cat:"dessert",time:"3h10",name:"Granité de poire au citron",
   ingr:"4 poires mûres · jus de 2 citrons · 2cs miel bio · 100ml eau",
   steps:"1. Éplucher poires. Mixer avec jus de citron + miel + eau jusqu'à texture lisse.\n2. Plat Pyrex au congélateur.\n3. Toutes les 30 min pendant 3h : gratter avec une fourchette pour créer des cristaux.\n4. Servir dans des verres froids.\n⚡ TDAH : 10 min de préparation, le congélateur fait le reste !\n🌿 Poire = potassium. Citron = vitamine C → absorption du fer boostée.",
   tags:["dessert","vegan","vitC","léger"]},

  {cat:"dessert",time:"45 min",name:"Clafoutis cerises anti-SJSR",
   ingr:"300g cerises (ou poires, prunes) · 3 oeufs · 80g sucre · 80g farine de riz · 300ml lait avoine · 1cc vanille",
   steps:"1. Préchauffer four 180°C. Beurrer un plat à gratin. Cerises au fond.\n2. Fouetter oeufs + sucre 2 min — mélange clair et mousseux.\n3. Farine de riz + vanille. Mélanger. Incorporer lait d'avoine progressivement.\n4. Verser sur les cerises. Four 35 min.\n5. Gonflé et doré — retombe en refroidissant (normal !).\n🌿 Cerises = mélatonine naturelle → sommeil + réduction SJSR.\n🌿 Lait d'avoine = magnésium. Idéal comme dessert du soir !",
   tags:["dessert","sjsr","végétarien","cerises"]},

  {cat:"base",time:"55 min",name:"Pain multicéréales maison",
   ingr:"150g farine de riz · 150g farine de sarrasin · 100g farine de manioc · 50g farine de quinoa · 1 sachet levure boulanger déshydratée (8g) · 1cc sel · 200ml eau tiède",
   steps:"1. Préchauffer four 180°C.\n2. Mélanger toutes les farines + levure + sel dans un grand saladier.\n3. Ajouter l'eau progressivement en mélangeant à la cuillère.\n4. La pâte doit être collante comme une pâte à cake — PAS une boule lisse (c'est NORMAL et c'est le SECRET).\n5. Verser dans un moule à manqué huilé (large = meilleure levée). Reposer 30 min.\n6. Enfourner 45 min. Taper en dessous : sonne creux = cuit.\n⚠️ Farine de manioc = disponible en magasin bio (La Fourche ou Biocoop).",
   tags:["base","vegan","pain"]},

  {cat:"base",time:"30 min",name:"Pain express aux graines oméga-3",
   ingr:"200g farine de riz · 1 sachet levure chimique sans gluten · 2 oeufs · 25cl crème coco VietCoco · 4cs huile de sésame · 2cs graines de lin doré · 2cs graines de tournesol décortiquées · 1cc graines de pavot · sel",
   steps:"1. Préchauffer four 210°C.\n2. Battre oeufs + crème coco VietCoco + huile de sésame + sel.\n3. Incorporer farine de riz + levure chimique. Mélanger.\n4. Ajouter toutes les graines. Mélanger.\n5. Verser dans moule à cake huilé. Cuire 30 min. Couteau propre = cuit.\n🌿 Huile sésame + graines de lin + graines de tournesol = trio oméga-3 anti-inflammatoire.\n💡 Idéal pour accompagner sardines, saumon ou rillettes de poisson.",
   tags:["base","sjsr","omega3"]},

// ════════════════════════════════════════════════════════════════════
// FIN DU BLOC À INJECTER
// Pensez à fermer le tableau avec ];
// ════════════════════════════════════════════════════════════════════
