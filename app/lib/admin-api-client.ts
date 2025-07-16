// Client API pour le panel d'administration
// À utiliser depuis un autre projet pour interagir avec l'API admin

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[];
  video?: string;
  category: string;
  variants: {
    name: string;
    price: number;
    size: string;
  }[];
  orderLink: string;
  popular: boolean;
  farm?: string;
}

export interface Category {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export interface Farm {
  id: number;
  name: string;
  emoji: string;
  description: string;
}

export interface SocialMediaLink {
  id: number;
  name: string;
  emoji: string;
  url: string;
  color: string;
}

export interface Page {
  id: number;
  name: string;
  href: string;
  isDefault: boolean;
}

export interface ShopInfo {
  name: string;
  description: string;
  logo: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
  backgroundImage: string;
}

export interface ContactInfo {
  orderLink: string;
  orderText: string;
  email: string;
  phone: string;
}

export interface AdminSettings {
  categoriesTabName: string;
  farmsTabName: string;
  categoriesButtonText: string;
  farmsButtonText: string;
}

export interface PageContent {
  homepage: {
    heroTitle: string;
    heroSubtitle: string;
    heroButtonText: string;
    sectionTitle: string;
    categoriesLabel: string;
    farmLabel: string;
    allCategoriesLabel: string;
    farmProductsLabel: string;
  };
  contact: {
    title: string;
    subtitle: string;
    description: string;
  };
  socialMedia: {
    title: string;
    subtitle: string;
  };
  footer: {
    copyrightText: string;
  };
  products: {
    filterTitle: string;
    popularText: string;
    detailsText: string;
    orderText: string;
    pageTitle: string;
    pageSubtitle: string;
  };
}

export interface SiteConfig {
  shopInfo: ShopInfo;
  contactInfo: ContactInfo;
  socialMediaLinks: SocialMediaLink[];
  categories: Category[];
  farms: Farm[];
  products: Product[];
  pages: Page[];
  adminSettings: AdminSettings;
  pageContent: PageContent;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export class AdminApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Supprimer le slash final
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return {
        success: false,
        error: `Erreur réseau: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
      };
    }
  }

  // Configuration générale
  async getConfig(): Promise<ApiResponse<SiteConfig>> {
    return this.request<SiteConfig>('/api/admin');
  }

  async saveConfig(config: SiteConfig): Promise<ApiResponse> {
    return this.request('/api/admin', {
      method: 'POST',
      body: JSON.stringify({
        action: 'saveConfig',
        data: config,
      }),
    });
  }

  // Produits
  async getProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>('/api/admin/products');
  }

  async createProduct(product: Omit<Product, 'id'>): Promise<ApiResponse<Product>> {
    return this.request<Product>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        product,
      }),
    });
  }

  async updateProduct(product: Product): Promise<ApiResponse<Product>> {
    return this.request<Product>('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        product,
      }),
    });
  }

  async deleteProduct(productId: number): Promise<ApiResponse> {
    return this.request('/api/admin/products', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        product: { id: productId },
      }),
    });
  }

  // Catégories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>('/api/admin/categories');
  }

  async createCategory(category: Omit<Category, 'id'>): Promise<ApiResponse<Category>> {
    return this.request<Category>('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        category,
      }),
    });
  }

  async updateCategory(category: Category): Promise<ApiResponse<Category>> {
    return this.request<Category>('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        category,
      }),
    });
  }

  async deleteCategory(categoryId: number): Promise<ApiResponse> {
    return this.request('/api/admin/categories', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        category: { id: categoryId },
      }),
    });
  }

  // Fermes
  async getFarms(): Promise<ApiResponse<Farm[]>> {
    return this.request<Farm[]>('/api/admin/farms');
  }

  async createFarm(farm: Omit<Farm, 'id'>): Promise<ApiResponse<Farm>> {
    return this.request<Farm>('/api/admin/farms', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        farm,
      }),
    });
  }

  async updateFarm(farm: Farm): Promise<ApiResponse<Farm>> {
    return this.request<Farm>('/api/admin/farms', {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        farm,
      }),
    });
  }

  async deleteFarm(farmId: number): Promise<ApiResponse> {
    return this.request('/api/admin/farms', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        farm: { id: farmId },
      }),
    });
  }

  // Réseaux sociaux
  async getSocialMedia(): Promise<ApiResponse<SocialMediaLink[]>> {
    return this.request<SocialMediaLink[]>('/api/admin/social-media');
  }

  async createSocialMedia(socialMedia: Omit<SocialMediaLink, 'id'>): Promise<ApiResponse<SocialMediaLink>> {
    return this.request<SocialMediaLink>('/api/admin/social-media', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        socialMedia,
      }),
    });
  }

  async updateSocialMedia(socialMedia: SocialMediaLink): Promise<ApiResponse<SocialMediaLink>> {
    return this.request<SocialMediaLink>('/api/admin/social-media', {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        socialMedia,
      }),
    });
  }

  async deleteSocialMedia(socialMediaId: number): Promise<ApiResponse> {
    return this.request('/api/admin/social-media', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        socialMedia: { id: socialMediaId },
      }),
    });
  }

  // Pages
  async getPages(): Promise<ApiResponse<Page[]>> {
    return this.request<Page[]>('/api/admin/pages');
  }

  async createPage(page: Omit<Page, 'id'>): Promise<ApiResponse<Page>> {
    return this.request<Page>('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify({
        action: 'create',
        page,
      }),
    });
  }

  async updatePage(page: Page): Promise<ApiResponse<Page>> {
    return this.request<Page>('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify({
        action: 'update',
        page,
      }),
    });
  }

  async deletePage(pageId: number): Promise<ApiResponse> {
    return this.request('/api/admin/pages', {
      method: 'POST',
      body: JSON.stringify({
        action: 'delete',
        page: { id: pageId },
      }),
    });
  }

  // Paramètres
  async getSettings(): Promise<ApiResponse<{
    shopInfo: ShopInfo;
    contactInfo: ContactInfo;
    adminSettings: AdminSettings;
    pageContent: PageContent;
  }>> {
    return this.request('/api/admin/settings');
  }

  async updateShopInfo(shopInfo: Partial<ShopInfo>): Promise<ApiResponse> {
    return this.request('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateShopInfo',
        data: shopInfo,
      }),
    });
  }

  async updateContactInfo(contactInfo: Partial<ContactInfo>): Promise<ApiResponse> {
    return this.request('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateContactInfo',
        data: contactInfo,
      }),
    });
  }

  async updateAdminSettings(adminSettings: Partial<AdminSettings>): Promise<ApiResponse> {
    return this.request('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updateAdminSettings',
        data: adminSettings,
      }),
    });
  }

  async updatePageContent(section: keyof PageContent, data: any): Promise<ApiResponse> {
    return this.request('/api/admin/settings', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updatePageContent',
        section,
        data,
      }),
    });
  }
}

// Exemple d'utilisation :
/*
const adminApi = new AdminApiClient('https://votre-domaine.com');

// Récupérer tous les produits
const productsResponse = await adminApi.getProducts();
if (productsResponse.success) {
  console.log('Produits:', productsResponse.data);
}

// Créer un nouveau produit
const newProduct = {
  name: 'Huile CBD 10%',
  description: 'Huile CBD de qualité premium',
  image: 'url-image.jpg',
  category: 'Huiles',
  variants: [{ name: '10ml', price: 29.99, size: '10ml' }],
  orderLink: 'https://example.com/order',
  popular: true
};

const createResponse = await adminApi.createProduct(newProduct);
if (createResponse.success) {
  console.log('Produit créé:', createResponse.data);
}
*/