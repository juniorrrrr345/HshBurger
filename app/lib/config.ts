export interface SiteConfig {
  socialMediaLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    whatsapp: string;
  };
  contactInfo: {
    orderLink: string;
    orderText: string;
    email: string;
    phone: string;
  };
  shopInfo: {
    name: string;
    description: string;
  };
  pageContent: {
    homepage: {
      heroTitle: string;
      heroSubtitle: string;
      heroButtonText: string;
      sectionTitle: string;
    };
    contact: {
      title: string;
      subtitle: string;
      description: string;
    };
    socialMedia: {
      title: string;
      subtitle: string;
      ctaTitle: string;
      ctaSubtitle: string;
    };
  };
}

export const defaultConfig: SiteConfig = {
  socialMediaLinks: {
    instagram: "https://instagram.com/cbdshop",
    facebook: "https://facebook.com/cbdshop",
    twitter: "https://twitter.com/cbdshop",
    whatsapp: "https://wa.me/33123456789"
  },
  contactInfo: {
    orderLink: "https://example.com/order",
    orderText: "Commandez maintenant via WhatsApp",
    email: "contact@cbdshop.fr",
    phone: "+33 1 23 45 67 89"
  },
  shopInfo: {
    name: "CBD Shop Premium",
    description: "Votre boutique CBD de confiance"
  },
  pageContent: {
    homepage: {
      heroTitle: "Produits CBD Premium",
      heroSubtitle: "Découvrez notre sélection de produits CBD de qualité supérieure",
      heroButtonText: "Voir nos produits",
      sectionTitle: "Nos Produits Populaires"
    },
    contact: {
      title: "Contactez-nous",
      subtitle: "Nous sommes là pour vous aider",
      description: "Pour toute commande ou question, contactez-nous directement via notre plateforme de commande."
    },
    socialMedia: {
      title: "Suivez-nous sur les réseaux sociaux",
      subtitle: "Restez connecté avec nous pour les dernières actualités et offres exclusives",
      ctaTitle: "Rejoignez notre communauté !",
      ctaSubtitle: "Soyez les premiers informés de nos nouvelles offres et produits"
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