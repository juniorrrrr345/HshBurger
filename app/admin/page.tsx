'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig, getConfigAsync, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialMediaLink | null>(null);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const defaultConfig = getConfig();
        setConfig(defaultConfig);
        setIsLoading(false);
        
        try {
          const loadedConfig = await getConfigAsync();
          setConfig(loadedConfig);
        } catch (apiError) {
          console.warn('Could not load config from API, using default:', apiError);
        }
      } catch (error) {
        console.error('Error loading config:', error);
        setMessage('Erreur lors du chargement de la configuration');
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const autoSave = async (newConfig: SiteConfig) => {
    if (!newConfig) return;
    
    if (typeof window === 'undefined') return;
    
    try {
      console.log('Admin: Auto-saving configuration to Nhost...');
      
      const apiUrl = `${window.location.origin}/api/config-nhost`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newConfig),
      });
      
      if (response.ok) {
        console.log('Admin: Auto-save successful');
        setMessage('Sauvegarde automatique réussie');
        setTimeout(() => setMessage(''), 2000);
      } else {
        console.error('Admin: Auto-save failed:', response.status);
        const errorData = await response.json().catch(() => ({}));
        console.error('Admin: Auto-save error details:', errorData);
        setMessage('Erreur lors de la sauvegarde automatique');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Admin: Auto-save error:', error);
      setMessage('Erreur lors de la sauvegarde automatique');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const updateConfig = async (section: keyof SiteConfig, updates: any) => {
    if (!config) return;
    const newConfig = {
      ...config,
      [section]: {
        ...config[section],
        ...updates
      }
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  const updatePageContent = async (page: keyof SiteConfig['pageContent'], key: string, value: string) => {
    if (!config) return;
    const newConfig = {
      ...config,
      pageContent: {
        ...config.pageContent,
        [page]: {
          ...config.pageContent[page],
          [key]: value
        }
      }
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  // Product management
  const addProduct = () => {
    if (!config) return;
    const newProduct: Product = {
      id: getNextId(config.products),
      name: '',
      description: '',
      image: '',
      images: [],
      video: '',
      category: config.categories[0]?.name || '',
      variants: [{ name: '', price: 0, size: '' }],
      orderLink: '',
      popular: false
    };
    setEditingProduct(newProduct);
  };

  const saveProduct = async () => {
    if (!config || !editingProduct) return;
    
    const existingIndex = config.products.findIndex(p => p.id === editingProduct.id);
    let newProducts;
    
    if (existingIndex >= 0) {
      newProducts = [...config.products];
      newProducts[existingIndex] = editingProduct;
    } else {
      newProducts = [...config.products, editingProduct];
    }
    
    const newConfig = { ...config, products: newProducts };
    setConfig(newConfig);
    setEditingProduct(null);
    await autoSave(newConfig);
  };

  const deleteProduct = async (id: number) => {
    if (!config) return;
    const newConfig = {
      ...config,
      products: config.products.filter(p => p.id !== id)
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  // Category management
  const addCategory = () => {
    if (!config) return;
    const newCategory: Category = {
      id: getNextId(config.categories),
      name: '',
      emoji: '',
      description: ''
    };
    setEditingCategory(newCategory);
  };

  const saveCategory = async () => {
    if (!config || !editingCategory) return;
    
    const existingIndex = config.categories.findIndex(c => c.id === editingCategory.id);
    let newCategories;
    
    if (existingIndex >= 0) {
      newCategories = [...config.categories];
      newCategories[existingIndex] = editingCategory;
    } else {
      newCategories = [...config.categories, editingCategory];
    }
    
    const newConfig = { ...config, categories: newCategories };
    setConfig(newConfig);
    setEditingCategory(null);
    await autoSave(newConfig);
  };

  const deleteCategory = async (id: number) => {
    if (!config) return;
    const newConfig = {
      ...config,
      categories: config.categories.filter(c => c.id !== id)
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  // Social media management
  const addSocialMedia = () => {
    if (!config) return;
    const newSocial: SocialMediaLink = {
      id: getNextId(config.socialMediaLinks),
      name: '',
      emoji: '',
      url: '',
      color: '#000000'
    };
    setEditingSocial(newSocial);
  };

  const saveSocialMedia = async () => {
    if (!config || !editingSocial) return;
    
    const existingIndex = config.socialMediaLinks.findIndex(s => s.id === editingSocial.id);
    let newSocialMedia;
    
    if (existingIndex >= 0) {
      newSocialMedia = [...config.socialMediaLinks];
      newSocialMedia[existingIndex] = editingSocial;
    } else {
      newSocialMedia = [...config.socialMediaLinks, editingSocial];
    }
    
    const newConfig = { ...config, socialMediaLinks: newSocialMedia };
    setConfig(newConfig);
    setEditingSocial(null);
    await autoSave(newConfig);
  };

  const deleteSocialMedia = async (id: number) => {
    if (!config) return;
    const newConfig = {
      ...config,
      socialMediaLinks: config.socialMediaLinks.filter(s => s.id !== id)
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  // Farm management
  const addFarm = () => {
    if (!config) return;
    const newFarm: Farm = {
      id: getNextId(config.farms),
      name: '',
      emoji: '',
      description: ''
    };
    setEditingFarm(newFarm);
  };

  const saveFarm = async () => {
    if (!config || !editingFarm) return;
    
    const existingIndex = config.farms.findIndex(f => f.id === editingFarm.id);
    let newFarms;
    
    if (existingIndex >= 0) {
      newFarms = [...config.farms];
      newFarms[existingIndex] = editingFarm;
    } else {
      newFarms = [...config.farms, editingFarm];
    }
    
    const newConfig = { ...config, farms: newFarms };
    setConfig(newConfig);
    setEditingFarm(null);
    await autoSave(newConfig);
  };

  const deleteFarm = async (id: number) => {
    if (!config) return;
    const newConfig = {
      ...config,
      farms: config.farms.filter(f => f.id !== id)
    };
    setConfig(newConfig);
    await autoSave(newConfig);
  };

  // Page management
  const addNewPage = () => {
    if (!config) return;
    const newPage: Page = {
      id: getNextId(config.pages || []),
      name: '',
      href: '',
      isDefault: false,
      content: {
        title: '',
        subtitle: '',
        description: '',
        heroTitle: '',
        heroSubtitle: '',
        heroButtonText: ''
      }
    };
    setEditingPage(newPage);
  };

  const editExistingPage = (page: Page) => {
    setEditingPage({ ...page });
  };

  const savePage = async () => {
    if (!config || !editingPage) return;
    
    if (!editingPage.name || !editingPage.href) {
      alert('Le nom et l\'URL de la page sont obligatoires');
      return;
    }
    
    const currentPages = config.pages || [];
    const isExisting = currentPages.some(p => p.id === editingPage.id);
    
    let newPages;
    if (isExisting) {
      newPages = currentPages.map(p => 
        p.id === editingPage.id ? { ...editingPage } : p
      );
    } else {
      newPages = [...currentPages, { ...editingPage }];
    }
    
    const updatedConfig = { ...config, pages: newPages };
    setConfig(updatedConfig);
    setEditingPage(null);
    await autoSave(updatedConfig);
    
    const action = isExisting ? 'modifiée' : 'ajoutée';
    alert(`Page ${action} avec succès !`);
  };

  const deletePage = async (pageId: number) => {
    if (!config || !config.pages) return;
    
    const page = config.pages.find(p => p.id === pageId);
    if (!page) return;
    
    if (page.isDefault) {
      alert('Impossible de supprimer une page par défaut');
      return;
    }
    
    if (confirm(`Supprimer la page "${page.name}" ?`)) {
      const newPages = config.pages.filter(p => p.id !== pageId);
      const updatedConfig = { ...config, pages: newPages };
      setConfig(updatedConfig);
      await autoSave(updatedConfig);
      alert("Page supprimée !");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du panel admin...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du panel admin...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                🛠️ Panel Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Sauvegarde automatique</span>
              </div>
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Retour au site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 overflow-x-auto">
              {[
                { id: 'products', name: 'Produits' },
                { id: 'categories', name: config.adminSettings.categoriesTabName },
                { id: 'farms', name: config.adminSettings.farmsTabName },
                { id: 'social', name: 'Réseaux Sociaux' },
                { id: 'admin-settings', name: 'Paramètres Admin' },
                { id: 'shop', name: 'Boutique' },
                { id: 'pages', name: 'Pages' },
                { id: 'contact', name: 'Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="p-6">
            {message && (
              <div className={`mb-4 p-4 rounded-md ${
                message.includes('succès') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                {message}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Produits</h3>
                  <button
                    onClick={addProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    + Ajouter un produit
                  </button>
                </div>

                {/* Products list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.products.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-gray-900 text-base">{product.name}</h4>
                          <div className="flex flex-col space-y-1 ml-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{product.category}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {product.variants.map((variant, index) => (
                            <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {variant.name}: €{variant.price}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des {config.adminSettings.categoriesTabName}</h3>
                  <button
                    onClick={addCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    + Ajouter une {config.adminSettings.categoriesTabName.slice(0, -1).toLowerCase()}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.categories.map((category) => (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{category.emoji}</span>
                            <h4 className="font-semibold text-gray-900 text-base">{category.name}</h4>
                          </div>
                          <div className="flex flex-col space-y-1 ml-2">
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{category.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Farms Tab */}
            {activeTab === 'farms' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des {config.adminSettings.farmsTabName}</h3>
                  <button
                    onClick={addFarm}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    + Ajouter une {config.adminSettings.farmsTabName.slice(0, -1).toLowerCase()}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.farms.map((farm) => (
                    <div key={farm.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{farm.emoji}</span>
                            <h4 className="font-semibold text-gray-900 text-base">{farm.name}</h4>
                          </div>
                          <div className="flex flex-col space-y-1 ml-2">
                            <button
                              onClick={() => setEditingFarm(farm)}
                              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteFarm(farm.id)}
                              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">{farm.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Réseaux Sociaux</h3>
                  <button
                    onClick={addSocialMedia}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    + Ajouter un réseau social
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.socialMediaLinks.map((social) => (
                    <div key={social.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{social.emoji}</span>
                            <h4 className="font-semibold text-gray-900 text-base">{social.name}</h4>
                          </div>
                          <div className="flex flex-col space-y-1 ml-2">
                            <button
                              onClick={() => setEditingSocial(social)}
                              className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 bg-blue-50 rounded hover:bg-blue-100 transition-colors"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteSocialMedia(social.id)}
                              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 bg-red-50 rounded hover:bg-red-100 transition-colors"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 break-all">{social.url}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Settings Tab */}
            {activeTab === 'admin-settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Paramètres d'Administration</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'onglet Catégories</label>
                    <input
                      type="text"
                      value={config.adminSettings.categoriesTabName}
                      onChange={(e) => updateConfig('adminSettings', { categoriesTabName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'onglet Fermes</label>
                    <input
                      type="text"
                      value={config.adminSettings.farmsTabName}
                      onChange={(e) => updateConfig('adminSettings', { farmsTabName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton Catégories</label>
                    <input
                      type="text"
                      value={config.adminSettings.categoriesButtonText}
                      onChange={(e) => updateConfig('adminSettings', { categoriesButtonText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton Fermes</label>
                    <input
                      type="text"
                      value={config.adminSettings.farmsButtonText}
                      onChange={(e) => updateConfig('adminSettings', { farmsButtonText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shop Tab */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Configuration de la Boutique</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la boutique</label>
                    <input
                      type="text"
                      value={config.shopInfo.name}
                      onChange={(e) => updateConfig('shopInfo', { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Emoji)</label>
                    <input
                      type="text"
                      value={config.shopInfo.logo}
                      onChange={(e) => updateConfig('shopInfo', { logo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="🌿"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={config.shopInfo.description}
                      onChange={(e) => updateConfig('shopInfo', { description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur principale</label>
                    <input
                      type="color"
                      value={config.shopInfo.primaryColor}
                      onChange={(e) => updateConfig('shopInfo', { primaryColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur secondaire</label>
                    <input
                      type="color"
                      value={config.shopInfo.secondaryColor}
                      onChange={(e) => updateConfig('shopInfo', { secondaryColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur du texte</label>
                    <input
                      type="color"
                      value={config.shopInfo.textColor}
                      onChange={(e) => updateConfig('shopInfo', { textColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur de fond</label>
                    <input
                      type="color"
                      value={config.shopInfo.backgroundColor}
                      onChange={(e) => updateConfig('shopInfo', { backgroundColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Configuration des Pages</h3>
                
                {/* Homepage Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Page d'accueil</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre principal</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.heroTitle}
                        onChange={(e) => updatePageContent('homepage', 'heroTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.heroSubtitle}
                        onChange={(e) => updatePageContent('homepage', 'heroSubtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.heroButtonText}
                        onChange={(e) => updatePageContent('homepage', 'heroButtonText', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre de la section produits</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.sectionTitle}
                        onChange={(e) => updatePageContent('homepage', 'sectionTitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Label des catégories</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.categoriesLabel}
                        onChange={(e) => updatePageContent('homepage', 'categoriesLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Catégories"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Label Farm</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.farmLabel}
                        onChange={(e) => updatePageContent('homepage', 'farmLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Farm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Label toutes les catégories</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.allCategoriesLabel}
                        onChange={(e) => updatePageContent('homepage', 'allCategoriesLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Toutes les catégories"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Label produits Farm</label>
                      <input
                        type="text"
                        value={config.pageContent.homepage.farmProductsLabel}
                        onChange={(e) => updatePageContent('homepage', 'farmProductsLabel', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Produits de la ferme"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Page Contact</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre</label>
                      <input
                        type="text"
                        value={config.pageContent.contact.title}
                        onChange={(e) => updatePageContent('contact', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <input
                        type="text"
                        value={config.pageContent.contact.subtitle}
                        onChange={(e) => updatePageContent('contact', 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        value={config.pageContent.contact.description}
                        onChange={(e) => updatePageContent('contact', 'description', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Social Media Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Page Réseaux Sociaux</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Titre principal</label>
                      <input
                        type="text"
                        value={config.pageContent.socialMedia.title}
                        onChange={(e) => updatePageContent('socialMedia', 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Sous-titre</label>
                      <input
                        type="text"
                        value={config.pageContent.socialMedia.subtitle}
                        onChange={(e) => updatePageContent('socialMedia', 'subtitle', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Configuration du Contact</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lien de commande</label>
                    <input
                      type="url"
                      value={config.contactInfo.orderLink}
                      onChange={(e) => updateConfig('contactInfo', { orderLink: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://example.com/order"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton de commande</label>
                    <input
                      type="text"
                      value={config.contactInfo.orderText}
                      onChange={(e) => updateConfig('contactInfo', { orderText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Commandez maintenant"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={config.contactInfo.email}
                      onChange={(e) => updateConfig('contactInfo', { email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="contact@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={config.contactInfo.phone}
                      onChange={(e) => updateConfig('contactInfo', { phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}