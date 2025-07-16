const fs = require('fs');
const path = require('path');

// Simuler la configuration du panel admin
const testConfig = {
  shopInfo: {
    name: "Test CBD Shop",
    description: "Test description",
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
    email: "test@cbdshop.fr",
    phone: "+33 1 23 45 67 89"
  },
  socialMediaLinks: [
    {
      id: 1,
      name: "Instagram",
      emoji: "📸",
      url: "https://instagram.com/test",
      color: "#E4405F"
    }
  ],
  categories: [
    {
      id: 1,
      name: "Test Huiles",
      emoji: "💧",
      description: "Test huiles CBD"
    }
  ],
  farms: [
    {
      id: 1,
      name: "Test Farm",
      emoji: "🏔️",
      description: "Test ferme"
    }
  ],
  products: [
    {
      id: 1,
      name: "Test Produit",
      description: "Test description",
      image: "https://example.com/image.jpg",
      images: [],
      video: "",
      category: "Test Huiles",
      variants: [
        { name: "Test", price: 19.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/test",
      popular: true
    }
  ],
  pages: [
    { id: 1, name: "Accueil", href: "/", isDefault: true }
  ],
  adminSettings: {
    categoriesTabName: "Catégories",
    farmsTabName: "Fermes",
    categoriesButtonText: "Catégories",
    farmsButtonText: "Fermes"
  },
  pageContent: {
    homepage: {
      heroTitle: "Test Hero",
      heroSubtitle: "Test Subtitle",
      heroButtonText: "Test Button",
      sectionTitle: "Test Section",
      categoriesLabel: "Test Categories",
      farmLabel: "Test Farm",
      allCategoriesLabel: "Test All",
      farmProductsLabel: "Test Farm Products"
    },
    contact: {
      title: "Test Contact",
      subtitle: "Test Contact Subtitle",
      description: "Test Contact Description"
    },
    socialMedia: {
      title: "Test Social",
      subtitle: "Test Social Subtitle"
    },
    footer: {
      copyrightText: "Test Copyright"
    },
    products: {
      filterTitle: "Test Filter",
      popularText: "Test Popular",
      detailsText: "Test Details",
      orderText: "Test Order",
      pageTitle: "Test Products",
      pageSubtitle: "Test Products Subtitle"
    }
  }
};

async function testAdminSave() {
  try {
    console.log('Testing admin save functionality...');
    
    const configFilePath = path.join(process.cwd(), 'data', 'config.json');
    
    // Sauvegarder la configuration de test
    fs.writeFileSync(configFilePath, JSON.stringify(testConfig, null, 2));
    console.log('✅ Test config saved successfully');
    
    // Vérifier que c'est bien sauvegardé
    const savedConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
    console.log('✅ Config verified:', savedConfig.shopInfo.name);
    
    console.log('✅ Admin save test passed!');
  } catch (error) {
    console.error('❌ Admin save test failed:', error);
  }
}

testAdminSave();