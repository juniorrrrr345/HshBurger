# 🛠️ Guide de Test - Gestion des Pages

## ✅ Corrections Appliquées

J'ai corrigé plusieurs problèmes potentiels dans le système de gestion des pages :

### **1. Initialisation des Pages**
- ✅ **Protection contre `undefined`** : Ajout de vérifications si `config.pages` n'existe pas
- ✅ **Initialisation automatique** : Les pages par défaut sont créées si elles manquent
- ✅ **Fallback** : Navigation avec pages par défaut si la config est vide

### **2. Fonctions Sécurisées**
- ✅ **`addPage()`** : Vérifie que config.pages existe avant utilisation
- ✅ **`savePage()`** : Initialise pages si nécessaire
- ✅ **`deletePage()`** : Protection contre les pages par défaut
- ✅ **Header** : Fallback vers pages par défaut si config.pages est vide

## 🧪 Comment Tester

### **Étape 1 : Démarrer le Projet**
```bash
npm run dev
```

### **Étape 2 : Accéder à l'Administration**
1. Aller sur **http://localhost:3000/admin**
2. Cliquer sur l'onglet **"Pages"**
3. Descendre jusqu'à la section **"Gestion de Navigation"**

### **Étape 3 : Tester l'Ajout de Page**
1. **Cliquer sur le bouton vert "Ajouter une page"**
   - ✅ Un modal doit s'ouvrir
   - ✅ Deux champs : "Nom de la page" et "Lien (URL)"
   
2. **Remplir les champs :**
   ```
   Nom : À propos
   URL : /a-propos
   ```
   
3. **Cliquer sur "Enregistrer"**
   - ✅ Le modal se ferme
   - ✅ La nouvelle page apparaît dans la liste
   - ✅ Aller sur la page d'accueil → le lien "À propos" doit être visible dans la navigation

### **Étape 4 : Tester la Modification**
1. **Cliquer sur "Modifier"** à côté d'une page personnalisée
   - ✅ Le modal s'ouvre avec les données pré-remplies
   
2. **Changer le nom :** `À propos` → `Notre Histoire`
3. **Cliquer "Enregistrer"**
   - ✅ Le changement s'applique immédiatement
   - ✅ La navigation se met à jour sur le site

### **Étape 5 : Tester la Suppression**
1. **Essayer de supprimer une page par défaut** (ex: "Accueil")
   - ✅ Le bouton "Supprimer" ne doit PAS être visible
   - ✅ Badge bleu "Page par défaut" affiché
   
2. **Supprimer une page personnalisée :**
   - ✅ Cliquer sur "Supprimer" → confirmation attendue
   - ✅ La page disparaît de la liste ET de la navigation

### **Étape 6 : Tester les Liens Externes**
1. **Ajouter une page externe :**
   ```
   Nom : Notre Instagram
   URL : https://instagram.com/votre-compte
   ```
   
2. **Vérifier :**
   - ✅ Le lien apparaît dans la navigation
   - ✅ Cliquer dessus ouvre un nouvel onglet

## 🐛 Si les Boutons ne Fonctionnent Pas

### **Vérifications de Base :**

1. **Ouvrir la Console du Navigateur** (F12)
   - Chercher des erreurs JavaScript
   - Noter tous les messages d'erreur

2. **Vérifier le LocalStorage :**
   ```javascript
   // Dans la console du navigateur
   localStorage.getItem('siteConfig')
   ```
   
3. **Nettoyer le Cache :**
   - Rafraîchir avec Ctrl+F5
   - Ou vider le localStorage : `localStorage.clear()`

### **Solution d'Urgence :**
Si rien ne fonctionne, **supprimer le localStorage** :

```javascript
// Dans la console du navigateur (F12)
localStorage.removeItem('siteConfig');
window.location.reload();
```

## 📋 Checklist de Fonctionnement

- [ ] **Bouton "Ajouter une page"** → Ouvre le modal
- [ ] **Modal d'ajout** → Champs nom/URL fonctionnels
- [ ] **Sauvegarde** → Page ajoutée à la liste
- [ ] **Navigation mise à jour** → Nouveau lien visible
- [ ] **Bouton "Modifier"** → Ouvre modal avec données
- [ ] **Modification** → Changements appliqués
- [ ] **Bouton "Supprimer"** → Supprime page personnalisée
- [ ] **Protection défaut** → Pages par défaut non supprimables
- [ ] **Liens externes** → S'ouvrent en nouvel onglet
- [ ] **Responsive** → Navigation s'adapte mobile/desktop

## 🆘 Contact Debug

Si les problèmes persistent, fournissez-moi :

1. **Messages d'erreur** de la console (F12)
2. **Contenu du localStorage** : `localStorage.getItem('siteConfig')`
3. **Navigateur utilisé** (Chrome, Firefox, Safari...)
4. **Actions exactes** qui ne fonctionnent pas

---

**💡 Astuce :** Après chaque modification, cliquez sur le bouton **"💾 Enregistrer la Configuration"** en bas de l'admin pour sauvegarder définitivement.