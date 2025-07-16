// Configuration Nhost côté serveur pour éviter les appels à localhost
export const nhostServerConfig = {
  subdomain: process.env.NHOST_SUBDOMAIN || process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'placeholder',
  region: process.env.NHOST_REGION || process.env.NEXT_PUBLIC_NHOST_REGION || 'eu-central-1',
  get graphqlUrl() {
    return `https://${this.subdomain}.${this.region}.nhost.run/v1/graphql`;
  },
  get authUrl() {
    return `https://${this.subdomain}.${this.region}.nhost.run/v1/auth`;
  },
  get storageUrl() {
    return `https://${this.subdomain}.${this.region}.nhost.run/v1/files`;
  }
};

// Fonction pour faire des appels sécurisés à Nhost
export async function nhostFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = `https://${nhostServerConfig.subdomain}.${nhostServerConfig.region}.nhost.run`;
  const url = `${baseUrl}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    
    if (!response.ok) {
      throw new Error(`Nhost request failed: ${response.status} ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    console.error('Nhost fetch error:', error);
    throw error;
  }
}