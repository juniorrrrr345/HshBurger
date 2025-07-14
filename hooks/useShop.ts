import { useState, useEffect } from 'react';
import { Product, ShopSettings, Page, Category } from '@/types';
import { storage } from '@/lib/storage';

// Hook pour les produits
export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = storage.getProducts();
      setProducts(savedProducts);
      setLoading(false);
    };

    loadProducts();
  }, []);

  const saveProducts = (newProducts: Product[]) => {
    storage.saveProducts(newProducts);
    setProducts(newProducts);
  };

  const addProduct = (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id
        ? { ...product, ...updates, updatedAt: new Date().toISOString() }
        : product
    );
    saveProducts(updatedProducts);
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    saveProducts(updatedProducts);
  };

  const getProductById = (id: string) => {
    return products.find(product => product.id === id);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured && product.inStock);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts
  };
}

// Hook pour les paramètres de la boutique
export function useShopSettings() {
  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = () => {
      const savedSettings = storage.getShopSettings();
      setSettings(savedSettings);
      setLoading(false);
    };

    loadSettings();
  }, []);

  const updateSettings = (newSettings: Partial<ShopSettings>) => {
    if (!settings) return;
    
    const updatedSettings = { ...settings, ...newSettings };
    storage.saveShopSettings(updatedSettings);
    setSettings(updatedSettings);
  };

  const resetSettings = () => {
    localStorage.removeItem('cbd-shop-settings');
    const defaultSettings = storage.getShopSettings();
    setSettings(defaultSettings);
  };

  return {
    settings,
    loading,
    updateSettings,
    resetSettings
  };
}

// Hook pour les pages
export function usePages() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPages = () => {
      const savedPages = storage.getPages();
      setPages(savedPages);
      setLoading(false);
    };

    loadPages();
  }, []);

  const savePages = (newPages: Page[]) => {
    storage.savePages(newPages);
    setPages(newPages);
  };

  const addPage = (page: Omit<Page, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPage: Page = {
      ...page,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPages = [...pages, newPage];
    savePages(updatedPages);
    return newPage;
  };

  const updatePage = (id: string, updates: Partial<Page>) => {
    const updatedPages = pages.map(page =>
      page.id === id
        ? { ...page, ...updates, updatedAt: new Date().toISOString() }
        : page
    );
    savePages(updatedPages);
  };

  const deletePage = (id: string) => {
    const updatedPages = pages.filter(page => page.id !== id);
    savePages(updatedPages);
  };

  const getPageBySlug = (slug: string) => {
    return pages.find(page => page.slug === slug && page.isActive);
  };

  const getActivePages = () => {
    return pages.filter(page => page.isActive);
  };

  return {
    pages,
    loading,
    addPage,
    updatePage,
    deletePage,
    getPageBySlug,
    getActivePages
  };
}

// Hook pour les catégories
export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = () => {
      const savedCategories = storage.getCategories();
      setCategories(savedCategories);
      setLoading(false);
    };

    loadCategories();
  }, []);

  const saveCategories = (newCategories: Category[]) => {
    storage.saveCategories(newCategories);
    setCategories(newCategories);
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    const updatedCategories = [...categories, newCategory];
    saveCategories(updatedCategories);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    const updatedCategories = categories.map(category =>
      category.id === id ? { ...category, ...updates } : category
    );
    saveCategories(updatedCategories);
  };

  const deleteCategory = (id: string) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    saveCategories(updatedCategories);
  };

  const getCategoryById = (id: string) => {
    return categories.find(category => category.id === id);
  };

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
  };
}