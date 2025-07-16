require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Récupération des variables d'environnement Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  console.log('URL Supabase:', supabaseUrl ? '✅ Définie' : '❌ Manquante');
  console.log('Clé Supabase:', supabaseKey ? '✅ Définie' : '❌ Manquante');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testerSupabaseConfig() {
  console.log('🧪 Test des opérations de configuration Supabase...\n');

  // Test 1: Vérifier si la table existe et contient des données
  console.log('1️⃣ Vérification de la configuration existante...');
  const { data: configExistant, error: erreurRecup } = await supabase
    .from('site_config')
    .select('*')
    .single();

  if (erreurRecup) {
    console.log('❌ Erreur lors de la récupération:', erreurRecup.message);
  } else {
    console.log('✅ Configuration existante trouvée:', configExistant);
  }

  // Test 2: Sauvegarder une configuration de test
  console.log('\n2️⃣ Sauvegarde d\'une configuration de test...');
  const configTest = {
    site: {
      name: 'Boutique Test',
      description: 'Configuration de test'
    },
    pages: {
      home: {
        title: 'Accueil Test',
        subtitle: 'Bienvenue dans notre boutique de test'
      }
    }
  };

  const { data: configSauvegardee, error: erreurSauvegarde } = await supabase
    .from('site_config')
    .upsert({ 
      id: 1,
      config: configTest,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (erreurSauvegarde) {
    console.log('❌ Erreur lors de la sauvegarde:', erreurSauvegarde.message);
  } else {
    console.log('✅ Configuration sauvegardée avec succès:', configSauvegardee);
  }

  // Test 3: Récupérer la configuration sauvegardée
  console.log('\n3️⃣ Récupération de la configuration sauvegardée...');
  const { data: configRecuperee, error: erreurRecup2 } = await supabase
    .from('site_config')
    .select('*')
    .single();

  if (erreurRecup2) {
    console.log('❌ Erreur lors de la récupération:', erreurRecup2.message);
  } else {
    console.log('✅ Configuration récupérée:', configRecuperee);
  }

  console.log('\n🎉 Test terminé avec succès!');
}

testerSupabaseConfig().catch(console.error);