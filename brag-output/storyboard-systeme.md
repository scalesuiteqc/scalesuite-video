# ScaleSuite « Le Système Vendeurs 5 minutes » : plan scène par scène (validé, corrigé pour la relance)

Film d'acquisition · 9:16 (1080 × 1920) · **34,0 s** · 60 fps · fonctionne sans le son · français (Québec)
Fichiers : suffixe `systeme` partout (`index-systeme.html`, `src/scenes-systeme/`, `src/styles-systeme.css`,
`build-systeme.sh`, `audio/music-systeme.py`, `scalesuite-systeme-9x16*.mp4`…). Aucun fichier existant
modifié. `core.js`, `logo.js`, `styles.css`, `core-v3.js` chargés en lecture seule ; composants de
« Le lead perdu » copiés.
Public : leaders d'équipes de 4 à 15 courtiers au Québec.
Branche : `claude/laughing-babbage-qo1pf8` (nouvelle, partie de `main`). PR vers
`scalesuiteqc/scalesuite-video`, base `main`.

---

## L'idée en une phrase

**Même vendeur, même samedi, même minute.** Sans le système, la demande attend trois heures. Avec le
système, chaque minute déclenche une action, jusqu'au courtier qui rencontre le vendeur.

## Identité : `brag-output/design-dna-systeme.json`

Couleurs **mesurées** sur les 5 captures du site (copiées dans `docs/site-reference/site-0X-*.png`,
car le dossier n'existait pas) avec `design-dna/scripts/measure-colors.mjs` :

| Rôle | V3 | Système (site) |
|---|---|---|
| Fond | `#F7FBFA` | **`#F0FFFC`** (91 % de l'accueil) ; bandes menthe `#E2F6F6` |
| Encre | `#1A1A1A` | **`#151515`** |
| Texte secondaire | `#5E6B69` | **`#596563`** |
| Accent des titres, grands chiffres | turquoise `#14A89B` | **sarcelle profond `#0F7B6F`** (« Nous, on vous les amène. », « 124 ») |
| Lignes de routage, nœuds, halo actif | `#2BBFB3` | `#2BBFB3` (gardé ; le site l'emploie pour le contour « Votre équipe ») |
| Bouton d'appel | dégradé turquoise → vert, flèche | **plein encre `#151515`, texte blanc, sans flèche**, rayon ≈ 19 % de la hauteur |
| Pastille d'étiquette | — | pastille douce statique `#E2F6F6` / `#0F7B6F`, **sans point** |
| Fond ambiant | deux lumières floues qui dérivent | **retirées** : fond plat, dégradé vertical fixe très doux vers `#E7F8F5`, grain statique |

Typographie : Inter 800 (auto-hébergée), interlettrage resserré à −0,045 em pour approcher la grotesque
serrée du site. Le second segment des titres passe en sarcelle, en couleur pleine (jamais en dégradé).
Monde du problème : palette grise de « Le lead perdu » (`#EEF1F4`, encre `#2B3138`, ardoise `#6E8092`).
Interdits respectés : pas de point qui pulse, pas de pointillés, pas de texte en dégradé, pas de halo
flou qui flotte, pas de flèche qui rebondit, fond clair partout, aucun rouge.

La vie ambiante (3ᵉ couche de `motion-design`) vient désormais de **l'horloge** (trotteuse d'un petit
cadran) et d'une avancée de caméra de 1 à 3 %, plus des lumières.

## Le fil visuel : une seule horloge

```
 ╭──────────────────────────╮
 │  ◷  sam. 14 h 12          │   pastille 420 × 96, chiffres tabulaires 52 px (rouleau par chiffre)
 ╰──────────────────────────╯   cadran 64 px : aiguilles des heures et des minutes, trotteuse
```

- Elle **naît du titre** de l'accroche (« 14 h 12 » se détache du titre et rétrécit dans la pastille,
  élément partagé) et reste en haut de la zone produit (y ≈ 640) dans les deux mondes.
- **Problème** : elle *saute* des heures (rouleau lent, cadran qui tourne d'un bloc) et rien ne
  change dans l'interface. 14 h 12 → 15 h 30 → 17 h 04.
- **Bascule** : elle revient en arrière jusqu'à 14 h 12, puis le disque menthe **éclot depuis elle**.
- **Solution** : elle avance **minute par minute** ; à chaque minute, un fil turquoise court part de
  la pastille vers l'élément qui agit (formulaire, texto, carte du courtier, équipe).
- **Suivi** : elle passe en mode date, « sam. 7 nov. » → « ven. 5 févr. » (90 jours plus tard,
  vérifié : vendredi 5 février 2027).

Dates vérifiées : **samedi 7 novembre 2026** (bien un samedi).

## La carte « Votre équipe » (présente dès la scène 2)

Une liste plutôt qu'une grille, pour garder les alertes en 32 px sur une seule ligne :

```
◷ sam. 14 h 12                             ← horloge, au-dessus de la carte (y ≈ 600)
┌───────────────────────────────────────────────┐  900 de large, y 680
│ Votre équipe · Équipe Gagnon                   │  en-tête 96
│ ◯  Leader              Responsable de l'équipe │  ← rangée du leader, séparée par un filet
├───────────────────────────────────────────────┤
│ ◯  Courtier 01                                 │  rangées de 96, avatar 64 sans visage,
│ ◯  Courtier 02                                 │  nom 42 px, ligne 2 en 32 px
│ ◯  Courtier 03         ⌂ En visite libre       │
│    └ Demande vendeur · Longueuil     [Non lue] │  ← sous-carte d'alerte de 80, emboîtée
│ ◯  Courtier 04                                 │
│ ◯  Courtier 05                                 │
└───────────────────────────────────────────────┘
```

- **Leader** en première rangée dès la scène 2, avec la ligne 2 « Responsable de l'équipe » : il ne
  sort pas de nulle part à 14 h 22.
- Les alertes sont des **sous-cartes** de 80 px qui s'emboîtent sous la rangée concernée (les rangées
  du dessous glissent de 80 px). Deux sous-cartes au plus à l'écran (Courtier 03 et Leader).
- La demande n'est **jamais redistribuée** : seuls Courtier 03, puis le Leader, la reçoivent. Les
  autres rangées restent atténuées à 30 % dans la solution.

## Deux mondes

| | Le problème (0 – 9,4 s) | Avec le Système (9,9 – 34 s) |
|---|---|---|
| Fond | `#EEF1F4` plat | `#F0FFFC`, dégradé fixe vers `#E7F8F5` |
| Cartes | `#FAFBFC`, ombre neutre | `#FFFFFF`, ombre teintée menthe |
| Accent | ardoise `#6E8092` | sarcelle `#0F7B6F`, routage `#2BBFB3` |
| Avatars | ardoise sur `#E1E6EB` | sarcelle sur `#E2F6F6` |
| Mouvement | lent (650 – 900 ms), aucun dépassement | dépassement réservé aux héros (texto 12 %, bouton 10 %, pastilles 4 %) |
| Horloge | saute des heures | avance minute par minute |

---

## Courbe de rythme

```
énergie
  ▲                                                   ★★ chez le leader (21,1 s, 62 %)
  │                                    ★ texto          ███            ▲ 124 (25,6 s, 75 %)
  │                                    ███            █████          ████
  │ ███                               █████▄▄▄▄▄▄▄▄▄██████▄▄▄▄▄▄▄▄▄██████▄
  │ ████▄▄▄▄▄                  ▄▄▄▄▄▄█████████████████████████████████████▄▄▄▄▄▄▄▄▄▄
  │ █████████▄▄▄▄▄▄▄▄  ▁▁  ▄▄▄███████████████████████████████████████████████████████
  └──────────────────────────────────────────────────────────────────────────────────▶ t
   0 formulaire  3 en visite  5,6 17 h   9,4 retour  10 Reprenons  12,1 14 h 12  13,8 14 h 13 texto
   17,6 courtier alerté  20,2 14 h 22 relance → leader  22,8 90 jours  25 preuve  27,8 thèse  30,4 fin  34
```

- **Problème (0 – 9,4 s, 28 %)** : net à l'image 0, puis l'énergie *descend*. Rien ne bouge sauf
  l'horloge. La musique s'amincit jusqu'à une note tenue sur « Trois heures… ». Respiration 0,5 s.
- **Bascule (9,4 – 12,1 s)** : retour en arrière rapide (0,5 s), éclosion menthe.
- **Solution (12,1 – 25,0 s, 38 % du film, la partie la plus longue)** : montée régulière. Le texto
  (13,8 – 17,6 s) est la scène la plus longue (3,8 s) : c'est la destination. Le pic d'énergie est
  l'arrivée de la relance chez le leader (21,1 s, 62 %) : neuf tics d'horloge qui accélèrent, une
  deuxième alerte, une seule ligne qui monte vers le leader. Le compteur 124 (≈ 75 %) porte le
  dernier sommet, à égalité.
- **Preuve (25,0 – 27,8 s)** : le compteur est le dernier sommet (≈ 75 %).
- **Fin (27,8 – 34,0 s)** : thèse, logo, bouton, tenue de 2,2 s.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition vers la suivante |
|---|---|---|---|---|---|
| 1 · Accroche (gris) | 0,0 – 3,0 | 3,0 s | **Image 0, tout est lisible** : titre « Samedi, **14 h 12.** » (124 px, ardoise sur « 14 h 12 », y 230 – 370) et sous-titre « Un vendeur remplit votre formulaire. » (52 px, y 430). Dessous (y 640 – 960), un résultat Google de 900 px : « **Commandité** · exemple.ca », « Vendre votre maison à Longueuil » (42 px), deux liens annexes squelettes. À 0,55 s, appui (onde) ; **zoom à travers** : l'annonce s'ouvre en page de l'équipe 900 × 900 (barre « Équipe Gagnon » couleur fictive `#2F5D8C`, titre partagé avec l'annonce, champs « Votre propriété · Maison, Longueuil », « Votre cellulaire » tapé « 514 555 0187 », bouton « **Envoyer** »). À 2,0 s, appui sur « Envoyer » ; à 2,15 – 2,55 s la page **se compresse en jeton** d'encre « ● DEMANDE VENDEUR · Longueuil » (460 × 100, 34 px). | Avancée lente 1,00 → 1,03 (sinus). | **Élément partagé** : « 14 h 12 » quitte le titre et rétrécit dans la pastille de l'horloge ; le jeton tombe (arc, ease-in) vers la carte de l'équipe qui monte du bas. |
| 2 · Votre courtier est en visite | 3,0 – 5,6 | 2,6 s | Horloge « ◷ sam. 14 h 12 » au-dessus de la carte « **Votre équipe** · Équipe Gagnon » (900 px) : rangée **Leader** (« Responsable de l'équipe »), puis Courtier 01 à 05 (avatars ronds neutres, aucun visage). Courtier 03 : « ⌂ **En visite libre** ». Le jeton s'emboîte sous Courtier 03 en sous-carte « Demande vendeur · Longueuil » avec la pastille « **Non lue** » (ardoise). Les autres rangées ont des lignes 2 en squelette. Titre : « Votre courtier / est **en visite.** » (3,1 s ; tenu 3,6 – 5,6). L'horloge **saute** : 15 h 30 (4,4 s), puis 17 h 04 (5,1 s), rouleau lent 0,4 s, cadran qui tourne d'un bloc ; rien d'autre ne bouge, la pastille reste « Non lue ». | Fixe à 1,08 sur Courtier 03 et l'horloge. | **Continu** : même carte. |
| 3 · Il voit l'alerte à 17 h | 5,6 – 9,4 | 3,8 s | À 5,6 s, « En visite libre » devient « Disponible » et « Non lue » devient « **Lue à 17 h 04** » (bascule dans le masque, sans rebond). La pastille de l'horloge s'élargit en règle : « 14 h 12 ━━━━━━ 17 h 04 », segment gris tracé entre les deux heures : le temps perdu, rendu visible sans chiffre de durée. Titre (via `SS.band`) : « Il voit l'alerte / à **17 h.** » (5,7 s ; tenu 6,1 – 7,4). Puis « Trois heures / pour appeler / **quelqu'un d'autre.** » (7,45 s ; tenu 7,9 – 9,4) ; la rangée de Courtier 03 s'affaisse de 10 px, les autres s'atténuent à 30 %. Respiration musicale 8,9 – 9,4 s. | Avancée 1,08 → 1,14 sur la barre de temps, puis fixe. | **Retour en arrière** : l'horloge redescend jusqu'à 14 h 12 (rouleau inverse, 0,5 s), la règle se rembobine, « Lue » redevient « Non lue », puis tout se vide. |
| 4 · Reprenons (bascule) | 9,4 – 12,1 | 2,7 s | 9,5 – 10,0 s : retour en arrière. 10,05 s : un **disque menthe éclot depuis l'horloge** (0,5 s) et recouvre le cadre. L'horloge reste seule, en couleurs ScaleSuite : « ◷ sam. 14 h 12 ». Titre « **Reprenons.** » (124 px, 10,4 s) et dessous « Avec le Système Vendeurs 5 minutes. » (52 px, 10,6 s). Tenu 10,9 – 12,1 s. | Fixe, avancée 1 %. | **Continu** : l'horloge reste ; la page de l'équipe remonte du bas sous elle. |
| 5 · 14 h 12, le formulaire part | 12,1 – 13,8 | 1,7 s | Même page de l'équipe (monde menthe), formulaire déjà rempli. Appui sur « Envoyer » à 12,3 s, compression en jeton à 12,45 – 12,8 s (écho exact de l'accroche, plus rapide). Titre : « **14 h 12.** / Le formulaire part. » (12,2 s ; tenu 12,5 – 13,8). | Fixe à 1,05. | **Tic de l'horloge** à 13,85 s (14 h 12 → 14 h 13, un seul chiffre roule) ; un fil turquoise part de la pastille et le jeton le suit vers le bas, coup de fouet avec flou de vitesse jusqu'au téléphone. |
| 6 · 14 h 13, le vendeur a sa réponse (héros) | 13,8 – 17,6 | **3,8 s** | **Téléphone du vendeur**, objet héros, cadré serré et coupé par le bas (820 × 1700, écran verrouillé clair) : « samedi 7 novembre », « **14:13** ». À 14,55 s le jeton se déplie en **texto** (12 % de dépassement, vibration amortie 3 oscillations) : expéditeur « **514 555 0142** » · « maintenant », message « Bonjour, ici Julie de l'Équipe Gagnon. J'ai bien reçu votre demande. Je vous appelle dans quelques minutes. » (36 px, 3 lignes, carte 800 de large, y 960 – 1330). Titre : « **14 h 13.** / Le vendeur a **sa réponse.** » (14,3 s ; tenu 15,0 – 17,6, 2,6 s : le temps de lire le texto). Mention discrète « Exemple. Noms et numéros fictifs. » (30 px, `#596563`, y 1560), comme sur le site. | Coup de fouet vers le bas en arc, puis légère poussée 1,00 → 1,04 pendant la lecture. | **Même minute** : la caméra remonte (fouet en arc) ; le fil turquoise repart de l'horloge vers la carte de l'équipe. |
| 7 · 14 h 13, le bon courtier est alerté | 17,6 – 20,2 | 2,6 s | Horloge toujours « sam. 14 h 13 ». La carte de l'équipe en couleurs ScaleSuite (Leader, Courtier 01 à 05, avatars sarcelle). La **ligne de routage** se trace de l'horloge (17,8 – 18,4 s) jusqu'à la rangée de **Courtier 03**, qui prend le halo turquoise ; une sous-carte s'y emboîte (4 %) : « **Nouvelle demande · Vendeur · Longueuil** ». Les autres rangées, Leader compris, s'atténuent à 30 %. Courtier 03 est encore « ⌂ En visite libre » (même situation que dans le problème). Titre : « Le bon courtier / est **alerté.** » (17,9 s ; tenu 18,6 – 20,2). | Panoramique court de l'horloge vers la carte, puis fixe à 1,08. | **Continu** : l'horloge avance. |
| 8 · 14 h 22, l'équipe est relancée | 20,2 – 22,8 | 2,6 s | L'horloge **avance minute par minute** de 14 h 13 à 14 h 22 (20,3 – 21,0 s, neuf tics qui accélèrent, loi de puissance). Courtier 03 n'a pas rappelé : à 14 h 22, la sous-carte de Courtier 03 bascule dans son masque en **deuxième alerte « Relance · Vendeur · Longueuil »** (21,0 s). Puis **une seule ligne de routage** monte de cette sous-carte vers la rangée **Leader** (21,05 – 21,35 s, arc court dans la marge gauche), qui prend le halo et reçoit la même sous-carte « **Relance · Vendeur · Longueuil** » (4 %, 21,4 s). Courtier 01, 02, 04 et 05 restent atténués : rien ne s'allume chez eux, la demande n'est pas redistribuée. Aucun classement, aucun délai par courtier. Titre (texte du site) : « Pas de rappel? / L'équipe est **relancée.** » (20,35 s ; tenu 21,6 – 22,8). | Légère remontée pour cadrer Courtier 03 et le Leader ensemble (1,08 → 1,04). | **Élément partagé** : la sous-carte de Courtier 03 quitte la liste et devient la première pastille d'un ruban de suivi. |
| 9 · Pas prêt à vendre? 90 jours | 22,8 – 25,0 | 2,2 s | Carte « **Suivi · Vendeur · Longueuil** » 900 px : un ruban horizontal se trace de « Aujourd'hui » à « **90 jours** » (`stroke-dashoffset`, 0,9 s). L'horloge passe en mode date et roule « sam. 7 nov. » → « **ven. 5 févr.** ». Aucune fréquence de relance inventée, aucun point de contact chiffré. Titre : « Pas prêt à vendre? / **Suivi pendant 90 jours.** » (22,9 s ; tenu 23,4 – 25,0). | Fixe à 1,05, avancée 1 %. | **Morphose** : le ruban se contracte en un trait qui devient l'axe du compteur. |
| 10 · Preuve | 25,0 – 27,8 | 2,8 s | « **124** » (240 px, sarcelle, chiffres tabulaires) compte de 0 à 124 en 0,8 s (25,25 – 26,05, ease-out). Dessus : « Groupe Mackay » (48 px) ; dessous : « demandes en moins de 7 mois. » (52 px) puis « Avec la campagne seule. » (40 px, `#596563`, 26,1 s). Tenu 26,2 – 27,8 s. | Fixe. | **Morphose** : le chiffre s'aplatit en ligne (motif V3). |
| 11 · Thèse | 27,8 – 30,4 | 2,6 s | Sur la menthe : « Vos courtiers rencontrent / des vendeurs. » (110 px, encre, 27,9 s) puis « **Nous, on vous les amène.** » (110 px, sarcelle, 28,4 s). Sous la thèse, discrète, la rangée de Courtier 03 avec la sous-carte « **Rencontre · Vendeur · Longueuil** » (la destination, voir choix 6). Tenu 28,8 – 30,4. | Avancée 1 %. | **Ligne contractée en nœud, puis en logo** (motif V3). |
| 12 · Fin | 30,4 – 34,0 | 3,6 s | Logo complet (balayage de la marque, lettres qui montent), « **Le Système Vendeurs 5 minutes** » (44 px, pastille douce statique). Le **bouton naît d'un nœud** et s'étire en « **Obtenir mon diagnostic gratuit** » (700 × 136, plein encre, texte blanc 40 px, 10 % de dépassement, 31,25 s), puis « scalesuiteqc.ca » (40 px, 31,6 s). Tout est posé à 31,8 s et tenu jusqu'à 34,0 s (2,2 s ; un seul reflet lent sur le bouton à 32,6 s). | Avancée de 1 %. | Fin. |

Durées : 3,0 · 2,6 · 3,8 · 2,7 · 1,7 · **3,8** · 2,6 · 2,6 · 2,2 · 2,8 · 2,6 · 3,6 s = 34,0 s.

### États tenus (≥ 1,2 s, immobiles et lisibles)

| État | Tenu |
|---|---|
| Titre de l'accroche « Samedi, 14 h 12. Un vendeur remplit votre formulaire. » (l'interface dessous agit) | 0,0 – 2,9 s |
| « Votre courtier est en visite. », Courtier 03 « En visite libre », « Non lue » (seule l'horloge saute) | 3,6 – 5,6 s (2,0 s) |
| « Il voit l'alerte à 17 h. », « Lue à 17 h 04 » | 6,1 – 7,4 s (1,3 s) |
| « Trois heures pour appeler quelqu'un d'autre. » | 7,9 – 9,4 s (1,5 s) |
| « Reprenons. Avec le Système Vendeurs 5 minutes. » | 10,9 – 12,1 s (1,2 s) |
| « 14 h 12. Le formulaire part. » | 12,5 – 13,8 s (1,3 s) |
| Texto sur l'écran verrouillé + « 14 h 13. Le vendeur a sa réponse. » | 15,0 – 17,6 s (2,6 s) |
| « Le bon courtier est alerté. », ligne sur Courtier 03 | 18,6 – 20,2 s (1,6 s) |
| « Pas de rappel? L'équipe est relancée. », relance chez Courtier 03 et chez le Leader | 21,6 – 22,8 s (1,2 s) |
| « Pas prêt à vendre? Suivi pendant 90 jours. » | 23,4 – 25,0 s (1,6 s) |
| « Groupe Mackay · 124 demandes en moins de 7 mois. Avec la campagne seule. » | 26,2 – 27,8 s (1,6 s) |
| Thèse complète | 28,8 – 30,4 s (1,6 s) |
| Fin (logo, nom du système, bouton, URL) | 31,8 – 34,0 s (2,2 s) |

Aucun cadre vide plus de 0,3 s : chaque transition passe par un objet (titre → horloge, jeton,
disque, fil de l'horloge, ruban, chiffre, nœud).

---

## Texte à l'écran (relu contre les règles)

- Seulement des affirmations du site : parcours en 6 étapes, texto dans la minute, de jour comme de
  soir (montré un samedi après-midi), bon courtier alerté, équipe relancée si personne n'a rappelé en
  10 minutes (montré par l'horloge 14 h 12 → 14 h 22, sans le nom « Filet 10 minutes »), suivi 90
  jours, preuve Groupe Mackay (124 demandes en moins de 7 mois, campagne seule), bouton « Obtenir mon
  diagnostic gratuit ».
- Absent : campagne par courtier, agences, IA, « Google Ads pour les équipes immobilières », démo,
  prix, pourcentage, promesse de nombre, exclusivité, script d'appel, classement, délai par courtier.
- Noms fictifs : Équipe Gagnon, Julie, numéros en 555 (514 555 0142 pour l'équipe, 514 555 0187 pour
  le vendeur), « exemple.ca ». Leader, Courtier 01 à 05. Seul nom réel : Groupe Mackay, dans la preuve.
- **Aucun trait d'union** : pas de noms de lieux composés (Longueuil seulement), « exemple.ca » au lieu
  de « exemple.ca › equipe-gagnon » du site. Aucune phrase en « Et » ou « Mais ». Aucun emoji.
  Vouvoiement.
- Le texto vient d'un numéro local (aucun nom d'expéditeur, comme au Canada) et il est signé du prénom.
- Ponctuation québécoise : pas d'espace avant « ? » (comme « Le lead perdu ») ; « 14 h 12 », « 17 h ».

## Règles appliquées

- **Lisibilité** : interface 900 px (83 %) ; texte d'interface ≥ 30 px à l'écran, libellés principaux
  40 px, message du texto 36 px ; titres 104 à 124 px entre y 200 et 560 ; produit entre y 600 et
  1500 ; rien de critique sous y 1500 ni à x > 930 ; `SS.scrim` sous les titres posés sur une
  interface qui bouge, `SS.band` pour les titres qui changent dans la même case. Contrôle automatique
  de la taille du texte (`render/textsize-systeme.mjs`, copié de `textsize-equipe.mjs`).
- **Mouvement** : courbes `SS.EZ` de la V3, durées 180 / 320 / 650 / 900 ms ; aucune interpolation
  linéaire dans l'espace (l'horloge roule avec easing, seule la frappe est caractère par caractère) ;
  décalages de 35 à 80 ms (< 500 ms par groupe) ; dépassement **jamais dans le monde du problème** ;
  règle du tiers (fouets en arc avec clé intermédiaire) ; un héros par temps ; trois couches
  (primaire : l'action ; secondaire : ombres, halos, fil de l'horloge ; ambiante : trotteuse, avancée
  de caméra, grain) ; aucun fondu de scène.
- **Déterminisme** : `fromTo()` uniquement, états initiaux explicites, flou procédural, horloge
  procédurale sur un proxy ; contrôles `determinism` et `motion 34` à OK.
- **Raccords** à vérifier au pixel : 3,0 s (titre → horloge), 10,05 s (horloge → disque),
  13,85 s (jeton → fil), 14,55 s (jeton → texto), 22,8 s (carte → ruban), 25,0 s (ruban → axe du
  compteur), 30,4 s (ligne → nœud → logo).

---

## Son

### Effets sonores : 5 au total (règle de la skill, réglage de « Le lead perdu » repris tel quel)

| # | Temps | Moment | Son (fonction de `music-lead-perdu.py`) | Gain | Cible sous la musique |
|---|---|---|---|---|---|
| 1 | 9,5 s | Retour en arrière, puis éclosion à 10,05 s | souffle montant 250 → 1 800 Hz, passe-bas 2,5 kHz (`breath`, `'rise'`) | 0,34 | ≈ −10 dB |
| 2 | 12,3 s | Appui sur « Envoyer » (monde menthe) | clic feutré (`feltclick`) | 0,22 | ≈ −12 dB |
| 3 | 14,55 s | **Texto du vendeur** (héros) | double vibration sourde 150 Hz (`mutedbuzz`), jamais un son de message | 0,30 / 0,24 | ≈ −8 dB |
| 4 | 21,4 s | La relance arrive chez le leader | une seule vibration sourde, plus courte et plus basse (`mutedbuzz`, 0,16 s) | 0,20 | ≈ −11 dB |
| 5 | 31,25 s | Le bouton naît | souffle doux 300 → 1 500 Hz en cloche (`breath`, `'swell'`) | 0,36 | ≈ −10 dB |

Rien d'autre : ni l'appui sur l'annonce de l'accroche, ni « Envoyer » dans le problème, ni les sauts
d'horloge, ni les tics minute, ni le compteur 124 n'ont d'effet. Aucune cloche, aucun « ding ». Le
script imprime le contrôle RMS de chaque effet contre la musique à chaque rendu (jamais moins de 6 dB).

### Musique (`audio/music-systeme.py`, même méthode et même signature do, fa, mi, la)

- **Problème** : nappe froide clairsemée en ré mineur, piano feutré grave. Le tic-tac est *dans* la
  musique (`softtick`), mais il ne bat pas : un seul tock grave à chaque saut d'horloge (4,4 et
  5,1 s), puis plus rien. S'amincit jusqu'à une note tenue sur « Trois heures… ».
- **Bascule** : la note tenue est aspirée pendant le retour en arrière ; la musique s'ouvre en fa
  majeur sur l'éclosion.
- **Solution** : groove néo-soul doux de « Le lead perdu » (sans pings). Les tics minute de l'horloge
  tombent sur des temps forts (repères exportés). La **signature de quatre notes** est jouée une fois
  au piano feutré médium sur le texto (14,55 s), dans la musique. Pic de densité sur l'arrivée chez le leader.
- **Preuve** : la basse monte avec le compteur, sans effet.
- **Fin** : résolution en fa majeur sous le logo.
- Mix à −15 LUFS / −1,5 dBTP ; pistes `bed` et `sfx` pour la voix.

## Voix hors champ

Voir `brag-output/voiceover-systeme.md` (écrit à l'étape 1 sur ce plan ; fenêtres recalées sur les
repères réels à l'étape 3).

---

## Choix à trancher (avec ma recommandation)

1. **Garder la preuve Mackay** (25,0 – 27,8 s, compteur 0 → 124). *Recommandé : oui.* C'est la seule
   preuve publiée et elle répond à « est-ce que ça marche? » juste avant l'appel. « Avec la campagne
   seule. » reste en dessous, comme sur le site.
2. **Durée : 34,0 s.** *Recommandé.* Le haut de la fourchette, parce que le texto (22 mots) demande
   2,6 s de lecture et que chaque état est tenu ≥ 1,2 s. Variante à 32 s : retirer la scène 5
   (« 14 h 12. Le formulaire part. ») et faire partir le jeton directement de la bascule ; on perd
   l'écho exact de l'accroche.
3. **Style de l'horloge** : pastille numérique « ◷ sam. 14 h 12 » avec rouleau par chiffre, plus un
   petit cadran à aiguilles (64 px) qui donne la vie ambiante. *Recommandé.* Variantes : grand cadran
   analogique seul (plus graphique, mais l'heure exacte se lit moins vite) ; numérique seule.
4. **L'horloge naît du titre** (« 14 h 12 » se détache de « Samedi, 14 h 12. »). *Recommandé* : un
   seul objet du début à la fin, et l'image 0 reste une phrase lisible.
5. **Pic d'énergie** : le texto est la scène la plus longue (la destination, 3,8 s, à ≈ 43 %), mais le
   pic d'énergie est l'arrivée de la relance chez le leader (≈ 62 %), puis le compteur (≈ 75 %). *Recommandé* :
   la chronologie des minutes impose cet ordre, et la courbe monte jusqu'à la preuve.
6. **Montrer la rencontre** (6ᵉ étape du parcours) sous la thèse : la carte de Courtier 03 avec
   « Rencontre · Vendeur · Longueuil », discrète, sans date ni promesse. *Recommandé : oui*, c'est la
   destination (Hormozi). Variante : thèse seule sur la menthe.
7. **Mention « Exemple. Noms et numéros fictifs. »** sous le téléphone (30 px, hors zone critique),
   comme sur le site. *Recommandé : oui*, puisque le texto montre un prénom et un numéro.
8. **Mot « demande » plutôt que « lead »** partout à l'écran (jeton « DEMANDE VENDEUR »), comme le
   site. *Recommandé.*
9. **Vendeur au masculin** (« le vendeur », « Pas prêt à vendre? »), comme dans votre texte et sur le
   site. *Recommandé.*
10. **Voix sur la preuve** : pas de réplique « Groupe Mackay… ». Elle se dit en 10 mots (3,7 s) et il
    ne reste que 1,65 s libre avant la thèse. *Recommandé : la preuve se lit à l'écran, sous une montée
    de la musique.* Variante : prolonger la preuve de 1,4 s (35,4 s, hors cible).
11. **Problème : « Lue à 17 h 04 »** plutôt qu'un appel manqué ou un autre courtier qui signe : on
   reste sur un fait (l'heure), sans dramatiser. *Recommandé.*

## Étapes

1. **Ce plan** + `design-dna-systeme.json` + `voiceover-systeme.md`. ← *arrêt*
2. Images clés 540 × 960 sur une planche (une par état tenu, 13 images). Arrêt.
3. Aperçu animé 540 × 960 avec la musique, et la planche contact. Arrêt.
4. Master 1080 × 1920, 60 fps, contrôle qualité complet (section 11), texte relu sur des images
   extraites du MP4.
5. Version avec voix (prise `voiceover-systeme.mp3` fournie par vous).
6. Version 4:5 (1080 × 1350), après validation du 9:16.
7. `git add -f`, commit, push, PR vers `scalesuiteqc/scalesuite-video` (`main`).
8. Proposition de mise à jour de la section 9 de la skill (sans la modifier avant votre accord).

---

## Validation du plan (étape 1)

Les 11 recommandations et les deux écarts sont acceptés. **Correction obligatoire, scène 8** : la
relance ne va pas aux autres courtiers. Après 10 minutes sans rappel, elle va au courtier assigné,
puis au leader de l'équipe. Appliqué ci-dessus :
- rangée **Leader** dans la carte « Votre équipe », visible dès la scène 2 (problème) ;
- à 14 h 22 : deuxième alerte « Relance · Vendeur · Longueuil » chez Courtier 03, puis **une seule**
  ligne de routage vers le Leader, qui prend le halo et la même sous-carte ; les autres rangées
  restent atténuées ;
- titre inchangé « Pas de rappel? L'équipe est relancée. » (texte du site) ;
- effet sonore 4 (une vibration sourde) sur l'arrivée chez le leader, 21,4 s ;
- le pic d'énergie devient l'arrivée chez le leader (62 %) ; le compteur 124 porte le dernier sommet.
- La grille 2 × 3 devient une liste (Leader + Courtier 01 à 05), pour que les alertes tiennent sur une
  ligne en 32 px.

## Étape 2 : images clés

Planche `brag-output/scalesuite-systeme-9x16-keyframes.jpg` : 14 images 540 × 960 rendues depuis la
timeline (une par état tenu). Contrôle des tailles (`render/textsize-systeme.mjs`) : plus petit texte
à l'écran 30 px. Sources : `index-systeme.html`, `src/scenes-systeme/`, `src/styles-systeme.css`,
`src/film-systeme.js`, `render/*-systeme.*`.
