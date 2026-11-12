# ScaleSuite « Qui répond à 2 h du matin? » : plan scène par scène (validé, avec corrections)

Vidéo promo du Système Vendeurs 5 minutes · français (Québec), tutoiement · 60 i/s · 108 BPM
Fichiers : suffixe `qui-repond` partout (sources et sorties). Aucun fichier existant n'est modifié.

- **Export A (à filmer)** : 1920 × 1080, scènes 1 à 9, **45,0 s**, 60 i/s, sans bandeau, marges généreuses.
- **Export B (direct)** : 1080 × 1920, 60 i/s, mise en page verticale refaite, bandeau épinglé en scène 9, sous titres.
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

**Grille des temps : 108 BPM, un temps = 0,5556 s, 81 temps = 45,0 s.** Chaque scène dure un nombre
entier de temps. Chaque changement de scène, chaque arrivée de phrase et chaque déploiement de puce tombe
sur un temps ; les demi temps ne servent qu'aux éléments secondaires (cartes, pastilles). La table est
dans `scenes-qui-repond/00-timing.js` (`QR.BEATS`). La musique et les effets suivront cette grille.

| Scène | Temps | Secondes | Durée | Ce qu'on voit |
|---|---|---|---|---|
| 1 · La nuit | 0–7 | 0,00 – 3,89 | 3,89 s | Noir, puis « Tu viens de recevoir [3] demandes de vendeurs. » : un mot par quart de temps, avec mise au point. Temps 4 : coupe franche vers la chambre générée, horloge « 2 h 14 » tapée, trois cartes sur les demi temps 4,5 / 5 / 5,5. |
| 2 · La question | 7–15 | 3,89 – 8,33 | 4,44 s | « Qui leur répond, [pour vrai]? » tapé lettre par lettre (la puce commence au temps 1,5). Temps 4 : panneau « Toi? » avec la notification. Temps 6 : flash, bureau « Ou ton équipe? ». |
| 3 · La vitesse | 15–22 | 8,33 – 12,22 | 3,89 s | Temps 0 : « Rappelle en [5 minutes], » mot par mot, puce au temps 1. Le compteur roule et s'arrête sur le temps 3 avec le « × ». Temps 4 : « plus de chances de joindre le vendeur. » et la source. |
| 4 · Un seul courtier | 22–33 | 12,22 – 18,33 | 6,11 s | Temps 0 à 4 : « 81 % » (arrêt au temps 1), « des vendeurs ne contactent [qu'un seul courtier.] », puce au temps 2, source. Temps 4 : « Ce courtier là, ce devrait être toi. ». Temps 7 : « Attends 30 minutes, et [il est passé à autre chose.] », puce au temps 8, la carte pâlit. |
| 5 · Révélation | 33–39 | 18,33 – 21,67 | 3,33 s | « Voici », éclatement en anneaux au temps 1,5, logo au temps 2, « Système Vendeurs [5 minutes] » au temps 3, puce au temps 4. La lumière s'ouvre en 0,5 s jusqu'au temps 6. |
| 6 · Le système | 39–59 | 21,67 – 32,78 | 11,11 s | Cinq messages de quatre temps. Dans chacun : début de phrase au temps 0, phrase clé au temps 1, puce au temps 2. La caméra passe d'un message à l'autre par un panoramique filé (messages 1 à 4), puis par une poussée à travers la liste (message 5). Aucun fondu. |
| 7 · Compte rendu | 59–65 | 32,78 – 36,11 | 3,33 s | La scène arrive sur le panoramique qui quitte la scène 6. « Chaque semaine, [un compte rendu écrit.] », puce au temps 1, feuille au temps 1, pastilles aux temps 2 / 2,5 / 3. Iris de 0,6 s vers la nuit. |
| 8 · La preuve | 65–72 | 36,11 – 40,00 | 3,89 s | Le compteur s'arrête sur le temps 1 avec « demandes générées pour Groupe Mackay / en moins de 7 mois. ». Temps 3 : « [54 $] de budget Google Ads par demande en moyenne. », puce au temps 4. La lumière s'ouvre en 0,5 s. |
| 9 · Appel à l'action | 72–81 | 40,00 – 45,00 | 5,00 s | Fond menthe. « Commente [5 MINUTES]. » tapé, champ de commentaire, publication au temps 2, réponse signée Mathieu au temps 3, logo version fond clair au temps 6, « On livre, ou le mois est gratuit. » au temps 7. Export B : bandeau épinglé. |

### Finition (style serré, caméra toujours en mouvement)

- **Caméra virtuelle globale** : poussée lente et continue (1,2 % par seconde) avec une légère dérive, sur
  toutes les scènes, tenues comprises. À chaque nouveau plan, la poussée repart et ce qu'elle avait gagné
  se relâche en 0,25 s.
- **Impact** : à chaque arrivée de phrase, échelle de 1,03 à 1 en 0,25 s.
- **Frappe lettre par lettre** seulement pour la question de l'intro, l'horloge et l'appel à l'action.
  Partout ailleurs, les mots arrivent un par un avec mise au point.
- **Bascules noir et clair** (fin des scènes 5 et 8) : 0,5 s, anneau sur une courbe expo avec bord
  adouci, luminosité qui monte progressivement. **Iris** de la scène 7 : 0,6 s, même traitement à
  l'envers.
- **Flou de mouvement réel** : chaque image où quelque chose bouge vite est la moyenne de 8 sous images
  (obturateur à 180 degrés). Rendu à **60 i/s**.
- **Contrôles automatiques** (`render/check-frames-qui-repond.py`) : échec si plus de 3 images
  consécutives sont identiques, ou si un saut isolé apparaît hors des trois coupes franches voulues
  (temps 4, 7 et 15).

### Scène 6 en détail

| Temps | Secondes | Texte (gauche) | Interface (droite) |
|---|---|---|---|
| 39–43 | 21,67 – 23,89 | « Google Ads amène les vendeurs [sur la page de ton équipe.] » | Annonce « Commandité », puis le cellulaire du vendeur : page de l'équipe, formulaire qui se remplit. |
| 43–47 | 23,89 – 26,11 | « Chaque demande arrive au bon courtier, [par texto, en moins de 60 secondes.] » | Cellulaire du courtier, **14 h 06** : alerte envoyée par « Équipe Exemple », avec le menu de codes. |
| 47–51 | 26,11 – 28,33 | « Le vendeur reçoit une confirmation [tout de suite.] Même à 2 h du matin. » | Cellulaire du vendeur en mode sombre, 2 h 14 : texto de confirmation. |
| 51–55 | 28,33 – 30,56 | « Ton courtier répond avec un chiffre. [Tu sais qui a été rappelé.] » | Le courtier envoie « 1 » sous le menu de codes. La liste « Demandes » monte, la ligne passe à « Joint ». |
| 55–59 | 30,56 – 32,78 | « Des demandes qui appartiennent à ton équipe. [Jamais partagées ni revendues.] » | La caméra traverse la liste, qui se retrouve dans un cadre « Équipe Exemple » fermé par un cadenas. |

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
- Texto d'alerte au courtier (14 h 06, expéditeur « Équipe Exemple », avatar « É » : l'alerte part du
  numéro Twilio de l'équipe, aucune mention de ScaleSuite dans les textos) : « Nouvelle demande de
  vendeur. Paul Fictif, Laval. 450 555 0142. Après l'appel, répondez : 1 Joint, 2 Pas de réponse,
  3 Plus tard, 4 Rencontre, 5 Hors cible »
- Texto au vendeur (2 h 14, expéditeur « Équipe Exemple ») : « Bonjour Marie, votre demande est bien
  reçue. Un courtier de l'Équipe Exemple communiquera avec vous. » (aucun délai promis)
- Réponse du courtier : « 1 » (14 h 10), juste sous le menu de codes. La ligne de Paul Fictif passe à « Joint ».
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
- **Effets : 5 au maximum**, feutrés, de 8 à 12 dB sous la musique, aucun « ding », tous posés sur
  un temps : double vibration sourde à la première notification (temps 4,5, 2,50 s) ; souffle grave à
  l'arrêt du « 100× » (temps 18, 10,00 s) ; souffle montant sur « Voici » (temps 34,5, 19,17 s) ;
  souffle doux à l'arrêt du « 124 » (temps 66, 36,67 s) ; clic feutré à la publication du commentaire
  (temps 74, 41,11 s). Aucun son de frappe.
- **Voix** : je fournis un texte de voix hors champ calé sur le découpage et une feuille de timing. Les
  textes à l'écran totalisent environ 160 mots, trop pour être lus mot à mot en 45 s : la voix sera une
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

1. Durée : 45,0 s (81 temps à 108 BPM) après la passe de finition.
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
