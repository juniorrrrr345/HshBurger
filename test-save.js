const fs = require('fs');
const path = require('path');

// Simuler la sauvegarde
const configFilePath = path.join(process.cwd(), 'data', 'config.json');

async function testSave() {
  try {
    console.log('Testing save functionality...');
    
    // Lire la config actuelle
    const currentConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    console.log('Current config loaded successfully');
    
    // Modifier quelque chose
    currentConfig.shopInfo.name = 'Test Save - ' + new Date().toISOString();
    
    // Sauvegarder
    fs.writeFileSync(configFilePath, JSON.stringify(currentConfig, null, 2));
    console.log('Config saved successfully');
    
    // Vérifier que c'est bien sauvegardé
    const savedConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    console.log('Saved config name:', savedConfig.shopInfo.name);
    
    console.log('✅ Save test passed!');
  } catch (error) {
    console.error('❌ Save test failed:', error);
  }
}

testSave();