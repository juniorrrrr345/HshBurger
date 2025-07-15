# 🏪 CBD Shop Premium

Boutique en ligne moderne pour produits CBD avec panel d'administration personnalisable.

## ✨ Fonctionnalités

### 🛍️ Boutique
- **Catalogue de produits** avec filtrage par catégorie
- **Pages de détail produit** avec variantes et prix
- **Interface responsive** optimisée mobile et desktop
- **Images optimisées** avec gestion d'erreur automatique

### ⚙️ Panel d'administration
- **Gestion des produits** (ajout, modification, suppression)
- **Gestion des catégories** avec emojis
- **Personnalisation des labels** (catégories, farm, etc.)
- **Configuration des couleurs** et thème
- **Gestion des réseaux sociaux**

### 🎨 Personnalisation
- **Labels configurables** via le panel admin
- **Thème personnalisable** (couleurs, textes)
- **Interface intuitive** pour les modifications
- **Sauvegarde automatique** des configurations

## 🚀 Installation

```bash
# Cloner le projet
git clone [url-du-repo]

# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build
```

## 📱 Utilisation

### Accès au site
- **Site principal** : `http://localhost:3000`
- **Panel admin** : `http://localhost:3000/admin`

### Configuration des labels
1. Aller sur `/admin`
2. Onglet "Pages" → Section "Page d'accueil"
3. Modifier les champs :
   - **Label des catégories** → Change "Catégories"
   - **Label Farm** → Change "Farm"
   - **Label toutes les catégories** → Change "Toutes les catégories"
   - **Label produits Farm** → Change "Produits de la ferme"

## 🛠️ Technologies

- **Next.js 14** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling
- **LocalStorage** - Persistance des données
- **Vercel** - Déploiement

## 📁 Structure

```
app/
├── components/          # Composants réutilisables
│   ├── Header.tsx      # Navigation
│   └── OptimizedImage.tsx # Images optimisées
├── admin/              # Panel d'administration
│   └── page.tsx        # Interface admin
├── produits/           # Pages produits
├── produit/[id]/       # Détail produit
├── lib/                # Configuration
│   └── config.ts       # Gestion des données
└── globals.css         # Styles globaux
```

## 🎯 Fonctionnalités clés

### ✅ Améliorations d'affichage
- Images optimisées avec `OptimizedImage`
- Gestion d'erreur automatique
- Placeholder pendant le chargement
- Responsive design parfait

### ✅ Configuration flexible
- Labels personnalisables
- Thème configurable
- Interface admin intuitive
- Sauvegarde automatique

### ✅ Performance
- Chargement optimisé
- Images compressées
- Code minifié
- Cache intelligent

## 🔧 Configuration actuelle

### Labels personnalisés :
- **"Catégories"** → **"Types de produits"**
- **"Farm"** → **"Boutique"**
- **"Toutes les catégories"** → **"Tous nos produits"**
- **"Produits de la ferme"** → **"Produits exclusifs"**

### Thème :
- **Couleur primaire** : `#22c55e` (vert vif)
- **Couleur secondaire** : `#16a34a` (vert foncé)
- **Couleur de texte** : `#ffffff` (blanc)
- **Couleur de fond** : `#f9fafb` (gris très clair)

## 📊 Déploiement

Le projet est configuré pour le déploiement sur Vercel :

```bash
# Build automatique
npm run build

# Déploiement
vercel --prod
```

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature
3. Commit les changements
4. Push vers la branche
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT.

---

**🎉 Projet optimisé et prêt pour la production !**# Force deployment
