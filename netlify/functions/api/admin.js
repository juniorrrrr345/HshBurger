const { getConfigAsync, saveConfigAsync } = require('../../../app/lib/config');

exports.handler = async (event, context) => {
  // Configuration CORS pour Netlify
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Gérer les requêtes OPTIONS (preflight)
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
        body: JSON.stringify({ success: true, data: config })
      };
    }

    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const { action, data } = body;

      switch (action) {
        case 'saveConfig':
          const success = await saveConfigAsync(data);
          if (success) {
            return {
              statusCode: 200,
              headers: {
                ...headers,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ 
                success: true, 
                message: 'Configuration sauvegardée avec succès' 
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
                error: 'Erreur lors de la sauvegarde' 
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
    console.error('Error in admin API:', error);
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