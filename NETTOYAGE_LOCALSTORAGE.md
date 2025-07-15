# 🧹 Nettoyage du localStorage - Guide rapide

## 🚨 Problème identifié

Les anciennes données dans localStorage empêchent les nouvelles fonctionnalités de fonctionner correctement (liens de commande, navigation, etc.).

## 🔧 Solution rapide

### Méthode 1 : Via le panel admin
1. **Aller sur** http://localhost:3000/admin/parametres
2. **Cliquer** sur "Réinitialiser avec données par défaut"
3. **Confirmer** la réinitialisation
4. **Attendre** le rechargement automatique

### Méthode 2 : Via la console du navigateur
1. **Ouvrir** la console (F12)
2. **Coller** ce code :
```javascript
localStorage.removeItem('cbd-products');
localStorage.removeItem('cbd-categories');
localStorage.removeItem('cbd-pages');
localStorage.removeItem('cbd-shop-settings');
location.reload();
```

### Méthode 3 : Effacer tout localStorage
1. **Ouvrir** la console (F12)
2. **Coller** ce code :
```javascript
localStorage.clear();
location.reload();
```

## 🧪 Test après nettoyage

### 1. **Page d'accueil** (http://localhost:3000)
- ✅ 3 produits populaires avec images
- ✅ Bouton "Découvrir nos produits" fonctionne
- ✅ Clics sur produits redirigent vers détails

### 2. **Catalogue** (http://localhost:3000/produits)
- ✅ 5 produits avec images
- ✅ Clics sur produits fonctionnent
- ✅ Filtres par catégorie marchent

### 3. **Détail produit** (http://localhost:3000/produits/1)
- ✅ Page se charge correctement
- ✅ Images s'affichent
- ✅ Bouton "Commander" avec lien externe

### 4. **Panel admin** (http://localhost:3000/admin)
- ✅ Tableau de bord avec 5 produits
- ✅ Navigation sidebar fonctionnelle
- ✅ Boutons d'actions rapides marchent

### 5. **Gestion produits** (http://localhost:3000/admin/produits)
- ✅ 5 produits listés
- ✅ Bouton "Nouveau produit" ouvre modal
- ✅ Édition/suppression fonctionnelle

## 🔗 Liens de commande par défaut

Les produits ont maintenant des liens de commande d'exemple :
- **Huile CBD 10%** : https://example.com/commander-huile-cbd-10
- **Fleurs CBD Amnesia** : https://example.com/commander-fleurs-amnesia
- **Résine CBD Hash** : https://example.com/commander-resine-hash
- **Huile CBD 15%** : https://example.com/commander-huile-cbd-15
- **Fleurs CBD Lemon Haze** : https://example.com/commander-lemon-haze

Ces liens peuvent être modifiés dans le panel admin > Produits > Modifier.

## 🎯 Vérifications importantes

### Navigation
- [ ] Clics sur produits redirigent vers détails
- [ ] Boutons "Découvrir nos produits" marchent
- [ ] Navigation admin fonctionnelle

### Affichage
- [ ] Images des produits s'affichent
- [ ] Pas de spinners infinis
- [ ] Bouton "Commander" visible

### Fonctionnalités
- [ ] Modal d'ajout de produit s'ouvre
- [ ] Édition de produits fonctionne
- [ ] Sauvegarde des modifications

## 🐛 Si ça ne marche toujours pas

1. **Vider le cache du navigateur** (Ctrl+Shift+R)
2. **Redémarrer le serveur** :
   ```bash
   # Arrêter le serveur (Ctrl+C)
   npm run dev
   ```
3. **Vérifier la console** pour les erreurs (F12)

## 🎉 Résultat attendu

Après le nettoyage, votre boutique devrait :
- ✅ **Afficher 5 produits** par défaut
- ✅ **Liens fonctionnels** sur tous les produits
- ✅ **Boutons "Commander"** avec liens externes
- ✅ **Navigation complète** dans l'admin
- ✅ **Pas de sections témoignages/panier**

---

**Action** : Nettoyer le localStorage puis tester !
**Temps** : 2 minutes
**Résultat** : Boutique entièrement fonctionnelle 🚀