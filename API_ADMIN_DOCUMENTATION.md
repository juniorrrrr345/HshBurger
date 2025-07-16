# API Panel Administration - Documentation

Cette API permet de gérer le panel d'administration de la boutique CBD depuis un projet externe.

## Base URL

```
https://votre-domaine.com/api/admin
```

## Endpoints

### 1. Configuration Générale

#### GET `/api/admin`
Récupère toute la configuration du site.

**Réponse :**
```json
{
  "success": true,
  "data": {
    "shopInfo": { ... },
    "contactInfo": { ... },
    "socialMediaLinks": [ ... ],
    "categories": [ ... ],
    "farms": [ ... ],
    "products": [ ... ],
    "pages": [ ... ],
    "adminSettings": { ... },
    "pageContent": { ... }
  }
}
```

#### POST `/api/admin`
Sauvegarde la configuration complète.

**Body :**
```json
{
  "action": "saveConfig",
  "data": { /* Configuration complète */ }
}
```

### 2. Gestion des Produits

#### GET `/api/admin/products`
Récupère tous les produits.

#### POST `/api/admin/products`
Gère les produits (créer, modifier, supprimer).

**Actions disponibles :**

**Créer un produit :**
```json
{
  "action": "create",
  "product": {
    "name": "Huile CBD 10%",
    "description": "Huile CBD de qualité premium",
    "image": "url-image.jpg",
    "images": ["url1.jpg", "url2.jpg"],
    "video": "url-video.mp4",
    "category": "Huiles",
    "variants": [
      {
        "name": "10ml",
        "price": 29.99,
        "size": "10ml"
      }
    ],
    "orderLink": "https://example.com/order",
    "popular": true,
    "farm": "Mountain"
  }
}
```

**Modifier un produit :**
```json
{
  "action": "update",
  "product": {
    "id": 1,
    "name": "Huile CBD 10%",
    "description": "Description mise à jour",
    // ... autres propriétés
  }
}
```

**Supprimer un produit :**
```json
{
  "action": "delete",
  "product": {
    "id": 1
  }
}
```

### 3. Gestion des Catégories

#### GET `/api/admin/categories`
Récupère toutes les catégories.

#### POST `/api/admin/categories`
Gère les catégories (créer, modifier, supprimer).

**Créer une catégorie :**
```json
{
  "action": "create",
  "category": {
    "name": "Nouvelle Catégorie",
    "emoji": "🌟",
    "description": "Description de la catégorie"
  }
}
```

**Modifier une catégorie :**
```json
{
  "action": "update",
  "category": {
    "id": 1,
    "name": "Catégorie Modifiée",
    "emoji": "🌟",
    "description": "Description mise à jour"
  }
}
```

**Supprimer une catégorie :**
```json
{
  "action": "delete",
  "category": {
    "id": 1
  }
}
```

### 4. Gestion des Fermes

#### GET `/api/admin/farms`
Récupère toutes les fermes.

#### POST `/api/admin/farms`
Gère les fermes (créer, modifier, supprimer).

**Créer une ferme :**
```json
{
  "action": "create",
  "farm": {
    "name": "Nouvelle Ferme",
    "emoji": "🏡",
    "description": "Description de la ferme"
  }
}
```

### 5. Gestion des Réseaux Sociaux

#### GET `/api/admin/social-media`
Récupère tous les réseaux sociaux.

#### POST `/api/admin/social-media`
Gère les réseaux sociaux (créer, modifier, supprimer).

**Créer un réseau social :**
```json
{
  "action": "create",
  "socialMedia": {
    "name": "TikTok",
    "emoji": "🎵",
    "url": "https://tiktok.com/@cbdshop",
    "color": "#000000"
  }
}
```

### 6. Gestion des Pages

#### GET `/api/admin/pages`
Récupère toutes les pages.

#### POST `/api/admin/pages`
Gère les pages (créer, modifier, supprimer).

**Créer une page :**
```json
{
  "action": "create",
  "page": {
    "name": "À propos",
    "href": "/a-propos",
    "isDefault": false
  }
}
```

### 7. Gestion des Paramètres

#### GET `/api/admin/settings`
Récupère tous les paramètres (shopInfo, contactInfo, adminSettings, pageContent).

#### POST `/api/admin/settings`
Met à jour les paramètres.

**Mettre à jour les informations de la boutique :**
```json
{
  "action": "updateShopInfo",
  "data": {
    "name": "Nouveau Nom",
    "description": "Nouvelle description",
    "primaryColor": "#ff0000"
  }
}
```

**Mettre à jour les informations de contact :**
```json
{
  "action": "updateContactInfo",
  "data": {
    "email": "nouveau@email.com",
    "phone": "+33 1 23 45 67 89"
  }
}
```

**Mettre à jour les paramètres admin :**
```json
{
  "action": "updateAdminSettings",
  "data": {
    "categoriesTabName": "Catégories",
    "farmsTabName": "Fermes"
  }
}
```

**Mettre à jour le contenu d'une page :**
```json
{
  "action": "updatePageContent",
  "section": "homepage",
  "data": {
    "heroTitle": "Nouveau titre",
    "heroSubtitle": "Nouveau sous-titre"
  }
}
```

## Codes de Réponse

- `200` : Succès
- `400` : Erreur de requête (données invalides, action non reconnue)
- `404` : Ressource non trouvée
- `500` : Erreur serveur

## Exemple d'Utilisation (JavaScript)

```javascript
// Récupérer tous les produits
const response = await fetch('https://votre-domaine.com/api/admin/products');
const data = await response.json();

if (data.success) {
  console.log('Produits:', data.data);
} else {
  console.error('Erreur:', data.error);
}

// Créer un nouveau produit
const newProduct = {
  action: 'create',
  product: {
    name: 'Nouveau Produit',
    description: 'Description du produit',
    image: 'url-image.jpg',
    category: 'Huiles',
    variants: [{ name: '10ml', price: 29.99, size: '10ml' }],
    orderLink: 'https://example.com/order',
    popular: false
  }
};

const createResponse = await fetch('https://votre-domaine.com/api/admin/products', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newProduct)
});

const createData = await createResponse.json();
if (createData.success) {
  console.log('Produit créé:', createData.data);
} else {
  console.error('Erreur:', createData.error);
}
```

## Sécurité

⚠️ **Important :** Cette API n'inclut pas d'authentification. Il est fortement recommandé d'ajouter un système d'authentification (JWT, API keys, etc.) avant de déployer en production.

## Structure des Données

### Produit
```typescript
interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  video?: string;
  category: string;
  variants: {
    name: string;
    price: number;
    size: string;
  }[];
  orderLink: string;
  popular: boolean;
  farm?: string;
}
```

### Catégorie
```typescript
interface Category {
  id: number;
  name: string;
  emoji: string;
  description: string;
}
```

### Ferme
```typescript
interface Farm {
  id: number;
  name: string;
  emoji: string;
  description: string;
}
```

### Réseau Social
```typescript
interface SocialMediaLink {
  id: number;
  name: string;
  emoji: string;
  url: string;
  color: string;
}
```

### Page
```typescript
interface Page {
  id: number;
  name: string;
  href: string;
  isDefault: boolean;
}
```