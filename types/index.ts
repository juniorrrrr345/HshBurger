export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  prices: ProductPrice[];
  category: string;
  inStock: boolean;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductPrice {
  id: string;
  variant: string;
  price: number;
  originalPrice?: number;
  unit: string;
}

export interface ShopSettings {
  name: string;
  description: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image?: string;
}