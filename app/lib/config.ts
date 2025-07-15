export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  category: string;
  variants: {
    name: string;
    price: number;
    size: string;
  }[];
  orderLink: string;
  popular: boolean;
}

export interface Category {
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

export interface SiteConfig {
  shopInfo: {
    name: string;
    description: string;
    logo: string;
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
  products: Product[];
  pageContent: {
    homepage: {
      heroTitle: string;
      heroSubtitle: string;
      heroButtonText: string;
      sectionTitle: string;
      dropdownTitle: string;
      farmDropdownTitle: string;
      categoryDropdownTitle: string;
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
    primaryColor: "#16a34a",
    secondaryColor: "#000000",
    textColor: "#ffffff",
    backgroundColor: "#f9fafb",
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
      name: "Farm",
      emoji: "🌾",
      description: "Produits de la ferme CBD"
    }
  ],
  products: [
    {
      id: 1,
      name: "Huile CBD",
      description: "Huile de CBD premium, extraction CO2 supercritique.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
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
      name: "CBD Farm Fresh",
      description: "Produits CBD frais de notre ferme locale.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Farm",
      variants: [
        { name: "Pack 1", price: 29.90, size: "1kg" },
        { name: "Pack 2", price: 49.90, size: "2kg" },
        { name: "Pack 3", price: 79.90, size: "3kg" }
      ],
      orderLink: "https://example.com/order/farm-fresh",
      popular: true
    },
    {
      id: 7,
      name: "Huile Farm Bio",
      description: "Huile CBD bio cultivée dans notre ferme.",
      image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
      category: "Farm",
      variants: [
        { name: "10%", price: 34.90, size: "10ml" },
        { name: "15%", price: 44.90, size: "10ml" },
        { name: "20%", price: 54.90, size: "10ml" }
      ],
      orderLink: "https://example.com/order/farm-bio",
      popular: false
    }
  ],
  pageContent: {
    homepage: {
      heroTitle: "Produits CBD Premium",
      heroSubtitle: "Découvrez notre sélection de produits CBD de qualité supérieure",
      heroButtonText: "Voir nos produits",
      sectionTitle: "Nos Produits Populaires",
      dropdownTitle: "Filtrer par catégorie",
      farmDropdownTitle: "Appeler Farm",
      categoryDropdownTitle: "Catégories"
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
    }
  }
};

export function getConfig(): SiteConfig {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('siteConfig');
    if (stored) {
      try {
        return { ...defaultConfig, ...JSON.parse(stored) };
      } catch (e) {
        console.error('Error parsing config:', e);
      }
    }
  }
  return defaultConfig;
}

export function saveConfig(config: SiteConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('siteConfig', JSON.stringify(config));
  }
}

export function getNextId(items: { id: number }[]): number {
  return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
}