# Configuration Nhost en Production

## Problème résolu

L'erreur `ECONNREFUSED 127.0.0.1:8080` était causée par des appels à localhost en production.

## Solution implémentée

### 1. **Variables d'environnement correctes**
```env
NEXT_PUBLIC_NHOST_SUBDOMAIN=mon-projet-nhost
NEXT_PUBLIC_NHOST_REGION=eu-central-1
NHOST_SUBDOMAIN=mon-projet-nhost
NHOST_REGION=eu-central-1
```

### 2. **URLs Nhost en production**
- **GraphQL** : `https://mon-projet-nhost.eu-central-1.nhost.run/v1/graphql`
- **Auth** : `https://mon-projet-nhost.eu-central-1.nhost.run/v1/auth`
- **Storage** : `https://mon-projet-nhost.eu-central-1.nhost.run/v1/files`

### 3. **Fichiers créés/modifiés**
- ✅ `app/api/config-nhost/route.ts` - API pour config Nhost
- ✅ `app/lib/nhost-server.ts` - Config côté serveur
- ✅ `app/lib/nhost.ts` - Client Nhost mis à jour
- ✅ `vercel.json` - Variables d'environnement

## Configuration en production

### Vercel
1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez :
   ```
   NHOST_SUBDOMAIN=mon-projet-nhost
   NHOST_REGION=eu-central-1
   ```

### Autres plateformes
Utilisez les mêmes variables d'environnement selon votre hébergeur.

## Utilisation

### Côté client
```tsx
import { nhost } from '@/lib/nhost';

// Utiliser le client Nhost
const { data } = await nhost.graphql.request(query);
```

### Côté serveur
```tsx
import { nhostServerConfig, nhostFetch } from '@/lib/nhost-server';

// Appel sécurisé à Nhost
const response = await nhostFetch('/v1/graphql', {
  method: 'POST',
  body: JSON.stringify({ query })
});
```

## Vérification

Pour tester que tout fonctionne :
1. Déployez sur Vercel
2. Vérifiez les logs pour absence d'erreurs localhost
3. Testez les endpoints `/api/config-nhost`

✅ **Problème résolu** - Plus d'erreurs de connexion localhost en production !