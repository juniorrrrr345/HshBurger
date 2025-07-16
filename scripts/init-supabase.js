const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://hrjljoyuswqaunpmzmnp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhyamxqb3l1c3dxYXVucG16bW5wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Mjc4MjAsImV4cCI6MjA2ODIwMzgyMH0.iyzsBj4zdPcSslJakhjUQ8LmaODk_SnGjvavJSXMEOs';

const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration par défaut
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
    }
  ],
  products: [
    {
      id: 1,
      name: "Huile CBD Full Spectrum",
      description: "Huile CBD full spectrum de qualité premium.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Huiles",
      variants: [
        { name: "5%", price: 24.90, size: "10ml" },
        { name: "10%", price: 34.90, size: "10ml" },
        { name: "15%", price: 49.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/huile-full-spectrum",
      popular: true
    }
  ],
  pages: [
    {
      id: 1,
      name: "Accueil",
      href: "/",
      isDefault: true,
      content: {
        title: "Accueil",
        subtitle: "Bienvenue sur notre boutique CBD",
        description: "Découvrez nos produits CBD de qualité premium",
        heroTitle: "Produits CBD Premium",
        heroSubtitle: "Découvrez notre sélection de produits CBD de qualité supérieure",
        heroButtonText: "Voir nos produits"
      }
    },
    {
      id: 2,
      name: "Produits",
      href: "/produits",
      isDefault: true,
      content: {
        title: "Nos Produits",
        subtitle: "Découvrez notre gamme complète",
        description: "Une sélection de produits CBD de qualité premium"
      }
    },
    {
      id: 3,
      name: "Contact",
      href: "/contact",
      isDefault: true,
      content: {
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour vous aider",
        description: "Pour toute commande ou question, contactez-nous directement"
      }
    },
    {
      id: 4,
      name: "Réseaux sociaux",
      href: "/reseaux-sociaux",
      isDefault: true,
      content: {
        title: "Suivez-nous",
        subtitle: "Restez connecté avec nous",
        description: "Suivez-nous sur les réseaux sociaux pour les dernières actualités"
      }
    }
  ],
  adminSettings: {
    categoriesTabName: "Catégories",
    farmsTabName: "Fermes",
    categoriesButtonText: "Catégories",
    farmsButtonText: "Fermes"
  },
  pageContent: {
    homepage: {
      heroTitle: "Produits CBD Premium",
      heroSubtitle: "Découvrez notre sélection de produits CBD de qualité supérieure",
      heroButtonText: "Voir nos produits",
      sectionTitle: "Nos Produits Populaires",
      categoriesLabel: "Types de produits",
      farmLabel: "Boutique",
      allCategoriesLabel: "Tous nos produits",
      farmProductsLabel: "Produits exclusifs"
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider",
      description: "Pour toute commande ou question, contactez-nous directement via notre plateforme de commande."
    },
    socialMedia: {
      title: "Suivez-nous sur les réseaux sociaux",
      subtitle: "Restez connecté avec nous pour les dernières actualités et offres exclusives"
    },
    footer: {
      copyrightText: "© 2024 CBD Shop Premium. Tous droits réservés."
    },
    products: {
      filterTitle: "Filtrer par catégorie",
      popularText: "Populaire",
      detailsText: "Voir détails",
      orderText: "Commander maintenant",
      pageTitle: "Nos Produits",
      pageSubtitle: "Découvrez notre gamme complète de produits CBD"
    }
  }
};

async function initSupabase() {
  try {
    console.log('🔧 Initialisation de Supabase...');

    // Vérifier si la table existe et créer la configuration par défaut
    const { data, error } = await supabase
      .from('site_config')
      .upsert({
        id: 1,
        config: defaultConfig,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Erreur lors de l\'initialisation de Supabase:', error);
      return;
    }

    console.log('✅ Configuration Supabase initialisée avec succès!');
    console.log('📊 Données insérées:', data);
  } catch (error) {
    console.error('❌ Erreur lors de l\'initialisation:', error);
  }
}

// Exécuter l'initialisation
initSupabase();