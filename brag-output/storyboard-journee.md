# ScaleSuite « Une journée de courtier » : plan v2 scène par scène (à valider)

Film d'acquisition · 9:16 (1080 × 1920) · 25,0 s · 60 fps · fonctionne sans le son · français (Québec)

Même identité que la V3 (`brag-output/design-dna-v3.json`). Images clés de ce plan :
`brag-output/scalesuite-journee-keyframes.jpg` (images fixes 540 × 960, aucune animation).

Date affichée : **vendredi 16 octobre 2026** (vrai vendredi). Rapport : **du 12 au 16 octobre**.
Lieu : **la Rive-Sud de Montréal** (« acheter maison Longueuil », « Maisons à vendre sur la Rive-Sud »).

## Pourquoi un plan v2

Diagnostic de l'aperçu v1 (refusé) : le courtier était invisible (un petit libellé dans l'en-tête),
trop d'idées par seconde, des images presque vides pendant les transitions (8,5 à 10,2 s), une
scène du notaire incompréhensible (acte, signature, jeton qui vole) et des moments sans titre.

Règles du plan v2 :
1. **Trois moments seulement : 10 h, 13 h, 17 h.** La scène de 7 h est supprimée.
2. **Chaque moment commence par une carte plein écran qui montre le courtier** : l'heure en très
   grand (230 px), une grande icône au trait (300 px) et une phrase en 96 px. Tenue d'au moins 1,2 s.
3. **Une seule preuve produit par moment**, précédée de « Pendant ce temps… » (64 px).
4. **Une seule action et un seul mouvement de caméra par scène.** Chaque état important reste
   immobile et lisible au moins 1,2 s.
5. **Chaque image a un titre ou un point focal évident.** Aucune image de transition vide ou à
   moitié coupée de plus de 0,3 s.
6. **Plus de marqueur d'heure dans l'en-tête** : les cartes de moment le remplacent.
7. On garde la fin, la Design DNA, Longueuil et la Rive-Sud, et les corrections validées :
   « Commandité », optimisation hebdomadaire par notre IA et notre équipe (aucune optimisation
   « la nuit »), expéditeur « ScaleSuite », rapport hebdomadaire du vendredi, aucune phrase qui
   commence par « Et » ou « Mais », musique de la V3 adaptée (pas de nouvelle partition).

## Grammaire des transitions (la même partout)

- **Entrée d'une carte de moment** : un nœud vert éclot en disque menthe qui couvre le cadre
  (motif de la V3), et la carte se compose dessus : icône, heure, phrase. Le disque est opaque, le
  nœud est le point focal : aucune image vide.
- **Sortie d'une carte** : la carte remonte d'un bloc hors du cadre (0,45 s, `inOut`) et découvre la
  preuve déjà en place, avec « Pendant ce temps… » et le titre qui montent dans leur masque.
- **À l'intérieur du moment 13 h** : la page glisse vers le bas pendant que le téléphone monte
  (0,5 s), puis la notification s'ouvre sur le CRM (zoom à travers, dans le téléphone).

Aucun fondu enchaîné, aucune scène en transparence, aucun jeton qui vole.

---

## Scènes

| # | Temps | Durée | Ce qu'on voit (état tenu) | Action unique | Caméra (un seul mouvement) | Transition vers la suivante |
|---|---|---|---|---|---|---|
| 1 | 0,0–2,0 | 2,0 s | **Carte 10 h** (image 0 du film) : maison au trait, « **10 h** », « Vous êtes en visite. » sur le disque menthe. Tenue de 0,5 à 2,0 s (1,5 s). | L'icône se dessine, l'heure roule jusqu'à 10 h, la phrase monte (fini à 0,5 s). | Aucune (cadre fixe). | La carte remonte et découvre la recherche. |
| 2 | 2,0–5,4 | 3,4 s | **Preuve 10 h** : « Pendant ce temps… » / « Votre annonce **s'affiche.** ». La barre tape « acheter maison Longueuil » ; l'annonce « Commandité · votreagence.ca / Maisons à vendre à Longueuil \| Votre agence » s'emboîte en premier résultat, avec un halo turquoise. Tenue de 3,9 à 5,4 s (1,5 s). | La recherche se fait et l'annonce s'emboîte en tête (2,3 à 3,9 s). | Lente avancée vers l'annonce (1,00 → 1,04), finie à 3,9 s. | Un nœud vert naît au centre du halo et éclot en disque : carte 13 h. |
| 3 | 5,4–7,2 | 1,8 s | **Carte 13 h** : stylo au trait, « **13 h** », « Vous êtes chez le notaire. ». Tenue de 5,9 à 7,2 s (1,3 s). | Éclosion, puis l'icône, l'heure et la phrase (finie à 5,9 s). | Aucune. | La carte remonte et découvre la page de destination. |
| 4 | 7,2–9,8 | 2,6 s | **Preuve 13 h (a)** : « Pendant ce temps… » / « Un acheteur **vous écrit.** ». Page « Maisons à vendre sur la Rive-Sud » aux couleurs de l'agence ; le formulaire se remplit : Projet « Achat », Secteur « Longueuil », Délai « D'ici 6 mois ». Tenue de 8,3 à 9,5 s (1,2 s), puis appui sur « Envoyer ». | Le formulaire se remplit (7,5 à 8,3 s). | Aucune (cadre fixe, page entière lisible). | « Envoyer » est appuyé (onde) : la page glisse vers le bas pendant que le téléphone monte. |
| 5 | 9,8–11,6 | 1,8 s | **Preuve 13 h (b), climax** : « Le lead **arrive.** ». Le téléphone du courtier (« vendredi 16 octobre », « 13:04 ») ; la notification tombe avec 12 % de dépassement et une vibration : « ScaleSuite · Nouveau lead acheteur · Acheteur · Longueuil · Achat · ✓ Ajouté à votre CRM ». Tenue de 10,3 à 11,6 s (1,3 s). | La notification tombe (10,0 s). | Avancée sur la notification (1,00 → 1,10), finie à 10,4 s. | Appui sur la notification : le CRM s'ouvre à partir d'elle (zoom à travers). |
| 6 | 11,6–13,4 | 1,8 s | **Preuve 13 h (c)** : « Déjà dans **votre CRM.** ». « Contacts · Votre CRM » : la fiche « Acheteur · Longueuil · Achat · aujourd'hui, 13 h 04 » s'emboîte en tête, avec un halo et la pastille « Nouveau ». Tenue de 12,2 à 13,4 s (1,2 s). | La fiche s'emboîte, les autres descendent (11,8 à 12,2 s). | Légère avancée (1,10 → 1,12). | Un nœud naît de la pastille « Nouveau » et éclot : carte 17 h. |
| 7 | 13,4–15,2 | 1,8 s | **Carte 17 h** : soleil couchant au trait, « **17 h** », « Vous fermez la journée. » sur un disque menthe réchauffé de sable en bas. Tenue de 13,9 à 15,2 s (1,3 s). | Éclosion, puis l'icône, l'heure et la phrase. | Aucune. | La carte remonte et découvre le rapport. |
| 8 | 15,2–17,6 | 2,4 s | **Preuve 17 h** : « Pendant ce temps… » / « Votre semaine, **en clair.** ». « Rapport hebdomadaire · Du 12 au 16 octobre · Campagne acheteur · Rive-Sud » ; tuiles Impressions 1 284, Clics 96, Leads 4 ; barres L M M J V ; « ✓ 3 optimisations appliquées · Par notre IA et notre équipe ». Tenue de 16,2 à 17,6 s (1,4 s). | Les compteurs montent et les barres se lèvent (15,4 à 16,2 s). | Aucune. | Le rapport descend hors du cadre pendant que les trois lignes du bilan s'emboîtent. |
| 9 | 17,6–20,6 | 3,0 s | **Le bilan** : « Google Ads? **Pas ouvert de la journée.** » (trois lignes, 116 px). Trois lignes : « 10 h · Visite ✓ Annonce affichée », « 13 h · Notaire ✓ Lead ajouté au CRM », « 17 h · Fin de journée ✓ Rapport reçu ». Tenue de 18,6 à 20,6 s (2,0 s). | Les trois lignes s'emboîtent (décalage de 80 ms), puis le titre. | Aucune. | Les lignes se contractent en un nœud, qui devient la marque (motif de la V3). |
| 10 | 20,6–25,0 | 4,4 s | **Fin** : logo complet, « Google Ads pour l'immobilier québécois. », bouton « **Demander une démo →** », « scalesuiteqc.ca ». Tout est posé à 22,6 s et tenu jusqu'à 25,0 s (2,4 s). | Le logo se révèle, puis le bouton naît d'un nœud. | Avancée de 1 %. | Fin. |

Durées : 2,0 · 3,4 · 1,8 · 2,6 · **1,8** · 1,8 · 1,8 · 2,4 · 3,0 · 4,4 s. Le moment 13 h
(scènes 3 à 6, 7,8 s) est le plus long ; le climax (la notification) tombe à 10,0 s.

## Lisibilité

- Cartes : heure 230 px, phrase 96 px, icône 300 px. Preuves : « Pendant ce temps… » 64 px, titres
  116 px, interface de 900 px de large (83 %), texte d'interface de 30 à 46 px avant caméra.
- Zones : titres entre y 200 et 580, produit entre y 640 et 1500, rien de critique plus bas.
- Le voile clair n'est utilisé que si l'interface passe sous un titre (scènes 2, 4, 5, 6, 8).

## Son

Musique de la V3, recalée (`audio/music-journee.py`) :
- cartes de moment : la signature au kalimba, une note de marimba par moment ;
- 10 h : le groove de la V3 entre, frappe au clavier, emboîtement de l'annonce ;
- 13 h : montée sur le formulaire, gel de 80 ms avant la notification, puis le **drop** (la
  signature à la cloche) ; marimba sur la fiche CRM ;
- 17 h : le groove redescend ; respiration de 0,4 s avant « Pas ouvert de la journée » ;
- fin : résolution en fa majeur sous le logo.

## Voix hors champ (fenêtres prévues)

| # | Réplique (fr-CA) | Fenêtre (s) |
|---|---|---|
| 1 | « Dix heures. Vous êtes en visite. » | 0,2 – 1,9 |
| 2 | « Pendant ce temps, votre annonce s'affiche dans Google. » | 2,2 – 5,2 |
| 3 | « Treize heures. Vous êtes chez le notaire. » | 5,5 – 7,1 |
| 4 | « Pendant ce temps, un acheteur remplit votre formulaire. » | 7,4 – 9,7 |
| 5 | « Le lead arrive directement dans votre CRM. » | 10,1 – 13,2 |
| 6 | « Dix-sept heures. Vous fermez la journée. » | 13,5 – 15,1 |
| 7 | « Votre rapport de la semaine est prêt. » | 15,4 – 17,4 |
| 8 | « Google Ads? Vous ne l'avez pas ouvert de la journée. » | 17,8 – 20,4 |
| 9 | « ScaleSuite. Demandez une démo. » | 21,0 – 23,0 |

## Étapes

1. Validation de ce plan et des images clés.
2. Animation, aperçu 540 × 960, planche contact.
3. Master 1080 × 1920 à 60 fps, contrôle qualité et relecture des textes.
4. 4:5 seulement sur demande.
