import { Product, ShopSettings, Page, Category } from '@/types';

// Stockage local pour les données de la boutique
class LocalStorage {
  private static instance: LocalStorage;
  private isClient: boolean;

  constructor() {
    this.isClient = typeof window !== 'undefined';
  }

  static getInstance(): LocalStorage {
    if (!LocalStorage.instance) {
      LocalStorage.instance = new LocalStorage();
    }
    return LocalStorage.instance;
  }

  // Produits
  getProducts(): Product[] {
    if (!this.isClient) return [];
    const products = localStorage.getItem('cbd-products');
    return products ? JSON.parse(products) : this.getDefaultProducts();
  }

  saveProducts(products: Product[]): void {
    if (!this.isClient) return;
    localStorage.setItem('cbd-products', JSON.stringify(products));
  }

  // Paramètres de la boutique
  getShopSettings(): ShopSettings {
    if (!this.isClient) return this.getDefaultSettings();
    const settings = localStorage.getItem('cbd-shop-settings');
    return settings ? JSON.parse(settings) : this.getDefaultSettings();
  }

  saveShopSettings(settings: ShopSettings): void {
    if (!this.isClient) return;
    localStorage.setItem('cbd-shop-settings', JSON.stringify(settings));
  }

  // Pages
  getPages(): Page[] {
    if (!this.isClient) return [];
    const pages = localStorage.getItem('cbd-pages');
    return pages ? JSON.parse(pages) : this.getDefaultPages();
  }

  savePages(pages: Page[]): void {
    if (!this.isClient) return;
    localStorage.setItem('cbd-pages', JSON.stringify(pages));
  }

  // Catégories
  getCategories(): Category[] {
    if (!this.isClient) return [];
    const categories = localStorage.getItem('cbd-categories');
    return categories ? JSON.parse(categories) : this.getDefaultCategories();
  }

  saveCategories(categories: Category[]): void {
    if (!this.isClient) return;
    localStorage.setItem('cbd-categories', JSON.stringify(categories));
  }

  // Données par défaut
  private getDefaultSettings(): ShopSettings {
    return {
      name: 'CBD Shop',
      description: 'Votre boutique CBD de qualité premium',
      logo: '/logo.png',
      colors: {
        primary: '#22c55e',
        secondary: '#16a34a',
        text: '#1f2937',
        background: '#ffffff'
      },
      background: {
        type: 'color',
        value: '#f9fafb',
        opacity: 100
      },
      contact: {
        email: 'contact@cbdshop.com',
        phone: '+33 1 23 45 67 89',
        address: '123 Rue de la Paix, 75001 Paris'
      },
      social: {
        facebook: '',
        instagram: '',
        twitter: ''
      }
    };
  }

  private getDefaultProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Huile CBD 10%',
        description: 'Huile de CBD premium 10% - 10ml. Extraction CO2 supercritique pour une qualité optimale.',
        images: ['/products/huile-cbd-10.jpg'],
        prices: [
          { id: '1', variant: '10ml', price: 29.90, unit: 'flacon' },
          { id: '2', variant: '20ml', price: 54.90, originalPrice: 59.80, unit: 'flacon' }
        ],
        category: 'huiles',
        inStock: true,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Fleurs CBD Amnesia',
        description: 'Fleurs de CBD Amnesia - Taux de CBD 18%. Cultivées en indoor, saveur citronnée.',
        images: ['/products/fleurs-amnesia.jpg'],
        prices: [
          { id: '3', variant: '1g', price: 8.90, unit: 'gramme' },
          { id: '4', variant: '3g', price: 24.90, originalPrice: 26.70, unit: 'grammes' },
          { id: '5', variant: '5g', price: 39.90, originalPrice: 44.50, unit: 'grammes' }
        ],
        category: 'fleurs',
        inStock: true,
        featured: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultPages(): Page[] {
    return [
      {
        id: '1',
        title: 'À propos',
        slug: 'a-propos',
        content: `
          <h1>À propos de notre boutique CBD</h1>
          <p>Bienvenue dans notre boutique CBD de qualité premium. Nous nous engageons à vous offrir les meilleurs produits CBD, soigneusement sélectionnés et testés.</p>
          
          <h2>Notre mission</h2>
          <p>Démocratiser l'accès aux bienfaits du CBD en proposant des produits de qualité pharmaceutique à des prix abordables.</p>
          
          <h2>Nos valeurs</h2>
          <ul>
            <li>Qualité et transparence</li>
            <li>Respect de la réglementation</li>
            <li>Service client exceptionnel</li>
            <li>Engagement environnemental</li>
          </ul>
        `,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Mentions légales',
        slug: 'mentions-legales',
        content: `
          <h1>Mentions légales</h1>
          <p>Conformément à la loi française, tous nos produits CBD contiennent moins de 0,3% de THC.</p>
          
          <h2>Informations légales</h2>
          <p>Raison sociale : CBD Shop SARL<br>
          Adresse : 123 Rue de la Paix, 75001 Paris<br>
          SIRET : 123 456 789 00012<br>
          TVA : FR12345678901</p>
          
          <h2>Responsabilité</h2>
          <p>Les produits CBD ne sont pas destinés à diagnostiquer, traiter, guérir ou prévenir une maladie.</p>
        `,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }

  private getDefaultCategories(): Category[] {
    return [
      {
        id: '1',
        name: 'Huiles CBD',
        description: 'Huiles de CBD de différentes concentrations',
        image: '/categories/huiles.jpg'
      },
      {
        id: '2',
        name: 'Fleurs CBD',
        description: 'Fleurs de CBD premium indoor et outdoor',
        image: '/categories/fleurs.jpg'
      },
      {
        id: '3',
        name: 'Résines CBD',
        description: 'Résines et hash CBD artisanaux',
        image: '/categories/resines.jpg'
      }
    ];
  }
}

export const storage = LocalStorage.getInstance();