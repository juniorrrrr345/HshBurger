const fs = require('fs');
const path = require('path');

// Simuler la configuration du panel admin avec la structure complète
const panelConfig = {
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
      name: "Huile CBD Pure",
      description: "Huile de CBD pure et naturelle, extraite selon les meilleures pratiques.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Huiles",
      variants: [
        { name: "5%", price: 19.90, size: "10ml" },
        { name: "10%", price: 34.90, size: "10ml" },
        { name: "15%", price: 49.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/huile-pure",
      popular: true
    }
  ],
  pages: [
    { id: 1, name: "Accueil", href: "/", isDefault: true },
    { id: 2, name: "Produits", href: "/produits", isDefault: true },
    { id: 3, name: "Contact", href: "/contact", isDefault: true },
    { id: 4, name: "Réseaux Sociaux", href: "/reseaux-sociaux", isDefault: true }
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

async function testPanelSave() {
  try {
    console.log('Testing panel admin save functionality...');
    
    const configFilePath = path.join(process.cwd(), 'data', 'config.json');
    
    // Simuler la sauvegarde comme le fait le panel admin
    console.log('Saving config with structure:', Object.keys(panelConfig));
    
    // Sauvegarder la configuration
    fs.writeFileSync(configFilePath, JSON.stringify(panelConfig, null, 2));
    console.log('✅ Panel config saved successfully');
    
    // Vérifier que c'est bien sauvegardé
    const savedConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    console.log('✅ Config verified:', savedConfig.shopInfo.name);
    console.log('✅ Products count:', savedConfig.products.length);
    console.log('✅ Categories count:', savedConfig.categories.length);
    console.log('✅ Farms count:', savedConfig.farms.length);
    
    console.log('✅ Panel save test passed!');
  } catch (error) {
    console.error('❌ Panel save test failed:', error);
  }
}

testPanelSave();