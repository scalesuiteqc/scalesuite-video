# ScaleSuite « Le lead perdu » : plan scène par scène (à valider)

Film d'acquisition · 9:16 (1080 × 1920) · 25,0 s · 60 fps · fonctionne sans le son · français (Québec)
Fichiers : `scalesuite-lead-perdu-9x16*` · Public : leaders d'équipes de 4 à 15 courtiers, Montréal et Rive-Sud.

Identité, lisibilité et mouvement : ceux de la V3 (`design-dna-v3.json`, skill `scalesuite-video`).
Nouveauté : la règle sonore ajoutée à la skill (4 à 6 effets doux au maximum).

---

## Le fil visuel : la carte du lead

Un seul objet traverse les 25 s : la **carte du lead**, toujours dessinée de la même façon.

```
┌──────────────────────────────────────────────┐
│ ● LEAD VENDEUR   (pastille d'encre, 34 px)    │
│ Maison à vendre · Longueuil      (40 px)      │
│ mar. 21 h 04                     (32 px)      │
└──────────────────────────────────────────────┘   760 × 190, rayon 30
```

- Aucun nom de personne : la carte est reconnaissable par sa pastille d'encre (réservée au lead, comme
  en V3), « Longueuil » et l'heure.
- Elle naît deux fois **de la même annonce** « Commandité · votreagence.ca » : à l'accroche (le
  problème) et à l'acte 3 (la solution). Même annonce, même soir, autre destination.

## Deux mondes

| | Le problème (0 – 10,6 s) | Avec ScaleSuite (10,6 – 25 s) |
|---|---|---|
| Fond | gris bleuté clair `#EEF1F4`, lumières ambiantes grises | `#F7FBFA` et menthe `#E8F9F7` (V3) |
| Cartes | `#FAFBFC`, ombre neutre | `#FFFFFF`, ombre teintée menthe |
| Texte secondaire | `#6B7480` | `#5E6B69` |
| Accent | ardoise `#7C8A99` (mot d'accent des titres) | turquoise `#14A89B`, vert `#1D9E75` |
| Lead | pastille d'encre ; devient gris `#A9B0B8` à « Trop tard. » | pastille d'encre, pastille verte « Nouveau » |
| Mouvement | plus lent, plus lourd, aucun dépassement | dépassement réservé aux héros (4 à 12 %) |

Fond clair partout, aucune scène sombre. Aucun rouge (réservé au chaos de la V3). La bascule entre
les deux mondes n'est pas un fondu : c'est un disque menthe qui éclot depuis la carte du lead (motif V3).

## Courbe de rythme

```
énergie
  ▲                                                         ★ notification (18,7 s, 75 %)
  │                                                       ███
  │  ███                                      ▄▄▄▄▄▄▄▄▄▄██████
  │ █████▄▄▄▄                         ▄▄▄▄▄██████████████████▄▄
  │ ██████████▄▄▄▄▄▄▄▄▄            ▄▄██████████████████████████████▄▄▄▄▄▄▄
  │ ████████████████████▄▄▄ ▁▁▁ ███████████████████████████████████████████
  └──────────────────────────────────────────────────────────────────────────▶ t
   0 accroche   3 boîte partagée → le temps passe   8,4 trop tard  10,6 bascule  15,9 lead → CRM → téléphone  20,8 fin  25
```

- **Acte 1 (0 – 3,0 s)** : net, immédiat. Tout est lisible dès l'image 0.
- **Acte 2 (3,0 – 10,6 s)** : l'énergie descend. Les mouvements ralentissent (650 → 900 ms), la
  musique s'amincit jusqu'à presque rien sur « Trop tard. ». Respiration de 1,5 s.
- **Acte 3 (10,6 – 25 s)** : bascule nette, puis montée régulière jusqu'à la notification, la
  scène la plus longue (4,9 s). Fin posée à 22,8 s et tenue 2,2 s.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition vers la suivante |
|---|---|---|---|---|---|
| 1 · Accroche | 0,0 – 3,0 | 3,0 s | **Image 0 (affiche), tout est déjà lisible** : titre « Un lead vendeur / arrive à **21 h**. » (104 px, y 220–440). Dessous, un résultat Google de 900 px : « **Commandité** · votreagence.ca », « Vendre votre maison à Longueuil » (40 px). Sous l'annonce, la bande « Votre équipe · 8 courtiers » : huit avatars ronds. À 0,5 s, un doigt appuie sur l'annonce (onde) ; l'annonce se **compresse en carte du lead** (0,6 – 1,1 s, écrasement d'anticipation). À 1,3 s, la ligne « **Qui le prend?** » monte sous le titre, et les huit avatars se tournent vers la carte (petite inclinaison, 60 ms de décalage). État tenu de 1,6 à 3,0 s. | Lente avancée 1,00 → 1,04 (sinus). | **Élément partagé** : la carte du lead tombe (arc, ease-in) et devient la première ligne de la boîte de réception qui monte du bas. |
| 2 · Une boîte pour toute l'équipe | 3,0 – 5,6 | 2,6 s | Carte « **Boîte de réception de l'équipe** » de 900 px. En-tête : pastille « 1 campagne · 8 courtiers » et l'horloge « mar. 21 h 04 ». Quatre lignes déjà là : « Lead acheteur · Brossard », « Lead vendeur · Saint-Lambert », « Demande d'info · Boucherville », « Lead acheteur · Montréal ». Notre lead s'emboîte en haut, en gras, avec la pastille « **Non lu** ». Titre : « Une boîte pour / toute l'**équipe**. » État tenu de 4,1 à 5,6 s. | Suit la chute de la carte (coup de fouet vers le bas en arc, flou de vitesse, < ⅓ d'écran par clé), puis se pose à 1,10 sur la boîte. | **Continu** : même boîte, l'horloge se met à tourner. |
| 3 · Le temps passe | 5,6 – 8,4 | 2,8 s | L'horloge roule : « mar. 23 h 47 » (5,9 s) → « mer. 8 h 15 » (6,8 s) → « mer. 14 h 30 » (7,6 s). À chaque saut, une ou deux nouvelles lignes s'insèrent au-dessus ; notre lead glisse vers le bas et reste « Non lu » (contour ardoise pour le suivre). Titre : « Toujours / **non lu**. » tenu de 5,8 à 8,4 s. | Panoramique lent vers le bas qui garde le lead au centre, léger resserrement 1,10 → 1,16. | **Appui** sur la ligne du lead. |
| 4 · Trop tard | 8,4 – 10,6 | 2,2 s | Un appui ouvre enfin le lead : « Non lu » devient « Ouvert · mer. 14 h 32 ». Puis la carte **devient grise** (couleur et pastille), et s'affaisse de 10 px (900 ms, lent, sans rebond). Les autres lignes s'atténuent à 30 %. Titre : « **Trop tard.** » (150 px), tenu de 9,2 à 10,6 s. Aucun chiffre. | Avancée sur la carte 1,16 → 1,26, puis fixe. | **Retour en arrière** : l'horloge revient à « mar. 21 h 04 » (roulement rapide, 0,35 s), la liste se défait à l'envers, la carte reprend ses couleurs, puis un **disque menthe éclot** depuis la carte et recouvre le cadre (monde ScaleSuite). |
| 5 · Avec ScaleSuite | 10,6 – 12,4 | 1,8 s | Sur la menthe, la marque ScaleSuite apparaît par balayage. Titre : « **Avec ScaleSuite.** » (124 px) et sous-titre « Même lead. Même soir. » (44 px). État tenu de 11,2 à 12,4 s. | Lente avancée 1,00 → 1,03. | **Élément partagé** : le logo rétrécit dans l'en-tête de la carte « Campagnes · Votre agence ». |
| 6 · Chaque courtier, sa campagne | 12,4 – 15,9 | 3,5 s | Carte de 900 px, cinq lignes qui s'emboîtent (60 ms de décalage, 4 % de dépassement) : « Courtier 01 · Montréal », « Courtier 02 · Brossard », « Courtier 03 · Longueuil », « Courtier 04 · Saint-Lambert », « Courtier 05 · Boucherville », chacune avec « Campagne Google Ads » et « ● Active ». Pastille d'en-tête : « Optimisées chaque semaine ». Titre : « Chaque courtier / a sa **campagne**. », tenu de 13,1 à 14,6 s. Puis la ligne 03 prend un halo turquoise, les autres s'atténuent ; elle **s'ouvre en son annonce** : « Commandité · votreagence.ca », « Vendre votre maison à Longueuil », « Courtier 03 · Votre agence ». Annonce lisible de 14,8 à 15,9 s. | Légère avancée pendant que les lignes se posent, puis poussée sur la ligne 03 (1,0 → 1,2) pendant qu'elle s'ouvre. | **Appui** sur l'annonce : elle se compresse en **la même carte du lead** que dans l'accroche. |
| 7 · Chez Courtier 03 (point culminant) | 15,9 – 20,8 | **4,9 s** | **a)** La carte du lead naît de l'annonce (15,9 – 16,3 s) et glisse le long d'une ligne turquoise courte, droit dans la carte « **CRM · Courtier 03** ». Elle s'y emboîte en première ligne, avec une pastille verte « **Nouveau** » (10 % de dépassement) et « mar. 21 h 04 ». État tenu de 17,1 à 18,3 s. **b)** Téléphone de Courtier 03, écran verrouillé « mardi 13 octobre », « 21:04 ». La **notification ScaleSuite** tombe du haut (12 % de dépassement, vibration de 3 oscillations amorties) : « ScaleSuite · maintenant », « **Nouveau lead vendeur** · Longueuil », « ✓ Ajouté à votre CRM ». Titre : « Chaque lead / chez son **courtier**. », tenu de 19,0 à 20,8 s. | Suit la carte le long de la ligne (arc), poussée dans la carte CRM, puis coup de fouet vers le bas jusqu'au téléphone, cadré serré et coupé par le bas (notification entre y 1000 et 1400). | **Morphose** : la notification s'aplatit en ligne, la ligne se contracte en nœud, le nœud devient la marque. Le téléphone tombe hors du cadre (ease-in). |
| 8 · Fin | 20,8 – 25,0 | 4,2 s | Logo complet (balayage de la marque, montée des lettres), « Google Ads pour les équipes immobilières. » (44 px). Le bouton naît d'un nœud et s'étire en « **Demander une démo →** » (10 % de dépassement), puis « scalesuiteqc.ca » (40 px). Tout est posé à 22,8 s et tenu jusqu'à 25,0 s (reflet sur le bouton). | Avancée de 1 %. | Fin. |

Durées : 3,0 · 2,6 · 2,8 · 2,2 · 1,8 · 3,5 · **4,9** · 4,2 s.

### États tenus (≥ 1,2 s immobiles et lisibles)

| État | Tenu |
|---|---|
| Accroche complète (titre + carte du lead + équipe + « Qui le prend? ») | 1,6 – 3,0 s (1,4 s) |
| Boîte partagée, lead « Non lu » | 4,1 – 5,6 s (1,5 s) |
| « Toujours non lu. » (le titre ne bouge pas ; seuls l'horloge et les lignes avancent) | 5,8 – 8,4 s (2,6 s) |
| « Trop tard. », lead gris | 9,2 – 10,6 s (1,4 s) |
| « Avec ScaleSuite. Même lead. Même soir. » | 11,2 – 12,4 s (1,2 s) |
| « Chaque courtier a sa campagne. » | 13,1 – 14,6 s (1,5 s) |
| Lead dans le CRM de Courtier 03 | 17,1 – 18,3 s (1,2 s) |
| Notification + « Chaque lead chez son courtier. » | 19,0 – 20,8 s (1,8 s) |
| Fin (logo, slogan, bouton, URL) | 22,8 – 25,0 s (2,2 s) |

Aucun cadre vide ou à moitié coupé plus de 0,3 s : chaque transition passe par un objet (carte,
disque, logo, notification), jamais par un écran vide.

---

## Règles appliquées

- **Lisibilité** : interface de 900 px (83 %) ; texte d'interface ≥ 30 px à l'écran, libellés
  principaux 40 px ; titres 104 à 150 px entre y 200 et 560 ; produit entre y 600 et 1500 ; rien de
  critique sous y 1500 ni à x > 930 ; `SS.scrim` sous les titres posés sur une interface qui bouge ;
  `SS.band` pour un titre qui change dans la même case.
- **Mouvement** : courbes `SS.EZ` de la V3 ; aucune interpolation linéaire dans l'espace ; décalages
  de 35 à 80 ms (< 500 ms par groupe) ; dépassement seulement sur les héros (pastille « Nouveau »,
  notification, bouton) et **jamais dans le monde du problème** ; règle du tiers ; un héros par temps ;
  trois couches (primaire, secondaire, ambiante) ; aucun fondu de scène.
- **Déterminisme** : `fromTo()` uniquement, états initiaux explicites, flou procédural ; contrôles
  `determinism` et `motion 25` à OK avant livraison.

## Son

### Effets sonores : 4 au total (règle de la skill)

| # | Temps | Moment | Son | Niveau |
|---|---|---|---|---|
| 1 | 10,6 s | Bascule (retour en arrière, éclosion menthe) | souffle inversé discret, filtré | ≥ 6 dB sous la musique |
| 2 | 15,9 s | Appui sur l'annonce de Courtier 03 | clic feutré très léger | ≥ 6 dB sous la musique |
| 3 | 18,7 s | Notification (point culminant) | double vibration sourde, basse, filtrée (pas de « ding ») | ≥ 6 dB sous la musique |
| 4 | 22,0 s | Le bouton « Demander une démo » naît | souffle doux qui s'ouvre | ≥ 6 dB sous la musique |

Rien d'autre : ni l'appui de l'accroche, ni les lignes, ni l'horloge, ni « Trop tard. » n'ont d'effet.
Aucune cloche, aucun son aigu ou brillant. Sous la voix, les effets restent sous la voix.

### Musique (`audio/music-lead-perdu.py`, même méthode que la V3)

- **Acte 1 – 2** : nappe froide et clairsemée en ré mineur, piano feutré grave, pulsation d'horloge
  intégrée à la musique (douce, qui ralentit). Elle s'amincit jusqu'à une seule note tenue sur
  « Trop tard. » (9,2 – 10,6 s).
- **Bascule (10,6 s)** : la note tenue s'aspire, puis la musique s'ouvre en majeur.
- **Acte 3** : le groove néo-soul de la V3, plus doux et sans pings. Au point culminant, la signature
  de quatre notes (do, fa, mi, la) jouée une fois au piano feutré, médium, dans la musique.
- **Fin** : résolution en fa majeur sous le logo.
- Mix à −15 LUFS / −1,5 dBTP ; pistes `bed` et `sfx` pour le mixage de la voix.

## Voix hors champ

Voir `brag-output/voiceover-lead-perdu.md` (7 répliques, ≤ 2,7 mots/s, respirations sur « Trop tard. »,
la bascule et la notification).

---

## Choix à arbitrer (avec recommandation)

1. **Identité du lead** : aucune personne nommée ; la carte « LEAD VENDEUR · Maison à vendre ·
   Longueuil · mar. 21 h 04 » suffit à la reconnaître. *Recommandé.* (Variante : initiales fictives.)
2. **Dates** : mardi 13 octobre 2026 à 21 h 04 (un mardi en 2026), ouverture le mercredi 14 octobre
   à 14 h 32. *Recommandé.*
3. **Taille de l'équipe montrée** : 8 courtiers dans l'accroche (dans la fourchette 4 à 15), 5
   lignes visibles à l'acte 3 pour garder le texte en 40 px. *Recommandé.*
4. **Optimisation hebdomadaire** : une pastille « Optimisées chaque semaine » dans l'en-tête des
   campagnes et la mention dans la voix (« optimisée chaque semaine »). L'IA et l'équipe ne sont pas
   nommées à l'écran pour garder une idée par écran. *Recommandé.*
5. **Signature musicale à la notification** : jouée dans la musique, au piano feutré médium, sans
   timbre de cloche (ce n'est pas un effet sonore). *Recommandé.* Variante : aucune note à cet instant,
   seulement la vibration sourde.
6. **Sous-titre de la bascule** « Même lead. Même soir. » : rend la comparaison évidente sans voix.
   *Recommandé.*

## Fichiers (aucun fichier existant modifié)

- Sources : `scalesuite-film/index-lead-perdu.html`, `src/scenes-lead-perdu/*.js`,
  `src/styles-lead-perdu.css`, `src/film-lead-perdu.js`, `render/*-lead-perdu.*`,
  `audio/music-lead-perdu.py`, `build-lead-perdu.sh`. `core.js`, `logo.js`, `styles.css` et
  `core-v3.js` sont chargés en lecture seule.
- Sorties (`brag-output/`) : `scalesuite-lead-perdu-9x16.mp4` (master 1080 × 1920, 60 fps),
  `previews/scalesuite-lead-perdu-9x16-preview.mp4` (540 × 960, 30 fps),
  `scalesuite-lead-perdu-9x16-keyframes.jpg` (planche des images clés),
  `scalesuite-lead-perdu-9x16-contact-sheet.jpg`, `scalesuite-lead-perdu-9x16-poster.jpg`,
  `audio-lead-perdu/`, `voiceover-lead-perdu.md`.

## Étapes

1. Validation de ce plan.
2. Une image fixe 540 × 960 par moment clé (9 images, une planche contact), sans animation. Validation.
3. Aperçu animé complet 540 × 960 avec la musique. Validation.
4. Master 1080 × 1920, 60 fps, contrôle qualité.

---

## Validation du plan et ajustements de l'étape 2 (images fixes)

Plan, voix hors champ et les 6 recommandations validés. Ajout demandé à la scène 4 et ajustements de
timing qui en découlent (la voix hors champ ne change pas) :

- **Scène 4** : sous « Trop tard. », la ligne « **Le vendeur a signé ailleurs.** » (56 px, gris
  `#6B7480` du monde du problème) apparaît 0,3 s après le titre (9,05 → 9,35 s) et reste lisible
  jusqu'à 10,8 s (≈ 1,25 s). Le retour en arrière passe de 10,6 à **10,8 s**.
- **Durée totale : 25,2 s** (+0,2 s). Tout ce qui suit la bascule est décalé d'environ 0,2 à 0,7 s
  pour garder chaque état tenu au moins 1,2 s.
- **Scène 3** : les nouveaux leads arrivent à 5,85, 6,45 et 7,05 s, pour que l'état « lendemain » soit
  immobile de 7,7 à 10,8 s.
- **Scène 7** : le titre « Chaque lead chez son courtier. » arrive avec le lead dans le CRM (17,55 s)
  et reste jusqu'à 20,95 s, par-dessus la notification (19,4 s, ≈ 77 % du film). Une seule idée pour
  les deux preuves (CRM, puis téléphone), au lieu d'un écran sans titre.

| # | Temps | Scène |
|---|---|---|
| 1 | 0,0 – 3,0 | Accroche |
| 2 | 3,0 – 5,6 | Boîte de l'équipe |
| 3 | 5,6 – 8,4 | Toujours non lu |
| 4 | 8,4 – 10,8 | Trop tard. / Le vendeur a signé ailleurs. |
| 5 | 10,8 – 12,95 | Avec ScaleSuite. (tenu 11,6 – 12,8) |
| 6 | 12,95 – 16,55 | Chaque courtier a sa campagne (tenu 13,5 – 14,75), annonce de Courtier 03 (tenue 15,35 – 16,55) |
| 7 | 16,55 – 21,0 | Lead dans le CRM (tenu 17,8 – 19,0), notification (tenue 19,7 – 21,0) |
| 8 | 21,0 – 25,2 | Fin, posée à ≈ 23,1 s et tenue jusqu'à 25,2 s |

Effets sonores (inchangés, 4) : 10,8 s souffle inversé · 16,55 s clic feutré · 19,4 s vibration
sourde · 22,2 s souffle doux.

Planche des images clés : `brag-output/scalesuite-lead-perdu-9x16-keyframes.jpg` (11 images
540 × 960 rendues depuis la timeline, sans animation).
