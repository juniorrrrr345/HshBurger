const http = require('http');

function testAdminAPI() {
  console.log('Testing admin API connection...');
  
  const postData = JSON.stringify({
    shopInfo: {
      name: "Test API Connection",
      description: "Testing API connection from admin panel"
    },
    contactInfo: {
      orderLink: "https://example.com/order",
      orderText: "Commandez maintenant",
      email: "test@cbdshop.fr",
      phone: "+33 1 23 45 67 89"
    },
    socialMediaLinks: [],
    categories: [],
    farms: [],
    products: [],
    pages: [],
    adminSettings: {
      categoriesTabName: "Catégories",
      farmsTabName: "Fermes",
      categoriesButtonText: "Catégories",
      farmsButtonText: "Fermes"
    },
    pageContent: {
      homepage: {
        heroTitle: "Test",
        heroSubtitle: "Test",
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
  });

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
        console.log('✅ Admin API test passed!');
      } else {
        console.log('❌ Admin API test failed!');
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Request error:', e.message);
  });

  req.write(postData);
  req.end();
}

testAdminAPI();