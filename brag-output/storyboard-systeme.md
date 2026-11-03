# ScaleSuite « Le Système Vendeurs 5 minutes » : film de lancement, plan v3 (simplifié, à valider)

Film de lancement · 9:16 (1080 × 1920) · **31,0 s** · 60 fps · fonctionne sans le son · français (Québec)
Fichiers : suffixe `systeme` partout ; aucun fichier existant modifié. Branche `claude/laughing-babbage-qo1pf8`,
PR vers `scalesuiteqc/scalesuite-video` (`main`). Public : leaders d'équipes de courtiers au Québec.

**Une seule idée** : « Votre vendeur attend trois heures. Avec le Système Vendeurs 5 minutes, chaque minute agit. »
Même identité (`design-dna-systeme.json`), mêmes règles de contenu, mêmes composants (horloge, carte « Votre
équipe » avec le Leader, téléphone et texto, relance vers le Leader seulement, ruban de 90 jours, compteur 124,
carte produit). La v3 retire les allers-retours de la pile, la scène du coût, la rareté séparée, la scène de
thèse et la rangée « Rencontre ».

---

## Ce que la v3 corrige (vos quatre points)

1. **Plus d'allers-retours dans la pile** : une seule caméra continue descend d'une démonstration à la suivante.
   La carte produit n'apparaît qu'une fois, complète, à la fin, cochée d'un seul geste.
2. **Éclosion** : le logo entre **entier** (marque et mot déjà dessinés, simple montée avec une légère échelle),
   puis « Nouveau », puis le nom. Le nom ne commence qu'une fois le disque ouvert et le logo posé.
3. **Garantie** : la carte est décalée à gauche, le sceau est **à côté** d'elle, dans la marge de droite. Rien ne
   se chevauche.
4. **Une idée par cadre** : 6 cadres au lieu de 12.

## Règles de fluidité (appliquées partout)

- Aucun cadre à moitié vide plus de 0,3 s ; contenu centré entre y 600 et 1500, cartes de 900 px.
- Chaque transition dure **au plus 0,4 s** et passe par **un objet partagé** (horloge, disque, fil, sous-carte,
  ligne de la carte, ligne turquoise, nœud).
- L'entrée de l'élément suivant **chevauche la sortie du précédent d'environ 0,2 s**.
- **Une seule poussée lente de caméra par scène** (1 à 3 %) ; jamais deux mouvements de caméra en même temps.
- **Aucun mot ni logo coupé par un masque visible** : les titres entrent par une montée courte avec fondu
  (24 px, 0,4 s, mots décalés de 50 ms), plus par des masques. Le logo n'est jamais balayé à moitié à l'écran.

---

## Courbe de rythme

```
énergie
  ▲            ★★ NOM (4,7 – 5,4 s)              ★ pile cochée (16,9 – 17,9 s)
  │            ████                              ███
  │ ███        ████▄▄  ▄▄▄▄█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄████▄▄▄
  │ ████▄▄▄▄▄▄▄███████████████████████████████████████████▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
  │ ██████████████████████████████████████████████████████████████████████████▄▄▄▄▄▄
  └──────────────────────────────────────────────────────────────────────────────────▶ t
   0 accroche   4 NOM   7,5 texto   10,5 courtier → relance   14,7 suivi   16,7 pile   19,4 preuve   21,9 garantie   25,4 fin   31
```

Accroche dense et sèche ; sommet au dévoilement du nom ; montée régulière dans l'action, second sommet sur la pile
cochée ; preuve et garantie un cran plus bas, assurées ; fin posée.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit | Caméra (une poussée) | Transition (≤ 0,4 s, objet partagé) |
|---|---|---|---|---|---|
| 1 · Accroche (gris) | 0,0 – 4,0 | 4,0 s | **Un seul cadre qui évolue.** « Leaders d'équipe de courtiers » (40 px, y 175). Titre (80 px, y 220 – 560) : « Le vendeur écrit / à **14 h 12.** » dès t = 0 ; « Votre courtier / le voit à **17 h 04.** » à 1,3 s. Horloge (y 630) : elle roule de 14 h 12 à 17 h 04 (1,0 – 1,7 s) et s'élargit en **règle grise 14 h 12 ━━ 17 h 04**. Carte « Votre équipe » (Leader, Courtier 01 à 05, rangées de 76, y 700 – 1374) : Courtier 03 « En visite libre », sous-carte « Demande vendeur · Longueuil » **« Non lue »** dès t = 0, puis **« Lue à 17 h 04 »** (1,8 s). À 2,4 s, sous la carte : « **Trois heures pour appeler / quelqu'un d'autre.** » (54 px, ardoise, y 1395 – 1505) ; les autres rangées s'atténuent. **Image 0 du master = état complet à 3,2 s.** Tenu 2,8 – 4,0 s. | 1,00 → 1,02 sur toute la scène. | **Horloge → disque** : à 3,95 s, l'horloge se contracte (0,2 s) au centre du disque menthe qui éclot depuis elle (0,4 s). |
| 2 · Dévoilement (affiche) | 4,0 – 7,5 | 3,5 s | Sur la menthe : **logo entier** (130 px, y 530), qui monte de 20 px avec une échelle 0,96 → 1 (4,15 – 4,5 s) ; « **Nouveau** » (pastille douce statique, y 660, 4,4 s) ; **le nom en 150 px, mot par mot** : « Système » 4,7 · « Vendeurs » 4,95 · « 5 » 5,2 · « **minutes.** » (sarcelle) 5,4 s (y 780 – 1250) ; « Pour les équipes de courtiers du Québec. » (54 px, y 1370, 5,7 s). **Tenu 6,0 – 7,5 s (1,5 s).** C'est l'affiche (9:16 recentrée ; 4:5 inchangée). | 1,00 → 1,02. | **« Nouveau » → horloge** : la pastille « Nouveau » glisse en y 640 et s'ouvre en horloge « sam. 14 h 12 » ; le logo et le nom montent et sortent (0,3 s) pendant que le téléphone monte du bas (chevauchement 0,2 s). |
| 3a · Réponse 60 secondes | 7,5 – 10,5 | 3,0 s | Étiquette « Système Vendeurs 5 minutes · 2 sur 5 » (y 175) et titre « Réponse / **60 secondes.** » (y 250 – 470). L'horloge tique à **14 h 13** (7,9 s) ; un fil turquoise en descend jusqu'au téléphone du vendeur (scène actuelle : écran verrouillé « samedi 7 novembre », 14:13). Le **texto** de 514 555 0142, signé Julie, se déplie à 8,3 s (12 % de dépassement, vibration amortie). « Exemple. Noms et numéros fictifs. » (32 px, y 1610). Tenu 8,8 – 10,5 s. | Poussée 1,00 → 1,02 sur le téléphone. | **Fil de l'horloge** : il repart vers le bas ; la caméra descend (0,4 s, flou de vitesse) jusqu'à la carte « Votre équipe », placée sous le téléphone. |
| 3b · Le bon courtier, puis la relance | 10,5 – 14,7 | 4,2 s | Même carte « Votre équipe » (couleurs du site). **14 h 13** : le fil atteint Courtier 03 (« En visite libre »), halo, sous-carte « **Nouvelle demande · Vendeur · Longueuil** » (10,85 s) ; titre « Le bon courtier / **alerté.** », étiquette « 3 sur 5 ». Tenu 11,3 – 12,5 s. **14 h 22** : l'horloge avance minute par minute (12,5 – 13,0 s) ; le titre devient « Relance après / **10 minutes.** », étiquette « 4 sur 5 » ; la sous-carte de Courtier 03 devient « **Relance · Vendeur · Longueuil** » (13,05 s), puis **une seule** ligne monte vers le **Leader** (13,15 – 13,4 s), qui prend le halo et la même relance. Les autres rangées restent atténuées. Tenu 13,5 – 14,7 s. | Poussée 1,00 → 1,02 sur toute la scène. | **Sous-carte partagée** : la relance de Courtier 03 quitte la liste et devient l'en-tête de la carte « Suivi » ; la caméra descend (0,4 s). |
| 3c · Suivi 90 jours | 14,7 – 16,7 | 2,0 s | Étiquette « 5 sur 5 », titre « Pas prêt à vendre? / **Suivi 90 jours.** ». Carte « Suivi · Vendeur · Longueuil » (900 × 600) : ruban « Aujourd'hui / sam. 7 nov. » → « **90 jours** / ven. 5 févr. » (14,95 – 15,75 s). L'horloge passe en mode date (14,8 s) et roule jusqu'au **ven. 5 févr.** (15,1 s). Tenu 15,5 – 16,7 s. | Poussée 1 %. | **Carte partagée** : la carte « Suivi » se contracte en la **ligne 5** de la carte produit, qui se forme autour d'elle ; l'horloge, l'étiquette et le titre sortent vers le haut. |
| 3d · La pile complète | 16,7 – 19,4 | 2,7 s | Logo (110 px, y 380), « Nouveau » (y 500), carte « **Le Système Vendeurs 5 minutes** » (900 × 836, y 580 – 1416) et ses cinq lignes nommées en 52 px : Campagne Google Vendeurs · Réponse 60 secondes · Le bon courtier alerté · Relance après 10 minutes · Suivi 90 jours. **Cochées d'un seul geste** : une coche toutes les 0,2 s (16,85 → 17,65 s), sans zoom. **Tenu 17,9 – 19,4 s (1,5 s).** La campagne et la page aux couleurs de l'équipe ne sont que la ligne 1. | Poussée 1 %. | **Ligne partagée** : les lignes 2 à 5 s'effacent ; la ligne 1 « Campagne Google Vendeurs » reste et descend sous la preuve. |
| 4 · Preuve | 19,4 – 21,9 | 2,5 s | « Groupe Mackay » (66 px, y 640), « **124** » (330 px, sarcelle) compté de 0 à 124 en 0,8 s (19,6 s), « demandes en moins de 7 mois. » (72 px, y 1150). La ligne 1 de la carte (coche + « Campagne Google Vendeurs ») est posée dessous (y 1290) et sa légende devient « **Avec la campagne seule.** » ; pastille « Chiffres tirés de Google Ads » (y 1410). Tenu 20,4 – 21,9 s. | Fixe, 1 %. | **Ligne partagée** : la ligne de la campagne remonte et redevient la ligne 1 de la carte produit, qui se reforme (0,4 s). |
| 5 · Garantie et rareté | 21,9 – 25,4 | 3,5 s | Titre en gros : « Si on ne livre pas, / **vous ne payez pas.** » (104 px, y 230 – 440) ; « **Aucun contrat.** » (60 px, y 525). La carte produit cochée (échelle 0,82, **à gauche**, x 60 – 800, y 640 – 1326). Le **sceau** dessiné au trait (deux cercles et une coche, 190 px) **à droite de la carte**, dans la marge (x 815 – 1005, y 880), sans rien couvrir. Dessous : « 3 nouvelles équipes par mois. / Il reste 3 places fondatrices. » (44 px, `#0F7B6F`, y 1380 – 1480 ; valeurs de `SS.OFFRE`). Tenu 23,7 – 25,4 s. | Fixe, 1 %. | **Carte → ligne** : la carte se contracte en la ligne turquoise de la thèse. |
| 6 · Fin | 25,4 – 31,0 | 5,6 s | « Vos courtiers rencontrent / des vendeurs. » au-dessus de la ligne, « **Nous, on vous / les amène.** » (sarcelle) en dessous (96 px, y 700 – 1220), tenus 26,0 – 27,5 s (1,5 s). Puis la ligne se contracte en nœud ; le **logo entier** naît du nœud (228 px, y 640, 27,7 s), « Système Vendeurs / **5 minutes.** » (115 px, y 935, 27,85 s), le bouton « **Obtenir mon diagnostic gratuit** » (900 × 156, encre, 28,0 s, 10 % de dépassement), « scalesuiteqc.ca » (50 px, y 1372, 28,15 s). **Posé à 28,5 s, tenu jusqu'à 31,0 s (2,5 s).** | 1 %. | Fin. |

### États tenus

| État | Tenu |
|---|---|
| Accroche complète (image 0 du master) | 2,8 – 4,0 s (1,2 s) |
| Dévoilement | 6,0 – 7,5 s (1,5 s) |
| Texto | 8,8 – 10,5 s (1,7 s) |
| Courtier 03 alerté | 11,3 – 12,5 s (1,2 s) |
| Relance au Leader | 13,5 – 14,7 s (1,2 s) |
| Suivi 90 jours | 15,5 – 16,7 s (1,2 s) |
| Pile cochée | 17,9 – 19,4 s (1,5 s) |
| Preuve | 20,4 – 21,9 s (1,5 s) |
| Garantie et rareté | 23,7 – 25,4 s (1,7 s) |
| Thèse | 26,0 – 27,5 s (1,5 s) |
| Fin | 28,5 – 31,0 s (2,5 s) |

---

## Une seule caméra pour l'action (7,5 – 19,4 s)

Le téléphone, la carte « Votre équipe », la carte « Suivi » et la carte produit sont empilés **dans un seul
monde**, de haut en bas. La caméra ne fait que descendre : trois glissements de 0,4 s (flou de vitesse, arc léger),
chacun porté par un objet qui descend avec elle (le fil de l'horloge, la sous-carte de relance, la carte Suivi).
L'horloge reste en haut de l'écran (y 640) de 7,5 à 16,7 s, puis sort quand la carte produit se forme.

## Texte à l'écran (vérifié sur scalesuiteqc.ca/fr)

« Leaders d'équipe de courtiers », les deux heures de l'accroche, « Trois heures pour appeler quelqu'un d'autre. »,
« Nouveau », « Système Vendeurs 5 minutes », « Pour les équipes de courtiers du Québec. », les noms des cinq
composantes, « Groupe Mackay », « 124 », « demandes en moins de 7 mois. », « Avec la campagne seule. », « Chiffres
tirés de Google Ads », « Si on ne livre pas, vous ne payez pas. », « Aucun contrat. », « 3 nouvelles équipes par
mois. », « Il reste 3 places fondatrices. », la thèse du site, « Obtenir mon diagnostic gratuit », « scalesuiteqc.ca ».
Retirés de la v2 : « Vos demandes ne sont jamais partagées ni revendues. » (une idée de trop dans le cadre de la
garantie ; voir le choix 3), la rangée « Rencontre » et la scène de rareté séparée. Règles inchangées : aucun prix,
aucune promesse de nombre, aucune exclusivité, aucun pourcentage, aucun trait d'union, aucun emoji, aucune phrase
qui commence par « Et » ou « Mais ».

## Son (réglage de « Le lead perdu » repris tel quel)

| # | Temps | Moment | Son | Cible |
|---|---|---|---|---|
| 1 | 3,55 → 4,0 s | Éclosion et dévoilement | souffle d'ouverture montant (`breath`, `'rise'`) | ≥ 6 dB sous la musique |
| 2 | 8,3 s | Texto | double vibration sourde (`mutedbuzz`) | ≥ 6 dB |
| 3 | 13,4 s | La relance arrive chez le Leader | une vibration sourde courte | ≥ 6 dB |
| 4 | 17,65 s | Dernière coche de la pile | clic feutré très léger, **gardé seulement s'il mesure ≥ 12 dB sous la musique** (sinon retiré) | ≥ 12 dB |
| 5 | 28,0 s | Le bouton naît | souffle doux en cloche | ≥ 6 dB |

Musique : gris clairsemé en ré mineur sur l'accroche ; ouverture en fa majeur à l'éclosion, **signature de
quatre notes au complet, une note par mot du nom** ; groove doux (+6 %) qui monte sur l'action et culmine sur la
pile cochée ; preuve et garantie sans batterie ; résolution en fa majeur sous le logo. Mix −15 LUFS.

## Voix

Voir `voiceover-systeme.md` (v3, 7 répliques).

---

## Choix à trancher (avec ma recommandation)

1. **Durée : 31,0 s** (au lieu de 30). *Recommandé* : la fin a besoin de 0,5 s pour que le logo, le nom, le bouton
   et l'URL soient posés avant la tenue de 2,5 s.
2. **Réplique 1** : votre texte fait 14 mots dits (5,2 s) pour une accroche de 4 s. *Recommandé* : la version
   réordonnée déjà validée en v2, « 14 h 12 : le vendeur écrit. 17 h : votre courtier le voit. » (12 mots,
   4,45 s), qui finit pendant l'éclosion. Variante : votre texte exact, qui déborde de 1,4 s sur le dévoilement.
3. **« Vos demandes ne sont jamais partagées ni revendues. »** : retirée du cadre de la garantie pour garder une
   idée par cadre (vous ne l'avez pas reprise). *Recommandé : retirée.* Variante : une ligne de 40 px sous
   « Aucun contrat. ».
4. **Réplique du texto** : « Le vendeur reçoit un texto en moins d'une minute. » fait 9 mots (3,35 s) pour une
   scène de 3,0 s. *Recommandé* : « Le vendeur reçoit un texto dans la minute. » (8 mots, 2,96 s ; « dans la
   minute » est le mot du site). Variante : votre texte, qui déborde de 0,4 s sur la scène suivante.
5. **Entrée des titres sans masque** (montée courte avec fondu) dans tout le film, pour respecter « aucun mot
   coupé par un masque visible ». *Recommandé.*
6. **La ligne de la campagne devient « Avec la campagne seule. »** dans la preuve (objet partagé entre la pile et
   la preuve). *Recommandé* : la preuve se rattache visiblement à la ligne 1 du système.

## Étapes

1. **Ce plan v3** + `voiceover-systeme.md` v3. ← *arrêt*
2. Aperçu animé 540 × 960 avec la musique, et la planche contact. Arrêt.
3. Master 1080 × 1920, 60 fps, contrôle qualité complet (dont l'écart de pixels de la trotteuse).
4. Version avec voix, version 4:5, PR, proposition pour la section 9 de la skill.

---

## Historique

- **v1** (validée) : récit en deux mondes autour de l'horloge, 34 s ; relance corrigée vers le Leader seulement.
- **v2** (validée, aperçu fait, commit `db64142`) : lancement de produit en 40 s, pile en cinq allers-retours.
- **v3** : même lancement, simplifié à environ 31 s, une seule caméra pour l'action (ce document).

## Validation du plan v3 et aperçu animé

Choix retenus : 31,0 s ; réplique 1 réordonnée ; réplique du texto « dans la minute » ; titres par montée avec
fondu ; ligne « Avec la campagne seule. » comme objet partagé. Modifications : « Vos demandes ne sont jamais
partagées ni revendues. » gardée dans la scène 5 (40 px, deux lignes sous « Aucun contrat. », sans
chevauchement) ; l'étiquette devient « Système Vendeurs 5 minutes » sans numéro ni barre.

Aperçu `previews/scalesuite-systeme-9x16-preview.mp4` (540 × 960, 30 fps, 31,0 s) et planche contact
`scalesuite-systeme-9x16-contact-sheet.jpg`. Affiche 9:16 réexportée sur le cadre du dévoilement v3 (t = 7,0 s) ;
affiche 4:5 inchangée. Plus petit texte à l'écran : 30,4 px. Mix −15,0 LUFS. Effets mesurés sous la musique :
dévoilement −9,1 dB, texto −9,0 dB, Leader −10,9 dB, pile cochée −13,8 dB (≥ 12 dB, gardé), bouton −10,3 dB.
Repères ajustés au rendu : compteur 19,75 s, « Avec la campagne seule. » 20,3 s ; logo et « Nouveau » de la pile
à 16,98 et 17,03 s.

## Étape 4 : master, contrôle qualité et version avec voix

Retouches avant le master : le nom « Système » sort de 7,2 à 7,45 s, avant l'arrivée du téléphone (7,5 s) ;
passage de l'horloge en mode date et changements de libellé en fondu, un seul texte lisible à la fois ; titres de
l'action qui finissent de sortir avant que le suivant n'entre ; rareté en deux lignes de 56 px sous la carte (encre,
puis sarcelle ; nombres dans `SS.OFFRE`). Son allégé à votre demande : **3 effets** (souffle du dévoilement, vibration
du texto, souffle du bouton) ; la relance chez le Leader et la pile cochée sont portées par la musique seule.

Corrections de rendu : le compteur garde une largeur fixe (espaces de chiffre), plus de saut à 100 ; la face et
l'ombre de la carte sont des calques séparés (une liste d'ombres n'est plus interpolée) ; les logos restent
opaques et sont révélés par un cache de la couleur du fond, sans échelle animée (le rendu ne dépend plus de
l'historique) ; l'écart de pixels de la trotteuse de la v2 ne se reproduit plus.

| Contrôle | Résultat |
|---|---|
| `check-systeme.mjs determinism` | OK : 0 différence de DOM, écart de pixels max 2/255 |
| `check-systeme.mjs motion 31` | OK : aucun saut isolé (pic 16,1 au glissement de caméra de 10,77 s) |
| `textsize-systeme.mjs` | OK : plus petit texte à l'écran 30,4 px |
| `ffprobe` master | 1080 × 1920, 60 fps, yuv420p bt709, 1 860 images, 31,000 s, H.264 + AAC 48 kHz |
| Sonie master | −15,0 LUFS, LRA 5,7 LU, crête −2,4 dBFS |
| Effets (3) | dévoilement −9,4 dB, texto −8,8 dB, bouton −10,3 dB sous la musique |
| Image 0 | état complet de l'accroche à 3,2 s |
| Texte relu sur 13 images extraites du MP4 | `scalesuite-systeme-9x16-controle.jpg` ; deux défauts trouvés (cache du logo de fin visible sur la carte de garantie et sur la thèse) puis corrigés avant le master final |
| Version avec voix | vidéo identique au master (copiée), −14,1 LUFS, −2,0 dBTP avant AAC, −1,9 dBTP sur le MP4 |
