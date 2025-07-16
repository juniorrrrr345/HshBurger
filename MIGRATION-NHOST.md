# 🚀 Migration vers Nhost - Guide Complet

## 📋 **Résumé des Changements**

Votre application a été migrée de **Supabase** vers **Nhost** pour une meilleure gestion de la base de données et des API GraphQL.

### 🔄 **Changements Effectués**

1. **Nouvelle API Route** : `/api/config-nhost` remplace `/api/config-supabase`
2. **Configuration mise à jour** : Variables d'environnement pour Nhost
3. **Panneau d'administration complet** : Toutes les fonctionnalités restaurées
4. **Sauvegarde automatique** : Plus de bouton manuel, sauvegarde en temps réel

---

## 🛠️ **Configuration Nhost**

### 1. **Installation et Démarrage**

```bash
# Installer Nhost CLI (si pas déjà fait)
npm install -g nhost

# Démarrer les services Nhost
nhost dev
```

### 2. **Variables d'Environnement**

Mettez à jour votre `.env.local` :

```bash
# Nhost Configuration
NEXT_PUBLIC_NHOST_URL=http://localhost:1337
NEXT_PUBLIC_NHOST_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_NHOST_HASURA_URL=http://localhost:8080
HASURA_ADMIN_SECRET=nhost-admin-secret
```

### 3. **Création de la Table**

Dans Hasura Console (http://localhost:8080), exécutez :

```sql
-- Créer la table site_config
CREATE TABLE site_config (
  id INTEGER PRIMARY KEY,
  config JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donner les permissions
GRANT ALL ON site_config TO anon;
GRANT ALL ON site_config TO authenticated;

-- Insérer une configuration par défaut
INSERT INTO site_config (id, config) VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;
```

### 4. **Permissions Hasura**

Dans Hasura Console > Data > site_config > Permissions :

**Pour `anon` et `authenticated` :**
- ✅ Select
- ✅ Insert  
- ✅ Update
- ❌ Delete

---

## 🧪 **Tests de Configuration**

### Test Automatique

```bash
# Installer node-fetch si nécessaire
npm install node-fetch

# Lancer les tests
node test-nhost.js
```

### Test Manuel

1. **Démarrer les services :**
   ```bash
   nhost dev
   npm run dev
   ```

2. **Tester le panel admin :**
   - Aller sur `http://localhost:3000/admin`
   - Modifier quelques paramètres
   - Vérifier la sauvegarde automatique

3. **Vérifier dans Hasura :**
   - Aller sur `http://localhost:8080`
   - Data > site_config
   - Vérifier les données

---

## 🔧 **Nouvelles Fonctionnalités**

### ✅ **Panneau d'Administration Complet**

- **Gestion des Produits** : Ajout, modification, suppression
- **Gestion des Catégories** : Configuration dynamique
- **Gestion des Fermes** : Organisation par fermes
- **Réseaux Sociaux** : Liens et couleurs personnalisables
- **Paramètres Admin** : Personnalisation des onglets
- **Configuration Boutique** : Couleurs, logo, description
- **Pages** : Contenu éditable pour chaque page
- **Contact** : Informations de contact

### ✅ **Sauvegarde Automatique**

- Plus de bouton "Sauvegarder"
- Sauvegarde en temps réel après chaque modification
- Indicateur visuel de sauvegarde
- Gestion d'erreurs améliorée

### ✅ **Synchronisation Frontend**

- Toutes les pages utilisent `getConfigAsync()`
- Chargement asynchrone avec états de chargement
- Synchronisation automatique avec l'admin

---

## 🚨 **Dépannage**

### Problème : "Erreur lors de la sauvegarde"

**Solutions :**
1. Vérifier que Nhost est démarré : `nhost dev`
2. Vérifier la table `site_config` dans Hasura
3. Vérifier les permissions de la table
4. Vérifier les variables d'environnement

### Problème : "Build errors"

**Solutions :**
1. Nettoyer le cache : `rm -rf .next`
2. Réinstaller les dépendances : `npm install`
3. Redémarrer le serveur : `npm run dev`

### Problème : "Connexion GraphQL échouée"

**Solutions :**
1. Vérifier que Hasura est accessible : `http://localhost:8080`
2. Vérifier `HASURA_ADMIN_SECRET` dans `.env.local`
3. Redémarrer Nhost : `nhost dev`

---

## 📊 **Structure de Données**

### Table `site_config`

```sql
CREATE TABLE site_config (
  id INTEGER PRIMARY KEY,           -- Toujours 1
  config JSONB NOT NULL,           -- Configuration complète
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Structure JSON

```json
{
  "shopInfo": {
    "name": "Nom de la boutique",
    "logo": "🌿",
    "description": "Description",
    "primaryColor": "#16a34a",
    "secondaryColor": "#15803d",
    "textColor": "#1f2937",
    "backgroundColor": "#ffffff"
  },
  "products": [...],
  "categories": [...],
  "farms": [...],
  "socialMediaLinks": [...],
  "adminSettings": {...},
  "contactInfo": {...},
  "pageContent": {...}
}
```

---

## 🎯 **Prochaines Étapes**

1. **Tester toutes les fonctionnalités** du panel admin
2. **Configurer votre boutique** avec vos données réelles
3. **Personnaliser les couleurs** et le contenu
4. **Ajouter vos produits** et catégories
5. **Configurer les réseaux sociaux**

---

## 📞 **Support**

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** dans la console du navigateur
2. **Consultez les logs Nhost** : `nhost logs`
3. **Testez la connexion** : `node test-nhost.js`
4. **Vérifiez Hasura Console** : `http://localhost:8080`

---

**🎉 Votre application utilise maintenant Nhost avec toutes les fonctionnalités !**