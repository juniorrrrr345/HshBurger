const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const defaultConfig = {
  shopInfo: {
    name: "CBD Shop Premium",
    description: "Votre boutique CBD de confiance",
    logo: "🌿",
    logoUrl: "",
    primaryColor: "#000000",
    secondaryColor: "#ffffff",
    textColor: "#ffffff",
    backgroundColor: "#ffffff",
    backgroundImage: ""
  },
  contactInfo: {
    orderLink: "https://example.com/order",
    orderText: "Commandez maintenant",
    email: "contact@cbdshop.fr",
    phone: "+33 1 23 45 67 89"
  },
  socialMediaLinks: [
    {
      id: 1,
      name: "Instagram",
      emoji: "📸",
      url: "https://instagram.com/cbdshop",
      color: "#E4405F"
    },
    {
      id: 2,
      name: "Facebook",
      emoji: "📘",
      url: "https://facebook.com/cbdshop",
      color: "#1877F2"
    },
    {
      id: 3,
      name: "WhatsApp",
      emoji: "💬",
      url: "https://wa.me/33123456789",
      color: "#25D366"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Huiles",
      emoji: "💧",
      description: "Huiles CBD de qualité premium"
    },
    {
      id: 2,
      name: "Fleurs",
      emoji: "🌸",
      description: "Fleurs CBD séchées naturelles"
    },
    {
      id: 3,
      name: "Résines",
      emoji: "🟤",
      description: "Résines CBD artisanales"
    },
    {
      id: 4,
      name: "Boutique",
      emoji: "🌾",
      description: "Produits exclusifs CBD"
    },
    {
      id: 5,
      name: "Farm",
      emoji: "🏡",
      description: "Produits CBD de nos fermes partenaires"
    }
  ],
  farms: [
    {
      id: 1,
      name: "Mountain",
      emoji: "🏔️",
      description: "Produits CBD de la ferme Mountain"
    },
    {
      id: 2,
      name: "Valley",
      emoji: "🏞️",
      description: "Produits CBD de la ferme Valley"
    },
    {
      id: 3,
      name: "Forest",
      emoji: "🌲",
      description: "Produits CBD de la ferme Forest"
    },
    {
      id: 4,
      name: "Riverside",
      emoji: "🌊",
      description: "Produits CBD de la ferme Riverside"
    }
  ],
  products: [],
  pages: [
    {
      id: 1,
      name: "Accueil",
      href: "/",
      isDefault: true
    },
    {
      id: 2,
      name: "Produits",
      href: "/produits",
      isDefault: true
    },
    {
      id: 3,
      name: "Contact",
      href: "/contact",
      isDefault: true
    },
    {
      id: 4,
      name: "Réseaux Sociaux",
      href: "/reseaux-sociaux",
      isDefault: true
    }
  ],
  adminSettings: {
    categoriesTabName: "Catégories",
    farmsTabName: "Fermes",
    categoriesButtonText: "Voir toutes les catégories",
    farmsButtonText: "Voir tous les produits ferme"
  },
  pageContent: {
    homepage: {
      heroTitle: "Bienvenue sur CBD Shop Premium",
      heroSubtitle: "Découvrez notre sélection de produits CBD de qualité",
      heroButtonText: "Voir nos produits",
      sectionTitle: "Nos catégories",
      categoriesLabel: "Catégories",
      farmLabel: "Fermes",
      allCategoriesLabel: "Voir toutes les catégories",
      farmProductsLabel: "Produits de nos fermes"
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider",
      description: "N'hésitez pas à nous contacter pour toute question concernant nos produits CBD."
    },
    socialMedia: {
      title: "Suivez-nous",
      subtitle: "Restez connectés"
    },
    footer: {
      copyrightText: "© 2024 CBD Shop Premium. Tous droits réservés."
    },
    products: {
      filterTitle: "Filtrer par",
      popularText: "Populaire",
      detailsText: "Voir détails",
      orderText: "Commander",
      pageTitle: "Nos Produits",
      pageSubtitle: "Découvrez notre sélection"
    }
  }
};

async function initSupabaseConfig() {
  try {
    console.log('🚀 Initialisation de la configuration Supabase...');
    
    // Vérifier si la table existe et contient des données
    const { data: existingData, error: checkError } = await supabase
      .from('site_config')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('❌ Erreur lors de la vérification de la table:', checkError);
      console.log('💡 Assurez-vous que la table "site_config" existe dans votre base de données Supabase');
      return;
    }

    if (existingData && existingData.length > 0) {
      console.log('✅ Configuration déjà existante dans Supabase');
      return;
    }

    // Insérer la configuration par défaut
    const { error: insertError } = await supabase
      .from('site_config')
      .insert({ config_data: defaultConfig });

    if (insertError) {
      console.error('❌ Erreur lors de l\'insertion:', insertError);
      return;
    }

    console.log('✅ Configuration initialisée avec succès dans Supabase');
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

initSupabaseConfig();