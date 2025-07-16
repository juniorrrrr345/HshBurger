# API Panel Administration - Boutique CBD

Cette API permet de gérer le panel d'administration de la boutique CBD depuis un projet externe. Elle fournit tous les endpoints nécessaires pour gérer les produits, catégories, fermes, réseaux sociaux, pages et paramètres du site.

## 🚀 Fonctionnalités

- **Gestion complète des produits** (CRUD)
- **Gestion des catégories** avec validation des dépendances
- **Gestion des fermes** avec validation des dépendances
- **Gestion des réseaux sociaux**
- **Gestion des pages** avec protection des pages par défaut
- **Gestion des paramètres du site** (boutique, contact, contenu des pages)
- **Client API TypeScript** prêt à l'emploi
- **Documentation complète** avec exemples

## 📁 Structure de l'API

```
app/api/admin/
├── route.ts                    # Endpoint principal
├── products/route.ts          # Gestion des produits
├── categories/route.ts        # Gestion des catégories
├── farms/route.ts            # Gestion des fermes
├── social-media/route.ts     # Gestion des réseaux sociaux
├── pages/route.ts            # Gestion des pages
└── settings/route.ts         # Gestion des paramètres
```

## 🔧 Installation et Configuration

### 1. Déploiement de l'API

L'API est déjà intégrée dans le projet Next.js. Pour la déployer :

```bash
# Déployer sur Vercel
vercel --prod

# Ou sur votre propre serveur
npm run build
npm start
```

### 2. Configuration CORS (si nécessaire)

Si vous utilisez l'API depuis un autre domaine, ajoutez la configuration CORS dans `next.config.js` :

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/api/admin/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};
```

## 📖 Utilisation

### Client API TypeScript

Le client API est disponible dans `app/lib/admin-api-client.ts`. Il fournit une interface TypeScript complète pour toutes les opérations.

```typescript
import { AdminApiClient } from './app/lib/admin-api-client';

const adminApi = new AdminApiClient('https://votre-domaine.com');

// Récupérer tous les produits
const products = await adminApi.getProducts();
if (products.success) {
  console.log('Produits:', products.data);
}

// Créer un nouveau produit
const newProduct = await adminApi.createProduct({
  name: 'Huile CBD 10%',
  description: 'Huile CBD de qualité premium',
  image: 'url-image.jpg',
  category: 'Huiles',
  variants: [{ name: '10ml', price: 29.99, size: '10ml' }],
  orderLink: 'https://example.com/order',
  popular: true
});
```

### Exemple d'intégration dans un autre projet

```typescript
// Dans votre projet externe
import { AdminPanelManager } from './admin-client-example';

const adminManager = new AdminPanelManager('https://votre-domaine.com');

// Synchroniser toutes les données
const allData = await adminManager.syncAllData();
console.log('Données synchronisées:', allData);

// Créer un nouveau produit
const newProduct = await adminManager.createNewProduct({
  name: 'Nouveau Produit',
  description: 'Description du produit',
  image: 'https://example.com/image.jpg',
  category: 'Huiles',
  price: 29.99,
  orderLink: 'https://example.com/order'
});
```

## 🔐 Sécurité

⚠️ **Important :** Cette API n'inclut pas d'authentification par défaut. Avant de déployer en production, il est fortement recommandé d'ajouter :

1. **Authentification JWT**
2. **API Keys**
3. **Rate Limiting**
4. **Validation des données**

### Exemple d'ajout d'authentification

```typescript
// Dans chaque endpoint API
export async function POST(request: NextRequest) {
  // Vérifier l'authentification
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { success: false, error: 'Authentification requise' },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7);
  // Vérifier le token JWT ici
  
  // ... reste du code
}
```

## 📊 Endpoints Disponibles

### Configuration Générale
- `GET /api/admin` - Récupérer toute la configuration
- `POST /api/admin` - Sauvegarder la configuration

### Produits
- `GET /api/admin/products` - Récupérer tous les produits
- `POST /api/admin/products` - Créer/Modifier/Supprimer des produits

### Catégories
- `GET /api/admin/categories` - Récupérer toutes les catégories
- `POST /api/admin/categories` - Créer/Modifier/Supprimer des catégories

### Fermes
- `GET /api/admin/farms` - Récupérer toutes les fermes
- `POST /api/admin/farms` - Créer/Modifier/Supprimer des fermes

### Réseaux Sociaux
- `GET /api/admin/social-media` - Récupérer tous les réseaux sociaux
- `POST /api/admin/social-media` - Créer/Modifier/Supprimer des réseaux sociaux

### Pages
- `GET /api/admin/pages` - Récupérer toutes les pages
- `POST /api/admin/pages` - Créer/Modifier/Supprimer des pages

### Paramètres
- `GET /api/admin/settings` - Récupérer tous les paramètres
- `POST /api/admin/settings` - Mettre à jour les paramètres

## 🛠️ Développement

### Structure des données

Toutes les interfaces TypeScript sont définies dans `app/lib/admin-api-client.ts` :

- `Product` - Produits avec variantes et prix
- `Category` - Catégories avec emoji et description
- `Farm` - Fermes avec emoji et description
- `SocialMediaLink` - Réseaux sociaux avec couleur
- `Page` - Pages avec protection des pages par défaut
- `ShopInfo` - Informations de la boutique
- `ContactInfo` - Informations de contact
- `AdminSettings` - Paramètres d'administration
- `PageContent` - Contenu des pages

### Validation des données

L'API inclut des validations pour :

- Empêcher la suppression de catégories/fermes utilisées par des produits
- Empêcher la suppression de pages par défaut
- Validation des données requises
- Gestion des erreurs avec codes de statut appropriés

### Gestion des erreurs

Tous les endpoints retournent des réponses standardisées :

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
```

## 📝 Exemples d'utilisation

### Créer un produit avec variantes

```typescript
const product = await adminApi.createProduct({
  name: 'Huile CBD 10%',
  description: 'Huile CBD de qualité premium',
  image: 'https://example.com/huile-cbd.jpg',
  images: [
    'https://example.com/huile-cbd-1.jpg',
    'https://example.com/huile-cbd-2.jpg'
  ],
  video: 'https://example.com/huile-cbd-video.mp4',
  category: 'Huiles',
  variants: [
    { name: '10ml', price: 29.99, size: '10ml' },
    { name: '30ml', price: 79.99, size: '30ml' }
  ],
  orderLink: 'https://example.com/order/huile-cbd',
  popular: true,
  farm: 'Mountain'
});
```

### Mettre à jour les paramètres de la boutique

```typescript
await adminApi.updateShopInfo({
  name: 'CBD Shop Premium',
  description: 'Votre boutique CBD de confiance',
  primaryColor: '#4CAF50',
  secondaryColor: '#2196F3'
});
```

### Synchroniser toutes les données

```typescript
const adminManager = new AdminPanelManager('https://votre-domaine.com');
const allData = await adminManager.syncAllData();

console.log('Produits:', allData.products.length);
console.log('Catégories:', allData.categories.length);
console.log('Fermes:', allData.farms.length);
console.log('Réseaux sociaux:', allData.socialMedia.length);
```

## 🚀 Déploiement

### Vercel (Recommandé)

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel --prod
```

### Autres plateformes

L'API fonctionne sur toute plateforme supportant Next.js :
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- etc.

## 📞 Support

Pour toute question ou problème avec l'API :

1. Consultez la documentation complète dans `API_ADMIN_DOCUMENTATION.md`
2. Vérifiez les exemples dans `examples/admin-client-example.ts`
3. Consultez les interfaces TypeScript dans `app/lib/admin-api-client.ts`

## 🔄 Mises à jour

Pour mettre à jour l'API :

1. Modifiez les endpoints dans `app/api/admin/`
2. Mettez à jour les interfaces TypeScript si nécessaire
3. Testez avec les exemples fournis
4. Déployez sur votre plateforme

## 📄 Licence

Cette API fait partie du projet boutique CBD et suit les mêmes conditions d'utilisation.