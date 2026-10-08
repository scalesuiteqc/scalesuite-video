# ScaleSuite « Une journée de courtier » : plan scène par scène (validé)

Film d'acquisition · 9:16 (1080 × 1920) · 25,0 s · 60 fps · fonctionne sans le son · français (Québec)

Même identité et même niveau que la V3 (`brag-output/design-dna-v3.json`), récit entièrement
nouveau : un courtier seul vit sa journée pendant que sa campagne Google Ads travaille pour lui.
Aucune personne représentée : sa journée passe par des icônes au trait, des objets et de l'interface.

Date affichée partout : **vendredi 16 octobre 2026** (vrai vendredi). Le rapport hebdomadaire couvre
**du 12 au 16 octobre** (lundi au vendredi).

Lieu : **la Rive-Sud de Montréal** (recherche « acheter maison Longueuil », page « Maisons à vendre
sur la Rive-Sud »).

### Corrections validées (2e tour)

1. Lieu : Lévis est remplacé partout par Longueuil et la Rive-Sud.
2. Exactitude : ScaleSuite n'optimise pas automatiquement la nuit. L'optimisation est
   **hebdomadaire, faite par notre IA avec approbation humaine**. La scène de 7 h montre la
   notification « Optimisations de la semaine appliquées », sous-titre « Par notre IA et notre
   équipe ». Aucune scène ne montre une fonction que ScaleSuite n'a pas.
3. Expéditeur des notifications : « ScaleSuite » (option retenue par défaut, la consigne laissait
   les deux options ouvertes ; « Follow Up Boss » reste un simple changement de texte).
4. Rapport : hebdomadaire, le vendredi (option retenue par défaut, même remarque).
5. Aucune phrase ne commence par « Et » ou « Mais », à l'écran comme dans la voix.
6. Musique : pas de nouvelle partition. La musique de la V3 (signature, instruments, groove,
   progression, drop) est adaptée au nouveau rythme dans `audio/music-journee.py`.

---

## Fil conducteur : le marqueur d'heure

Un composant persistant, en haut du cadre (y 200–290), 860 px de large :
- à gauche, une pastille blanche avec l'icône du moment (tasse, maison et clé, document et stylo,
  soleil couchant) et l'heure en odomètre, chiffres tabulaires de 64 px : « 7 h », « 10 h »,
  « 13 h », « 17 h » ;
- à droite, une frise du jour : quatre nœuds (7, 10, 13, 17, libellés de 30 px) reliés par la ligne
  de routage turquoise, qui se trace jusqu'à l'heure courante ; le nœud atteint éclot avec un halo.

À chaque changement d'heure, les chiffres roulent (départs espacés en loi de puissance, arrivée en
`pop`), la ligne avance jusqu'au nœud suivant et l'icône bascule dans son masque. C'est le métronome
du film. À la fin, la frise devient le bilan de la journée (élément partagé).

## Le passage des heures (fond)

Le fond reste clair et menthe ; seule la température varie, très légèrement (écart ΔE ≤ 3 avec le
fond V3, vérifié avec `design-dna/scripts/verify.mjs`) :

| Heure | Fond | Lumières ambiantes |
|---|---|---|
| 7 h | `#F8FAF6` (aube, à peine plus chaud) | une lumière sable très pâle `#F6EBD6` en bas à gauche, une menthe |
| 10 h | `#F7FBFA` (référence V3) | deux menthes qui montent |
| 13 h | `#EEF9F6` (menthe la plus fraîche, climax) | deux menthes au zénith, les plus lumineuses |
| 17 h | `#F9F8F2` (fin de journée, doré très léger) | lumière sable en bas à droite |
| Fin | `#F7FBFA` (identité) | deux menthes |

Les deux lumières suivent un arc de soleil (gauche basse → zénith → droite basse). Les fondus de
couleur sont admis ici (lumière ambiante, section 7 de la skill) ; aucun contenu n'est en transparence.

---

## Règles appliquées

### Lisibilité mobile
- Interface d'au moins 760 px (70 %), cible 860 à 900 px. Téléphone clair 820 px, cadré serré et
  coupé par le bas.
- Texte d'au moins 30 px à l'écran (taille dans le monde × échelle caméra), libellés principaux à
  40 px, titres de 116 à 124 px, mot seul à 150 px.
- Zones sûres : marqueur d'heure y 200–290, titres y 320–580, produit y 640–1500, rien de critique
  sous y 1500, texte critique à x < 930.
- Zooms caméra (1,1 à 1,3) sur la notification, le formulaire, la ligne CRM et la tuile Leads.
- `SS.scrim` derrière les titres posés sur une interface en mouvement, `SS.band` pour les mots qui
  changent.

### Mouvement
- 90 % corporate/premium ; dépassement seulement sur les héros : notifications (`pop12`), lignes
  CRM (`dock`), pastilles et bouton (`pop`). Jamais sur un titre ni sur le fond.
- Courbes `SS.EZ` (out, inOut, in, cam), aucune interpolation linéaire hors frappe et proxys.
- Entrées décalées de 35 à 80 ms (moins de 500 ms par groupe), enfants à 60–100 ms du parent.
- Trois couches : primaire (interface), secondaire (ombres, halos, onde d'appui, vapeur de la
  tasse), ambiante (lumières qui suivent le soleil, grain).
- Règle du tiers : chaque coup de fouet suit un arc avec flou procédural.
- Aucune transparence de scène, aucun fondu enchaîné ; chaque scène naît d'un objet de la
  précédente.

### Contenu
- Valeurs ordinaires seulement, aucun pourcentage, aucune promesse chiffrée, aucun prix.
- Annonce marquée « **Commandité** ». Domaine `votreagence.ca`, agence « Votre agence ».
- Aucun nom réel ; l'acheteur reste « Acheteur ».

---

## Courbe de rythme

```
énergie
  ▲                               ★ notification + CRM
  │                             ████
  │                         ▄▄██████▄                                 ▄▄ CTA
  │               ▄▄▄▄▄▄▄▄██████████████▄▄▄▄▄▄▄            ▄▄▄▄▄▄▄▄████████
  │       ▄▄▄▄▄▄███████████████████████████████████▄  ▁▁ ███████████████████
  │▄▄▄▄▄▄███████████████████████████████████████████▌ ▁▁████████████████████
  └──────────────────────────────────────────────────────────────────────────▶ t
   0  7 h   2,8  10 h   6,4      13 h (climax)    13,6 17 h 16,6 bilan 20,0 fin 25
```

- **Matin (0–2,8 s)** : calme, mouvements lents (650–900 ms), vapeur, le seul « bruit » est la
  notification.
- **Montée (2,8–6,4 s)** : frappe, résultats qui s'emboîtent, tempo qui s'installe.
- **Climax (6,4–13,6 s)** : la scène la plus longue (7,2 s) ; accélère jusqu'au verrouillage du
  jeton (gel de 80 ms), notification à ≈ 11,3 s, ligne CRM à ≈ 12,2 s.
- **Détente (13,6–16,6 s)** : rapport, compteurs, barres.
- **Respiration et révélation (16,6–20,0 s)** : 0,4 s de quasi-silence avant « Pas ouvert ».
- **Résolution (20,0–25,0 s)** : logo, bouton, tenue finale d'au moins 2,0 s.

Note : la chronologie imposée (13 h avant 17 h) place le climax vers 45 % du film, plus tôt que
dans la V3 (73 %). Le bilan de 17 h sert de second accent, plus calme, avant l'appel à l'action.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra | Transition vers la suivante |
|---|---|---|---|---|---|
| 1 | 0,0–2,8 | 2,8 s | **7 h · Café.** Image 0 (affiche) : grande heure « 6 h 59 » en 150 px au centre, une tasse au trait turquoise (360 px) dont la vapeur ondule. À 0,35 s les chiffres roulent à « 7 h », puis l'heure rétrécit et va se loger dans la pastille du marqueur (élément partagé) ; la frise se trace jusqu'au nœud 7. Le téléphone clair (820 px, écran verrouillé « vendredi 16 octobre », « 7:02 ») monte du bas. À 1,25 s, une notification tombe avec 12 % de dépassement et une vibration : « ScaleSuite · Optimisations de la semaine appliquées · Par notre IA et notre équipe ✓ ». Titre : « Optimisée *chaque semaine.* » | Lente avancée (1,00 → 1,04), puis poussée sur la notification (1,0 → 1,18, `cam`). | **Notification qui se déplie** : un appui (pression de 3 % et onde) l'ouvre en carte d'annonce (`SS.adCard`, 900 × 250). Le téléphone tombe hors du cadre (`in`) ; la carte d'annonce reste. Les chiffres roulent 7 → 10, l'icône tasse bascule en maison-clé, la ligne avance au nœud 10. |
| 2 | 2,8–6,4 | 3,6 s | **10 h · Visite.** La carte d'annonce recule et devient **le premier résultat d'une recherche Google** (élément partagé). Une barre de 900 px glisse au-dessus et tape « acheter maison Longueuil ». Le résultat : « **Commandité** · votreagence.ca / Maisons à vendre à Longueuil \| Votre agence / Visites cette semaine. Parlez à un courtier local. » Les résultats naturels sont des squelettes qui s'emboîtent dessous. Un halo turquoise entoure l'annonce. Titre : « Votre annonce *s'affiche.* » | Recul de 1,18 à 1,0 pendant que la recherche se construit, puis légère poussée sur l'annonce (1,0 → 1,1). | **Zoom à travers** : un appui sur l'annonce (onde), puis la page de destination s'ouvre depuis le résultat (le cadre de l'annonce devient la page). Les chiffres roulent 10 → 13, l'icône bascule en document-stylo. |
| 3 | 6,4–13,6 | **7,2 s** | **13 h · Notaire, LE LEAD (climax).** **a)** Page de destination de 900 px aux couleurs de l'agence (`#2F5D8C`) : « Maisons à vendre sur la Rive-Sud ». Le formulaire se remplit par frappe : Projet « Achat », Secteur « Longueuil », Délai « D'ici 6 mois », Courriel « acheteur@courriel.ca ». Titre : « Un *acheteur* écrit. » **b)** Un appui sur « Envoyer » compresse la page en **jeton d'encre « ● LEAD ACHETEUR »** (écrasement d'anticipation). **c)** Le jeton suit la route turquoise, traverse le nœud ScaleSuite (anneau qui pulse) et descend vers une table vue de dessus, en icônes : un document « Acte de vente » avec un stylo (le notaire), et le téléphone du courtier posé à côté. Gel de 80 ms au verrouillage. **d) Climax** : le téléphone vibre, le jeton se déplie en notification : « ScaleSuite · Nouveau lead acheteur · Acheteur · Longueuil — ✓ Ajouté à votre CRM ». **e)** La notification s'ouvre dans le CRM : la fiche « Acheteur · Longueuil · Achat · 13 h 04 » s'emboîte en tête de liste (4,5 % de dépassement), avec la pastille « Nouveau » et une coche qui se dessine. Titre (même case, `SS.band`) : « Déjà dans *votre CRM.* », tenu 1,0 s. | Cadre serré sur le formulaire (1,15), qui suit les champs ; recul au moment de l'envoi ; fouet vers le bas en arc avec flou pendant le trajet du jeton ; poussée sur le téléphone (1,0 → 1,22) ; zoom sur la ligne CRM (1,28). | **Élément partagé** : sur le même téléphone, les chiffres roulent 13 → 17 (l'icône bascule en soleil couchant). Une notification « Votre rapport hebdomadaire est prêt » tombe ; l'appui la déplie en carte de rapport. |
| 4 | 13,6–16,6 | 3,0 s | **17 h · Rapport.** Carte de 900 px : « Rapport hebdomadaire · du 12 au 16 octobre », « Campagne acheteur · Rive-Sud ». Trois tuiles (Impressions 1 284, Clics 96, Leads 4) dont les odomètres grimpent (chiffres 72 px, libellés 30 px). Cinq barres L M M J V se lèvent en décalé, celle de vendredi reçoit un point turquoise. Une ligne « ✓ Optimisations appliquées : 3 ». Titre : « Votre semaine, *en clair.* » | Avancée lente sur les tuiles (1,0 → 1,08), puis poussée sur la tuile Leads (1,14). | **Élément partagé** : le rapport glisse vers le bas (`in`), la caméra recule et le marqueur d'heure grandit pour devenir la carte du bilan. |
| 5 | 16,6–20,0 | 3,4 s | **Le bilan.** La frise se déploie en carte « Votre journée » de 860 px, quatre lignes avec leur icône et l'action de la campagne : « 7 h · Optimisations appliquées ✓ », « 10 h · Annonce affichée ✓ », « 13 h · Lead ajouté au CRM ✓ », « 17 h · Rapport reçu ✓ ». Respiration de 0,4 s, puis une cinquième ligne s'emboîte, en gris : « Google Ads · ouvert 0 fois ». Titre : « Google Ads? *Pas ouvert de la journée.* » | Fixe, dérive lente (1,00 → 1,02). | **Ligne contractée en nœud, puis en logo** : la carte se replie sur la ligne de routage, qui se contracte en nœud vert. |
| 6 | 20,0–25,0 | 5,0 s | **Appel à l'action.** Le nœud éclot en logo complet (balayage de la marque, montée des lettres, reflet), slogan « Google Ads pour l'immobilier québécois. » (44 px). Le bouton naît d'un nœud et s'étire en « **Demander une démo →** » avec 10 % de dépassement, puis « scalesuiteqc.ca » (40 px). Tout est posé à ≈ 22,8 s et tenu jusqu'à 25,0 s (reflet sur le bouton, petite impulsion de la flèche). | Avancée de 1 %. | Fin. |

Durées : 2,8 · 3,6 · **7,2** · 3,0 · 3,4 · 5,0 s. Les sous-temps internes varient de 0,25 à 1,2 s.

---

## Raccords (au pixel près)

- **2,8 s** : carte d'annonce dépliée de la notification → résultat commandité.
- **6,4 s** : titre de l'annonce → titre de la page de destination.
- **≈ 8,9 s** : bouton « Envoyer » rogné → jeton autonome.
- **≈ 11,3 s** : jeton → notification.
- **16,6 s** : marqueur d'heure → carte du bilan.
- **20,0 s** : ligne → nœud → logo.

## Voix hors champ (respirations prévues)

Fenêtres prévues, à préciser sur les repères après le rendu (`voiceover-script.md`) :

| # | Réplique (fr-CA) | Fenêtre (s) |
|---|---|---|
| 1 | « Sept heures. Les optimisations de la semaine sont en place. » | 0,3 – 2,7 |
| 2 | « Dix heures, vous êtes en visite. Votre annonce, elle, s'affiche. » | 3,0 – 6,2 |
| 3 | « Treize heures, chez le notaire. Un acheteur remplit le formulaire… » | 6,6 – 9,4 |
| — | *(respiration : trajet du jeton, musique seule)* | 9,4 – 11,0 |
| 4 | « Le lead arrive directement dans votre CRM. » | 11,3 – 13,2 |
| 5 | « Dix-sept heures : votre rapport de la semaine. Clair. » | 13,8 – 16,3 |
| — | *(respiration)* | 16,4 – 17,6 |
| 6 | « Google Ads? Vous ne l'avez pas ouvert de la journée. » | 17,6 – 19,9 |
| 7 | « ScaleSuite. Demandez une démo. » | 20,6 – 23,0 |

## Son

Pas de nouvelle partition : `audio/music-journee.py` reprend la musique de la V3 (signature do5, fa5,
mi5, la5, mêmes instruments, même groove néo-soul, même progression, même drop) et la recale sur
les repères de ce film :
- **7 h** : kalimba seul, la signature jouée une fois, doucement ; la notification la chante.
- **10 h** : le groove néo-soul entre (rim, shaker, basse ronde) ; clics de frappe, un tic par
  résultat qui s'emboîte.
- **13 h** : montée et glissando qui suivent le jeton, gel de 80 ms, **drop** sur la notification ;
  marimba ascendant sur la ligne CRM.
- **17 h** : le groove redescend d'un cran ; une note par barre.
- **Bilan** : quasi-silence de 0,4 s, puis un accord suspendu sur « ouvert 0 fois ».
- **Fin** : résolution en fa majeur sous le logo.

Un roulement de chiffres (odomètre) a son propre petit son, identique à chaque heure : c'est le
métronome sonore. −15 LUFS, −1,5 dBTP.

## Fichiers (rien d'existant n'est modifié)

- `scalesuite-film/index-journee.html`, `src/core-journee.js` (ajouts : marqueur d'heure, fond
  horaire), `src/film-journee.js`, `src/scenes-journee/*.js`, `src/styles-journee.css` ; `core.js`,
  `logo.js`, `styles.css`, `styles-v3.css` et `core-v3.js` chargés en lecture seule.
- `render/*-journee.mjs`, `audio/music-journee.py`, `build-journee.sh`.
- Sorties : `brag-output/scalesuite-journee-9x16.mp4`,
  `previews/scalesuite-journee-preview-9x16-30fps[-s1-3].mp4`,
  `scalesuite-journee-contact-sheet[-s1-3].jpg`, `scalesuite-journee-poster.jpg`,
  `audio-journee/`, `design-dna-journee.json`, `voiceover-script.md`.

## Étapes

1. Validation de ce plan.
2. Aperçu 540 × 960 des scènes 1 à 3 (0–13,6 s) avec planche contact.
3. Scènes 4 à 6, master 1080 × 1920 à 60 fps, contrôle qualité et relecture des textes.
4. 4:5 seulement sur demande.
