# Configuration Nhost

## Installation

1. **Installer Nhost CLI** (si pas déjà fait) :
   ```bash
   npm install -g nhost
   ```

2. **Installer les dépendances** :
   ```bash
   npm install
   ```

## Configuration

Le projet est configuré avec Nhost pour :
- **Hasura** : GraphQL API avec base de données PostgreSQL
- **Migrations** : Gestion des migrations de base de données
- **Functions** : Fonctions serverless

## Commandes utiles

### Développement
```bash
nhost dev
```
Démarre l'environnement de développement local

### Base de données
```bash
nhost db save
```
Sauvegarde l'état actuel de la base de données

### Métadonnées
```bash
nhost metadata export
```
Exporte les métadonnées Hasura (schémas, permissions, etc.)

## Variables d'environnement

Le fichier `.env.local` contient :
- `NEXT_PUBLIC_NHOST_SUBDOMAIN` : Sous-domaine de votre projet Nhost
- `NEXT_PUBLIC_NHOST_REGION` : Région Nhost (eu-central-1 par défaut)

## Intégration Next.js

Le client Nhost est configuré dans `app/lib/nhost.ts` et peut être utilisé dans vos composants React.

## Migration depuis Supabase

✅ **Terminé** :
- Suppression des références Supabase
- Configuration Nhost
- Variables d'environnement mises à jour
- Dépendances ajoutées