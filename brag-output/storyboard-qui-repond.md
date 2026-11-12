# ScaleSuite « Qui répond à 2 h du matin? » : plan scène par scène (validé, avec corrections)

Vidéo promo du Système Vendeurs 5 minutes · français (Québec), tutoiement · 30 i/s
Fichiers : suffixe `qui-repond` partout (sources et sorties). Aucun fichier existant n'est modifié.

- **Export A (à filmer)** : 1920 × 1080, scènes 1 à 9, **49,2 s**, sans bandeau, marges généreuses.
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
| Logo | `assets/logo/` + `src/logo.js` (`SS.logo`, tracé vectoriel du logo public) | révélation en scène 5, logo en scène 5 (version fond sombre : « Scale » en blanc), logo final en scène 9 (version fond clair) |
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
| Nuit (scènes 1 à 5 et 8) | fond `#070D14` à `#0B1622`, texte `#F2F7F9`, cartes `#F4F7F9` |
| Lumière (scènes 6, 7 et 9) | fond `#E8F9F7` (menthe du dépôt) à `#F7FBFA`, encre `#1A1A1A`, cartes blanches |

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
  retour au sombre pour la preuve (8), puis la lumière revient pour l'appel à l'action et le logo final (9).

## Zones sûres

- **16:9 à filmer** : tout le contenu entre x 200 et 1720, y 130 et 950 (marge d'environ 11 %). Rien
  d'important dans les 130 px du bas (barre du lecteur vidéo, bord de l'écran filmé en angle).
- **9:16 direct** : titres entre y 260 et 620, interface entre y 660 et 1380, sous titres entre y 1400
  et 1500, rien de critique sous y 1500 ni à x > 930.

---

## Scènes (temps de l'export A)

Aucune photo ni image externe : tout est généré dans la page (SVG, dégradés, flous, lumières). Aucun
personnage.

| # | Temps | Durée | Texte à l'écran | Ce qu'on voit, animation | Transition |
|---|---|---|---|---|---|
| 1 · La nuit | 0,0 – 3,9 | 3,9 s | « Tu viens de recevoir [3] demandes de vendeurs. » puis « 2 h 14 » | 0,0 : noir (`#070D14`, vignettage). 0,3 : les mots arrivent un par un (flou 12 px vers net, échelle 1,15 vers 1 ; le premier mot plus gros et plus flou, échelle 1,6). La ligne reste centrée pendant qu'elle s'allonge. La puce arrive avec le chiffre, qui roule de 0 à 3. 2,4 : coupe franche vers une chambre générée, suggérée par la lumière : fenêtre avec lueur de ville, table de chevet, lampe éteinte, oreiller. Un cellulaire posé à plat s'allume et projette un halo turquoise et bleu. Zoom avant de 3 %. Horloge géante « 2 h 14 » tapée en haut. Trois cartes « Nouvelle demande » en cascade (2,52 / 2,68 / 2,84 s) sur trois profondeurs, le cellulaire vibre à chaque carte. | Coupe vers le noir. |
| 2 · La question | 3,9 – 8,2 | 4,3 s | « Qui leur répond, [pour vrai]? » puis « Toi? » puis « Ou ton équipe? » | 3,9 : la question se tape lettre par lettre avec un gros curseur arrondi. « Qui » commence à 260 px, puis la ligne rapetisse en continu pour occuper 60 % de la largeur. « pour vrai » se tape dans la puce, qui s'élargit. 6,2 : panneau portrait à coins arrondis (28 % de la largeur), gros plan du cellulaire allumé, étiquette « Toi? ». 7,1 : flash turquoise, le panneau s'élargit à 85 % : bureau d'équipe vide généré (rangées de postes, écrans en veille, fenêtre avec lumières de ville floues), étiquette « Ou ton équipe? », ligne de progression turquoise en bas du panneau. | Coupe vers le noir. |
| 3 · La vitesse | 8,2 – 13,0 | 4,8 s | « Rappelle en [5 minutes], » puis « 100× » puis « plus de chances de joindre le vendeur. » Source en bas. | La ligne se tape petite et centrée, puis monte. Le compteur roule jusqu'à 100 (flou vertical), le « × » turquoise arrive en ressort, halo qui s'ouvre. La seconde ligne se tape dessous. Source : « Lead Response Management Study, MIT et InsideSales, 2007. Comparaison 5 minutes contre 30 minutes. Demandes Web, tous secteurs. » | Le chiffre recule en flou. |
| 4 · Un seul courtier | 13,0 – 20,2 | 7,2 s | « 81 % » + « des vendeurs ne contactent [qu'un seul courtier]. » Source en bas. Puis « Ce courtier là, ce devrait être toi. » Puis « Attends 30 minutes, et [il est passé à autre chose]. » | 13,0 : « 81 % » roule, halo, la phrase se tape (tenue 0,9 s). 16,05 : « Ce courtier là, ce devrait être toi. » seul au centre. 17,7 : la carte « Sainte Julie » revient ; 17,85 : la dernière phrase se tape ; quand la puce se déploie, la carte perd sa couleur, pâlit et disparaît. | Le noir reste ; un point turquoise naît au centre. |
| 5 · Révélation | 20,2 – 23,4 | 3,2 s | « Voici » puis logo ScaleSuite puis « Système Vendeurs 5 minutes » | Mot géant en dégradé turquoise et bleu, pulsation en anneaux concentriques, logo, nom du système tapé dessous. | Un anneau turquoise pâle couvre le cadre : bascule vers la lumière. |
| 6 · Le système | 23,4 – 36,6 | 13,2 s | Cinq messages (détail plus bas) | Fond turquoise pâle. Texte à gauche, interface à droite qui glisse et se construit. La seconde partie de chaque phrase reçoit la puce. | Les demandes de la liste deviennent les pastilles de l'entonnoir. |
| 7 · Compte rendu | 36,6 – 40,4 | 3,8 s | « Chaque semaine, [un compte rendu écrit]. » | Feuille « Compte rendu de la semaine » avec un entonnoir en pastilles : « 24 Demandes », flèche, « 19 Joints », flèche, « 7 Rencontres ». Flèches sans pourcentage. Étiquette « Exemple » bien visible. | Iris qui se referme : retour à la nuit. |
| 8 · La preuve | 40,4 – 44,6 | 4,2 s | « 124 » + « demandes générées pour Groupe Mackay en moins de 7 mois. » + « [54 $] de budget Google Ads par demande en moyenne. » | Fond nuit, cartes floues en arrière plan, compteur mécanique jusqu'à 124. Variante sans le nom (« pour une de nos équipes clientes ») par la constante `QR.OPT.clientName`. | La lumière s'ouvre depuis le centre vers la scène 9. |
| 9 · Appel à l'action | 44,6 – 49,2 | 4,6 s | « Commente [5 MINUTES]. » puis « Je te prépare le Diagnostic de ton secteur. » puis logo + « On livre, ou le mois est gratuit. » | **Fond menthe `#E8F9F7`, comme le site** : la lumière s'ouvre depuis le centre (même transition qu'en scène 5). Champ de commentaire générique où « 5 MINUTES » se tape, réponse en carte, logo final dans sa version fond clair (« Scale » en noir). Export B seulement : bandeau blanc épinglé en haut. | Fin. |

Durées : 3,9 · 4,3 · 4,8 · 7,2 · 3,2 · 13,2 · 3,8 · 4,2 · 4,6 = **49,2 s** (table `QR.DUR` dans
`scenes-qui-repond/00-timing.js`). La scène 4 est passée de 6,6 à 7,2 s pour que chacune de ses trois
phrases reste lisible environ 0,9 s après la frappe.

### Scène 6 en détail

| Temps | Durée | Texte (gauche) | Interface (droite) |
|---|---|---|---|
| 23,4 – 26,0 | 2,6 s | « Google Ads amène les vendeurs [sur la page de ton équipe]. » | Cellulaire : page de destination de l'équipe (en tête aux couleurs d'une agence fictive, titre, formulaire de 3 champs qui se remplit, bouton). |
| 26,0 – 28,7 | 2,7 s | « Chaque demande arrive au bon courtier, [par texto, en moins de 60 secondes]. » | Texto d'alerte sur le cellulaire du courtier, **heure de jour (14 h 06)** : entre 22 h et 7 h le courtier reçoit un courriel, pas un texto. |
| 28,7 – 31,5 | 2,8 s | « Le vendeur reçoit une confirmation [tout de suite]. Même à 2 h du matin. » | Second cellulaire, côté vendeur : texto de confirmation, heure 2 h 14. |
| 31,5 – 34,3 | 2,8 s | « Ton courtier répond avec un chiffre. [Tu sais qui a été rappelé]. » | Le courtier envoie « 1 ». La carte « Demandes » monte : trois lignes avec statut « Joint », « Pas de réponse », « Rencontre ». |
| 34,3 – 36,6 | 2,3 s | « Des demandes qui appartiennent à ton équipe. [Jamais partagées ni revendues]. » | Les trois demandes se rangent dans un cadre au nom de l'équipe, qui se ferme. Aucune flèche vers l'extérieur. |

Codes réels du courtier : 1 Joint, 2 Pas de réponse, 3 Plus tard, 4 Rencontre, 5 Hors cible.

Deux cellulaires alternent au premier plan, cadrés serré et coupés par le bas du cadre : celui du
vendeur et celui du courtier, chacun avec son étiquette. Le cellulaire du vendeur passe en mode sombre
pour le message de 2 h 14.

Textes d'interface (**brouillons à confirmer**, en attente des captures des vrais textos ; tous réunis
dans l'objet `COPY` de `06-systeme.js`) :
- Annonce : « Commandité equipeexemple.ca », « Vendre ma propriété à Laval ».
- Page (vouvoiement, titre neutre, aucune offre d'évaluation gratuite) : « ÉQUIPE EXEMPLE », « Vendez
  votre propriété avec l'Équipe Exemple », champs Adresse, Nom, Téléphone, bouton « Envoyer ma
  demande ». Heure du cellulaire : 14 h 05.
- Texto d'alerte au courtier (14 h 06, expéditeur « ScaleSuite ») : « Nouvelle demande de vendeur.
  Paul Fictif, Laval. 450 555 0142 »
- Texto au vendeur (2 h 14, expéditeur « Équipe Exemple ») : « Bonjour Marie, votre demande est bien
  reçue. Un courtier de l'Équipe Exemple communiquera avec vous. » (aucun délai promis)
- Réponse du courtier : « 1 » (14 h 10). La ligne de Paul Fictif passe à « Joint ».
- Liste « Demandes » : Paul Fictif, Laval, « Joint » ; Marie Exemple, Sainte Julie, « Pas de
  réponse » ; Jean Démo, Lévis, « Rencontre ». Aucune colonne de délai, aucun classement.
- Message 5 : la liste entre dans un cadre « Équipe Exemple » qui se ferme, avec un cadenas.

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
  double vibration sourde à la première notification (2,5 s) ; souffle grave à l'arrêt du « 100× »
  (10,5 s) ; souffle montant sur « Voici » (21,0 s) ; souffle doux à l'arrêt du « 124 » (41,6 s) ; clic
  feutré à la publication du commentaire (46,9 s). Aucun son de frappe.
- **Voix** : je fournis un texte de voix hors champ calé sur le découpage et une feuille de timing. Les
  textes à l'écran totalisent environ 160 mots, trop pour être lus mot à mot en 49 s : la voix sera une
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

## Choix validés

1. Durée d'environ 48 s : 49,2 s après la nouvelle intro et l'allongement de la scène 4.
2. Carte « 18 % » retirée.
3. Tout est généré dans la page : aucune photo, aucun personnage.
4. Interfaces de la scène 6 : brouillons marqués « à confirmer » en attendant les captures. Texte
   « Ton courtier répond avec un chiffre. » ; texto d'alerte de jour (14 h 06) ; page qui vouvoie, avec
   le titre « Vendez votre propriété avec l'Équipe Exemple ».
5. « 100× » gardé, « Demandes Web, tous secteurs. » ajouté à la source. Statistiques vérifiées par
   Mathieu.
6. Scène 8 : « 54 $ de budget Google Ads par demande en moyenne. » Accord de Groupe Mackay à confirmer
   avant publication ; variante sans le nom par `QR.OPT.clientName = false`.
7. Entonnoir sans pourcentage.
8. Export B sans la scène 0.
