# ScaleSuite « Le Système Vendeurs 5 minutes » : film de lancement, plan scène par scène (v2, validée)

Film de lancement · 9:16 (1080 × 1920) · **40,0 s** · 60 fps · fonctionne sans le son · français (Québec)
Fichiers : suffixe `systeme` partout. Aucun fichier existant modifié. Branche `claude/laughing-babbage-qo1pf8`,
PR vers `scalesuiteqc/scalesuite-video` (`main`).
Public : leaders d'équipes de courtiers au Québec.

Cette v2 remplace le plan v1 (validé, images clés faites ; la v1 reste dans l'historique git) par une structure
de **lancement de produit** à la Hormozi : le nom du produit est le héros. On garde tel quel ce qui est
réutilisable : l'horloge, la carte « Votre équipe » avec le Leader, le téléphone et le texto, la relance vers le
Leader seulement, le ruban de 90 jours, le compteur 124, l'identité `design-dna-systeme.json` et le réglage
sonore de « Le lead perdu ».

---

## Textes vérifiés sur scalesuiteqc.ca/fr (page lue le 3 novembre 2026)

| À l'écran | Texte du site | Statut |
|---|---|---|
| Campagne Google Vendeurs, ajustée chaque semaine | « On monte votre campagne Google Vendeurs et on l'ajuste chaque semaine » | conforme (« ajustée », pas « gérée ») |
| Une page aux couleurs de votre équipe | « Une page aux couleurs de votre équipe, faite pour le cellulaire » | conforme |
| Réponse 60 secondes | « Réponse 60 secondes. Un texto au vendeur dans la minute, de jour comme de soir. » | conforme |
| Le bon courtier alerté | « La demande va direct au bon courtier. » | conforme |
| Relance après 10 minutes | « Si personne n'a rappelé en 10 minutes, l'équipe est relancée. » | conforme, sans « Filet 10 minutes » |
| Suivi 90 jours | « Suivi 90 jours. Les vendeurs pas encore prêts sont suivis pendant 90 jours. » | conforme |
| Groupe Mackay, 124 demandes en moins de 7 mois, avec la campagne seule | « 124 demandes en moins de 7 mois. » « résultats de la campagne seule » « Chiffres tirés de Google Ads » | conforme |
| Si on ne livre pas, vous ne payez pas. | « Si on ne livre pas, vous ne payez pas. » (titre de section) | conforme, mot pour mot |
| Aucun contrat. | « Aucun contrat. L'équipe part quand elle veut, avec son compte et sa page. » | conforme |
| Vos demandes ne sont jamais partagées ni revendues. | « Vos demandes ne sont jamais partagées ni revendues à un autre courtier. » | conforme (fin coupée) |
| 3 nouvelles équipes par mois. | « On prend 3 nouvelles équipes par mois. » | conforme |
| Il reste 3 places fondatrices. | « Il reste 3 places fondatrices » | conforme |
| Pour les équipes de courtiers du Québec. | « Pour les équipes de courtiers du Québec. » | conforme |

Absents du film : prix, budget, coût par demande (54 $, 180+), dates de départ (« le 1er du mois », « le 24 »),
« Filet 10 minutes », exclusivité, IA, agences, démo, pourcentages.

## Rareté : constante en tête de fichier

En tête de `src/scenes-systeme/00-commun.js` :

```js
SS.OFFRE = { equipesParMois: 3, placesFondatrices: 3 }; // changez ici, puis ./build-systeme.sh final
```

Les deux phrases et le nombre de places dessinées en dépendent. Il n'y a ni date ni compte à rebours. La
réplique de voix « Trois nouvelles équipes par mois. » devra être réenregistrée si ce nombre change.

---

## Le fil visuel

- **L'horloge** (pastille, petit cadran, chiffres qui roulent). Dans l'accroche, elle saute de 14 h 12 à
  17 h 04 et s'élargit en règle grise. Elle revient en arrière, puis le disque menthe éclot depuis elle, et
  elle devient l'étiquette « Nouveau » du dévoilement (même forme de pastille). Dans la pile, elle revient
  minute par minute : 14 h 12, 14 h 13, 14 h 22, puis en mode date jusqu'au ven. 5 févr.
- **La carte produit « Le Système Vendeurs 5 minutes »** : née du nom dévoilé (élément partagé). Elle se
  remplit d'une ligne cochée par composante, puis reçoit le sceau de garantie. Le nom du produit reste ainsi à
  l'écran presque tout le temps à partir de 6 s.
- **L'étiquette d'étape** du site (« 1 sur 6 », barre à segments) devient « Système Vendeurs 5 minutes ·
  2 sur 5 » au-dessus de chaque titre de la pile, avec une barre de 5 segments.

## Courbe de rythme

```
énergie
  ▲          ★★★ DÉVOILEMENT (6,6 – 7,5 s)              ★★ pile complète (23,5 s)
  │          █████                                       ████
  │ ███      █████▄▄  ▄▄▄  ▄▄▄  ▄▄▄  ▄▄▄  ▄▄▄  ▄▄▄  ▄▄▄  ████
  │ ████▄▄▄ ▄███████████████████████████████████████████████▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  │ ████████████████████████████████████████████████████████████████████████▄▄▄▄▄▄▄▄
  └──────────────────────────────────────────────────────────────────────────────────────▶ t
   0 accroche  3,5 coût  6 NOM   10,1 pile : campagne · réponse · courtier · relance · suivi   25 preuve  27,8 risque  31,4 rareté  33,8 fin  40
```

- **Gris (0 à 6 s, 15 %)** : dense et immédiat, sans longue respiration.
- **Dévoilement (6 à 10,1 s)** : le sommet d'énergie. Le nom en 150 px, la signature de quatre notes au complet.
- **Pile (10,1 à 25,0 s)** : nerveuse, un changement de cadre toutes les 0,5 à 2,8 s, chaque composante tenue
  juste le temps de la lire (au moins 1,2 s). Second sommet : la carte complète, cinq coches, tenue 1,5 s.
- **Preuve et garantie (25 à 31,4 s)** : un cran plus bas, assurées, sans dépassement.
- **Rareté (31,4 à 33,8 s)** : sèche, factuelle.
- **Fin (33,8 à 40 s)** : posée, tenue 2,7 s.

**Densité** : aucune moitié de cadre vide pendant plus de 0,5 s. Chaque cadre a un titre en haut (y 170 à 600)
et un objet en dessous (y 600 à 1500).

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition |
|---|---|---|---|---|---|
| 1 · Accroche (gris) | 0,0 – 3,5 | 3,5 s | Ligne d'étiquette « **Leaders d'équipe de courtiers** » (40 px, ardoise, y 175). Titre en deux temps (88 px, y 240 – 600) : « Le vendeur écrit / à **14 h 12.** » visible dès t = 0, puis « Votre courtier / le voit à **17 h 04.** » (2,3 s). Entre les deux phrases, l'horloge (y 680) roule d'un bloc de 14 h 12 à 17 h 04 (1,9 – 2,6 s) et s'élargit en **règle grise 14 h 12 ━━ 17 h 04**. Dessous, la carte « Votre équipe » (Leader, Courtier 01 à 05, rangées de 80, y 760 – 1480). Dès t = 0, Courtier 03 est « En visite libre » et a la sous-carte « Demande vendeur · Longueuil » avec « **Non lue** ». À 2,6 s, elle passe à « Lue à 17 h 04 ». **Image 0 du master = affiche à t = 3,0 s** (état complet : les deux phrases, la règle, « Lue à 17 h 04 » ; choix 5). | Fixe, poussée 1,00 → 1,02. | **Titre dans sa bande** : le titre change, la carte reste. |
| 2 · Le coût | 3,5 – 6,0 | 2,5 s | « Trois heures / pour appeler / **quelqu'un d'autre.** » (100 px, 3,55 s ; tenu 3,95 – 5,4). La rangée de Courtier 03 s'affaisse de 10 px, les autres s'atténuent à 30 %. À 5,45 s, l'horloge revient en arrière jusqu'à 14 h 12 (0,45 s), la règle se replie et les pastilles reprennent leur état. | Fixe. | **Éclosion** : à 5,95 s, le disque menthe éclot depuis l'horloge (0,5 s). |
| 3 · Dévoilement (héros) | 6,0 – 10,1 | 4,1 s | La pastille de l'horloge se resserre et devient l'étiquette « **Nouveau** » (pastille douce statique `#E2F6F6` / `#0F7B6F`, 40 px, sans point, y 470), 6,25 s. Logo ScaleSuite (marque balayée, 110 px, y 300, 6,15 s). **Le nom, mot par mot, 150 px, encre** : « Système » (6,6 s), « Vendeurs » (6,9 s), « 5 » puis « **minutes.** » en sarcelle (7,2 et 7,4 s), sur trois lignes (y 640, 800, 960). Dessous : « Pour les équipes de courtiers du Québec. » (48 px, `#596563`, y 1130, 7,7 s ; choix 1). **Tenu 7,9 – 10,1 s (2,2 s).** Cadre conçu pour servir seul d'affiche du lancement (choix 6). | Avancée 1,00 → 1,02, sinus. | **Élément partagé** : le nom rétrécit dans l'en-tête de la carte produit, qui s'ouvre sous lui. |
| 4 · La pile | 10,1 – 25,0 | **14,9 s** | Carte produit 900 px, en-tête « marque ScaleSuite + **Le Système Vendeurs 5 minutes** » (44 px, 800). Pour chaque composante : **(a)** la ligne s'emboîte dans la carte (nom 40 px + cercle vide) ; **(b)** zoom à travers la ligne : son nom monte en titre (élément partagé), l'étiquette d'étape « Système Vendeurs 5 minutes · n sur 5 » au-dessus, la démonstration avec l'horloge en dessous ; **(c)** retour : la démonstration se compresse dans la ligne, qui se coche (trait dessiné, sarcelle). Détail ci-dessous. | Zooms à travers les lignes, aller et retour (0,4 s, `SS.EZ.cam`) ; fouet avec flou vers le téléphone. | **Retrait** : la carte complète descend sous la preuve. |
| 5 · Preuve | 25,0 – 27,8 | 2,8 s | « Groupe Mackay » (56 px). « **124** » (270 px, sarcelle, chiffres tabulaires) compte de 0 à 124 en 0,8 s (25,25 s). « demandes en moins de 7 mois. » (60 px). « Avec la campagne seule. » (42 px, `#596563`). Pastille de source « ✓ Chiffres tirés de Google Ads » (32 px), comme sur le site. Tenu 26,2 – 27,8 s. | Fixe. | **Retour de la carte** : la carte produit complète remonte et prend la place du chiffre. |
| 6 · Le risque renversé | 27,8 – 31,4 | 3,6 s | Titre (mot pour mot du site) : « Si on ne livre pas, / **vous ne payez pas.** » (100 px, 27,9 s). La carte produit complète (cinq coches, réduite à 0,8) reçoit un **sceau dessiné** : deux cercles concentriques tracés au trait sarcelle (`stroke-dashoffset`, 0,7 s, 28,3 s), une coche dessinée au centre, sans brillance ni texte (choix 11). Sous la carte : « **Aucun contrat.** » (48 px, 28,8 s) et « Vos demandes ne sont jamais partagées ni revendues. » (40 px, 29,3 s). Tenu 29,7 – 31,4 s. | Fixe, avancée 1 %. | **Titre dans sa bande** ; la carte et le sceau rétrécissent et sortent par le haut. |
| 7 · Rareté réelle | 31,4 – 33,8 | 2,4 s | « **3** nouvelles équipes / par mois. » (104 px, 31,45 s). Dessous, « Il reste 3 places fondatrices. » (48 px, 32,0 s ; choix 4) et **3 places** dessinées : trois cartes vides au contour sarcelle (260 × 200, « Place fondatrice » 32 px) qui s'emboîtent avec 60 ms de décalage. Les nombres viennent de `SS.OFFRE`. Aucune date, aucun compte à rebours. Tenu 32,4 – 33,8 s. | Fixe. | **Ligne** : les trois places se contractent en une ligne (motif V3). |
| 8 · Fin | 33,8 – 40,0 | 6,2 s | Thèse : « Vos courtiers rencontrent / des vendeurs. » au-dessus de la ligne, « **Nous, on vous / les amène.** » (sarcelle) en dessous, avec la rangée discrète « Courtier 03 · Rencontre · Vendeur · Longueuil » (33,9 – 35,8 ; tenue 34,6 – 35,8). Ensuite, la ligne se contracte en nœud, puis en logo (190 px, y 520). **Le nom du système en grand sous le logo** : « Système Vendeurs / 5 minutes. » (96 px, y 760 – 880, 36,2 s). Le bouton naît d'un nœud : « **Obtenir mon diagnostic gratuit** » (840 × 136, encre, texte blanc 42 px, 10 % de dépassement, 36,5 s), puis « scalesuiteqc.ca » (42 px, 36,8 s). **Tout est posé à 37,3 s et tenu jusqu'à 40,0 s (2,7 s).** | Avancée 1 %. | Fin. |

### Détail de la pile (10,1 – 25,0 s)

| Composante (ligne de la carte) | Temps | Titre pendant la démo | Démonstration (horloge en haut, y 600) | Tenu lisible |
|---|---|---|---|---|
| carte : en-tête + ligne 1 | 10,1 – 10,8 | — | le nom devient l'en-tête, la ligne 1 s'emboîte | — |
| **1 · Campagne Google Vendeurs** (sous-ligne « et une page aux couleurs de votre équipe ») | 10,8 – 12,9 | « Campagne / Google Vendeurs. » + « Ajustée chaque semaine. Une page aux couleurs de votre équipe. » (44 px) | 14 h 12 : annonce « Commandité · exemple.ca » avec l'étiquette « Votre équipe » (comme sur le site), appui, la page de l'Équipe Gagnon s'ouvre, « Envoyer », la page devient le jeton | 11,3 – 12,9 (1,6 s) |
| carte : coche 1, ligne 2 | 12,9 – 13,4 | — | — | — |
| **2 · Réponse 60 secondes** | 13,4 – 16,2 | « Réponse / 60 secondes. » | tic 14 h 13 ; fil vers le téléphone du vendeur ; le texto de 514 555 0142, signé Julie (scène actuelle, inchangée) ; mention « Exemple. Noms et numéros fictifs. » | 14,5 – 16,2 (1,7 s) |
| carte : coche 2, ligne 3 | 16,2 – 16,7 | — | — | — |
| **3 · Le bon courtier alerté** | 16,7 – 18,3 | « Le bon courtier / **alerté.** » | 14 h 13 : fil de l'horloge vers Courtier 03 (« En visite libre »), halo, « Nouvelle demande · Vendeur · Longueuil » ; les autres rangées, Leader compris, s'atténuent | 17,0 – 18,3 (1,3 s) |
| carte : coche 3, ligne 4 | 18,3 – 18,8 | — | — | — |
| **4 · Relance après 10 minutes** | 18,8 – 21,3 | « Relance après / **10 minutes.** » | neuf tics jusqu'à 14 h 22 ; deuxième alerte « Relance · Vendeur · Longueuil » chez Courtier 03 ; **une seule** ligne vers le Leader, qui prend le halo et la même alerte ; les autres restent atténués | 20,1 – 21,3 (1,2 s) |
| carte : coche 4, ligne 5 | 21,3 – 21,8 | — | — | — |
| **5 · Suivi 90 jours** | 21,8 – 23,4 | « Pas prêt à vendre? / **Suivi 90 jours.** » | ruban « Aujourd'hui → 90 jours » ; l'horloge en mode date : sam. 7 nov. → ven. 5 févr. | 22,2 – 23,4 (1,2 s) |
| **la pile complète** | 23,4 – 25,0 | — | retour à la carte : coche 5 (23,45 s), la carte « Le Système Vendeurs 5 minutes » avec ses **cinq lignes cochées** | 23,5 – 25,0 (**1,5 s**) |

Les allers-retours entre la carte et les démonstrations (0,5 s) sont des transitions, pas des états à lire.
Toutes les lignes de la carte se lisent pendant la tenue finale de 1,5 s. Le jeton n'est pas repris entre la
composante 1 et la composante 2 : le texto se déplie depuis le fil de l'horloge.

### États tenus (≥ 1,2 s)

| État | Tenu |
|---|---|
| Accroche complète (affiche, image 0 du master) | 2,6 – 3,5 s |
| « Trois heures pour appeler quelqu'un d'autre. » | 3,95 – 5,4 s (1,45 s) |
| **Dévoilement** « Nouveau · Système Vendeurs 5 minutes. · Pour les équipes… » | 7,9 – 10,1 s (2,2 s) |
| Composantes 1 à 5 | voir le tableau (1,2 à 1,7 s chacune) |
| **Pile complète, cinq coches** | 23,5 – 25,0 s (1,5 s) |
| Preuve | 26,2 – 27,8 s (1,6 s) |
| Risque renversé (titre, sceau, deux lignes) | 29,7 – 31,4 s (1,7 s) |
| Rareté | 32,4 – 33,8 s (1,4 s) |
| Thèse et rencontre | 34,6 – 35,8 s (1,2 s) |
| Fin | 37,3 – 40,0 s (2,7 s) |

---

## Règles appliquées (inchangées)

- **Lisibilité** : interface de 900 px ; texte ≥ 30 px à l'écran (contrôle `render/textsize-systeme.mjs`),
  libellés principaux 40 px ; titres 88 à 150 px entre y 170 et 600 ; produit entre y 600 et 1500 ; rien de
  critique sous y 1500 ni à x > 930.
- **Mouvement** : courbes `SS.EZ` de la V3 ; aucun dépassement dans le monde gris ; dépassement réservé aux
  héros (texto 12 %, bouton 10 %, lignes de la carte 4 %) ; décalages < 500 ms par groupe ; règle du tiers ;
  trois couches (l'ambiante vient de la trotteuse et des avancées de caméra) ; aucun fondu de scène.
- **Identité** : `design-dna-systeme.json` (fond `#F0FFFC`, encre `#151515`, sarcelle `#0F7B6F`, bouton encre).
  Étiquettes douces statiques, sceau au trait, sans brillance. Pas de point qui pulse, pas de pointillés, pas de
  texte en dégradé, pas de halo flou, pas de flèche qui rebondit, aucun rouge. Rien qui fasse penser à une image
  générée par IA : interfaces vectorielles nettes, pas de photo, pas de visage.
- **Texte** : aucun trait d'union, aucun emoji, aucune phrase qui commence par « Et » ou « Mais », vouvoiement,
  noms fictifs (Équipe Gagnon, Julie, numéros en 555, exemple.ca), Leader et Courtier 01 à 05 ; seul nom réel :
  Groupe Mackay.
- **Déterminisme** : `fromTo()` uniquement, flou procédural ; contrôles `determinism` et `motion 40` à OK.

## Son

### Effets sonores : 5 (réglage de « Le lead perdu » repris tel quel)

| # | Temps | Moment | Son | Gain | Cible sous la musique |
|---|---|---|---|---|---|
| 1 | 5,95 s | Éclosion, puis dévoilement du nom | souffle d'ouverture montant 250 → 1 800 Hz (`breath`, `'rise'`) | 0,34 | ≈ −10 dB |
| 2 | 13,9 s | Texto du vendeur | double vibration sourde (`mutedbuzz`) | 0,30 / 0,24 | ≈ −8 dB |
| 3 | 19,95 s | La relance arrive chez le Leader | une vibration sourde courte (`mutedbuzz`, 0,16 s) | 0,20 | ≈ −11 dB |
| 4 | 23,45 s | Pile complète (cinquième coche) | clic feutré très léger (`feltclick`) | 0,16 | ≈ −13 dB (choix 7) |
| 5 | 36,5 s | Le bouton naît | souffle doux en cloche (`breath`, `'swell'`) | 0,36 | ≈ −10 dB |

Rien d'autre : ni les coches 1 à 4, ni les tics, ni le compteur, ni le sceau. Aucune cloche, aucun « ding ».

### Musique (`audio/music-systeme.py`)

- **Gris (0 à 6 s)** : piano feutré grave en ré mineur, nappe froide ; un seul tock grave sur le saut
  d'horloge ; la note tenue est aspirée pendant le retour en arrière.
- **Dévoilement** : ouverture en fa majeur sur l'éclosion. **La signature de quatre notes au complet** (do, fa,
  mi, la), au piano feutré médium, une note par mot : « Système » 6,6 s, « Vendeurs » 6,9 s, « 5 » 7,2 s,
  « minutes. » 7,4 s. La nappe s'élargit sous la tenue.
- **Pile** : le groove néo-soul de « Le lead perdu », un peu plus vif (tempo +6 %). Chaque zoom vers une
  composante tombe sur un temps fort ; la densité monte jusqu'à la pile complète.
- **Preuve, garantie, rareté** : sans batterie, basse et piano posés : de l'assurance, un cran plus bas.
- **Fin** : résolution en fa majeur sous le logo, la signature rappelée une fois, plus doucement.
- Mix à −15 LUFS / −1,5 dBTP ; pistes `bed` et `sfx` pour la voix.

## Voix hors champ

Voir `brag-output/voiceover-systeme.md` (v2).

---

## Choix à trancher (avec ma recommandation)

1. **Ligne du public au dévoilement** : « Pour les équipes de 4 à 15 courtiers au Québec. » **n'est pas sur le
   site**, qui dit « Pour les équipes de courtiers du Québec. » *Recommandé : le texte du site*, pour respecter
   la règle « seulement des affirmations du site ». Si vous ajoutez « 4 à 15 » au site, je le reprends tel quel.
2. **Durée : 40,0 s.** *Recommandé.* La pile (5 composantes lisibles, plus la tenue finale de 1,5 s) prend
   14,9 s ; c'est le haut de votre fourchette.
3. **Garantie** : « Un engagement manqué? Le mois n'est pas facturé. » (votre texte, reformulation fidèle de
   « Si on manque un engagement, le mois n'est pas facturé. »). *Recommandé : le garder.* Variante plus
   frappante, mot pour mot du site : « Si on ne livre pas, / vous ne payez pas. »
4. **Rareté** : « Il reste 3 places fondatrices. » (mot pour mot du site) plutôt que « 3 places fondatrices. ».
   *Recommandé* : « Il reste » porte la rareté, sans compte à rebours.
5. **Image 0 du master = affiche de l'accroche** (t = 3,0 s : les deux phrases, la règle 14 h 12 ━━ 17 h 04,
   « Lue à 17 h 04 »). *Recommandé* : la douleur complète se lit dès l'image 0, et le titre garde ses deux temps
   à la lecture.
6. **Affiche du lancement** : exporter aussi le cadre du dévoilement (t = 9,0 s) en JPEG à part,
   `scalesuite-systeme-9x16-affiche-lancement.jpg`. *Recommandé.*
7. **Cinquième effet sur la pile complète** (clic feutré, ≈ −13 dB). *Recommandé : oui*, très discret.
   Variante : 4 effets seulement.
8. **Étiquette d'étape « Système Vendeurs 5 minutes · n sur 5 »** avec une barre à 5 segments, reprise du
   « 1 sur 6 » du site. *Recommandé* : le nom reste à l'écran pendant toute la pile.
9. **Réplique 1 de la voix réordonnée** : « 14 h 12 : le vendeur écrit. 17 h : votre courtier le voit. »
   (12 mots dits au lieu de 14). *Recommandé* : votre version demande 5,2 s et déborderait sur le coût et le
   dévoilement. Le texte à l'écran garde votre formulation. Variante : votre texte exact, avec un monde gris
   allongé de 0,8 s (film de 40,8 s).
10. **Réplique sur le texto coupée** : « En moins d'une minute, le vendeur reçoit un texto. » (sans « de votre
    équipe »), pour tenir dans la composante 2 sans parler par-dessus la composante 1. *Recommandé.*
11. **Sceau sans texte** (deux cercles et une coche, au trait). *Recommandé* : aucun mot de plus à vérifier, et le
    titre dit déjà la garantie.

## Étapes

1. **Ce plan v2** + `voiceover-systeme.md` v2. ← *arrêt*
2. Images clés 540 × 960 sur la nouvelle structure (une par état tenu, environ 16 images). Arrêt.
3. Aperçu animé 540 × 960 avec la musique, et la planche contact. Arrêt.
4. Master 1080 × 1920, 60 fps, contrôle qualité complet ; texte relu sur des images extraites du MP4.
5. Version avec voix (prise `voiceover-systeme.mp3`).
6. Version 4:5 (1080 × 1350), après validation du 9:16.
7. `git add -f`, commit, push, PR vers `scalesuiteqc/scalesuite-video` (`main`).
8. Proposition de mise à jour de la section 9 de la skill (sans la modifier avant votre accord).

---

## Historique

- **v1** (validée le 3 novembre) : récit en deux mondes autour de l'horloge, 34 s ; relance corrigée (Courtier 03,
  puis le Leader seulement) ; planche `scalesuite-systeme-9x16-keyframes.jpg` (14 images, commit `ec63ce3`).
  Ses composants sont repris dans la v2.
- **v2** : structure de lancement de produit (ce document).

## Validation du plan v2

Choix retenus : 1 texte du site « Pour les équipes de courtiers du Québec. » · 2 durée 40,0 s · 3 garantie mot
pour mot du site, « Si on ne livre pas, / vous ne payez pas. », avec « Aucun contrat. » et « Vos demandes ne
sont jamais partagées ni revendues. » dessous ; réplique 7 « Si on ne livre pas, vous ne payez pas. Aucun
contrat. » · 4 « Il reste 3 places fondatrices. » · 5 image 0 = état complet à 3,0 s · 6 affiche du lancement
exportée à part, en 9:16 et en 4:5 (1080 × 1350) · 7 clic feutré sur la pile complète, à au moins 12 dB sous la
musique · 8 étiquette « Système Vendeurs 5 minutes · n sur 5 » · 9 réplique 1 réordonnée · 10 réplique du texto
sans « de votre équipe » · 11 sceau sans texte.

## Étape 2 (v2) : images clés

Planche `brag-output/scalesuite-systeme-9x16-keyframes.jpg` (16 images 540 × 960 rendues depuis la timeline ; elle
remplace la planche v1). Affiches du lancement : `scalesuite-systeme-9x16-affiche-lancement.jpg` (1080 × 1920,
t = 9,0 s) et `scalesuite-systeme-4x5-affiche-lancement.jpg` (1080 × 1350, même cadre recadré sur le contenu).
Plus petit texte à l'écran : 30 px (`render/textsize-systeme.mjs`).

Temps de la pile ajustés au rendu (les tenues restent ≥ 1,2 s) :

| Composante | Démo | Tenue lisible | Carte (aller-retour) |
|---|---|---|---|
| 1 Campagne Google Vendeurs | 10,8 – 12,8 | 11,2 – 12,8 | 12,8 – 13,3 |
| 2 Réponse 60 secondes (texto 13,8 s) | 13,3 – 16,0 | 14,4 – 16,0 | 16,0 – 16,5 |
| 3 Le bon courtier alerté | 16,5 – 18,1 | 16,85 – 18,1 | 18,1 – 18,6 |
| 4 Relance après 10 minutes (Leader 19,75 s) | 18,6 – 21,1 | 19,9 – 21,1 | 21,1 – 21,6 |
| 5 Suivi 90 jours | 21,6 – 23,25 | 21,95 – 23,25 | 23,25 – 23,5 |
| Pile complète (5ᵉ coche 23,5 s) | — | 23,5 – 25,0 | — |

Effets sonores recalés : 5,95 s souffle d'ouverture · 13,8 s texto · 19,75 s Leader · 23,5 s pile complète
(clic feutré, cible ≥ 12 dB sous la musique) · 36,6 s bouton. Les fenêtres de la voix seront recalées sur ces
repères à l'étape 3.

Dans la carte produit, les lignes à venir sont des anneaux vides et des lignes grises (la carte « se remplit »).
La carte de la garantie est une version compacte (noms seuls, échelle 0,76) pour garder le texte à 32 px.

## Étape 3 : aperçu animé

- Retouches de la planche v2 appliquées : cadres 5, 10, 11, 12, 13, 14 et 16 agrandis d'environ 20 % et centrés
  entre y 600 et 1500 ; carte de garantie de la même taille que celle de la pile (texte 52 px, sceau hors des
  lignes) ; affiche 9:16 recentrée (bloc agrandi), affiche 4:5 inchangée ; sous-lignes retirées de la carte
  produit (les cinq lignes sont traitées pareil, noms en 52 px) ; logo et « Système » pendant l'ouverture du
  disque (6,05 et 6,15 s).
- Transitions corrigées après la première planche contact : titres qui se chevauchaient (3,5 s, 31,6 s, 34,0 s),
  logo en double à 10,3 s, texte de la preuve sur la carte qui sort (25,2 s). Les titres des démonstrations sont
  sous la feuille de la carte produit, qui les recouvre en montant.
- Repères finaux : coût 3,68 · dévoilement 6,05 – 7,3 · pile 10,1 – 25,0 · preuve 25,45 · garantie 27,85 ·
  rareté 31,62 · thèse 34,0 · logo 36,25 · bouton 36,7 · URL 37,0 · tenue jusqu'à 40,0.
- Son : 5 effets, mesurés à chaque rendu par `audio/music-systeme.py` : ouverture −7,5 dB, texto −9,0 dB, Leader
  −9,5 dB, pile complète −13,4 dB, bouton −10,4 dB sous la musique. Mix −15,0 LUFS.
- Déterminisme : 0 différence de DOM ; un écart de pixels sur la pointe de la trotteuse de l'horloge (31 pixels,
  antialiasing d'une ligne de 2 px) sera traité à l'étape 4.
