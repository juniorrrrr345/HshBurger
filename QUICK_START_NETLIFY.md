# 🚀 Démarrage Rapide - Déploiement Netlify

## ⚡ Déploiement en 5 minutes

### 1. Préparer le projet

```bash
# Cloner le repository (si pas déjà fait)
git clone https://github.com/votre-username/boutique-cbd.git
cd boutique-cbd

# Installer les dépendances
npm install
```

### 2. Déploiement automatique

#### Option A : Interface Netlify (Recommandé)

1. Allez sur [netlify.com](https://netlify.com)
2. Cliquez sur **"New site from Git"**
3. Choisissez **GitHub**
4. Sélectionnez votre repository
5. Configurez :
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
6. Cliquez sur **"Deploy site"**

#### Option B : CLI Netlify

```bash
# Installer Netlify CLI
npm install -g netlify-cli

# Se connecter à Netlify
netlify login

# Déployer
netlify deploy --prod
```

#### Option C : Script automatisé

```bash
# Rendre le script exécutable
chmod +x scripts/deploy-netlify.sh

# Lancer le script
./scripts/deploy-netlify.sh
```

### 3. Vérifier le déploiement

Une fois déployé, vous aurez accès à :

- **Site principal** : `https://votre-site.netlify.app`
- **Panel admin** : `https://votre-site.netlify.app/admin`
- **API** : `https://votre-site.netlify.app/.netlify/functions/api/admin`

### 4. Test rapide

```bash
# Test de l'API
curl https://votre-site.netlify.app/.netlify/functions/api/admin

# Test du panel admin
curl https://votre-site.netlify.app/admin
```

## 🔧 Configuration avancée

### Variables d'environnement

Dans l'interface Netlify > Site settings > Environment variables :

```
NODE_ENV=production
API_URL=https://votre-site.netlify.app
```

### Domaine personnalisé

1. Allez dans **Site settings > Domain management**
2. Cliquez sur **"Add custom domain"**
3. Suivez les instructions

## 🧪 Test local

```bash
# Test local avec Netlify
netlify dev

# Ou avec le script
./scripts/deploy-netlify.sh
# Choisir option 4
```

## 📱 Utilisation de l'API

### Client API TypeScript

```typescript
import { AdminApiClient } from './app/lib/admin-api-client';

const adminApi = new AdminApiClient('https://votre-site.netlify.app');

// Récupérer les produits
const products = await adminApi.getProducts();

// Créer un produit
const newProduct = await adminApi.createProduct({
  name: 'Nouveau Produit',
  description: 'Description',
  image: 'url-image.jpg',
  category: 'Huiles',
  variants: [{ name: '10ml', price: 29.99, size: '10ml' }],
  orderLink: 'https://example.com/order',
  popular: true
});
```

### Exemple avec fetch

```javascript
// Récupérer tous les produits
const response = await fetch('https://votre-site.netlify.app/.netlify/functions/api/admin/products');
const data = await response.json();
console.log('Produits:', data.data);

// Créer un produit
const createResponse = await fetch('https://votre-site.netlify.app/.netlify/functions/api/admin/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'create',
    product: {
      name: 'Huile CBD 10%',
      description: 'Huile CBD de qualité premium',
      image: 'https://example.com/image.jpg',
      category: 'Huiles',
      variants: [{ name: '10ml', price: 29.99, size: '10ml' }],
      orderLink: 'https://example.com/order',
      popular: true
    }
  })
});
```

## 🔍 Dépannage rapide

### Problème : Build échoue
```bash
# Vérifier Node.js version
node --version  # Doit être 18+

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Problème : API ne répond pas
```bash
# Vérifier les fonctions Netlify
netlify functions:list

# Voir les logs
netlify logs --tail
```

### Problème : CORS
- Les headers CORS sont configurés dans les fonctions
- Vérifiez que l'origine est autorisée

## 📊 Monitoring

### Analytics Netlify
- Allez dans **Analytics** dans l'interface Netlify
- Consultez les métriques de performance

### Logs de fonction
- Allez dans **Functions** dans l'interface Netlify
- Surveillez les erreurs d'exécution

## 🔐 Sécurité (Production)

### Ajouter l'authentification

```javascript
// Dans chaque fonction Netlify
exports.handler = async (event, context) => {
  // Vérifier l'authentification
  const authHeader = event.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Authentification requise' })
    };
  }
  
  // ... reste du code
};
```

### Rate Limiting

Considérez l'ajout d'un rate limiting pour protéger l'API.

## 🎉 Félicitations !

Votre panel d'administration est maintenant déployé sur Netlify et accessible depuis n'importe où.

### Prochaines étapes

1. ✅ Configurez un domaine personnalisé
2. 🔐 Ajoutez l'authentification
3. 📊 Configurez les analytics
4. 🧪 Testez l'intégration avec d'autres projets
5. 📱 Optimisez pour mobile
6. 🔍 Configurez le monitoring

## 📞 Support

- **Documentation complète** : `DEPLOY_NETLIFY.md`
- **Script de déploiement** : `scripts/deploy-netlify.sh`
- **Client API** : `app/lib/admin-api-client.ts`
- **Exemples** : `examples/admin-client-example.ts`