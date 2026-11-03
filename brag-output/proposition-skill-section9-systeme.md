# Proposition : nouvelle section 9 de la skill `scalesuite-video` (à valider, la skill n'est pas modifiée)

Remplace la section 9 actuelle de `.claude/skills/scalesuite-video/SKILL.md`, qui décrit l'ancienne offre (campagne par
courtier, IA, agences, « Demander une démo »). Texte proposé :

---

## 9. Règles de contenu (offre : le Système Vendeurs 5 minutes)

- **Affirmations publiées sur scalesuiteqc.ca/fr uniquement.** Relire la page avant chaque film et citer le texte
  du site mot pour mot quand c'est possible. Affirmations vérifiées en novembre 2026 :
  - le **Système Vendeurs 5 minutes**, « pour les équipes de courtiers du Québec » (ne pas écrire « 4 à 15
    courtiers » : ce n'est pas sur le site) ;
  - « On monte votre campagne Google Vendeurs et on l'ajuste chaque semaine » ; « Une page aux couleurs de votre
    équipe, faite pour le cellulaire » ;
  - **Réponse 60 secondes** : un texto au vendeur dans la minute, de jour comme de soir ;
  - la demande va direct au bon courtier ; si personne n'a rappelé en 10 minutes, l'équipe est relancée (montrer :
    le courtier assigné, puis le **Leader seulement** ; jamais une redistribution à toute l'équipe ; ne pas écrire
    « Filet 10 minutes » à l'écran) ;
  - **Suivi 90 jours** : les vendeurs pas encore prêts sont suivis pendant 90 jours ;
  - garantie : « Si on ne livre pas, vous ne payez pas. » ; « Aucun contrat. » ; « Vos demandes ne sont jamais
    partagées ni revendues » ;
  - rareté réelle : « On prend 3 nouvelles équipes par mois. », « Il reste 3 places fondatrices » (nombres dans une
    constante, ici `SS.OFFRE` ; aucune date de départ, aucun compte à rebours) ;
  - preuve : Groupe Mackay, « 124 demandes en moins de 7 mois », avec la campagne seule, « Chiffres tirés de Google
    Ads » (seul nom réel admis) ;
  - thèse : « Vos courtiers rencontrent des vendeurs. Nous, on vous les amène. » ;
  - un seul appel à l'action : **« Obtenir mon diagnostic gratuit »** (voix : « Obtenez votre diagnostic gratuit. »),
    puis « scalesuiteqc.ca ».
- **Interdits (ancienne offre ou hors site)** : « Chaque courtier a sa propre campagne » et les grilles de campagnes
  par courtier ; les agences comme public ; « notre IA » ou toute optimisation par IA ; le slogan « Google Ads pour
  les équipes immobilières » ; « Demander / Demandez une démo » ; prix, budget, coût par demande, pourcentage,
  promesse de nombre de demandes, exclusivité de secteur, script d'appel, classement des courtiers, délai de rappel
  par courtier.
- **Personnes et numéros** : noms fictifs seulement, cohérents avec le site (Équipe Gagnon, Julie, exemple.ca sans
  trait d'union). Les cartes restent « Leader », « Courtier 01 »… Aucun visage. Le texto au vendeur vient d'un
  numéro local de l'équipe (au Canada, aucun nom ne s'affiche à la place du numéro), en 555 (514 555 0142), et il
  est signé du prénom du courtier. Ajouter « Exemple. Noms et numéros fictifs. » sous un écran qui montre un prénom
  ou un numéro.
- **Google** : l'annonce affiche « Commandité » (fr-CA).
- **Langue** : français québécois, vouvoiement. Mot « demande » à l'écran (comme le site), plutôt que « lead ».
  **Aucun trait d'union** dans le texte à l'écran ni dans la voix (« quatre vingt dix » dans le texte ; un trait
  d'union n'est admis que dans le bloc ElevenLabs pour la prononciation). Aucune phrase qui commence par « Et » ou
  « Mais ». Aucun emoji. Pas d'espace avant « ? ».
- **Dates** : vérifier le jour de la semaine de chaque date affichée (samedi 7 novembre 2026, vendredi 5 février
  2027).
- **Identité** : `brag-output/design-dna-systeme.json` (fond `#F0FFFC`, encre `#151515`, sarcelle `#0F7B6F`,
  bouton plein encre sans flèche). Refusés par Mathieu : badge en pilule avec point qui pulse, séparateurs en
  pointillés, texte en dégradé, halos flous qui flottent, flèches qui rebondissent, lumières floues qui dérivent en
  fond.
- **Relire tout le texte à l'écran sur des images extraites du MP4 lui-même** avant chaque livraison
  (`render/qc-sheet-systeme.sh`).

### Ajouts proposés aux autres sections (même mise à jour)

- **Section 7 (mouvement)** : une seule idée par cadre ; transitions de 0,4 s au plus, chacune par un objet partagé,
  avec un chevauchement d'environ 0,2 s ; une seule poussée de caméra par scène ; aucun mot ni logo coupé par un
  masque visible (titres par montée courte avec fondu) ; un seul texte lisible à la fois dans une même case.
- **Section 4 (déterminisme)** : ne jamais interpoler `box-shadow` entre des listes de formes différentes (mettre
  l'ombre sur un calque dont on anime l'opacité) ; garder les logos opaques et sans échelle animée (les révéler par
  un cache de la couleur du fond) ; un compteur garde une largeur fixe (espaces de chiffre).
- **Section 10 (son)** : pour un film de lancement « léger et professionnel », 3 effets suffisent (ouverture, texto,
  bouton) ; les autres moments passent par la musique.
