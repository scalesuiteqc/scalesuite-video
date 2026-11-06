# ScaleSuite « Dimanche, 21 h 14 » : plan scène par scène (à valider)

Film social · 9:16 (1080 × 1920) · **33,4 s** · 60 fps · compréhensible sans le son · français québécois
Fichiers : suffixe `dimanche` partout (`storyboard-dimanche.md`, `build-dimanche.sh`, `src/scenes-dimanche/`,
`scalesuite-dimanche-9x16*.mp4`). Aucun fichier d'un film existant n'est modifié ; `core.js`, `logo.js`,
`core-v3.js`, `styles.css` et `styles-v3.css` sont chargés en lecture seule.
Public : leaders d'équipes de 4 à 15 courtiers au Québec. Offre : le Système Vendeurs 5 minutes.

> **Référence** : `video reference 4.mp4` n'est pas dans le dépôt (seules les références 1, 2 et 3 y sont,
> sur `main` comme sur les branches). Le plan suit donc la description de la section 3 du brief.

---

## L'idée

On vend la destination, pas le véhicule. Le film s'ouvre sur le résultat (un jeudi rempli de rencontres
avec des vendeurs), puis une **barre de lecture** rembobine la semaine et montre comment elle est arrivée,
heure par heure, sur de vrais écrans. Aucune scène de problème.

| Levier (Hormozi) | Ce qu'on voit |
|---|---|
| Résultat rêvé | L'agenda de jeudi, trois cartes de rencontre qui en sortent (image 0), puis la semaine de l'équipe |
| Probabilité perçue | Le circuit réel : recherche Google, annonce « Commandité », page de l'équipe, formulaire, texto, avis au courtier, suivi |
| Délai | « Envoyé en moins d'une minute » : le texto arrive avant que Sophie dépose son cell |
| Effort | Le cell du leader, posé, aucune notification : « Vous, vous étiez au souper. » |
| Risque inversé | Cinq crochets, puis le sceau : « On livre, ou le mois est gratuit. » « Pas de contrat. » |

## Les trois fils visuels

1. **L'agenda de Julie** (héros des scènes 1, 2 et 7). Agenda relié à couverture rigide, vu de face :
   page blanche « Jeudi 12 novembre », pochette en toile bleu sarcelle (`#145F78`, tissage fin en CSS,
   bord rembordé, épaisseur des pages visible en bas), ombre de contact et **reflet au sol**. Les cartes de
   rencontre (carton blanc 820 × 200, liseré turquoise, heure en 46 px, nom en 40 px) sortent de la
   pochette **en couches**, chacune décalée de 120 px vers le haut et ombrée sur la suivante (même ordre
   de couches que les cartes du portefeuille de la référence, autre objet, autres couleurs). La couverture
   porte « Julie ».
2. **La barre de lecture du temps** (fil conducteur, à chaque saut de temps). Piste de 820 × 12 px, partie
   lue turquoise, curseur blanc lustré de 52 px, **bulle d'heure** qui suit le doigt avec un léger retard et
   s'incline selon la vitesse (ressort précalculé). Bulle sur deux lignes : jour et heure (40 px, chiffres
   tabulaires), date (30 px). Le doigt est un **point de contact** (disque gris translucide de 96 px, bord
   blanc), sans main dessinée. La position du curseur est une fonction monotone du temps raconté : un saut
   vers la gauche est toujours un retour en arrière.
3. **Les téléphones** (scènes 4 et 5) : téléphones clairs (820 × 1700, coupés par le bas), écran
   verrouillé ou fil de textos, en couleurs claires.

## Les effets de la référence, transposés (le niveau, pas les objets)

| Référence | Ici | Scènes |
|---|---|---|
| a) Cartes de crédit qui sortent du portefeuille en couches, matière qui change | Cartes de rencontre qui sortent de la pochette de l'agenda en couches ; toile, carton, ombre de contact | 1, 2, 7 |
| b) Barre de progression glissée au doigt avec bulle de temps ; reflet miroir sous l'objet | Barre de lecture de la semaine, bulle d'heure ; reflet au sol sous l'agenda, les cell posés et le bouton | 2, 5, 6, 7 |
| c) Bouton pilule lustré retenu par des câbles élastiques | Bouton « Mon diagnostic gratuit » suspendu à deux câbles, tiré au doigt, relâché, balancement amorti | 9 |
| d) Grille qui s'ouvre en fiche, recul de caméra qui révèle l'appareil | Annonce qui s'ouvre en page (titre partagé) ; recul de caméra de l'agenda vers la semaine de l'équipe | 3, 7 |

Principes : fond clair, **un seul effet héros à la fois**, objets tactiles (matière, ombre de contact,
reflet), ressorts plutôt que mouvements linéaires, continuité (un élément se transforme au lieu de
disparaître). Aucun objet, aucune couleur ni aucune marque de la référence.

## Identité

- **Fond** : studio clair sans couture, `#F5FAFA` en haut vers `#EBF2F2` au sol, grain statique. Aucune
  lumière floue qui dérive (règle « AI slop ») : la vie ambiante vient des poussées lentes de caméra (1 à
  3 %) et des reflets.
- **Couleurs** : encre `#151515` ; texte secondaire `#5E6B69` ; turquoise du logo `#1FBFA8` (lignes, partie
  lue, coches) ; bleu du logo `#2FB0DE` et bleu profond `#16708F` (toile de l'agenda, sceau, bouton) ; mot
  d'accent des titres en sarcelle `#0F7B6F` (contraste AA sur fond clair). Couleur de l'équipe fictive
  (page, en-tête) : `#2F5D8C`, distincte de ScaleSuite. Pas de rouge, pas d'ambre.
- **Typographie** : voir le choix 1 (titres en Instrument Sans, interface en Inter). Titres en casse de
  phrase, 96 à 112 px, 1 à 4 mots par ligne.
- **Interdits appliqués** : aucune pastille avec point, aucun séparateur « · » dans le texte (virgules
  seulement), aucun dégradé dans le texte, aucune bulle floue, aucun emoji.

---

## Courbe de rythme

```
énergie
  ▲                                                          ★ l'agenda se ferme (23,45 s, 70 %)
  │                                                       ▄▄███▄
  │ ███                              ▄▄▄        ▄▄▄▄▄▄▄▄▄▄█████████▄▄▄▄
  │ ████▄          ▄▄▄▄▄▄▄▄█▄▄▄▄▄▄▄▄█████▄  ▄▄▄██████████████████████████▄▄▄▄▄▄▄▄
  │ ██████▄▁▁▄▄▄▄▄████████████████████████▁▁████████████████████████████████████▄▄▄▄
  └──────────────────────────────────────────────────────────────────────────────────────▶ t
   0 jeudi  2,8 rembobinage  5,6 dim. 21 h 14  9,4 texto  13,2 souper  15,4 lundi  17 Marc  21,2 jeudi  26,2 risque  29 fin  33,4
```

- **Accroche** nette, lisible dès l'image 0. **Rembobinage** : l'énergie retombe, suspension.
- **Dimanche soir** : montée régulière (frappe, appui, formulaire), premier sommet doux au texto.
- **Souper** : vraie respiration, le seul plan immobile du film (c'est le message « effort zéro »).
- **Lundi, Marc, jeudi** : montée continue jusqu'à la fermeture de l'agenda, scène la plus longue (5,0 s).
- **Risque** : affirmé, un cran plus bas. **Fin** : tout se pose, tenu 2,0 s.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition vers la suivante |
|---|---|---|---|---|---|
| 1 · Accroche, le résultat | 0,0 – 2,8 | 2,8 s | **Image 0 = affiche** (état posé de 2,0 s) : titre « Jeudi, trois / rencontres avec / des **vendeurs.** » (104 px, y 220 – 540). L'agenda de Julie (y 860 – 1400), reflet au sol. Les trois cartes sortent de la pochette en couches (0,35 → 1,15 s, 0,12 s de décalage, ressort à 6 % de dépassement, chaque ombre suit sa carte) : « **17 h 15** Annie, maison, Ahuntsic » (derrière, en haut), « **18 h 30** Sophie, condo, Rosemont », « **19 h 45** Marc, duplex, Villeray » (devant). « Exemple. Noms fictifs. » (30 px, y 1480). Tenu 1,3 – 2,8 s. | Poussée lente 1,00 → 1,03 (sinus). | **Continu** : même agenda ; la barre de lecture monte sous lui. |
| 2 · Le retour en arrière | 2,8 – 5,6 | 2,8 s | L'agenda recule (échelle 0,92, monte de 80 px) ; la barre de lecture monte du bas (y 1440), curseur à droite, bulle « **jeu. 18 h 30** / 12 novembre ». Le point de contact se pose sur le curseur (appui, 0,95), puis glisse vers la gauche (2,95 → 4,30 s, `inOut`) : la bulle déroule les heures à reculons (mer., mar., lun.) et se pose sur « **dim. 21 h 14** / 8 novembre » ; elle s'incline dans le sens du geste et se redresse avec un ressort. Les cartes rentrent dans la pochette **à l'envers** (devant d'abord), comme l'accroche jouée à rebours. Titre : « Tout a commencé / **dimanche** soir. » (104 px). Tenu 4,35 – 5,6 s. | Recul 1,03 → 0,92, puis fixe. | **Élément partagé** : la piste s'épaissit et devient la barre de recherche ; la bulle monte et devient l'étiquette d'heure « dim. 21 h 14 » au-dessus d'elle ; l'agenda tombe hors du cadre (accélération). |
| 3 · Dimanche, 21 h 14 | 5,6 – 9,4 | 3,8 s | Titre « Sophie veut vendre / son **condo.** » (100 px). Barre de recherche 900 × 112 (y 700), frappe « **vendre mon condo rosemont** » (6,05 – 6,85 s). Le résultat **« Commandité »** tombe dessous (6,95 s, 900 × 270) : « Équipe Exemple », « equipeexemple.ca », « **Vendre votre condo à Rosemont** » (44 px), « Une équipe de courtiers de votre quartier. » ; résultats ordinaires en squelette. **Appui** sur l'annonce (7,6 s, onde, compression 2,5 %). **Le titre de l'annonce devient le titre de la page** (7,7 – 8,15 s) pendant que la carte s'ouvre en page de l'équipe (900 × 960 : bandeau `#2F5D8C` avec monogramme « EE » et « Équipe Exemple », titre 54 px). Le formulaire se remplit : Prénom « Sophie », Cellulaire « 514 555 0198 », Propriété « Condo » (8,2 – 8,95 s). **Appui** sur « Me faire rappeler » (9,05 s). « Exemple. Noms et numéros fictifs. » | Poussée 1,00 → 1,06 sur le formulaire pendant qu'il se remplit. | **Page compressée en jeton** : la page se resserre (anticipation 3 %), puis se compresse en un jeton d'encre « Demande de Sophie ». |
| 4 · Dans la minute | 9,4 – 13,2 | 3,8 s | Le jeton file en arc vers le bas ; le **cell de Sophie** monte (haut du téléphone à y 640). Fil de textos, expéditeur « **514 555 0142** » (numéro de l'équipe), ligne « dim. 8 nov., 21 h 14 ». Le jeton se pose dans le fil et **se déplie en texto** (10,25 s, 12 % de dépassement, vibration de 3 oscillations amorties) : « Bonjour Sophie! Ici Julie, de l'Équipe Exemple. Merci pour votre demande. Je vous appelle demain dès 9 h. » (38 px). Sous la bulle (10,7 s) : coche verte et « **Envoyé en moins d'une minute** » (34 px). Titre : « Elle a sa réponse / avant de déposer / son **cell.** » Tenu 11,0 – 13,2 s (2,2 s, texte long). | Suit le jeton (coup de fouet vers le bas, flou de vitesse), puis fixe. | **Panoramique** vers la droite (coup de fouet, flou) jusqu'au cell du leader. |
| 5 · Votre dimanche, puis lundi | 13,2 – 17,0 | 3,8 s | **a)** Le cell du leader, entier (échelle 0,62), posé debout sur le sol clair avec son reflet : écran verrouillé « **dimanche 8 novembre** », « **21:15** », aucune notification. Titre « Vous, vous étiez / au **souper.** » Tenu 13,7 – 14,8 s. **b)** La barre remonte (« dim. 21 h 15 »), le doigt la glisse vers la droite jusqu'à « **lun. 9 h 00** / 9 novembre » (14,85 – 15,4 s) pendant que la caméra passe au **cell de Julie** (étiquette « Julie » au-dessus) : « lundi 9 novembre », « 9:00 ». L'avis tombe du haut (15,5 s, 12 % de dépassement, vibration) : « ScaleSuite, maintenant », « **Nouveau vendeur pour vous.** » (40 px), « Sophie, condo, Rosemont » (34 px), bouton « **Appeler Sophie** ». Titre « Lundi matin, / Julie l'**appelle.** » Tenu 15,8 – 17,0 s. | Fixe sur le leader (respiration), puis panoramique vers la droite pendant le glissement (0,55 s, `inOut`). | **La barre reste** (fil conducteur) : le cell de Julie descend hors du cadre pendant que la carte de Marc monte. |
| 6 · Ceux qui ne sont pas prêts | 17,0 – 21,2 | 4,2 s | Le doigt ramène la barre loin à gauche : « **jeu. 19 h 02** / 24 septembre » (17,0 – 17,6 s). **Carte de Marc** (860 × 330) : « Marc, duplex, Villeray » (44 px), « Demande du 24 septembre » (32 px), pastille grise « **Pas avant le printemps** » qui se pose (17,6 s), piste « Suivi pendant 90 jours » vide. Titre « Marc n'était / pas **prêt.** » Puis la barre glisse à droite : bulle « **6 semaines plus tard** / jeu. 5 novembre » (18,4 – 19,0 s) ; la piste de suivi se remplit en même temps jusqu'à 42 jours sur 90. Titre « On est restés / en **contact.** » Texto de suivi (19,05 s) : « Bonjour Marc, ici Julie. Toujours dans vos plans de vendre au printemps? » Réponse de Marc (19,6 s, bulle turquoise à droite) : « **Oui! On pourrait se voir la semaine prochaine?** » | Fixe, poussée 1 %. | **Morphose** : la réponse de Marc se resserre en sa carte de rencontre « **19 h 45** Marc, duplex, Villeray » (20,6 – 21,1 s, ressort). |
| 7 · Jeudi (point culminant) | 21,2 – 26,2 | **5,0 s** | La barre glisse jusqu'à « **jeu. 18 h 30** / 12 novembre » (21,2 – 21,7 s), là où le rembobinage avait commencé ; elle sort par le bas. L'agenda de Julie remonte. Les cartes **volent et entrent dans la pochette** en couches (Sophie depuis la gauche, Annie depuis la droite, Marc depuis le haut ; arcs, 21,65 → 22,6 s, ressorts) : on retrouve l'image de l'accroche (22,6 – 22,9 s). Titre « Jeudi, ils sont / tous à l'**agenda.** » Les cartes s'enfoncent, la **couverture se rabat** depuis la reliure et l'agenda se ferme **avec un appui** (23,45 s : écrasement de 3 %, ombre de contact qui se resserre, retour sur ressort). **Recul de caméra** (23,6 – 24,4 s, 1,00 → 0,56) : la semaine de l'équipe, « Équipe Exemple, semaine du 9 novembre » ; l'agenda de Julie (3 onglets de rencontre qui dépassent) et celui de Kevin (2 onglets), légendés « **Julie** / 3 rencontres » et « **Kevin, nouveau** / 2 rencontres » (44 et 36 px à l'écran). Titre « Vous savez d'où / viennent vos prochains / **mandats.** » Tenu 24,5 – 26,2 s. | Cadre serré sur l'agenda pendant le vol des cartes, poussée de 2 % à la fermeture, puis recul. | **Coup de fouet** vers le bas (flou de vitesse) jusqu'à la carte « Ce qu'on livre ». |
| 8 · Le risque | 26,2 – 29,0 | 2,8 s | Titre « Ce qu'on / **livre.** » Carte 900 × 720, cinq lignes (gras 40 px, précision 32 px) : « **Campagne Google** ajustée chaque semaine », « **Page** à l'image de votre équipe », « **Texto au vendeur** en moins d'une minute », « **Relance de l'équipe** si personne n'a rappelé en 10 minutes », « **Suivi des vendeurs** pendant 90 jours ». Les cinq crochets se cochent vite (26,6 → 27,25 s, 0,16 s d'écart, tracé du crochet). **Le sceau s'imprime** (27,4 s) dans le coin bas droit de la carte, sans couvrir de texte : tampon rond bleu profond, double anneau, « ON LIVRE, OU LE MOIS EST GRATUIT » en anneau, marque ScaleSuite au centre ; impact avec écrasement et encre légèrement irrégulière, rotation de −8°. Le titre devient « On livre, ou le mois / est **gratuit.** », puis « **Pas de contrat.** » (56 px, 27,7 s). Tenu 27,8 – 29,0 s. | Fixe, poussée 1 % ; micro secousse de 2 px à l'impact du sceau. | **Élément partagé** : le sceau se décolle et s'étire en bouton pilule. |
| 9 · Appel à l'action | 29,0 – 33,4 | 4,4 s | La carte tombe hors du cadre ; le sceau monte au centre et s'étire en **bouton pilule lustré** (700 × 150, voir le choix 6) ; « **Mon diagnostic gratuit** » (52 px, blanc) monte dans le bouton (29,55 s). Deux ancrages apparaissent (x 300 et 780, y 790) et **deux câbles élastiques** les relient aux extrémités du bouton (tracés en 0,25 s). Logo complet au-dessus (balayage de la marque, montée des lettres, 29,35 s). Le point de contact saisit le bouton (29,8 s), le **tire** vers le bas et la droite (29,85 – 30,35 s : les câbles s'étirent et s'amincissent, le bouton s'incline), puis le **relâche** (30,35 s) : balancement amorti (2 oscillations et demie), posé à 31,35 s. « scalesuiteqc.ca » (44 px, y 1250) et « Demander une démo » (40 px, souligné turquoise, y 1335). **Tout est posé à 31,4 s et tenu jusqu'à 33,4 s (2,0 s)**, reflet qui passe une fois sur le bouton. | Fixe, poussée de 1 %. | Fin. |

Durées : 2,8 · 2,8 · 3,8 · 3,8 · 3,8 · 4,2 · **5,0** · 2,8 · 4,4 s.

### États tenus (lisibles et immobiles)

| État | Tenu |
|---|---|
| Accroche complète (titre, agenda, trois cartes) | 1,3 – 2,8 s (1,5 s) |
| « Tout a commencé dimanche soir. », bulle « dim. 21 h 14 » | 4,35 – 5,6 s (1,25 s) |
| Page de l'équipe, formulaire rempli | 8,95 – 9,4 s (titre de l'annonce lisible depuis 7,0 s) |
| Texto de Julie, « Envoyé en moins d'une minute », titre | 11,0 – 13,2 s (2,2 s) |
| Cell du leader, « Vous, vous étiez au souper. » | 13,7 – 14,8 s (1,1 s, plan immobile) |
| Avis du lundi sur le cell de Julie | 15,8 – 17,0 s (1,2 s) |
| Texto de suivi et réponse de Marc | 19,6 – 20,6 s (lecture depuis 19,05 s) |
| Semaine de l'équipe, « Vous savez d'où viennent vos prochains mandats. » | 24,5 – 26,2 s (1,7 s) |
| « On livre, ou le mois est gratuit. » « Pas de contrat. », sceau | 27,8 – 29,0 s (1,2 s) |
| Fin (logo, bouton, scalesuiteqc.ca, Demander une démo) | 31,4 – 33,4 s (2,0 s) |

Aucun cadre vide ou à moitié coupé plus de 0,3 s : chaque transition passe par un objet (agenda, piste,
bulle, jeton, barre, réponse, sceau).

---

## Chorégraphie

- **Un héros par temps** : cartes (1), curseur et bulle (2), frappe puis annonce (3), jeton puis texto (4),
  cell immobile puis avis (5), carte de Marc puis réponse (6), cartes puis couverture puis recul (7),
  crochets puis sceau (8), bouton (9). Les titres entrent quand le héros se pose.
- **Trois couches** : primaire (le héros), secondaire (ombres de contact qui suivent leur objet avec 50 à
  80 ms de retard, reflet, bulle qui s'incline, câbles), ambiante (poussées lentes de caméra, grain).
- **Ressorts plutôt que courbes linéaires** : cartes, bulle, texto, avis, fermeture de l'agenda, bouton.
  Dépassement réservé aux héros (6 à 12 %), jamais sur un titre ni sur un fond.
- **Règle du tiers** : au-delà d'un tiers d'écran, coup de fouet avec flou de vitesse (scènes 4, 5, 7) ou
  arc avec clé intermédiaire (vol des cartes).
- **Décalages** de 35 à 120 ms, moins de 500 ms par groupe. Sorties en accélération, 65 à 75 % de la durée
  des entrées.
- **Aucune transparence de scène** : jamais de fondu enchaîné ; l'opacité ne sert qu'aux petits éléments
  secondaires, avec un mouvement.

## Ressorts et câbles : déterministes (section 4 du skill)

- `SS.spring({ k, c, m })` intègre la réponse d'un ressort **une seule fois, à la construction** (pas fixe
  de 1 ms), et rend une table ; la table sert d'*ease* GSAP (fonction pure de la progression) ou se lit
  dans un `render(t)` par interpolation.
- **Bulle** : sa position suit le curseur par un ressort critique précalculé sur la trajectoire du curseur
  (elle-même une table), son inclinaison vaut la vitesse relative, bornée à ±9°.
- **Bouton à câbles** : simulation 2D (masse, deux ressorts non linéaires, amortissement, gravité)
  précalculée à la construction pour la phase relâchée ; la phase « tirée » est un proxy GSAP. Le
  `render(t)` lit la table et redessine les deux câbles (courbe de Bézier dont la flèche dépend de la
  tension, épaisseur qui diminue avec l'étirement).
- Tout passe par des proxys animés par GSAP ; aucun élément n'est piloté à la fois par GSAP et par un
  `render(t)`. Contrôles `determinism` (0 différence de DOM) et `motion 33.4` (aucun saut isolé) avant
  livraison.

## Lisibilité

- Interface de 820 à 900 px de large (76 à 83 % du cadre), texte d'interface ≥ 30 px à l'écran, libellés
  principaux ≥ 40 px, titres de 96 à 112 px entre y 200 et 560, produit entre y 600 et 1500, rien de
  critique sous y 1500 ni à x > 930. Mesure automatique sur les états tenus (`render/textsize-dimanche.mjs`,
  repris de « Équipe »), zoom de caméra compris.
- Recul de la scène 7 : les légendes « Julie / 3 rencontres » et « Kevin, nouveau / 2 rencontres » sont
  dessinées dans l'espace écran (44 et 36 px), pas réduites avec la caméra.
- `SS.scrim` sous les titres posés sur une interface en mouvement, `SS.band` pour un titre qui change de
  ligne.

---

## Texte à l'écran (relecture complète)

Titres : « Jeudi, trois rencontres avec des vendeurs. » · « Tout a commencé dimanche soir. » · « Sophie
veut vendre son condo. » · « Elle a sa réponse avant de déposer son cell. » · « Vous, vous étiez au
souper. » · « Lundi matin, Julie l'appelle. » · « Marc n'était pas prêt. » · « On est restés en contact. »
· « Jeudi, ils sont tous à l'agenda. » · « Vous savez d'où viennent vos prochains mandats. » · « Ce qu'on
livre. » · « On livre, ou le mois est gratuit. » · « Pas de contrat. »

Interface : cartes « 17 h 15 Annie, maison, Ahuntsic », « 18 h 30 Sophie, condo, Rosemont », « 19 h 45
Marc, duplex, Villeray » ; agenda « Julie », « Jeudi 12 novembre » ; bulle « jeu. 18 h 30 », « dim. 21 h 14 »,
« dim. 21 h 15 », « lun. 9 h 00 », « jeu. 19 h 02 », « 6 semaines plus tard », avec leurs dates ; recherche
« vendre mon condo rosemont » ; annonce « Commandité », « Équipe Exemple », « equipeexemple.ca », « Vendre
votre condo à Rosemont », « Une équipe de courtiers de votre quartier. » ; page « Équipe Exemple », champs
« Prénom », « Cellulaire », « Propriété », bouton « Me faire rappeler » ; jeton « Demande de Sophie » ;
textos et lignes citées dans le tableau ; écrans verrouillés « dimanche 8 novembre » 21:15, « lundi 9
novembre » 9:00 ; avis « Nouveau vendeur pour vous. », « Sophie, condo, Rosemont », « Appeler Sophie » ;
carte de Marc « Demande du 24 septembre », « Pas avant le printemps », « Suivi pendant 90 jours » ; semaine
« Équipe Exemple, semaine du 9 novembre », « Julie », « 3 rencontres », « Kevin, nouveau », « 2 rencontres » ;
les cinq lignes de la scène 8 ; sceau « ON LIVRE, OU LE MOIS EST GRATUIT » ; fin « Mon diagnostic gratuit »,
« scalesuiteqc.ca », « Demander une démo » ; mentions « Exemple. Noms fictifs. » ou « Exemple. Noms et
numéros fictifs. » dans les scènes 1, 3, 4, 5, 6 et 7.

Vérifié : aucun trait d'union ni tiret, aucune phrase qui commence par « Et » ou « Mais », aucun nombre de
demandes promis, aucun pourcentage, aucun prix, aucun superlatif, aucun script d'appel ni classement des
courtiers. Les nombres affichés sont des heures, des dates, des durées de l'offre (une minute, 10 minutes,
90 jours) et les rencontres de l'exemple.

**Dates** (calendrier 2026 vérifié) : jeudi 24 septembre ; jeudi 5 novembre (24 septembre + 42 jours) ;
dimanche 8 novembre ; lundi 9 novembre ; jeudi 12 novembre ; la semaine du lundi 9 novembre contient le
jeudi 12.

---

## Son

### Effets sonores : 5 (réglages de `music-lead-perdu.py`, cible −8 à −12 dB sous la musique)

| # | Temps | Moment | Son (synthèse) | Gain de départ | Cible |
|---|---|---|---|---|---|
| 1 | 7,6 s | Appui sur l'annonce | clic feutré, bruit passe-bas 1,5 kHz + 180 Hz (`feltclick`) | 0,22 | ≈ −11,8 dB |
| 2 | 15,5 s | Vibration du lundi (cell de Julie) | double vibration sourde 150 Hz, passe-bas 380 Hz (`mutedbuzz`) | 0,30 / 0,24 | ≈ −8 dB |
| 3 | 23,45 s | Fermeture de l'agenda | « toc » feutré grave : bruit passe-bas 900 Hz + 110 Hz amorti, sans résonance (`feltthud`, nouveau) | 0,30 | −9 à −11 dB |
| 4 | 27,4 s | Le sceau s'imprime | appui de tampon : bruit passe-bas 1,2 kHz + 140 Hz, attaque douce (`feltthud`, plus court) | 0,26 | −10 à −12 dB |
| 5 | 30,35 s | Relâchement du bouton | souffle doux 300 → 1 500 Hz en cloche (`breath`, `'swell'`) | 0,36 | ≈ −10 dB |

Rien d'autre : ni la frappe, ni le texto de Sophie (vibration seulement à l'image), ni les cartes, ni les
crochets, ni le rembobinage n'ont d'effet. Aucune cloche, aucun « ding ». Le script imprime à chaque rendu
la mesure RMS de chaque effet contre la musique au même moment, comme pour « Le lead perdu ».

### Musique (`audio/music-dimanche.py`, même méthode et mêmes instruments)

- **Accroche** : accord chaud de fa majeur 9 au piano feutré et nappe douce ; la signature (do, fa, mi, la)
  esquissée sur deux notes, sans résoudre.
- **Rembobinage** (2,95 – 4,3 s) : dans la musique, un accord de piano joué à l'envers et la nappe qui
  ralentit (glissement de hauteur de −1 demi-ton), puis silence relatif sur « dimanche soir ».
- **Dimanche soir** : chaud et posé, piano électrique FM, basse ronde, tempo lent (84 battements, swing
  58 %), sans batterie jusqu'au texto ; rim et shaker très doux à partir de 9,4 s.
- **Souper** : la batterie s'arrête, une seule nappe (respiration).
- **Lundi à jeudi** : montée régulière (basse, puis kick doux, puis nappe qui s'ouvre), la signature de
  quatre notes jouée une fois au piano feutré, registre médium, **sur la fermeture de l'agenda**.
- **Risque** : sans kick, accords posés. **Fin** : résolution en fa majeur, la signature reprise plus
  lentement sous le logo.
- Mix −15 LUFS / −1,5 dBTP ; pistes `bed` et `sfx` pour le mixage de la voix.

---

## Voix hors champ (ElevenLabs, une seule prise, voix québécoise posée)

| # | Réplique | Fenêtre (s) | Repère à l'écran |
|---|---|---|---|
| 1 | Jeudi, trois rencontres avec des vendeurs. | 0,20 – 2,75 | image 0, cartes sorties 1,15 |
| 2 | Tout a commencé dimanche, à vingt et une heures quatorze. | 2,95 – 5,75 | rembobinage 2,95 – 4,3, bulle « dim. 21 h 14 » |
| 3 | Sophie cherche à vendre son condo. Elle tombe sur votre équipe. | 5,85 – 9,30 | frappe 6,05, annonce 6,95, page 7,7 |
| 4 | Moins d'une minute plus tard, elle a sa réponse. | 9,55 – 13,10 | texto 10,25, « Envoyé en moins d'une minute » 10,7 |
| 5 | Vous, vous étiez au souper. | 13,35 – 14,85 | cell du leader, 21:15 |
| 6 | Lundi matin, Julie l'appelle. | 15,20 – 16,90 | avis 15,5, « Appeler Sophie » |
| 7 | Marc n'était pas prêt. On est restés en contact. | 17,20 – 20,90 | « Pas avant le printemps » 17,6, « 6 semaines plus tard » 18,4 |
| 8 | Jeudi, ils sont tous à l'agenda. | 21,30 – 23,30 | cartes dans la pochette 22,6 ; respiration sur la fermeture 23,45 |
| 9 | Vous savez d'où viennent vos prochains mandats. | 23,70 – 26,10 | recul, semaine de l'équipe |
| 10 | On livre, ou le mois est gratuit. Pas de contrat. | 26,40 – 28,95 | sceau 27,4, « Pas de contrat. » 27,7 |
| 11 | Votre diagnostic gratuit, sur scalesuiteqc.ca. | 29,30 – 32,80 | bouton 29,55, relâché 30,35 |

Débit prévu : 4,6 à 5,4 syllabes par seconde (la réplique 10 est la plus serrée). Changements par rapport
au point de départ : réplique 1 sans « soir » (Annie est à 17 h 15, voir le choix 2) ; réplique 8 « à
l'agenda » ; réplique 9 ajoutée (le titre du point culminant) ; réplique 10 reprend mot pour mot la
garantie à l'écran, plus « Pas de contrat. ». Aucune phrase ne commence par « Et » ou « Mais ».

**Bloc à coller (ElevenLabs Multilingual v2, stabilité 50 à 60 %, similarité 75 %, style 0 à 10 %)** :

```
Jeudi, trois rencontres avec des vendeurs. <break time="1.0s" /> Tout a commencé dimanche, à vingt et une heures quatorze. <break time="1.0s" /> Sophie cherche à vendre son condo. Elle tombe sur votre équipe. <break time="1.0s" /> Moins d'une minute plus tard, elle a sa réponse. <break time="1.5s" /> Vous, vous étiez au souper. <break time="1.0s" /> Lundi matin, Julie l'appelle. <break time="1.0s" /> Marc n'était pas prêt. On est restés en contact. <break time="1.0s" /> Jeudi, ils sont tous à l'agenda. <break time="1.0s" /> Vous savez d'où viennent vos prochains mandats. <break time="1.0s" /> On livre, ou le mois est gratuit. Pas de contrat. <break time="1.0s" /> Votre diagnostic gratuit, sur Scale Suite Q C point C A.
```

Même fichier : `brag-output/voiceover-dimanche-elevenlabs.txt`. Comme pour les films précédents, les
pauses ne seront peut-être pas générées : la prise sera découpée sur des points de coupe repérés à
l'oreille et alignés sur le point le plus silencieux à ± 60 ms (`audio/split-vo-dimanche.py`). Déposer le
fichier à la racine sous le nom `voiceover-dimanche.mp3`.

---

## Choix à arbitrer (avec recommandation)

1. **Police des titres** : **Instrument Sans (site) pour les titres, Inter pour l'interface**. Recommandé :
   le spectateur qui clique retrouve la typographie de scalesuiteqc.ca, et l'interface reste réaliste
   (téléphones, Google). La police est auto-hébergée (`assets/fonts/InstrumentSans-*.woff2`, licence OFL,
   nouveau fichier). Variante : tout en Inter, comme les films précédents.
2. **Annie un vendredi** : avec « Vendredi 10 h Annie », le titre « Jeudi, trois rencontres » serait faux à
   l'écran (deux rencontres le jeudi). **Recommandé : Annie le jeudi à 17 h 15** (17 h 15, 18 h 30, 19 h 45,
   tout dans « Jeudi 12 novembre »). Variante : garder vendredi 10 h et titrer « Cette semaine, trois
   rencontres avec des vendeurs. ».
3. **La ligne de temps de Marc** : si la barre part de « lun. 9 h 00 » et glisse vers la droite de six
   semaines, on arrive le 21 décembre, après le jeudi 12 novembre où Marc est à l'agenda. **Recommandé :
   la barre recule d'abord jusqu'à sa demande (jeu. 24 septembre, « Pas avant le printemps »), puis glisse
   de « 6 semaines plus tard » (jeu. 5 novembre, sa réponse « la semaine prochaine »), puis jusqu'au jeudi
   12 novembre.** Toutes les dates restent vraies et la position du curseur reste chronologique.
4. **À qui est l'agenda** : **l'agenda de Julie** (couverture « Julie »). Ses trois rencontres sont Sophie,
   Marc et Annie, ce qui donne « Julie, 3 rencontres » au recul, à côté de « Kevin, nouveau, 2 rencontres ».
   Marc est donc suivi par Julie (texto de suivi signé Julie). Recommandé.
5. **Bulle sur deux lignes** (jour et heure, puis la date) : rend les sauts de semaines lisibles et chaque
   jour vérifiable. Recommandé.
6. **Couleur du bouton** : **bleu profond du logo (`#16708F`), lustré** (reflet spéculaire en haut, liseré
   turquoise, ombre portée qui suit le balancement). Recommandé : couleurs du logo, et distinct du bouton
   noir de la référence. Variante : encre `#151515` comme le bouton du site.
7. **Mention sous les écrans avec un numéro** (scènes 3 à 5) : « Exemple. Noms et numéros fictifs. »
   (numéros en 555). Ailleurs : « Exemple. Noms fictifs. ». Recommandé.
8. **Ponctuation des textos** : sans espace avant « ! » et « ? » (« Bonjour Sophie! », « Qui le prend? »
   dans « Le lead perdu »), usage courant au Québec et dans un texto. Recommandé. Variante : espace fine.
9. **Expéditeur de l'avis du lundi** : « ScaleSuite » avec la marque (comme les avis validés des films
   précédents). Recommandé. Variante : un texto au courtier depuis le numéro de l'équipe (mais alors sans
   bouton « Appeler Sophie », qu'un texto n'a pas).
10. **Titres ajoutés** pour la compréhension sans le son : scène 3 « Sophie veut vendre son condo. », scène 5b
    « Lundi matin, Julie l'appelle. », scène 6 « Marc n'était pas prêt. » puis « On est restés en
    contact. », scène 7 « Jeudi, ils sont tous à l'agenda. », scène 8 « Ce qu'on livre. ». Ils reprennent
    la voix mot pour mot. Recommandé.
11. **Les cinq crochets** : campagne ajustée chaque semaine, page à l'image de l'équipe, texto en moins
    d'une minute, relance de l'équipe après 10 minutes, suivi 90 jours (le résumé hebdomadaire et le bilan
    mensuel restent hors champ). Recommandé.

## Fichiers (aucun fichier existant modifié)

- Sources : `scalesuite-film/index-dimanche.html`, `src/scenes-dimanche/*.js`, `src/styles-dimanche.css`,
  `src/film-dimanche.js`, `render/*-dimanche.*`, `audio/music-dimanche.py`, `audio/split-vo-dimanche.py`,
  `build-dimanche.sh`, `build-dimanche-vo.sh`, `assets/fonts/InstrumentSans-*.woff2` (si le choix 1 est
  retenu).
- Sorties (`brag-output/`) : `scalesuite-dimanche-9x16.mp4` (master 1080 × 1920, 60 fps),
  `scalesuite-dimanche-9x16-vo.mp4`, `previews/scalesuite-dimanche-9x16-preview[-s1-3].mp4` (540 × 960),
  `scalesuite-dimanche-9x16-contact-sheet[-s1-3].jpg`, `scalesuite-dimanche-9x16-poster.jpg`,
  `audio-dimanche/`, `voiceover-dimanche.md` (feuille de timing).

## Étapes

1. **Validation de ce plan** (en attente).
2. Aperçu 540 × 960 des scènes 1 à 3 (0 – 9,4 s) avec la musique, et planche contact (une rangée par
   scène). Validation.
3. Scènes 4 à 9, aperçu complet, master 1080 × 1920 60 fps, version avec voix, feuille de timing.
4. Contrôle qualité (section 11 du skill), commit, push, pull request vers `scalesuiteqc/scalesuite-video`
   (`main`).
