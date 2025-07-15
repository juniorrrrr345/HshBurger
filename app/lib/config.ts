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