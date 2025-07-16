const fetch = require('node-fetch');

// Configuration Nhost
const NHOST_URL = 'http://localhost:1337';
const GRAPHQL_URL = 'http://localhost:8080/v1/graphql';
const HASURA_ADMIN_SECRET = 'nhost-admin-secret';

async function testNhostConnection() {
  console.log('🧪 Test de connexion Nhost/Hasura...\n');

  try {
    // Test 1: Vérifier la connexion GraphQL
    console.log('1️⃣ Test de la connexion GraphQL...');
    const query = `
      query TestConnection {
        site_config(where: {id: {_eq: 1}}) {
          id
          config
          updated_at
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Connexion GraphQL réussie');
    console.log('📊 Données récupérées:', data);

    // Test 2: Insérer une configuration de test
    console.log('\n2️⃣ Test d\'insertion de configuration...');
    const testConfig = {
      shopInfo: {
        name: "Test Shop",
        logo: "🌿",
        description: "Boutique de test"
      },
      products: [],
      categories: [],
      farms: [],
      socialMediaLinks: []
    };

    const mutation = `
      mutation UpsertSiteConfig($id: Int!, $config: jsonb!, $updated_at: timestamptz!) {
        insert_site_config_one(
          object: {
            id: $id,
            config: $config,
            updated_at: $updated_at
          },
          on_conflict: {
            constraint: site_config_pkey,
            update_columns: [config, updated_at]
          }
        ) {
          id
          config
          updated_at
        }
      }
    `;

    const variables = {
      id: 1,
      config: testConfig,
      updated_at: new Date().toISOString()
    };

    const insertResponse = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({
        query: mutation,
        variables
      }),
    });

    if (!insertResponse.ok) {
      throw new Error(`Insert failed: ${insertResponse.status} ${insertResponse.statusText}`);
    }

    const insertData = await insertResponse.json();
    console.log('✅ Insertion réussie');
    console.log('📊 Résultat:', insertData);

    // Test 3: Vérifier que les données sont bien sauvegardées
    console.log('\n3️⃣ Vérification des données sauvegardées...');
    const verifyResponse = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-hasura-admin-secret': HASURA_ADMIN_SECRET,
      },
      body: JSON.stringify({ query }),
    });

    const verifyData = await verifyResponse.json();
    console.log('✅ Vérification réussie');
    console.log('📊 Données finales:', verifyData);

    console.log('\n🎉 Tous les tests sont passés ! Nhost est correctement configuré.');

  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    console.log('\n🔧 Solutions possibles:');
    console.log('1. Vérifiez que Nhost est démarré: nhost dev');
    console.log('2. Vérifiez que la table site_config existe dans Hasura');
    console.log('3. Vérifiez les permissions de la table');
    console.log('4. Vérifiez que HASURA_ADMIN_SECRET est correct');
  }
}

// Test de l'API Next.js
async function testNextApi() {
  console.log('\n🌐 Test de l\'API Next.js...\n');

  try {
    // Test GET
    console.log('1️⃣ Test GET /api/config-nhost...');
    const getResponse = await fetch('http://localhost:3000/api/config-nhost');
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('✅ GET réussi');
      console.log('📊 Données:', getData);
    } else {
      console.log('❌ GET échoué:', getResponse.status);
    }

    // Test POST
    console.log('\n2️⃣ Test POST /api/config-nhost...');
    const testConfig = {
      shopInfo: {
        name: "Test via API",
        logo: "🌿",
        description: "Test via API Next.js"
      },
      products: [],
      categories: [],
      farms: [],
      socialMediaLinks: []
    };

    const postResponse = await fetch('http://localhost:3000/api/config-nhost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testConfig),
    });

    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('✅ POST réussi');
      console.log('📊 Résultat:', postData);
    } else {
      console.log('❌ POST échoué:', postResponse.status);
      const errorText = await postResponse.text();
      console.log('📄 Détails:', errorText);
    }

  } catch (error) {
    console.error('❌ Erreur API Next.js:', error.message);
    console.log('\n🔧 Assurez-vous que:');
    console.log('1. Next.js est démarré: npm run dev');
    console.log('2. Le serveur écoute sur le port 3000');
  }
}

// Exécuter les tests
async function runTests() {
  console.log('🚀 Démarrage des tests Nhost...\n');
  
  await testNhostConnection();
  await testNextApi();
  
  console.log('\n✨ Tests terminés !');
}

runTests().catch(console.error);