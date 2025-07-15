# 🛠️ Panel Admin CBD - Application Externe

## 📋 Description

Panel d'administration externe pour la boutique CBD. Cette application séparée permet de gérer tout le contenu de la boutique sans les bugs du panel intégré.

## 🚀 Fonctionnalités

### ✅ **Fonctionnalités disponibles**
- **📊 Tableau de bord** : Vue d'ensemble avec statistiques
- **📦 Gestion des produits** : Ajout, modification, suppression
- **📸 Upload d'images** : Depuis la galerie du téléphone
- **🎥 Upload de vidéos** : Support vidéo depuis la galerie
- **🔄 Synchronisation** : Avec le site principal via API

### 🚧 **Fonctionnalités en développement**
- **🏷️ Gestion des catégories**
- **🏡 Gestion des fermes**
- **📱 Gestion des réseaux sociaux**
- **🏪 Configuration de la boutique**
- **📄 Gestion des pages**
- **📞 Configuration du contact**

## 🛠️ Installation

### 1. **Installation des dépendances**
```bash
cd admin-app
npm install
```

### 2. **Configuration de l'API**
Créez un fichier `.env.local` :
```env
NEXT_PUBLIC_API_URL=https://votre-site.vercel.app
```

### 3. **Lancement en développement**
```bash
npm run dev
```

### 4. **Build pour production**
```bash
npm run build
npm start
```

## 📱 Utilisation

### **Upload d'images/vidéos**
1. Cliquez sur les boutons "📸 Choisir une image" ou "🎥 Choisir une vidéo"
2. Sélectionnez depuis la galerie de votre téléphone
3. Les fichiers sont automatiquement uploadés et optimisés

### **Gestion des produits**
1. Allez dans l'onglet "📦 Produits"
2. Cliquez sur "+ Ajouter un produit"
3. Remplissez les informations et uploadez les médias
4. Sauvegardez avec le bouton "Sauvegarder"

### **Synchronisation**
- Le panel communique avec le site principal via API
- Les changements sont appliqués en temps réel
- Nettoyage automatique des fichiers inutilisés

## 🌐 Déploiement

### **Sur Vercel**
1. Connectez votre repository GitHub à Vercel
2. Configurez la variable d'environnement `NEXT_PUBLIC_API_URL`
3. Déployez automatiquement

### **Variables d'environnement**
```env
NEXT_PUBLIC_API_URL=https://votre-site.vercel.app
```

## 🔧 Configuration

### **URL de l'API**
Modifiez `app/lib/api.ts` pour pointer vers votre site principal :
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://votre-site.vercel.app';
```

## 📊 Structure

```
admin-app/
├── app/
│   ├── components/
│   │   └── FileUpload.tsx      # Composant d'upload
│   ├── lib/
│   │   ├── api.ts              # Fonctions API
│   │   └── types.ts            # Types TypeScript
│   ├── globals.css             # Styles globaux
│   ├── layout.tsx              # Layout principal
│   └── page.tsx                # Page principale
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎯 Avantages

- ✅ **Séparation claire** entre admin et site public
- ✅ **Interface moderne** et responsive
- ✅ **Upload optimisé** depuis mobile
- ✅ **Pas de bugs** du panel intégré
- ✅ **Performance améliorée**
- ✅ **Maintenance facilitée**

## 🔗 Liens utiles

- **Site principal** : [URL de votre boutique]
- **Panel admin** : [URL du panel admin]
- **Documentation API** : [Si disponible]

---

**Développé avec ❤️ pour la boutique CBD**