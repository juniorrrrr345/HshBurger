# Panneau d'Administration CloudCanon

## Vue d'ensemble

Le panneau d'administration de CloudCanon est une interface moderne et intuitive permettant de gérer tous les aspects de votre boutique CBD en ligne. Il offre une expérience utilisateur optimisée avec des composants réutilisables et une architecture robuste.

## Fonctionnalités principales

### 📊 Tableau de bord
- **Statistiques en temps réel** : Nombre de produits, catégories, fermes et réseaux sociaux
- **Actions rapides** : Accès direct aux fonctions les plus utilisées
- **Vue d'ensemble** : Résumé de l'activité de la boutique

### 🛍️ Gestion des produits
- **Ajout/Modification/Suppression** de produits
- **Gestion des variantes** : Prix, tailles, options
- **Images multiples** : Support pour plusieurs images par produit
- **Vidéos** : Intégration de vidéos pour les produits
- **Catégorisation** : Association avec catégories et fermes
- **Produits populaires** : Marquage des produits vedettes

### 📂 Gestion des catégories
- **Organisation** : Création et gestion des catégories de produits
- **Emojis** : Personnalisation visuelle avec des emojis
- **Descriptions** : Informations détaillées pour chaque catégorie

### 🏡 Gestion des fermes
- **Fermes partenaires** : Gestion des producteurs associés
- **Traçabilité** : Association des produits aux fermes
- **Informations détaillées** : Descriptions et emojis personnalisés

### 📱 Réseaux sociaux
- **Liens multiples** : Instagram, Facebook, WhatsApp, etc.
- **Personnalisation** : Couleurs et emojis pour chaque réseau
- **URLs dynamiques** : Gestion des liens de contact

### ⚙️ Paramètres de la boutique
- **Informations générales** : Nom, logo, description
- **Couleurs** : Personnalisation de la charte graphique
- **Contact** : Email, téléphone, liens de commande
- **Configuration** : Paramètres avancés de l'interface

## Architecture technique

### Composants réutilisables

#### `AdminLayout.tsx`
- Layout principal avec sidebar de navigation
- Gestion des onglets et navigation
- Design responsive et moderne

#### `AdminCard.tsx`
- Conteneur standardisé pour les sections
- Support des titres et descriptions
- Styles cohérents

#### `AdminButton.tsx`
- Boutons avec variantes (primary, secondary, danger, success)
- États de chargement intégrés
- Tailles configurables

#### `AdminInput.tsx`
- Champs de saisie avec validation
- Support de différents types (text, email, url, color)
- Gestion des erreurs

#### `AdminTextarea.tsx`
- Zones de texte avec redimensionnement
- Validation et gestion d'erreurs
- Support des placeholders

#### `Notification.tsx`
- Notifications toast avec animations
- Types : success, error, warning, info
- Auto-dismiss configurable

#### `ConfirmModal.tsx`
- Modales de confirmation pour actions destructives
- Variantes : danger, warning, info
- Interface utilisateur claire

#### `StatsCard.tsx`
- Cartes de statistiques pour le tableau de bord
- Support des tendances et icônes
- Couleurs personnalisables

### Utilitaires d'administration

#### `admin.ts`
- **Validation** : Fonctions de validation pour tous les types de données
- **Formatage** : Utilitaires de formatage (prix, URLs, etc.)
- **Historique** : Suivi des actions d'administration
- **Notifications** : Gestionnaire de notifications global

## Utilisation

### Accès au panneau
```
http://votre-domaine.com/admin
```

### Navigation
- **Tableau de bord** : Vue d'ensemble et statistiques
- **Produits** : Gestion complète du catalogue
- **Catégories** : Organisation des produits
- **Fermes** : Gestion des partenaires
- **Réseaux sociaux** : Liens de contact
- **Paramètres** : Configuration de la boutique

### Actions principales

#### Ajouter un produit
1. Aller dans l'onglet "Produits"
2. Cliquer sur "Ajouter un produit"
3. Remplir les informations requises
4. Sauvegarder

#### Modifier une catégorie
1. Aller dans l'onglet "Catégories"
2. Cliquer sur "Modifier" sur la catégorie souhaitée
3. Modifier les informations
4. Sauvegarder

#### Configurer les paramètres
1. Aller dans l'onglet "Paramètres"
2. Modifier les informations de la boutique
3. Ajuster les couleurs et le design
4. Sauvegarder les paramètres

## Fonctionnalités avancées

### Validation des données
- Vérification automatique des champs requis
- Validation des URLs et emails
- Messages d'erreur contextuels

### Sauvegarde automatique
- Sauvegarde en temps réel des modifications
- Historique des actions
- Notifications de succès/erreur

### Interface responsive
- Adaptation mobile et tablette
- Navigation optimisée
- Composants adaptatifs

### Sécurité
- Validation côté client et serveur
- Protection contre les injections
- Nettoyage des données

## Personnalisation

### Couleurs
Les couleurs peuvent être personnalisées dans les paramètres :
- Couleur primaire
- Couleur secondaire
- Couleur du texte
- Couleur de fond

### Navigation
- Personnalisation des noms d'onglets
- Configuration des boutons de filtrage
- Adaptation des labels

## Support technique

### Dépendances
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icônes)

### Structure des fichiers
```
app/admin/
├── components/
│   ├── AdminLayout.tsx
│   ├── AdminCard.tsx
│   ├── AdminButton.tsx
│   ├── AdminInput.tsx
│   ├── AdminTextarea.tsx
│   ├── Notification.tsx
│   ├── ConfirmModal.tsx
│   └── StatsCard.tsx
├── page.tsx
└── lib/
    └── admin.ts
```

### API
- Endpoint : `/api/config`
- Méthodes : GET (lecture), POST (sauvegarde)
- Format : JSON
- Stockage : Fichier local `data/config.json`

## Maintenance

### Sauvegarde
- Les données sont sauvegardées dans `data/config.json`
- Sauvegarde recommandée de ce fichier
- Export possible via l'interface d'administration

### Mise à jour
- Compatible avec les mises à jour de Next.js
- Migration automatique des données
- Rétrocompatibilité maintenue

## Support

Pour toute question ou problème :
1. Vérifier la console du navigateur pour les erreurs
2. Contrôler les permissions de fichiers
3. Vérifier la connectivité réseau
4. Consulter les logs du serveur

---

*Développé pour CloudCanon - Panneau d'administration moderne et intuitif*