require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Replace with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Supabase URL:', supabaseUrl ? 'Set' : 'Missing');
  console.log('Supabase Key:', supabaseKey ? 'Set' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabaseConfig() {
  console.log('Testing Supabase config operations...\n');

  // Test 1: Check if table exists and has data
  console.log('1. Checking existing config...');
  const { data: existingConfig, error: fetchError } = await supabase
    .from('site_config')
    .select('*')
    .single();

  if (fetchError) {
    console.log('Error fetching config:', fetchError.message);
  } else {
    console.log('Existing config:', existingConfig);
  }

  // Test 2: Save a test config
  console.log('\n2. Saving test config...');
  const testConfig = {
    site: {
      name: 'Test Shop',
      description: 'Test configuration'
    },
    pages: {
      home: {
        title: 'Test Home',
        subtitle: 'Welcome to our test shop'
      }
    }
  };

  const { data: savedConfig, error: saveError } = await supabase
    .from('site_config')
    .upsert({ 
      id: 1,
      config: testConfig,
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (saveError) {
    console.log('Error saving config:', saveError.message);
  } else {
    console.log('Successfully saved config:', savedConfig);
  }

  // Test 3: Fetch the saved config
  console.log('\n3. Fetching saved config...');
  const { data: fetchedConfig, error: fetchError2 } = await supabase
    .from('site_config')
    .select('*')
    .single();

  if (fetchError2) {
    console.log('Error fetching saved config:', fetchError2.message);
  } else {
    console.log('Fetched config:', fetchedConfig);
  }

  console.log('\nTest completed!');
}

testSupabaseConfig().catch(console.error);