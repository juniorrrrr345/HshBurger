# 🌿 Boutique CBD - E-commerce CBD Premium

Une boutique en ligne complète pour produits CBD avec panel d'administration intégré, développée avec Next.js, TypeScript et Tailwind CSS.

## ✨ Fonctionnalités

### 🛍️ Boutique
- **Page d'accueil** attractive avec produits populaires
- **Catalogue produits** avec filtres et recherche
- **Pages produits détaillées** avec galerie d'images
- **Système de variantes** et prix multiples
- **Pages personnalisées** (À propos, Mentions légales, etc.)
- **Formulaire de contact** fonctionnel
- **Design responsive** (mobile, tablette, desktop)

### 🎨 Personnalisation
- **Changement de couleurs** (primaire, secondaire, texte, fond)
- **Logo personnalisable**
- **Fond d'écran** (couleur ou image avec opacité)
- **Thème adaptatif** en temps réel

### 🔧 Panel d'administration
- **Tableau de bord** avec statistiques
- **Gestion des produits** (ajout, modification, suppression)
- **Gestion des prix multiples** par produit
- **Gestion des images** (upload direct)
- **Gestion des catégories**
- **Gestion des pages** personnalisées
- **Paramètres de la boutique**
- **Apparence personnalisable**
- **Sauvegarde automatique** des données

## 🚀 Technologies utilisées

- **Next.js 14** (React framework)
- **TypeScript** (typage statique)
- **Tailwind CSS** (styles)
- **Lucide React** (icônes)
- **LocalStorage** (stockage des données)
- **Vercel** (déploiement)

## 📦 Installation

### 1. Cloner le repository
```bash
git clone https://github.com/votre-username/boutique-cbd.git
cd boutique-cbd
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer en développement
```bash
npm run dev
```

L'application sera disponible sur `http://localhost:3000`

## 🌐 Déploiement sur Vercel

### Méthode 1 : Déploiement direct depuis GitHub

1. **Créer un repository GitHub**
   - Connectez-vous à GitHub
   - Créez un nouveau repository
   - Uploadez tous les fichiers du projet

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub
   - Cliquez sur "New Project"
   - Sélectionnez votre repository
   - Cliquez sur "Deploy"

### Méthode 2 : Déploiement via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Configuration Vercel

Aucune configuration spéciale n'est requise. Vercel détectera automatiquement qu'il s'agit d'un projet Next.js.

## 📱 Utilisation

### Accès à la boutique
- URL principale : `https://votre-site.vercel.app`
- Parcourez les produits, consultez les détails, utilisez les filtres

### Accès au panel d'administration
- URL admin : `https://votre-site.vercel.app/admin`
- Pas de mot de passe requis (ajoutez votre propre système d'authentification si nécessaire)

### Première utilisation
1. Allez dans **Admin > Paramètres** pour configurer votre boutique
2. Allez dans **Admin > Apparence** pour personnaliser les couleurs et le logo
3. Ajoutez vos **catégories** dans Admin > Catégories
4. Ajoutez vos **produits** dans Admin > Produits
5. Créez vos **pages** personnalisées dans Admin > Pages

## 🎯 Fonctionnalités détaillées

### Gestion des produits
- Nom, description, catégorie
- Images multiples (upload direct)
- Prix multiples avec variantes (ex: 10ml, 20ml, 30ml)
- Prix barrés (promotions)
- Gestion du stock
- Produits populaires

### Gestion des prix
- Plusieurs prix par produit
- Variantes (taille, concentration, etc.)
- Prix original et prix promotion
- Unités personnalisables

### Personnalisation avancée
- Couleurs : primaire, secondaire, texte, fond
- Logo de la boutique
- Fond d'écran avec image ou couleur
- Opacité du fond réglable
- Aperçu en temps réel

### Pages personnalisées
- Éditeur de contenu HTML
- Génération automatique d'URL
- Activation/désactivation des pages
- Aperçu du contenu

## 💾 Stockage des données

Les données sont stockées dans le **LocalStorage** du navigateur :
- Produits
- Catégories
- Pages
- Paramètres de la boutique

### Sauvegarde et restauration
- Export des données en JSON
- Réinitialisation complète
- Sauvegarde automatique

## 📱 Design responsive

La boutique s'adapte automatiquement à tous les écrans :
- **Mobile** : Navigation optimisée, sidebar pliable
- **Tablette** : Grille adaptative, touch-friendly
- **Desktop** : Interface complète, survol des éléments

## 🔒 Sécurité

⚠️ **Important** : Cette version utilise le stockage local sans authentification. Pour un usage en production, ajoutez :
- Système d'authentification pour l'admin
- Base de données sécurisée
- Validation côté serveur
- Protection CSRF

## 🎨 Personnalisation

### Couleurs par défaut
- Primaire : `#22c55e` (vert)
- Secondaire : `#16a34a` (vert foncé)
- Texte : `#1f2937` (gris foncé)
- Fond : `#ffffff` (blanc)

### Modifier les couleurs
1. Allez dans **Admin > Apparence**
2. Utilisez les sélecteurs de couleur
3. Prévisualisez en temps réel
4. Sauvegardez les modifications

## 📝 Structure du projet

```
boutique-cbd/
├── app/                    # Pages Next.js
│   ├── admin/             # Panel d'administration
│   ├── contact/           # Page de contact
│   ├── pages/             # Pages personnalisées
│   ├── produits/          # Catalogue et détails
│   └── globals.css        # Styles globaux
├── components/            # Composants React
│   ├── admin/            # Composants d'administration
│   ├── Layout.tsx        # Layout principal
│   └── ProductCard.tsx   # Carte produit
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires
├── types/                # Types TypeScript
└── public/               # Assets statiques
```

## 🛠️ Développement

### Commandes utiles
```bash
npm run dev      # Développement
npm run build    # Build production
npm run start    # Serveur production
npm run lint     # Vérification du code
```

### Ajouter des fonctionnalités
1. Modifiez les types dans `types/index.ts`
2. Ajoutez la logique dans `hooks/useShop.ts`
3. Créez/modifiez les composants
4. Testez dans le panel d'administration

## 🐛 Dépannage

### Problèmes courants
- **Données perdues** : Vérifiez que le LocalStorage est activé
- **Images qui ne s'affichent pas** : Vérifiez le format (JPG, PNG)
- **Build qui échoue** : Vérifiez les imports et la syntaxe TypeScript

### Support
- Vérifiez les logs dans la console du navigateur
- Consultez la documentation Next.js
- Vérifiez les erreurs dans Vercel Dashboard

## 📄 Licence

Ce projet est sous licence MIT. Vous pouvez l'utiliser librement pour vos projets commerciaux ou personnels.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- Signaler des bugs
- Proposer des améliorations
- Soumettre des pull requests

---

**Made with ❤️ for CBD enthusiasts**

Besoin d'aide ? Consultez la documentation ou ouvrez une issue sur GitHub.