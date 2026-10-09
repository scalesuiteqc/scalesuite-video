# ScaleSuite « Gardez vos courtiers. Attirez les prochains. » : plan scène par scène (à valider)

Film d'acquisition · 9:16 (1080 × 1920) · **28,0 s** · 60 fps · fonctionne sans le son · français (Québec)
Fichiers : `scalesuite-equipe-9x16*` · Public : leaders d'équipes de 4 à 15 courtiers, Montréal et Rive-Sud.

Même identité, même pipeline et mêmes réglages que « Le lead perdu » (deux mondes, règle sonore, effets
de référence). Aucun fichier existant n'est modifié : nouveaux fichiers suffixés `equipe`.

---

## Le fil visuel : la grille de l'équipe

Une carte « Votre équipe » de 8 courtiers, en **grille 2 × 4** de cartes courtier (composant V3 « Carte
courtier » réduit à 430 × 140) : avatar rond neutre de 76 px (silhouette, aucun visage), « Courtier 0X »
en 40 px, une ligne 2 en 30 px qui change selon le moment (leads reçus, puis campagne).

```
┌───────────────────────┐  ┌───────────────────────┐
│ ◯  Courtier 01        │  │ ◯  Courtier 02        │
│    (ligne 2, 30 px)   │  │    (ligne 2, 30 px)   │
└───────────────────────┘  └───────────────────────┘
┌───────────────────────┐  ┌ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┐
│ ◯  Courtier 03        │     Poste à combler         ← Courtier 04 parti
└───────────────────────┘  └ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
          …  (4 rangées, de y 860 à 1456)  …
```

- La grille est présente du début à la fin. Courtier 04 la quitte pendant le problème ; sa place devient
  une carte pointillée « **Poste à combler** », qui est remplie pendant la solution par **Courtier 09**.
- Grille : x 315 et 765, rangées à 152 px d'intervalle, de y 860 à 1456 (zone produit, rien de critique
  sous y 1500). Texte critique à x < 930.

## Deux mondes (comme « Le lead perdu »)

| | Le problème (0 – 10,8 s) | Avec ScaleSuite (10,8 – 28 s) |
|---|---|---|
| Fond | gris bleuté clair `#EEF1F4` | `#F7FBFA` et menthe `#E8F9F7` |
| Avatars | ardoise `#8796A6` sur `#E1E6EB` | vert `#1D9E75` sur menthe |
| Accent des titres | ardoise `#6E8092` | turquoise `#14A89B` |
| Mouvement | lent, lourd, aucun dépassement | dépassement réservé aux héros (pastilles, nouvel avatar, bouton) |

Fond clair partout, aucun rouge. La bascule est un disque menthe qui éclot depuis le « bassin commun »,
qui disparaît ainsi de l'histoire.

## Courbe de rythme

```
énergie
  ▲                                                    ♥ arrivée de Courtier 09 (20,3 s, 73 %)
  │ ███                                    ▄▄▄▄▄▄▄▄▄████▄▄▄
  │ ████▄▄▄▄▄▄▄▄▄▄▄                ▄▄▄▄▄▄██████████████████▄▄▄▄▄▄▄
  │ ███████████████▄▄▄▄  ▁▁▁   ▄▄▄██████████████████████████████████▄▄▄▄▄▄
  └──────────────────────────────────────────────────────────────────────────▶ t
   0 départ  2,4 bassin  5,0 attribution  8,6 il part  10,8 ScaleSuite  13,8 ses leads  16,8 recrutement  22,6 fin  28
```

- **Problème** : l'énergie descend jusqu'au départ, sobre et lent (900 ms), presque sans musique.
- **Solution** : montée régulière jusqu'au **moment chaleureux** (l'arrivée de Courtier 09), puis
  conclusion posée. La fin est tenue 2,0 s.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition vers la suivante |
|---|---|---|---|---|---|
| 1 · Accroche | 0,0 – 2,4 | 2,4 s | **Image 0 (affiche), lisible tout de suite** : « Votre meilleur courtier / vient de **partir.** » (104 px) au-dessus de la grille de l'équipe : 7 cartes ardoise et la carte pointillée « Poste à combler » à la place de Courtier 04. À 1,7 s, une pastille « **Quelques mois plus tôt** » apparaît et la carte de Courtier 04 remonte à sa place (le départ, joué à l'envers). | Fixe, grille centrée (y 640 – 1240). | **Panoramique vers le haut** : la grille descend à sa place (y 860) et révèle au-dessus le bassin commun. |
| 2 · Le bassin commun | 2,4 – 5,0 | 2,6 s | Carte « **Bassin commun · Équipe** » (900 × 230) au-dessus de la grille. Trois leads y tombent l'un après l'autre (pastilles 30 px) : « Lead vendeur · Brossard », « Lead vendeur · Saint-Lambert », « Demande d'info · Montréal ». Titre : « Tous les leads / dans un **bassin commun.** » État tenu de 3,6 à 5,0 s. | Panoramique lent (1,0 s, sinus). | **Continu** : les leads quittent le bassin. |
| 3 · Les bons leads | 5,0 – 8,6 | 3,6 s | Les leads quittent le bassin un par un et se posent sur une carte : **on ne voit ni qui décide ni comment**, seulement le résultat. « Lead vendeur · Brossard » → Courtier 02 ; « Lead vendeur · Saint-Lambert » → Courtier 06 ; « Demande d'info · Montréal » → **Courtier 04**. Un deuxième « Demande d'info » arrive et va encore à Courtier 04. La carte de Courtier 04 a un contour ardoise (on suit son point de vue), les autres s'atténuent légèrement. Titre en citation : « **Les bons leads allaient / toujours aux autres.** » avec « — Courtier 04 » (40 px) dessous. État tenu de 7,2 à 8,6 s. | Légère avancée vers Courtier 04 (1,00 → 1,06). | La carte de Courtier 04 se soulève. |
| 4 · Le départ | 8,6 – 10,8 | 2,2 s | Sobre et un peu triste : la carte de Courtier 04 se soulève de 10 px, perd ses couleurs, puis glisse lentement vers le bas et sort du cadre (0,9 s, sinus, aucun rebond). À sa place reste la carte pointillée « Poste à combler », comme à l'image 0. Titre : « Avec un bassin commun, / quelqu'un doit **décider.** » (structurel, aucun blâme). État tenu de 9,6 à 10,8 s. | Recul lent 1,06 → 1,00. | **Le bassin se contracte en nœud**, le nœud éclot en disque menthe qui couvre le cadre. |
| 5 · Avec ScaleSuite | 10,8 – 13,8 | 3,0 s | La grille reprend les couleurs ScaleSuite (cartes blanches, avatars verts). Titre : « Avec ScaleSuite, chaque / courtier a sa **campagne.** » Sur chaque carte, la ligne 2 devient sa pastille de campagne « ◎ Montréal », « ◎ Brossard », « ◎ Longueuil », « ◎ Saint-Lambert », « ◎ Boucherville » (5 secteurs, certains partagés), une par une (décalage de 60 ms, 4 % de dépassement). La carte pointillée reste « Poste à combler ». État tenu de 12,4 à 13,8 s. | Panoramique doux qui recentre la grille. | **Continu** : les campagnes produisent leurs leads. |
| 6 · Ses leads, sa campagne | 13,8 – 16,8 | 3,0 s | Titre : « **Ses leads.** / Sa campagne. » (124 px). Sur quatre cartes, un lead **sort de la pastille de campagne de la carte elle-même** et s'y loge (« + Lead vendeur », « + Lead acheteur »…). Aucun lead ne voyage d'une carte à l'autre, donc rien ne suggère un routage. État tenu de 15,2 à 16,8 s. | Fixe. | La grille s'atténue sous la carte d'offre. |
| 7 · Le recrutement | 16,8 – 22,6 | 5,8 s | Titre : « Quand vous recrutez, / vous offrez du **concret.** » Une **carte d'offre** (900 × 360) monte par-dessus la grille, atténuée à 30 % : pastille « Offre · Nouveau courtier », « **Votre propre campagne Google Ads, dès votre arrivée.** » (44 px), pastilles « ◎ Votre secteur » et « Optimisée chaque semaine ». Tenue de 17,6 à 19,8 s. Puis **la carte d'offre se resserre dans la place vide** et devient la carte de **Courtier 09** : l'avatar apparaît avec un léger dépassement (10 %) et un halo vert qui s'ouvre, et sa pastille « ◎ Boucherville » se pose. La grille revient, complète. **Moment chaleureux**, tenu de 20,7 à 22,6 s. | Légère avancée sur la place vide pendant le resserrement (1,00 → 1,05), puis retour. | Le titre change, la grille reste. |
| 8 · Fin | 22,6 – 28,0 | 5,4 s | « **Gardez vos courtiers.** / Attirez les **prochains.** » au-dessus de la grille complète, tenu de 23,1 à 24,5 s. Puis la grille se contracte en un nœud qui devient la marque : logo complet, « Google Ads pour les équipes immobilières. », bouton « **Demander une démo →** » qui naît d'un nœud (10 % de dépassement), « scalesuiteqc.ca ». Tout est posé à 26,0 s et tenu jusqu'à 28,0 s. | Avancée de 1 %. | Fin. |

Durées : 2,4 · 2,6 · 3,6 · 2,2 · 3,0 · 3,0 · **5,8** · 5,4 s.

### États tenus (≥ 1,2 s immobiles et lisibles)

| État | Tenu |
|---|---|
| Accroche (titre, grille avec la place vide) | 0,0 – 1,6 s (1,6 s), puis « Quelques mois plus tôt » 2,0 – 3,4 s |
| Bassin commun avec ses trois leads | 3,6 – 5,0 s (1,4 s) |
| « Les bons leads allaient toujours aux autres. » — Courtier 04 | 7,2 – 8,6 s (1,4 s) |
| Place vide, « quelqu'un doit décider » | 9,6 – 10,8 s (1,2 s) |
| « Avec ScaleSuite, chaque courtier a sa campagne. » + pastilles | 12,4 – 13,8 s (1,4 s) |
| « Ses leads. Sa campagne. » + leads logés | 15,2 – 16,8 s (1,6 s) |
| Carte d'offre | 17,6 – 19,8 s (2,2 s) |
| Grille complète avec Courtier 09 | 20,7 – 22,6 s (1,9 s) |
| « Gardez vos courtiers. Attirez les prochains. » | 23,1 – 24,5 s (1,4 s) |
| Fin (logo, slogan, bouton, URL) | 26,0 – 28,0 s (2,0 s) |

---

## Règles appliquées

- **Lisibilité** : cartes de 430 px en grille de 880 px (81 % du cadre), noms en 40 px, lignes 2 et
  pastilles en 30 px minimum, titres de 96 à 124 px entre y 200 et 560, rien de critique sous y 1500 ni
  à x > 930. Voile clair sous les titres quand l'interface bouge dessous.
- **Mouvement** : courbes `SS.EZ`, aucune interpolation linéaire dans l'espace, décalages de 35 à 80 ms
  (< 500 ms par groupe), dépassement seulement sur les héros et jamais dans le monde du problème, règle
  du tiers, un héros par temps, trois couches, aucun fondu de scène. Le départ est lent et retenu ;
  l'arrivée est la seule entrée avec un vrai rebond.
- **Contenu** : aucune promesse de rétention, aucun chiffre, aucune statistique. On montre le
  mécanisme : chaque courtier a sa campagne et reçoit les leads de sa campagne. Aucun routage par
  secteur, aucune règle d'attribution, aucun leader ni réceptionniste à l'écran. La répartition n'est
  jamais présentée comme injuste ni comme la faute de quelqu'un : la citation est la perception de
  Courtier 04 (« Pour lui… » dans la voix), et le titre suivant nomme la cause structurelle.
- **Déterminisme** : `fromTo()` uniquement, contrôles `determinism` et `motion` à OK avant livraison.

## Son

### Effets sonores : 4 (réglage de référence de « Le lead perdu »)

| # | Temps | Moment | Son | Niveau visé |
|---|---|---|---|---|
| 1 | 9,0 s | Courtier 04 quitte la grille | souffle descendant très discret, passe-bas | −10 à −12 dB sous la musique |
| 2 | 10,8 s | Bascule (le bassin se contracte, éclosion menthe) | souffle inversé (`breath`, `'rise'`) | ≈ −9,7 dB |
| 3 | 20,3 s | Courtier 09 rejoint la grille | souffle chaud qui s'ouvre + clic feutré très léger | ≈ −8 à −10 dB |
| 4 | 25,2 s | Le bouton naît | souffle doux (`breath`, `'swell'`) | ≈ −10,2 dB |

Aucun effet pour les leads qui tombent, les cartes ou les pastilles : le mouvement suffit. Aucune
cloche, aucun « ding ».

### Musique (`audio/music-equipe.py`, même méthode et mêmes instruments que « Le lead perdu »)

- **Problème** : ré mineur froid et clairsemé, piano feutré grave, nappe basse. Au départ de Courtier
  04, une courte phrase descendante au piano feutré, puis une note tenue (sobre, sans pathos).
- **Bascule** : la note est aspirée, la musique s'ouvre en fa majeur.
- **Solution** : le groove néo-soul doux de « Le lead perdu ». À l'arrivée de Courtier 09, la signature
  de quatre notes (do, fa, mi, la) au piano feutré médium, avec une nappe chaude qui s'ouvre : c'est le
  point chaleureux de la bande son.
- **Fin** : résolution en fa majeur sous le logo. Mix −15 LUFS / −1,5 dBTP ; pistes `bed` et `sfx`.

## Voix hors champ

Voir `brag-output/voiceover-equipe.md` : 8 répliques, ≤ 2,7 mots/s, respirations sur le départ et sur
l'arrivée de Courtier 09.

---

## Choix à arbitrer (avec recommandation)

1. **Grille en cartes 2 × 4** (avatar rond + « Courtier 0X » en 40 px) plutôt qu'une grille de ronds
   seuls 4 × 2, où les noms tomberaient sous 40 px et où les pastilles de secteur ne tiendraient pas en
   30 px. *Recommandé.*
2. **Citation** : « Les bons leads allaient toujours aux autres. » entre guillemets, signée « —
   Courtier 04 », pour marquer que c'est sa perception. *Recommandé.*
3. **Place vide** : carte pointillée « Poste à combler » (image 0, puis remplie par le recrutement).
   *Recommandé.*
4. **Retour en arrière** : pastille « Quelques mois plus tôt », sans date. *Recommandé* (aucune date
   affichée dans tout le film, donc rien à vérifier côté calendrier).
5. **Cause structurelle à l'écran** : « Avec un bassin commun, quelqu'un doit décider. », puis la voix
   répond « Avec ScaleSuite, il n'y a rien à décider. ». *Recommandé.*
6. **Nouveau courtier** : « Courtier 09 », campagne « ◎ Boucherville ». *Recommandé.*
7. **Leads dans la solution** : chaque lead sort de la pastille de campagne de sa propre carte, sans
   trajet entre cartes, pour ne jamais suggérer un routage. *Recommandé.*
8. **Effet sonore du départ** : souffle descendant très discret (1 des 4 effets). *Recommandé.*
   Variante : départ porté par la musique seule, et 3 effets au total.
9. **Durée** : 28,0 s (le haut de la fourchette), pour tenir le moment chaleureux 1,9 s et la fin 2,0 s.
   *Recommandé.*

## Fichiers (aucun fichier existant modifié)

- Sources : `scalesuite-film/index-equipe.html`, `src/scenes-equipe/*.js`, `src/styles-equipe.css`,
  `src/film-equipe.js`, `render/*-equipe.*`, `audio/music-equipe.py`, `build-equipe.sh`. Chargés en
  lecture seule : `core.js`, `logo.js`, `styles.css`, `core-v3.js`, `styles-v3.css`.
- Sorties (`brag-output/`) : `scalesuite-equipe-9x16.mp4`, `previews/scalesuite-equipe-9x16-preview.mp4`,
  `scalesuite-equipe-9x16-keyframes.jpg`, `scalesuite-equipe-9x16-contact-sheet.jpg`,
  `scalesuite-equipe-9x16-poster.jpg`, `audio-equipe/`, `voiceover-equipe.md`.

## Étapes

1. Validation de ce plan.
2. Une image fixe 540 × 960 par moment clé (planche contact, sans animation). Validation.
3. Aperçu animé 540 × 960 avec musique et planche horodatée. Validation.
4. Master 1080 × 1920, 60 fps, contrôle qualité.
