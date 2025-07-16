# 🚀 Déploiement du Panel d'Administration sur Netlify

Ce guide vous explique comment déployer le panel d'administration de la boutique CBD sur Netlify.

## 📋 Prérequis

- Un compte GitHub avec le code source
- Un compte Netlify (gratuit)
- Node.js 18+ installé localement (pour les tests)

## 🔧 Configuration du Projet

### 1. Structure des fichiers

Le projet est configuré pour fonctionner avec Netlify :

```
├── netlify.toml              # Configuration Netlify
├── next.config.js            # Configuration Next.js
├── netlify/functions/        # Fonctions serverless
│   └── api/
│       ├── admin.js         # API principale
│       └── admin/
│           └── products.js  # API produits
└── app/                     # Code source Next.js
```

### 2. Configuration Netlify

Le fichier `netlify.toml` configure :
- La commande de build
- Le dossier de publication
- Les redirections pour l'API
- Les fonctions serverless

## 🚀 Déploiement

### Méthode 1 : Déploiement via l'interface Netlify

1. **Connectez votre repository GitHub**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Choisissez GitHub
   - Sélectionnez votre repository

2. **Configurez les paramètres de build**
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Déployez**
   - Cliquez sur "Deploy site"
   - Attendez que le build se termine
   - Votre site sera disponible à l'URL fournie

### Méthode 2 : Déploiement via CLI Netlify

1. **Installez Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Connectez-vous à Netlify**
   ```bash
   netlify login
   ```

3. **Initialisez le projet**
   ```bash
   netlify init
   ```

4. **Déployez**
   ```bash
   netlify deploy --prod
   ```

### Méthode 3 : Déploiement automatique

1. **Poussez votre code sur GitHub**
   ```bash
   git add .
   git commit -m "Configuration Netlify"
   git push origin main
   ```

2. **Connectez le repository à Netlify**
   - L'interface détectera automatiquement les paramètres
   - Le déploiement se fera automatiquement à chaque push

## 🔧 Configuration Avancée

### Variables d'environnement

Si nécessaire, ajoutez des variables d'environnement dans Netlify :

1. Allez dans **Site settings > Environment variables**
2. Ajoutez vos variables :
   ```
   NODE_ENV=production
   API_URL=https://votre-api.com
   ```

### Domaines personnalisés

1. Allez dans **Site settings > Domain management**
2. Cliquez sur "Add custom domain"
3. Suivez les instructions pour configurer votre domaine

### SSL/HTTPS

Netlify fournit automatiquement un certificat SSL gratuit pour tous les sites.

## 🧪 Test du Déploiement

### 1. Test de l'interface

1. Visitez votre URL Netlify
2. Naviguez vers `/admin`
3. Vérifiez que le panel d'administration fonctionne

### 2. Test de l'API

Testez les endpoints API :

```bash
# Test de l'API principale
curl https://votre-site.netlify.app/.netlify/functions/api/admin

# Test de l'API produits
curl https://votre-site.netlify.app/.netlify/functions/api/admin/products
```

### 3. Test avec le client API

```javascript
// Mettez à jour l'URL dans votre client API
const adminApi = new AdminApiClient('https://votre-site.netlify.app');

// Test de récupération des produits
const products = await adminApi.getProducts();
console.log('Produits:', products);
```

## 🔍 Dépannage

### Problèmes courants

1. **Erreur de build**
   - Vérifiez que Node.js 18+ est utilisé
   - Consultez les logs de build dans Netlify

2. **API ne fonctionne pas**
   - Vérifiez que les fonctions serverless sont déployées
   - Testez les endpoints directement

3. **Erreurs CORS**
   - Les headers CORS sont configurés dans les fonctions
   - Vérifiez que l'origine est autorisée

### Logs de debug

1. **Logs de build** : Dans l'interface Netlify > Deploys
2. **Logs de fonction** : Dans l'interface Netlify > Functions
3. **Logs en temps réel** : `netlify logs --tail`

## 🔄 Mises à jour

### Déploiement automatique

Chaque push sur la branche principale déclenche un nouveau déploiement.

### Déploiement manuel

```bash
# Déployer depuis la CLI
netlify deploy --prod

# Ou depuis l'interface Netlify
# Allez dans Deploys > Trigger deploy
```

## 📊 Monitoring

### Analytics Netlify

1. Allez dans **Analytics**
2. Consultez les métriques :
   - Visiteurs
   - Pages vues
   - Temps de chargement
   - Erreurs

### Logs de fonction

1. Allez dans **Functions**
2. Consultez les logs d'exécution
3. Surveillez les erreurs

## 🔐 Sécurité

### Authentification (Recommandé)

Ajoutez une authentification avant le déploiement en production :

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

## 📱 Optimisations

### Performance

1. **Images optimisées** : Utilisez des formats modernes (WebP)
2. **Lazy loading** : Chargez les images à la demande
3. **Caching** : Configurez les headers de cache

### SEO

1. **Meta tags** : Ajoutez des meta tags appropriés
2. **Sitemap** : Générez un sitemap automatique
3. **Robots.txt** : Configurez le fichier robots.txt

## 🆘 Support

### Ressources utiles

- [Documentation Netlify](https://docs.netlify.com/)
- [Documentation Next.js](https://nextjs.org/docs)
- [Guide des fonctions serverless](https://docs.netlify.com/functions/overview/)

### En cas de problème

1. Consultez les logs de build et de fonction
2. Testez localement avec `netlify dev`
3. Vérifiez la configuration dans `netlify.toml`
4. Contactez le support Netlify si nécessaire

## 🎉 Félicitations !

Votre panel d'administration est maintenant déployé sur Netlify et accessible depuis n'importe où. L'API est prête à être utilisée par d'autres projets.

### Prochaines étapes

1. Configurez un domaine personnalisé
2. Ajoutez l'authentification
3. Configurez les analytics
4. Testez l'intégration avec d'autres projets