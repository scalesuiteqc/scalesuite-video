# ScaleSuite « Qui répond à 2 h du matin? » : plan scène par scène (à valider)

Vidéo promo du Système Vendeurs 5 minutes · français (Québec), tutoiement · 30 i/s
Fichiers : suffixe `qui-repond` partout (sources et sorties). Aucun fichier existant n'est modifié.

- **Export A (à filmer)** : 1920 × 1080, scènes 1 à 9, **48,2 s**, sans bandeau, marges généreuses.
- **Export B (direct)** : 1080 × 1920, mise en page verticale refaite, bandeau épinglé en scène 9, sous titres.
- La scène 0 (face caméra, 3 s) est filmée par Mathieu. Les temps ci dessous partent de 0 au début de
  la scène 1 ; ajouter 3 s pour retrouver les temps du brief.

---

## Ce que je réutilise du dépôt

| Élément | Source | Usage |
|---|---|---|
| Pipeline de rendu | `scalesuite-film/` : page HTML/SVG, timeline GSAP en pause (`SS.tl`), capture image par image avec Playwright, encodage ffmpeg | identique, donc rendu déterministe et images fixes à n'importe quel instant |
| GSAP 3.13 + CustomEase | `vendor/gsap-3.13.0` | courbes `SS.EZ` (ease out, ressorts `back.out`), aucune interpolation linéaire |
| Aides V2 et V3 (lecture seule) | `src/core.js`, `src/core-v3.js` | `SS.el`, `SS.svg`, `SS.place`, `SS.typer` (frappe avec curseur), `SS.counter`, `SS.odometer` (chiffres qui roulent), `SS.blur` (flou procédural), `SS.cue` (repères son), `SS.grain` |
| Logo | `assets/logo/` + `src/logo.js` (`SS.logo`, tracé vectoriel du logo public) | révélation en scène 5, logo final en scène 9 (version fond sombre : « Scale » en blanc) |
| Police | Inter variable, auto hébergée (`assets/fonts`) | toute la vidéo, titres en 700 à 800, chiffres tabulaires |
| Contrôles | `render/check-*.mjs` (déterminisme, continuité du mouvement), `render/sheet-v3.py` (planche contact) | contrôle qualité avant chaque envoi |
| Son | `audio/music-lead-perdu.py` (instruments, effets feutrés de référence), `audio/mix_vo.py` | musique discrète synthétisée sur les repères, mixage de la voix |

**À créer** (le pipeline actuel est fixé à 1080 × 1920) : `core-qui-repond.js` (canevas 16:9 ou 9:16 selon
`?format=`, nouveaux composants), `scenes-qui-repond/00-timing.js` + un fichier par scène,
`film-qui-repond.js`, `styles-qui-repond.css`, `render/*-qui-repond.mjs`, `build-qui-repond.sh`,
`audio/music-qui-repond.py`.

**Timing** : `00-timing.js` contient la durée de chaque scène dans une seule table ; les débuts de scène
en sont déduits. Chaque fichier de scène a ses propres constantes (décalages par rapport au début de la
scène). Changer une durée décale tout le reste sans toucher aux autres scènes.

## Couleurs (valeurs tirées des assets du dépôt)

| Rôle | Valeur |
|---|---|
| Dégradé du logo (marque) | `#1FBFA4` → `#27B6C8` → `#2FB0DE` → `#1FBCA6` |
| « Scale » / « Suite » | `#1E1E1E` / `#1FBFA8` |
| Turquoise de marque (puce de surlignage, accents) | `#2BBFB3`, texte foncé `#06211F` sur la puce |
| Bleu du logo (seconde couleur du dégradé de « Voici », halos) | `#2FB0DE` |
| Nuit (scènes 1 à 5, 8, 9) | fond `#070D14` à `#0B1622`, texte `#F2F7F9`, cartes `#F4F7F9` |
| Lumière (scènes 6 et 7) | fond `#E8F9F7` (menthe du dépôt) à `#F7FBFA`, encre `#1A1A1A`, cartes blanches |

La puce de surlignage est la même dans la nuit et dans la lumière : rectangle turquoise à coins de 8 px
qui se déploie de gauche à droite (0,28 s, ease out), texte foncé dessus. Dans les scènes claires, je
garde la puce plutôt qu'un texte turquoise : le turquoise sur fond turquoise pâle se lit mal, encore
plus une fois l'écran filmé.

## Signatures de mouvement (reprises de la référence)

- **Texte tapé avec curseur**, un seul message à la fois, 76 à 84 px en 16:9 (≈ 40 px une fois l'écran
  filmé en 9:16). Chaque phrase reste immobile au moins 0,9 s après la frappe.
- **Puce de surlignage** qui se déploie derrière le mot clé pendant qu'il se tape.
- **Gros chiffres** (340 à 420 px) : chiffres qui roulent comme un compteur mécanique, flou vertical
  pendant le défilement, halo turquoise et bleu qui s'ouvre à l'arrêt.
- **Cartes de notification** : fond clair, ombre profonde, légère rotation, entrée en ressort avec flou
  de mouvement, dérive lente ensuite (parallaxe sur trois profondeurs).
- **Transitions** par flou et échelle (0,35 à 0,5 s), jamais de coupe sèche. Entrées en ease out ou en
  ressort, sorties en ease in.
- **Contraste narratif** : problème dans le noir (scènes 1 à 4), solution dans la lumière (6 et 7),
  retour au sombre pour la preuve et l'appel à l'action (8 et 9).

## Zones sûres

- **16:9 à filmer** : tout le contenu entre x 200 et 1720, y 130 et 950 (marge d'environ 11 %). Rien
  d'important dans les 130 px du bas (barre du lecteur vidéo, bord de l'écran filmé en angle).
- **9:16 direct** : titres entre y 260 et 620, interface entre y 660 et 1380, sous titres entre y 1400
  et 1500, rien de critique sous y 1500 ni à x > 930.

---

## Scènes (temps de l'export A)

| # | Temps | Durée | Texte à l'écran | Ce qu'on voit, animation | Transition |
|---|---|---|---|---|---|
| 1 · La nuit | 0,0 – 4,8 | 4,8 s | « Tu viens de recevoir [3] nouvelles demandes de vendeurs. » | Fond nuit. La phrase se tape (1,5 s), le « 3 » dans la puce turquoise. À 1,9 s la phrase recule et se floute ; horloge géante « 2 h 14 » (300 px) ; illustration d'un courtier endormi sur son bureau, éclairé par la lueur de son écran ; trois cartes de notification arrivent une à une autour de lui (2,3 / 2,7 / 3,1 s) et dérivent. État tenu de 3,5 à 4,8 s. | Flou et léger zoom avant vers le noir. |
| 2 · La question | 4,8 – 7,8 | 3,0 s | « Qui y répond, [pour vrai]? » puis « Toi? » et « Ton équipe? » | La question se tape, puce sur « pour vrai ». À 6,3 s, plan d'ambiance : le courtier endormi avec l'étiquette « Toi? », puis un volet turquoise balaie l'image et révèle un bureau d'équipe vide, de nuit, avec l'étiquette « Ton équipe? ». | Le plan se referme en flou sur le noir. |
| 3 · La vitesse | 7,8 – 12,6 | 4,8 s | « Rappelle en moins de [5 minutes], » puis « 100× » puis « plus de chances de joindre le vendeur. » Source en bas. | La ligne se tape en haut (1,2 s). Le chiffre géant roule de 001 à 100, le « × » turquoise arrive en ressort, halo qui s'ouvre. La seconde ligne se tape dessous. Source en 24 px, à 60 % d'opacité. État tenu de 11,1 à 12,6 s. | Le chiffre recule en flou. |
| 4 · Un seul courtier | 12,6 – 19,2 | 6,6 s | « 81 % » + « des vendeurs ne contactent [qu'un seul courtier]. » Source en bas. Puis « Ce courtier là, ce devrait être toi. » Puis « Attends 30 minutes, et [il est passé à autre chose]. » | 12,6 : « 81 % » roule, halo, la phrase se tape dessous (tenu jusqu'à 15,4). 15,4 : le chiffre s'efface en flou, « Ce courtier là, ce devrait être toi. » se tape seul au centre (tenu jusqu'à 16,9). 16,9 : la dernière phrase se tape ; la carte « Sainte Julie » de la scène 1 revient au centre, perd sa couleur, pâlit et disparaît (flou, échelle 0,96) quand la puce se déploie. | Le noir reste ; un point turquoise naît au centre. |
| 5 · Révélation | 19,2 – 22,4 | 3,2 s | « Voici » puis logo ScaleSuite puis « Système Vendeurs 5 minutes » | Mot géant « Voici » (440 px) en dégradé turquoise et bleu, qui grossit légèrement. À 20,0 s il éclate en anneaux concentriques (pulsation radiale, 3 anneaux). Le logo se révèle au centre (balayage de la marque, lettres qui montent), puis « Système Vendeurs 5 minutes » se tape dessous. | Un anneau turquoise pâle s'ouvre jusqu'à couvrir tout le cadre : bascule vers la lumière. |
| 6 · Le système | 22,4 – 35,6 | 13,2 s | Cinq messages (détail plus bas) | Fond turquoise pâle. Texte à gauche sur 2 ou 3 lignes (68 px), interface à droite dans un cellulaire ou une carte qui glisse et se construit. La seconde partie de chaque phrase reçoit la puce. Entre deux messages : le texte sort en flou vers le haut, l'interface glisse et change. | Le cellulaire recule, les demandes de la liste deviennent les pastilles de l'entonnoir. |
| 7 · Compte rendu | 35,6 – 39,4 | 3,8 s | « Chaque semaine, [un compte rendu écrit]. » | Phrase centrée en haut. Entonnoir horizontal en pastilles (rectangles foncés à coins arrondis, 120 px de haut) : « 24 Demandes », flèche, « 19 Joints », flèche, « 7 Rencontres ». Les chiffres roulent, les flèches turquoise arrivent en ressort. Étiquette « Exemple » bien visible au dessus de l'entonnoir (34 px). | Le fond s'assombrit par un iris qui se referme : retour à la nuit. |
| 8 · La preuve | 39,4 – 43,6 | 4,2 s | « 124 » + « demandes générées pour Groupe Mackay en moins de 7 mois. » + « [54 $] par demande en moyenne. » | Fond nuit, cartes de demandes floues qui dérivent en arrière plan. Compteur mécanique jusqu'à 124 (400 px), halo. La phrase se tape dessous, puis la ligne « 54 $ » avec sa puce. État tenu de 42,2 à 43,6 s. | Flou et recul. |
| 9 · Appel à l'action | 43,6 – 48,2 | 4,6 s | « Commente [5 MINUTES]. » puis « Je te prépare le Diagnostic de ton secteur. » puis logo + « On livre, ou le mois est gratuit. » | Un champ de commentaire générique (avatar neutre, champ, bouton « Publier ») où « 5 MINUTES » se tape. La phrase se tape au dessus. À 45,9 s le commentaire est publié et la réponse « Je te prépare le Diagnostic de ton secteur. » arrive en carte. À 46,6 s : pulsation, logo final et « On livre, ou le mois est gratuit. », tenus 1,4 s. Export B seulement : bandeau blanc épinglé en haut pendant toute la scène. | Fin. |

Durées : 4,8 · 3,0 · 4,8 · 6,6 · 3,2 · 13,2 · 3,8 · 4,2 · 4,6 = **48,2 s**.

### Scène 6 en détail

| Temps | Durée | Texte (gauche) | Interface (droite) |
|---|---|---|---|
| 22,4 – 25,0 | 2,6 s | « Google Ads amène les vendeurs [sur la page de ton équipe]. » | Cellulaire : page de destination de l'équipe (en tête aux couleurs d'une agence fictive, titre, formulaire de 3 champs qui se remplit, bouton). |
| 25,0 – 27,7 | 2,7 s | « Chaque demande arrive au bon courtier, [par texto, en moins de 60 secondes]. » | Le formulaire se compresse et devient un texto d'alerte qui tombe sur le cellulaire du courtier (bulle grise reçue, heure « 2 h 14 »). |
| 27,7 – 30,5 | 2,8 s | « Le vendeur reçoit une confirmation [tout de suite]. Même à 2 h du matin. » | Second cellulaire, côté vendeur : texto de confirmation reçu, même heure à l'écran. |
| 30,5 – 33,3 | 2,8 s | « Ton courtier répond 1, 2 ou 3. [Tu sais qui a été rappelé]. » | Le courtier envoie « 1 » (bulle turquoise). La carte « Demandes » monte : trois lignes avec statut « Joint », « Pas de réponse », « Rencontre ». |
| 33,3 – 35,6 | 2,3 s | « Des demandes qui appartiennent à ton équipe. [Jamais partagées ni revendues]. » | Les trois demandes se rangent dans un cadre au nom de l'équipe, qui se ferme. Aucune flèche vers l'extérieur. |

Textes d'interface proposés (**à confirmer**, voir le point 4 des choix) :
- Page : « Équipe Exemple », « Obtenez l'évaluation de votre propriété », champs Adresse, Nom,
  Téléphone, bouton « Recevoir mon évaluation ».
- Texto d'alerte au courtier : « Nouvelle demande de vendeur. Marie Exemple, Sainte Julie. Évaluation
  de propriété. 450 555 0142 »
- Texto au vendeur : « Bonjour Marie, ta demande est bien reçue. Un courtier de l'Équipe Exemple te
  rappelle rapidement. » (aucun délai promis)
- Liste « Demandes » : Marie Exemple, Sainte Julie, « Joint » ; Paul Fictif, Laval, « Pas de
  réponse » ; Jean Démo, Lévis, « Rencontre ». Aucune colonne de délai, aucun classement.

### Cartes de notification (scènes 1, 4 et 8)

Trois lignes hiérarchisées, sans point médian : petite étiquette « Nouvelle demande », titre
(« Évaluation », « Vendre mon condo », « Maison à vendre »), ville (« Sainte Julie », « Laval »,
« Lévis »). Icône neutre de maison dans un carré turquoise. Aucun logo de plateforme.

---

## Règles de contenu appliquées (section 4 du brief)

- Aucune statistique de taux de vente selon le délai. Le « 100× » porte sur les chances de **joindre**,
  avec sa source et la comparaison 5 minutes contre 30 minutes.
- Le « 81 % » porte sur le **nombre de courtiers contactés**, jamais sur le premier qui répond.
- Les 60 secondes sont le délai d'**arrivée de la demande au courtier**. Aucun texte ne dit « rappelé
  en 60 secondes ». Le texto au vendeur ne promet aucun délai.
- Pas de relance de 10 minutes, pas de suivi de 90 jours, pas d'appels transférés, pas de script
  d'appel, pas de classement de vitesse.
- Aucune garantie de nombre de demandes. Aucun prix ScaleSuite à l'écran. Les chiffres de l'entonnoir
  sont marqués « Exemple ».
- Textes à l'écran : tutoiement, aucun trait d'union, aucun emoji, aucune phrase qui commence par
  « Et » ou « Mais ». Pas de badge en pilule avec point pulsant, pas de mentions séparées par des
  points médians.
- Noms de vendeurs fictifs évidents, numéros 555.

## Son (piste optionnelle)

- **Musique** discrète, synthétisée sur les repères de la timeline : nappe sombre et piano feutré en ré
  mineur pendant la nuit, ouverture en fa majeur sur « Voici », pulsation légère pendant le système,
  résolution sous le logo final. Mix à −15 LUFS.
- **Effets : 5 au maximum**, feutrés, de 8 à 12 dB sous la musique, aucun « ding » :
  double vibration sourde à la première notification (2,3 s) ; souffle grave à l'arrêt du « 100× »
  (10,0 s) ; souffle montant sur « Voici » (20,0 s) ; souffle doux à l'arrêt du « 124 » (40,6 s) ; clic
  feutré à la publication du commentaire (45,9 s). Aucun son de frappe.
- **Voix** : je fournis un texte de voix hors champ calé sur le découpage et une feuille de timing. Les
  textes à l'écran totalisent environ 160 mots, trop pour être lus mot à mot en 48 s : la voix sera une
  version plus courte de chaque scène (à valider avant l'export B). Mixage avec `mix_vo.py` quand la
  voix de Mathieu ou d'ElevenLabs est déposée dans le dépôt.

## Déroulement après approbation

1. 16:9, groupe 1 (scènes 1 à 4, la nuit) : images fixes pleine résolution de chaque scène, validation.
2. 16:9, groupe 2 (scènes 5 à 7, révélation et système) : images fixes, validation.
3. 16:9, groupe 3 (scènes 8 et 9) : images fixes, validation.
4. Aperçu animé complet et planche contact, contrôles (déterminisme, mouvement, lisibilité), puis
   export A.
5. 9:16 : mise en page verticale, sous titres, bandeau, images fixes de chaque scène, puis export B.
6. Musique, effets, texte et timing de la voix.

---

## Choix à valider

1. **Durée : 48,2 s plutôt que 45 s.** Le script fait environ 160 mots à l'écran, et la scène 4 du
   brief (16 à 22 s) chevauche la scène 5 (21 à 24 s). À 45 s, certaines phrases resteraient moins
   d'une seconde. Recommandation : 48,2 s. Les durées sont des constantes, on pourra resserrer sur
   l'aperçu.
2. **Carte « 18 % » (Pied Piper) : laissée de côté.** Elle ajouterait environ 3 s à une scène 4 déjà
   chargée (3 messages). Recommandation : ne pas l'inclure.
3. **Courtier endormi : illustration vectorielle** dessinée dans la page (silhouette sans visage,
   éclairée par l'écran), plutôt qu'une photo. Même style que le reste, aucun droit à vérifier.
   Le bureau d'équipe de la scène 2 est dessiné de la même façon. Si tu préfères une photo, envoie la.
4. **Interfaces de la scène 6 : textes réels à confirmer.** Le brief exige que les interfaces
   correspondent au vrai système, et je n'ai pas les vrais textes. Il me faut : le texto d'alerte au
   courtier, le texto de confirmation au vendeur, la signification de 1, 2 et 3 (j'ai supposé 1 = Joint,
   2 = Pas de réponse, 3 = Rencontre), le titre et les champs de la page, et l'allure de la liste
   « Demandes ». Des captures d'écran suffisent. La page de destination vouvoie le vendeur dans ma
   proposition (« votre propriété ») : à confirmer aussi.
5. **« 100× plus de chances de joindre le vendeur ».** L'étude citée porte sur des demandes Web tous
   secteurs, pas sur des vendeurs immobiliers. Recommandation : garder la phrase et ajouter « Demandes
   Web, tous secteurs. » à la ligne de source.
6. **Scène 8 : Groupe Mackay et le « 54 $ ».** Confirmer que Groupe Mackay accepte d'être nommé, et que
   54 $ est le coût publicitaire Google Ads par demande. Si oui, je recommande d'écrire « 54 $ de
   budget Google Ads par demande en moyenne. » pour qu'on ne le lise pas comme un prix ScaleSuite.
7. **Entonnoir : flèches sans pourcentage.** La référence affiche un taux dans chaque flèche. Avec des
   chiffres d'exemple, un taux ressemblerait à une promesse. Recommandation : flèches seules.
8. **Export B et scène 0.** Recommandation : l'export B contient les scènes 1 à 9, et Mathieu colle son
   face caméra devant. Si le clip est déposé dans le dépôt, je peux l'assembler.
