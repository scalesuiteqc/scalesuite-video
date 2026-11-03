# « Le Système Vendeurs 5 minutes » : voix hors champ (étape 1, à valider)

Vidéo `scalesuite-systeme-9x16` · 34,0 s · français québécois, vouvoiement, ton posé et naturel.
Fenêtres calées sur les repères du plan (`storyboard-systeme.md`) ; elles seront **recalées sur les
repères réels de la timeline** (`SS.ST` dans `src/scenes-systeme/00-commun.js`, exportés par
`render/cues-systeme.mjs`) à l'étape 3, sans changer le texte. Débit maximal : 2,7 mots par seconde,
compté en **mots prononcés** (« 14 h 12 » = quatorze heures douze = 3 mots ; « 90 » = 1 mot).
Aucune phrase ne commence par « Et » ou « Mais ». Aucun trait d'union.

Votre texte de départ est gardé mot pour mot. Deux fenêtres ont été élargies plutôt que d'accélérer :
« Pas prêt à vendre? On le suit pendant 90 jours. » déborde sur le début de la preuve (jusqu'à 26,2 s),
et la thèse commence à 27,85 s.

**Réplique sur la preuve (choix 10 du plan)** : « Groupe Mackay : 124 demandes en moins de 7 mois. » se
dit en 10 mots (« cent vingt-quatre », « sept »), soit 3,7 s. Il ne reste que 1,65 s libre entre la
réplique 6 et la thèse ; même coupée en « Groupe Mackay : 124 demandes. » (6 mots dits), elle
dépasserait 3,5 mots/s. *Recommandé : ne pas l'ajouter* ; la preuve se lit à l'écran, tenue 1,6 s,
sous une montée de la musique. Si vous la voulez quand même, je prolonge la preuve de 1,4 s
(film à 35,4 s, hors cible) ou je retire la scène 5.

## Répliques et fenêtres

| # | Réplique | Fenêtre (s) | Durée | Mots dits | Mots/s |
|---|---|---|---|---|---|
| 1 | Samedi, 14 h 12. Un vendeur remplit votre formulaire. | 0,20 – 3,60 | 3,40 | 9 | 2,65 |
| 2 | Votre courtier est en visite. Il voit l'alerte à 17 h. | 3,80 – 8,00 | 4,20 | 11 | 2,62 |
| — | *(respiration)* | 8,00 – 10,30 | 2,30 | — | — |
| 3 | Reprenons. Avec le Système Vendeurs 5 minutes. | 10,35 – 13,10 | 2,75 | 7 | 2,55 |
| 4 | En moins d'une minute, le vendeur reçoit un texto de votre équipe. | 13,20 – 17,70 | 4,50 | 12 | 2,67 |
| 5 | Le bon courtier est alerté. Sans rappel en 10 minutes, l'équipe est relancée. | 17,80 – 22,70 | 4,90 | 13 | 2,65 |
| 6 | Pas prêt à vendre? On le suit pendant 90 jours. | 22,85 – 26,20 | 3,35 | 9 | 2,69 |
| — | *(la preuve se lit, musique seule)* | 26,20 – 27,85 | 1,65 | — | — |
| 7 | Vos courtiers rencontrent des vendeurs. Nous, on vous les amène. | 27,85 – 31,60 | 3,75 | 10 | 2,67 |
| 8 | ScaleSuite. Obtenez votre diagnostic gratuit. | 31,65 – 33,75 | 2,10 | 5 | 2,38 |

Total : 76 mots dits.

## Bloc ElevenLabs (Multilingual v2)

```
Samedi, quatorze heures douze. Un vendeur remplit votre formulaire. <break time="1.5s" /> Votre courtier est en visite. Il voit l'alerte à dix-sept heures. <break time="1.5s" /> Reprenons. Avec le Système Vendeurs cinq minutes. <break time="1.5s" /> En moins d'une minute, le vendeur reçoit un texto de votre équipe. <break time="1.5s" /> Le bon courtier est alerté. Sans rappel en dix minutes, l'équipe est relancée. <break time="1.5s" /> Pas prêt à vendre? On le suit pendant quatre-vingt-dix jours. <break time="1.5s" /> Vos courtiers rencontrent des vendeurs. Nous, on vous les amène. <break time="1.5s" /> Scale Suite. Obtenez votre diagnostic gratuit.
```

Notes :
- Les nombres sont écrits en lettres dans le bloc pour qu'ElevenLabs les dise « à la québécoise »
  (« quatorze heures douze », pas « quatorze heures et douze minutes ») ; les traits d'union de
  « dix-sept » et « quatre-vingt-dix » ne servent qu'à la prononciation et n'apparaissent nulle part à
  l'écran.
- « Scale Suite » en deux mots pour la prononciation.
- Réglages suggérés (ceux de « Le lead perdu ») : stabilité 50 à 60 %, similarité 75 %, style 0 à
  10 %. Voix québécoise posée.
- ElevenLabs ignore souvent les pauses de 1,5 s (0,2 à 0,46 s réelles) : le découpage se fera comme
  pour « Le lead perdu », à partir de points de coupe repérés à l'oreille, alignés sur le point le plus
  silencieux à ± 60 ms (`audio/split-vo-systeme.py`, copie de `split-vo-lead-perdu.py`), puis chaque
  réplique est posée au début de sa fenêtre avec `audio/mix_vo.py` (musique −9 dB, effets −4 dB sous
  la voix, −14 LUFS). Seule la piste audio du master est remplacée (`-c:v copy`).
- Déposer la prise à la racine : `voiceover-systeme.mp3`.
