# Configuration Nhost - Guide Complet

## 🚀 **Démarrage avec Nhost**

### 1. **Installation et initialisation**
```bash
# Installer Nhost CLI
npm install -g nhost

# Initialiser le projet
nhost init

# Démarrer les services
nhost dev
```

### 2. **Configuration de l'environnement**
Créer/modifier `.env.local` :
```bash
# Nhost Configuration
NEXT_PUBLIC_NHOST_URL=http://localhost:1337
NEXT_PUBLIC_NHOST_GRAPHQL_URL=http://localhost:8080/v1/graphql
NEXT_PUBLIC_NHOST_HASURA_URL=http://localhost:8080
HASURA_ADMIN_SECRET=nhost-admin-secret
```

### 3. **Créer la table de configuration**
Dans Hasura Console (http://localhost:8080), exécuter :

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

### 4. **Configurer les permissions Hasura**
Dans Hasura Console > Data > site_config > Permissions :

**Pour `anon` :**
- ✅ Select
- ✅ Insert  
- ✅ Update
- ❌ Delete

**Pour `authenticated` :**
- ✅ Select
- ✅ Insert
- ✅ Update
- ❌ Delete

### 5. **Sauvegarder la configuration**
```bash
nhost db save
nhost metadata export
```

## 🔧 **API Routes**

L'application utilise maintenant :
- `/api/config-nhost` - Pour la gestion de configuration avec Nhost/Hasura

## 🧪 **Test de la configuration**

1. **Démarrer Nhost :**
   ```bash
   nhost dev
   ```

2. **Démarrer l'application :**
   ```bash
   npm run dev
   ```

3. **Tester le panel admin :**
   - Aller sur `http://localhost:3000/admin`
   - Modifier quelques paramètres
   - Vérifier que la sauvegarde fonctionne

## 📊 **Vérification dans Hasura**

Dans Hasura Console :
1. Aller dans **Data > site_config**
2. Vérifier qu'il y a une ligne avec `id: 1`
3. Vérifier que la colonne `config` contient les données

## 🚀 **Déploiement**

Pour le déploiement, mettre à jour les variables d'environnement avec les URLs de production de Nhost.

---

**Votre application utilise maintenant Nhost au lieu de Supabase !** 🎉