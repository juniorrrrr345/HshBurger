# Configuration du Déploiement Automatique sur Vercel

## Étapes pour configurer le déploiement automatique

### 1. Connexion à Vercel
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez-vous avec votre compte GitHub
3. Cliquez sur "New Project"

### 2. Import du projet
1. Sélectionnez votre repository GitHub
2. Vercel détectera automatiquement que c'est un projet Next.js
3. Cliquez sur "Deploy"

### 3. Configuration des variables d'environnement (optionnel)
Si vous avez des variables d'environnement, ajoutez-les dans les paramètres du projet Vercel.

### 4. Configuration du déploiement automatique
Le déploiement automatique est déjà configuré via :
- Le fichier `vercel.json` qui configure le projet
- Le workflow GitHub Actions `.github/workflows/deploy.yml`

### 5. Récupération des tokens pour GitHub Actions (optionnel)
Si vous voulez utiliser le workflow GitHub Actions :

1. Dans votre projet Vercel, allez dans Settings > General
2. Copiez les informations suivantes :
   - Vercel Token (depuis Account Settings > Tokens)
   - Project ID
   - Org ID

3. Dans votre repository GitHub :
   - Allez dans Settings > Secrets and variables > Actions
   - Ajoutez les secrets suivants :
     - `VERCEL_TOKEN`
     - `VERCEL_ORG_ID`
     - `VERCEL_PROJECT_ID`

### 6. Déploiement automatique
Maintenant, chaque fois que vous poussez du code sur la branche `main` ou `master`, le site sera automatiquement déployé sur Vercel.

## Avantages du déploiement automatique

✅ **Déploiement instantané** : Chaque modification est déployée automatiquement
✅ **Pas de configuration manuelle** : Tout est automatisé
✅ **Rollback facile** : Vous pouvez revenir à une version précédente
✅ **Prévisualisation** : Chaque pull request génère une URL de prévisualisation
✅ **Performance optimisée** : Vercel optimise automatiquement les performances

## URLs générées

- **Production** : `https://votre-projet.vercel.app`
- **Prévisualisation** : `https://votre-projet-git-branch.vercel.app`

## Commandes utiles

```bash
# Déploiement manuel (si nécessaire)
vercel --prod

# Déploiement en mode développement
vercel

# Voir les logs de déploiement
vercel logs
```

## Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans Vercel Dashboard
2. Assurez-vous que toutes les dépendances sont installées
3. Vérifiez que le build fonctionne localement avec `npm run build`