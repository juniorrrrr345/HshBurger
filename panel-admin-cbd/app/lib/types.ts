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
  farms: Farm[];
  products: Product[];
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