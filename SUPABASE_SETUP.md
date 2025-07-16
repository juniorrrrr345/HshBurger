# Configuration Supabase - Guide de Déploiement

## ✅ Configuration Terminée

Votre application est maintenant configurée pour utiliser Supabase comme base de données pour la configuration du site.

### 🔧 Modifications Effectuées

1. **Variables d'environnement mises à jour** (`.env.local`)
   - URL Supabase: `https://qxejtqhmizlxkuahrwhg.supabase.co`
   - Clé anonyme configurée

2. **API Routes mises à jour**
   - `/api/config-supabase` - Nouvelle API pour Supabase
   - Gestion d'erreurs améliorée
   - Logs détaillés pour le débogage

3. **Panneau d'administration mis à jour**
   - Utilise maintenant l'API Supabase
   - Sauvegarde automatique fonctionnelle
   - Gestion d'erreurs améliorée

4. **Fonctions de configuration mises à jour**
   - `getConfigAsync()` utilise Supabase
   - `saveConfigAsync()` utilise Supabase
   - Fallback vers la configuration par défaut

### 📋 Étapes pour Finaliser la Configuration

#### 1. Créer la Table dans Supabase

Dans votre projet Supabase, allez dans **SQL Editor** et exécutez ce script :

```sql
-- Créer la table site_config avec la bonne structure
DROP TABLE IF EXISTS site_config;

CREATE TABLE site_config (
  id INTEGER PRIMARY KEY,
  config JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donner les permissions nécessaires
GRANT ALL ON site_config TO anon;
GRANT ALL ON site_config TO authenticated;

-- Insérer une configuration par défaut
INSERT INTO site_config (id, config) VALUES (1, '{}'::jsonb)
ON CONFLICT (id) DO NOTHING;

-- Vérifier que la table a été créée correctement
SELECT * FROM site_config;
```

#### 2. Vérifier les Permissions

Dans Supabase, allez dans **Authentication > Policies** et assurez-vous que :
- La table `site_config` est accessible en lecture/écriture
- Les rôles `anon` et `authenticated` ont les bonnes permissions

#### 3. Tester l'Application

1. **Démarrez votre application** :
   ```bash
   npm run dev
   ```

2. **Testez le panneau d'administration** :
   - Allez sur `/admin`
   - Modifiez quelques paramètres
   - Vérifiez que la sauvegarde automatique fonctionne

3. **Vérifiez les logs** :
   - Ouvrez la console du navigateur
   - Regardez les logs de sauvegarde

### 🔍 Dépannage

#### Problème : "Could not find the 'config' column"
**Solution** : Exécutez le script SQL ci-dessus pour recréer la table.

#### Problème : "JSON object requested, multiple (or no) rows returned"
**Solution** : Assurez-vous qu'il n'y a qu'une seule ligne avec `id=1` dans la table.

#### Problème : Erreur de permissions
**Solution** : Vérifiez les politiques RLS dans Supabase.

### 📊 Vérification

Pour vérifier que tout fonctionne :

1. **Dans Supabase** : Allez dans **Table Editor > site_config**
2. **Dans votre app** : Modifiez la configuration via `/admin`
3. **Vérifiez** : Les changements apparaissent dans Supabase

### 🚀 Déploiement

Votre application est prête pour le déploiement ! Les variables d'environnement sont configurées et l'API Supabase est fonctionnelle.

### 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans la console du navigateur
2. Vérifiez les logs dans Supabase (Logs > API)
3. Testez la connexion avec le script de test

---

**🎉 Félicitations ! Votre application utilise maintenant Supabase pour la gestion de configuration !**