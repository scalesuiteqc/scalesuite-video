# « Qui répond à 2 h du matin? » : notes techniques

Vidéo promo du Système Vendeurs 5 minutes. Plan validé : `brag-output/storyboard-qui-repond.md`.
Même pipeline que les films précédents (page HTML/SVG rendue image par image avec Playwright, puis
ffmpeg), avec deux différences :

- **Deux canevas** : `?format=16x9` (1920 × 1080, la version qu'on filme sur un portable) et
  `?format=9x16` (1080 × 1920, la version directe).
- **Chaque scène est une fonction pure de son temps local.** `build(layer)` crée le DOM une fois,
  `render(u)` fixe toutes les propriétés animées à partir de `u` seulement. Il n'y a aucun état de
  tween : une image se rend dans n'importe quel ordre.

## Commandes

```bash
cd scalesuite-film
./build-qui-repond.sh preview 16x9   # aperçu demi taille 30 i/s + planche contact (une rangée par scène)
./build-qui-repond.sh final 16x9     # master 1920 × 1080, 30 i/s
node render/stills-qui-repond.mjs --times=3.0,11.9 --out=dossier [--format=9x16]   # images fixes
node render/check-qui-repond.mjs determinism   # même image quel que soit l'ordre de rendu
node render/check-qui-repond.mjs motion        # aucun saut isolé hors des trois coupes franches voulues
```

Aperçu dans un navigateur : `npx http-server . -p 8080`, puis
`/index-qui-repond.html?format=16x9&t=12.3` (image fixe) ou `?play&t=20&end=24` (lecture).

## Fichiers

| Fichier | Rôle |
|---|---|
| `index-qui-repond.html` | ordre de chargement |
| `src/core-qui-repond.js` | canevas, courbes, composants : texte tapé (`Q.typed`), bloc de texte (`Q.block`), compteur (`Q.figure`), puce, carte de notification, fonds nuit et jour avec leur couche ambiante |
| `src/scenes-qui-repond/00-timing.js` | **la table des durées** (`QR.DUR`) et les options de contenu (`QR.OPT`) |
| `src/scenes-qui-repond/decor.js` | décors générés : chambre, gros plan du cellulaire, bureau |
| `src/scenes-qui-repond/01…09-*.js` | une scène par fichier ; ses repères sont dans l'objet `T`, sa mise en page dans `L` (16:9, puis 9:16) |
| `src/styles-qui-repond.css` | styles (préfixe `qr-`) |
| `render/*-qui-repond.mjs`, `build-qui-repond.sh` | rendu, contrôles, construction |

## Ajuster le rythme

- Durée d'une scène : `QR.DUR` dans `00-timing.js`. Les débuts des scènes suivantes se décalent seuls.
- Repères à l'intérieur d'une scène : l'objet `T` en tête du fichier de la scène, en secondes depuis le
  début de la scène.
- Après un changement de durée, mettre à jour les instants de la planche contact (`ROWS` dans
  `build-qui-repond.sh`).

## Contenu

- Scène 8, nom du client : `QR.OPT.clientName` (`false` affiche « pour une de nos équipes clientes »).
- Scène 6, tous les textes d'interface : objet `COPY` en tête de `06-systeme.js` (brouillons à
  remplacer par les vrais textos).
- Les règles de contenu du brief sont rappelées en tête des scènes 3, 4, 6 et 8.

## Pièges

- La classe `.a3` existe déjà dans `styles-v3.css` (position absolue). Ne pas la réutiliser.
- Les fenêtres des compteurs (`.qr-fig .win`) ont un espacement de lettres nul et un remplissage
  latéral : avec un espacement négatif, le bord droit des chiffres était coupé.
- Le flou est toujours fixé à chaque image par `render(u)` ; jamais de transition CSS.
