# Bistro Le Barada — Carte des consommations

Page web statique (HTML/CSS/JS) affichant la carte du bar, pensée pour être
scannée via QR code depuis un téléphone.

## Arborescence

```
carte-barada/
├── index.html          → page principale
├── css/
│   └── style.css       → tous les styles
├── js/
│   └── app.js           → charge data/menu.json et construit la page
├── data/
│   └── menu.json        → la carte (catégories, produits, prix)
└── assets/
    ├── logo.png          → logo transparent doré
    └── banner.jpg         → photo du bar (fond du hero)
```

## Mettre à jour la carte

Il suffit d'éditer **`data/menu.json`** — aucune connaissance en code requise.
Chaque catégorie a un `slug` (identifiant technique, sans accent/espace), un
`label` (le nom affiché), une `icon` (voir la liste ci-dessous) et une liste
`items` avec `name` et `price`.

```json
{
  "slug": "cocktails",
  "label": "Cocktails",
  "icon": "cocktail",
  "items": [
    { "name": "Mojito", "price": 8.0 },
    { "name": "Gin Tonic", "price": 8.0 }
  ]
}
```

- Pour ajouter un produit : ajouter une ligne `{ "name": "...", "price": ... }`
  dans la catégorie voulue.
- Pour ajouter une catégorie : dupliquer un bloc `{...}` dans le tableau
  `categories`, avec un nouveau `slug`/`label`.
- Icônes disponibles : `cocktail`, `beer`, `beer0`, `wine`, `aperitif`,
  `soft`, `hot`, `sport`, `juice`, `food`.
- L'ordre des catégories dans le fichier = l'ordre d'affichage sur le site.

Pas besoin de toucher à `index.html`, `style.css` ou `app.js` pour une simple
mise à jour de carte.

## Tester en local

Comme `app.js` charge `data/menu.json` via `fetch`, ouvrir directement
`index.html` dans le navigateur (double-clic) ne fonctionnera pas (blocage
CORS sur `file://`). Il faut un mini serveur local, par exemple :

```bash
cd carte-barada
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Héberger sur GitHub Pages

1. Pousser tout le contenu de ce dossier à la racine d'un repo GitHub.
2. Dans **Settings → Pages**, choisir la branche (`main`) et le dossier `/root`.
3. L'URL générée (`https://<utilisateur>.github.io/<repo>/`) est celle à
   encoder dans le QR code affiché sur les tables du bar.

Pour changer les prix ou ajouter un produit un jour de match, il suffit
d'éditer `data/menu.json` directement depuis l'interface web de GitHub (icône
crayon), sans avoir besoin d'un environnement de développement.
