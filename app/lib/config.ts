export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  images?: string[]; // Images multiples optionnelles
  video?: string; // Vidéo optionnelle
  category: string;
  variants: {
    name: string;
    price: number;
    size: string;
  }[];
  orderLink: string;
  popular: boolean;
  farm?: string; // Ferme pour les produits Farm
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

export interface Page {
  id: number;
  name: string;
  href: string;
  isDefault: boolean; // Les pages par défaut ne peuvent pas être supprimées
  content?: {
    title: string;
    subtitle?: string;
    description?: string;
    heroTitle?: string;
    heroSubtitle?: string;
    heroButtonText?: string;
  };
}

export interface SocialMediaLink {
  id: number;
  name: string;
  emoji: string;
  url: string;
  color: string;
}

export interface SiteConfig {
  shopInfo: {
    name: string;
    description: string;
    logo: string;
    logoUrl: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    backgroundImage: string;
  };
  contactInfo: {
    orderLink: string;
    orderText: string;
    email: string;
    phone: string;
  };
  socialMediaLinks: SocialMediaLink[];
  categories: Category[];
  farms: Farm[]; // Fermes au lieu de localisations
  products: Product[];
  pages: Page[];
  adminSettings: {
    categoriesTabName: string;
    farmsTabName: string;
    categoriesButtonText: string;
    farmsButtonText: string;
  };
  pageContent: {
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
  };
}

export const defaultConfig: SiteConfig = {
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
    },
    {
      id: 4,
      name: "Riverside",
      emoji: "🌊",
      description: "Produits CBD de la ferme Riverside"
    }
  ],
  pages: [
    {
      id: 1,
      name: "Accueil",
      href: "/",
      isDefault: true,
      content: {
        title: "Accueil",
        subtitle: "Bienvenue sur notre boutique",
        description: "Découvrez nos produits CBD de qualité premium",
        heroTitle: "Produits CBD Premium",
        heroSubtitle: "Découvrez notre sélection de produits CBD de qualité supérieure",
        heroButtonText: "Voir nos produits"
      }
    },
    {
      id: 2,
      name: "Produits",
      href: "/produits",
      isDefault: true,
      content: {
        title: "Nos Produits",
        subtitle: "Découvrez toute notre gamme de produits CBD de qualité premium",
        description: "Explorez notre collection complète de produits CBD"
      }
    },
    {
      id: 3,
      name: "Contact",
      href: "/contact",
      isDefault: true,
      content: {
        title: "Contactez-nous",
        subtitle: "Nous sommes là pour vous aider",
        description: "Pour toute commande ou question, contactez-nous directement via notre plateforme de commande."
      }
    },
    {
      id: 4,
      name: "Réseaux Sociaux",
      href: "/reseaux-sociaux",
      isDefault: true
    }
  ],
  products: [
    {
      id: 1,
      name: "Huile CBD",
      description: "Huile de CBD premium, extraction CO2 supercritique.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Huiles",
      variants: [
        { name: "10%", price: 29.90, size: "10ml" },
        { name: "15%", price: 39.90, size: "10ml" },
        { name: "20%", price: 49.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/huile-cbd",
      popular: true
    },
    {
      id: 2,
      name: "Fleurs CBD Amnesia",
      description: "Fleurs de CBD Amnesia séchées, arôme fruité.",
      image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Fleurs",
      variants: [
        { name: "1g", price: 8.90, size: "1g" },
        { name: "3g", price: 24.90, size: "3g" },
        { name: "5g", price: 39.90, size: "5g" }
      ],
      orderLink: "https://example.com/order/fleurs-amnesia",
      popular: true
    },
    {
      id: 3,
      name: "Résine CBD Hash",
      description: "Résine CBD Hash artisanale, texture fondante.",
      image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Résines",
      variants: [
        { name: "1g", price: 12.90, size: "1g" },
        { name: "3g", price: 35.90, size: "3g" },
        { name: "5g", price: 55.90, size: "5g" }
      ],
      orderLink: "https://example.com/order/resine-hash",
      popular: true
    },
    {
      id: 4,
      name: "Huile CBD Full Spectrum",
      description: "Huile de CBD Full Spectrum, effet d'entourage.",
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
      orderLink: "https://example.com/order/huile-full-spectrum",
      popular: false
    },
    {
      id: 5,
      name: "Fleurs CBD Lemon Haze",
      description: "Fleurs CBD Lemon Haze au parfum citronné.",
      image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Fleurs",
      variants: [
        { name: "1g", price: 9.90, size: "1g" },
        { name: "3g", price: 27.90, size: "3g" },
        { name: "5g", price: 44.90, size: "5g" }
      ],
      orderLink: "https://example.com/order/fleurs-lemon-haze",
      popular: false
    },
    {
      id: 6,
      name: "Fleurs CBD Mountain Premium",
      description: "Fleurs CBD cultivées à la ferme Mountain, qualité exceptionnelle.",
      image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Farm",
      farm: "Mountain",
      variants: [
        { name: "1g", price: 12.90, size: "1g" },
        { name: "3g", price: 34.90, size: "3g" },
        { name: "5g", price: 54.90, size: "5g" }
      ],
      orderLink: "https://example.com/order/fleurs-mountain",
      popular: true
    },
    {
      id: 7,
      name: "Huile CBD Valley Artisanale",
      description: "Huile CBD artisanale de la ferme Valley, méthode traditionnelle.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Farm",
      farm: "Valley",
      variants: [
        { name: "10%", price: 32.90, size: "10ml" },
        { name: "15%", price: 42.90, size: "10ml" },
        { name: "20%", price: 52.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/huile-valley",
      popular: false
    },
    {
      id: 8,
      name: "Résine CBD Forest",
      description: "Résine CBD de la ferme Forest, goût naturel.",
      image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop"
      ],
      video: "",
      category: "Farm",
      farm: "Forest",
      variants: [
        { name: "1g", price: 14.90, size: "1g" },
        { name: "3g", price: 38.90, size: "3g" },
        { name: "5g", price: 58.90, size: "5g" }
      ],
      orderLink: "https://example.com/order/resine-forest",
      popular: true
    }
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

export function getConfig(): SiteConfig {
  // Retourner la config par défaut côté serveur
  if (typeof window === 'undefined') {
    return defaultConfig;
  }
  
  // Côté client, on utilisera l'API
  return defaultConfig;
}

export async function getConfigAsync(): Promise<SiteConfig> {
  try {
    // Utiliser une URL absolue pour éviter les problèmes de routing
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const apiUrl = `${baseUrl}/api/config`;
    
    const response = await fetch(apiUrl);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching config:', error);
  }
  return defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  // Cette fonction est maintenant asynchrone, utiliser saveConfigAsync à la place
  console.warn('saveConfig is deprecated, use saveConfigAsync instead');
}

export async function saveConfigAsync(config: SiteConfig): Promise<boolean> {
  try {
    console.log('saveConfigAsync: Starting save process');
    
    // Utiliser une URL absolue pour éviter les problèmes de routing
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const apiUrl = `${baseUrl}/api/config`;
    
    console.log('saveConfigAsync: Using URL:', apiUrl);
    console.log('saveConfigAsync: Config structure:', Object.keys(config));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    console.log('saveConfigAsync: Response status:', response.status);
    console.log('saveConfigAsync: Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const result = await response.json();
      console.log('saveConfigAsync: Response data:', result);
      return true;
    } else {
      const errorData = await response.json().catch(() => ({}));
      console.error('saveConfigAsync: Response not ok:', response.status, errorData);
      return false;
    }
  } catch (error) {
    console.error('saveConfigAsync: Network error:', error);
    return false;
  }
}

export function getNextId(items: { id: number }[]): number {
  if (items.length === 0) return 1;
  return Math.max(...items.map(item => item.id)) + 1;
}

// Supabase configuration fallback to prevent build errors
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://placeholder.supabase.co',
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder-key'
};