# 🔍 Instructions de Debug - Gestion des Pages

## 🚨 Diagnostic des Problèmes

J'ai ajouté des logs de debug complets pour identifier pourquoi les boutons ne fonctionnent pas.

## 📋 **ÉTAPES DE TEST À SUIVRE :**

### **1. Démarrer le serveur**
```bash
npm run dev
```
Aller sur : `http://localhost:3000/admin`

### **2. Ouvrir la Console de Debug**
- **Chrome/Firefox :** Appuyer sur `F12`
- **Onglet "Console"** → Garder ouvert pendant les tests

### **3. Tests à Effectuer dans l'Ordre**

#### **Test A : Bouton de Test**
1. Aller dans l'onglet **"Pages"** de l'admin
2. Section **"Gestion de Navigation"**  
3. **Cliquer sur le bouton JAUNE "Test"**
4. ❓ **Est-ce qu'une popup avec "Bouton de test fonctionne !" apparaît ?**

**Si OUI** → Les clics fonctionnent, problème ailleurs
**Si NON** → Problème avec JavaScript ou React

#### **Test B : Bouton Ajouter**
1. **Cliquer sur le bouton VERT "Ajouter une page"**
2. **Regarder la console** → Doit afficher :
   ```
   Bouton Ajouter cliqué
   Config: {objet avec toutes les données}
   Config.pages: [array des pages]
   addPage function called
   New page created: {id: X, name: '', href: '', isDefault: false}
   Setting editingPage...
   addPage completed
   ```
3. ❓ **Est-ce qu'un modal (popup) s'ouvre avec 2 champs ?**

#### **Test C : Modal d'Édition** 
Si le modal s'ouvre :
1. **Remplir les champs :**
   ```
   Nom : Test Page
   URL : /test
   ```
2. **Cliquer "Enregistrer"**
3. **Console doit afficher :**
   ```
   Bouton Enregistrer cliqué
   editingPage: {données}
   savePage function called
   Adding new page
   newPages: [array avec nouvelle page]
   savePage completed
   ```

#### **Test D : Pages Visibles**
1. **Regarder la liste des pages** sous les boutons
2. ❓ **Y a-t-il les 4 pages par défaut ?**
   - Accueil (Badge "Page par défaut")
   - Produits (Badge "Page par défaut") 
   - Contact (Badge "Page par défaut")
   - Réseaux Sociaux (Badge "Page par défaut")

#### **Test E : Boutons Modifier/Supprimer**
1. **Cliquer "Modifier"** sur une page
2. **Console doit afficher :** `Bouton Modifier cliqué pour: {données page}`
3. **Essayer "Supprimer"** sur une page personnalisée
4. **Console :** `Bouton Supprimer cliqué pour page ID: X`

## 🆘 **RAPPORTER LES RÉSULTATS**

**Copier-coller dans votre réponse :**

```
=== RÉSULTATS DES TESTS ===

Test A (Bouton Test) : ✅ Fonctionne / ❌ Ne fonctionne pas
Test B (Bouton Ajouter) : ✅ Modal s'ouvre / ❌ Rien ne se passe  
Test C (Modal Enregistrer) : ✅ Page ajoutée / ❌ Erreur
Test D (Pages par défaut) : ✅ Visibles / ❌ Liste vide
Test E (Modifier/Supprimer) : ✅ Fonctionnent / ❌ Ne fonctionnent pas

ERREURS DANS LA CONSOLE :
[Copier-coller toutes les erreurs rouges]

LOGS AFFICHÉS :
[Copier-coller les logs de debug]
```

## 🔧 **Solutions Possibles**

### **Si aucun bouton ne fonctionne :**
- Problème JavaScript global
- Vérifier si React fonctionne

### **Si bouton Test fonctionne mais pas les autres :**
- Problème avec les fonctions de gestion des pages
- Vérifier les logs pour voir où ça bloque

### **Si modal ne s'ouvre pas :**
- Problème avec `setEditingPage`
- État React non mis à jour

### **Si pages par défaut invisibles :**
- Configuration non chargée
- Problème avec localStorage

## 🚀 **Reset d'Urgence**

Si tout est cassé :
```javascript
// Dans la console du navigateur
localStorage.clear();
window.location.reload();
```

---

**Avec ces logs détaillés, je pourrai identifier précisément où le problème se situe !** 🎯