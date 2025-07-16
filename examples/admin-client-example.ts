// Exemple d'utilisation du client API admin depuis un autre projet
// Ce fichier montre comment intégrer l'API admin dans un projet externe

import { AdminApiClient } from '../app/lib/admin-api-client';

// Configuration du client API
const API_BASE_URL = 'https://votre-domaine.com'; // Remplacez par votre domaine
const adminApi = new AdminApiClient(API_BASE_URL);

// Exemple de classe pour gérer l'administration depuis un autre projet
export class AdminPanelManager {
  private apiClient: AdminApiClient;

  constructor(baseUrl: string) {
    this.apiClient = new AdminApiClient(baseUrl);
  }

  // ===== GESTION DES PRODUITS =====
  
  async getAllProducts() {
    const response = await this.apiClient.getProducts();
    if (response.success) {
      console.log('Produits récupérés:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la récupération des produits:', response.error);
      return [];
    }
  }

  async createNewProduct(productData: {
    name: string;
    description: string;
    image: string;
    category: string;
    price: number;
    orderLink: string;
  }) {
    const newProduct = {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      images: [],
      video: '',
      category: productData.category,
      variants: [
        {
          name: 'Standard',
          price: productData.price,
          size: 'Standard'
        }
      ],
      orderLink: productData.orderLink,
      popular: false
    };

    const response = await this.apiClient.createProduct(newProduct);
    if (response.success) {
      console.log('Produit créé avec succès:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la création du produit:', response.error);
      return null;
    }
  }

  async updateProduct(productId: number, updates: any) {
    // D'abord, récupérer le produit existant
    const products = await this.getAllProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      console.error('Produit non trouvé');
      return null;
    }

    // Mettre à jour le produit
    const updatedProduct = { ...product, ...updates };
    const response = await this.apiClient.updateProduct(updatedProduct);
    
    if (response.success) {
      console.log('Produit mis à jour avec succès:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la mise à jour du produit:', response.error);
      return null;
    }
  }

  async deleteProduct(productId: number) {
    const response = await this.apiClient.deleteProduct(productId);
    if (response.success) {
      console.log('Produit supprimé avec succès');
      return true;
    } else {
      console.error('Erreur lors de la suppression du produit:', response.error);
      return false;
    }
  }

  // ===== GESTION DES CATÉGORIES =====

  async getAllCategories() {
    const response = await this.apiClient.getCategories();
    if (response.success) {
      console.log('Catégories récupérées:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la récupération des catégories:', response.error);
      return [];
    }
  }

  async createCategory(name: string, emoji: string, description: string) {
    const newCategory = {
      name,
      emoji,
      description
    };

    const response = await this.apiClient.createCategory(newCategory);
    if (response.success) {
      console.log('Catégorie créée avec succès:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la création de la catégorie:', response.error);
      return null;
    }
  }

  // ===== GESTION DES FERMES =====

  async getAllFarms() {
    const response = await this.apiClient.getFarms();
    if (response.success) {
      console.log('Fermes récupérées:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la récupération des fermes:', response.error);
      return [];
    }
  }

  async createFarm(name: string, emoji: string, description: string) {
    const newFarm = {
      name,
      emoji,
      description
    };

    const response = await this.apiClient.createFarm(newFarm);
    if (response.success) {
      console.log('Ferme créée avec succès:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la création de la ferme:', response.error);
      return null;
    }
  }

  // ===== GESTION DES RÉSEAUX SOCIAUX =====

  async getAllSocialMedia() {
    const response = await this.apiClient.getSocialMedia();
    if (response.success) {
      console.log('Réseaux sociaux récupérés:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la récupération des réseaux sociaux:', response.error);
      return [];
    }
  }

  async addSocialMedia(name: string, emoji: string, url: string, color: string) {
    const newSocialMedia = {
      name,
      emoji,
      url,
      color
    };

    const response = await this.apiClient.createSocialMedia(newSocialMedia);
    if (response.success) {
      console.log('Réseau social ajouté avec succès:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de l\'ajout du réseau social:', response.error);
      return null;
    }
  }

  // ===== GESTION DES PARAMÈTRES =====

  async getSiteSettings() {
    const response = await this.apiClient.getSettings();
    if (response.success) {
      console.log('Paramètres récupérés:', response.data);
      return response.data;
    } else {
      console.error('Erreur lors de la récupération des paramètres:', response.error);
      return null;
    }
  }

  async updateShopName(newName: string) {
    const response = await this.apiClient.updateShopInfo({
      name: newName
    });
    
    if (response.success) {
      console.log('Nom de la boutique mis à jour avec succès');
      return true;
    } else {
      console.error('Erreur lors de la mise à jour du nom:', response.error);
      return false;
    }
  }

  async updateContactEmail(newEmail: string) {
    const response = await this.apiClient.updateContactInfo({
      email: newEmail
    });
    
    if (response.success) {
      console.log('Email de contact mis à jour avec succès');
      return true;
    } else {
      console.error('Erreur lors de la mise à jour de l\'email:', response.error);
      return false;
    }
  }

  async updateHomepageTitle(newTitle: string) {
    const response = await this.apiClient.updatePageContent('homepage', {
      heroTitle: newTitle
    });
    
    if (response.success) {
      console.log('Titre de la page d\'accueil mis à jour avec succès');
      return true;
    } else {
      console.error('Erreur lors de la mise à jour du titre:', response.error);
      return false;
    }
  }

  // ===== FONCTIONS UTILITAIRES =====

  async getProductById(productId: number) {
    const products = await this.getAllProducts();
    return products.find(p => p.id === productId);
  }

  async getProductsByCategory(categoryName: string) {
    const products = await this.getAllProducts();
    return products.filter(p => p.category === categoryName);
  }

  async getPopularProducts() {
    const products = await this.getAllProducts();
    return products.filter(p => p.popular);
  }

  async getProductsByFarm(farmName: string) {
    const products = await this.getAllProducts();
    return products.filter(p => p.farm === farmName);
  }

  // ===== FONCTIONS DE SYNCHRONISATION =====

  async syncAllData() {
    console.log('Synchronisation de toutes les données...');
    
    const [products, categories, farms, socialMedia, settings] = await Promise.all([
      this.getAllProducts(),
      this.getAllCategories(),
      this.getAllFarms(),
      this.getAllSocialMedia(),
      this.getSiteSettings()
    ]);

    return {
      products,
      categories,
      farms,
      socialMedia,
      settings
    };
  }
}

// Exemple d'utilisation
async function exampleUsage() {
  const adminManager = new AdminPanelManager(API_BASE_URL);

  try {
    // Récupérer tous les produits
    const products = await adminManager.getAllProducts();
    console.log(`Nombre de produits: ${products.length}`);

    // Créer un nouveau produit
    const newProduct = await adminManager.createNewProduct({
      name: 'Huile CBD 15%',
      description: 'Huile CBD de concentration élevée',
      image: 'https://example.com/huile-cbd-15.jpg',
      category: 'Huiles',
      price: 39.99,
      orderLink: 'https://example.com/order/huile-cbd-15'
    });

    if (newProduct) {
      console.log('Nouveau produit créé:', newProduct.name);
    }

    // Mettre à jour le nom de la boutique
    await adminManager.updateShopName('CBD Shop Premium Plus');

    // Ajouter un réseau social
    await adminManager.addSocialMedia('TikTok', '🎵', 'https://tiktok.com/@cbdshop', '#000000');

    // Récupérer les produits populaires
    const popularProducts = await adminManager.getPopularProducts();
    console.log(`Nombre de produits populaires: ${popularProducts.length}`);

    // Synchroniser toutes les données
    const allData = await adminManager.syncAllData();
    console.log('Synchronisation terminée:', allData);

  } catch (error) {
    console.error('Erreur lors de l\'utilisation de l\'API admin:', error);
  }
}

// Exemple d'utilisation dans une application React/Next.js
export function useAdminPanel() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const adminManager = new AdminPanelManager(API_BASE_URL);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await adminManager.syncAllData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData: any) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await adminManager.createNewProduct(productData);
      if (result) {
        // Recharger les données
        await fetchData();
      }
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    fetchData,
    createProduct,
    adminManager
  };
}

// Exemple d'utilisation dans un composant React
/*
function AdminPanel() {
  const { loading, error, data, fetchData, createProduct } = useAdminPanel();

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateProduct = async () => {
    const newProduct = await createProduct({
      name: 'Nouveau Produit',
      description: 'Description du produit',
      image: 'https://example.com/image.jpg',
      category: 'Huiles',
      price: 29.99,
      orderLink: 'https://example.com/order'
    });

    if (newProduct) {
      alert('Produit créé avec succès!');
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1>Panel d'Administration</h1>
      <button onClick={handleCreateProduct}>Créer un produit</button>
      
      <h2>Produits ({data?.products?.length || 0})</h2>
      {data?.products?.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Prix: {product.variants[0]?.price}€</p>
        </div>
      ))}
    </div>
  );
}
*/