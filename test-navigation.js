#!/usr/bin/env node

const http = require('http');

// Test des pages principales
const pages = [
  '/',
  '/test',
  '/produits-simple',
  '/admin-simple',
  '/produits',
  '/admin',
  '/contact'
];

console.log('🧪 Test de navigation - Boutique CBD');
console.log('=====================================\n');

let testsPassed = 0;
let testsFailed = 0;

async function testPage(path) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET'
    };

    const req = http.request(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`✅ ${path} - OK (${res.statusCode})`);
          testsPassed++;
        } else {
          console.log(`❌ ${path} - ERREUR (${res.statusCode})`);
          testsFailed++;
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`❌ ${path} - ERREUR CONNEXION`);
      testsFailed++;
      resolve();
    });

    req.setTimeout(5000, () => {
      console.log(`❌ ${path} - TIMEOUT`);
      testsFailed++;
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('🔍 Test des pages...\n');
  
  for (const page of pages) {
    await testPage(page);
    await new Promise(resolve => setTimeout(resolve, 100)); // Délai entre les tests
  }
  
  console.log('\n📊 Résultats:');
  console.log(`✅ Tests réussis: ${testsPassed}`);
  console.log(`❌ Tests échoués: ${testsFailed}`);
  console.log(`📈 Total: ${testsPassed + testsFailed}`);
  
  if (testsFailed === 0) {
    console.log('\n🎉 Toutes les pages sont accessibles !');
  } else {
    console.log('\n⚠️  Certaines pages ont des problèmes.');
  }
  
  console.log('\n📝 Instructions pour tester manuellement:');
  console.log('1. Ouvrez http://localhost:3000 dans votre navigateur');
  console.log('2. Ouvrez la console (F12) pour voir les logs');
  console.log('3. Cliquez sur les liens de navigation');
  console.log('4. Vérifiez que les pages se chargent correctement');
  console.log('5. Regardez le composant Diagnostic en bas à droite');
}

runTests().catch(console.error);