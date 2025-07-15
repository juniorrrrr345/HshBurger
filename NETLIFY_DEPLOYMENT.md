# Déploiement sur Netlify

Ce guide explique comment déployer votre panel admin sur Netlify.

## Prérequis

- Un compte Netlify
- Votre code source sur GitHub, GitLab ou Bitbucket

## Configuration

Le projet est déjà configuré pour le déploiement sur Netlify avec :

- `next.config.js` configuré pour l'export statique
- `netlify.toml` avec la configuration de build
- Scripts de build appropriés

## Étapes de déploiement

### Option 1 : Déploiement via l'interface Netlify

1. **Connectez votre repository**
   - Allez sur [netlify.com](https://netlify.com)
   - Cliquez sur "New site from Git"
   - Choisissez votre provider (GitHub, GitLab, Bitbucket)
   - Sélectionnez votre repository

2. **Configuration du build**
   - **Build command**: `npm run build`
   - **Publish directory**: `out`
   - **Node version**: `18` (configuré automatiquement)

3. **Variables d'environnement (optionnel)**
   - Si vous avez des variables d'environnement, ajoutez-les dans Settings > Environment variables

4. **Déployer**
   - Cliquez sur "Deploy site"
   - Netlify va automatiquement construire et déployer votre site

### Option 2 : Déploiement manuel

1. **Build local**
   ```bash
   npm install
   npm run build
   ```

2. **Déployer le dossier `out`**
   - Allez dans Settings > Build & deploy > Deploy contexts
   - Uploadez le contenu du dossier `out`

## Configuration automatique

Le fichier `netlify.toml` configure automatiquement :

- **Build command**: `npm run build`
- **Publish directory**: `out`
- **Node version**: `18`
- **Redirects**: Configuration SPA pour le routing Next.js
- **Headers de sécurité**: Protection XSS, frame options, etc.

## Fonctionnalités

✅ **Export statique** - Compatible avec Netlify  
✅ **Routing SPA** - Redirections configurées  
✅ **Headers de sécurité** - Protection configurée  
✅ **Build automatique** - Déploiement à chaque push  
✅ **Configuration d'initialisation** - Script `init-config.js`  

## Dépannage

### Erreur de build
- Vérifiez que Node.js 18+ est utilisé
- Assurez-vous que toutes les dépendances sont installées

### Problèmes de routing
- Les redirections sont configurées dans `netlify.toml`
- Vérifiez que `output: 'export'` est dans `next.config.js`

### Images non optimisées
- Les images sont configurées comme `unoptimized: true` pour l'export statique
- Utilisez des images optimisées ou des CDN

## Support

Pour toute question sur le déploiement, consultez :
- [Documentation Netlify](https://docs.netlify.com/)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)