const { getConfigAsync, saveConfigAsync, getNextId } = require('../../../../app/lib/config');

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    if (event.httpMethod === 'GET') {
      const config = await getConfigAsync();
      return {
        statusCode: 200,
        headers: {
          ...headers,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ success: true, data: config.products })
      };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { action, product } = body;
      const config = await getConfigAsync();

      switch (action) {
        case 'create':
          const newProduct = {
            id: getNextId(config.products),
            name: product.name,
            description: product.description,
            image: product.image,
            images: product.images || [],
            video: product.video || '',
            category: product.category,
            variants: product.variants || [{ name: '', price: 0, size: '' }],
            orderLink: product.orderLink,
            popular: product.popular || false,
            farm: product.farm
          };

          config.products.push(newProduct);
          const createSuccess = await saveConfigAsync(config);
          
          if (createSuccess) {
            return {
              statusCode: 200,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                data: newProduct, 
                message: 'Produit créé avec succès' 
              })
            };
          } else {
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Erreur lors de la création du produit' 
              })
            };
          }

        case 'update':
          const updateIndex = config.products.findIndex(p => p.id === product.id);
          if (updateIndex === -1) {
            return {
              statusCode: 404,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Produit non trouvé' 
              })
            };
          }

          config.products[updateIndex] = product;
          const updateSuccess = await saveConfigAsync(config);
          
          if (updateSuccess) {
            return {
              statusCode: 200,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                data: product, 
                message: 'Produit mis à jour avec succès' 
              })
            };
          } else {
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Erreur lors de la mise à jour du produit' 
              })
            };
          }

        case 'delete':
          const deleteIndex = config.products.findIndex(p => p.id === product.id);
          if (deleteIndex === -1) {
            return {
              statusCode: 404,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Produit non trouvé' 
              })
            };
          }

          config.products.splice(deleteIndex, 1);
          const deleteSuccess = await saveConfigAsync(config);
          
          if (deleteSuccess) {
            return {
              statusCode: 200,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                message: 'Produit supprimé avec succès' 
              })
            };
          } else {
            return {
              statusCode: 500,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: false, 
                error: 'Erreur lors de la suppression du produit' 
              })
            };
          }

        default:
          return {
            statusCode: 400,
            headers: {
              ...headers,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
              success: false, 
              error: 'Action non reconnue' 
            })
          };
      }
    }

    return {
      statusCode: 405,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Méthode non autorisée' 
      })
    };

  } catch (error) {
    console.error('Error in products API:', error);
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Erreur serveur' 
      })
    };
  }
};