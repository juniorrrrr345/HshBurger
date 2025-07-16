const fs = require('fs');
const path = require('path');

// Lire le fichier admin
const adminPath = path.join(__dirname, 'app/admin/page.tsx');
let content = fs.readFileSync(adminPath, 'utf8');

console.log('🔧 Correction de la syntaxe JSX...');

// Vérifier et corriger les balises JSX
let fixed = false;

// Vérifier s'il y a des balises div non fermées
const divMatches = content.match(/<div[^>]*>/g);
const closingDivMatches = content.match(/<\/div>/g);

if (divMatches && closingDivMatches) {
  const openDivs = divMatches.length;
  const closeDivs = closingDivMatches.length;
  
  if (openDivs !== closeDivs) {
    console.log(`⚠️ Déséquilibre des balises div: ${openDivs} ouvertes, ${closeDivs} fermées`);
    
    // Ajouter les balises fermantes manquantes à la fin du composant
    const missingDivs = openDivs - closeDivs;
    const lastClosingBrace = content.lastIndexOf('}');
    
    if (lastClosingBrace !== -1) {
      const beforeClosing = content.substring(0, lastClosingBrace);
      const afterClosing = content.substring(lastClosingBrace);
      
      // Ajouter les balises fermantes manquantes
      const missingDivTags = '</div>'.repeat(missingDivs);
      content = beforeClosing + missingDivTags + afterClosing;
      fixed = true;
      console.log(`✅ Ajouté ${missingDivs} balise(s) div fermante(s)`);
    }
  }
}

// Vérifier les balises de modales
const modalPatterns = [
  { start: '{editingProduct && (', end: ')}' },
  { start: '{editingCategory && (', end: ')}' },
  { start: '{editingFarm && (', end: ')}' },
  { start: '{editingPage && (', end: ')}' },
  { start: '{editingSocial && (', end: ')}' }
];

modalPatterns.forEach(pattern => {
  const startIndex = content.indexOf(pattern.start);
  if (startIndex !== -1) {
    const endIndex = content.indexOf(pattern.end, startIndex);
    if (endIndex === -1) {
      console.log(`⚠️ Modale non fermée: ${pattern.start}`);
      // Ajouter la fermeture manquante
      content += pattern.end;
      fixed = true;
    }
  }
});

// Vérifier les balises de conditions
const conditionPatterns = [
  { start: '{activeTab === \'products\' && (', end: ')}' },
  { start: '{activeTab === \'categories\' && (', end: ')}' },
  { start: '{activeTab === \'farms\' && (', end: ')}' },
  { start: '{activeTab === \'social\' && (', end: ')}' },
  { start: '{activeTab === \'admin-settings\' && (', end: ')}' },
  { start: '{activeTab === \'shop\' && (', end: ')}' },
  { start: '{activeTab === \'pages\' && (', end: ')}' },
  { start: '{activeTab === \'contact\' && (', end: ')}' }
];

conditionPatterns.forEach(pattern => {
  const startIndex = content.indexOf(pattern.start);
  if (startIndex !== -1) {
    const endIndex = content.indexOf(pattern.end, startIndex);
    if (endIndex === -1) {
      console.log(`⚠️ Condition non fermée: ${pattern.start}`);
      // Ajouter la fermeture manquante
      content += pattern.end;
      fixed = true;
    }
  }
});

if (fixed) {
  // Sauvegarder le fichier corrigé
  fs.writeFileSync(adminPath, content, 'utf8');
  console.log('✅ Fichier corrigé et sauvegardé');
} else {
  console.log('✅ Aucune erreur de syntaxe détectée');
}

console.log('🔍 Vérification terminée');