const http = require('http');

function testPanelSaveAPI() {
  console.log('Testing panel admin save via API...');
  
  // Configuration complète comme dans le panel admin
  const panelConfig = {
    shopInfo: {
      name: "CBD Shop Premium - API Test",
      description: "Test de sauvegarde via API",
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
      }
    ],
    categories: [
      {
        id: 1,
        name: "Huiles",
        emoji: "💧",
        description: "Huiles CBD de qualité premium"
      }
    ],
    farms: [
      {
        id: 1,
        name: "Mountain",
        emoji: "🏔️",
        description: "Produits CBD de la ferme Mountain"
      }
    ],
    products: [
      {
        id: 1,
        name: "Huile CBD Pure - API Test",
        description: "Test de sauvegarde via API",
        image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
        images: [],
        video: "",
        category: "Huiles",
        variants: [
          { name: "5%", price: 19.90, size: "10ml" }
        ],
        orderLink: "https://example.com/order/huile-pure",
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
        heroTitle: "Test API",
        heroSubtitle: "Test de sauvegarde via API",
        heroButtonText: "Test",
        sectionTitle: "Test",
        categoriesLabel: "Test",
        farmLabel: "Test",
        allCategoriesLabel: "Test",
        farmProductsLabel: "Test"
      },
      contact: {
        title: "Test",
        subtitle: "Test",
        description: "Test"
      },
      socialMedia: {
        title: "Test",
        subtitle: "Test"
      },
      footer: {
        copyrightText: "Test"
      },
      products: {
        filterTitle: "Test",
        popularText: "Test",
        detailsText: "Test",
        orderText: "Test",
        pageTitle: "Test",
        pageSubtitle: "Test"
      }
    }
  };

  const postData = JSON.stringify(panelConfig);

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/config',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      if (res.statusCode === 200) {
        console.log('✅ Panel API save test passed!');
        
        // Vérifier que la config a été sauvegardée
        const fs = require('fs');
        const path = require('path');
        const configFilePath = path.join(process.cwd(), 'data', 'config.json');
        
        try {
          const savedConfig = JSON.parse(fs.readFileSync(configFilePath, 'utf-8'));
          console.log('✅ Config verified:', savedConfig.shopInfo.name);
          console.log('✅ Products count:', savedConfig.products.length);
        } catch (error) {
          console.error('❌ Could not verify saved config:', error);
        }
      } else {
        console.log('❌ Panel API save test failed!');
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
  });

  req.write(postData);
  req.end();
}

testPanelSaveAPI();