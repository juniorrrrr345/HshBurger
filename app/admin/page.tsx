'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfigAsync, saveConfigAsync, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';
import ErrorBoundary from './components/ErrorBoundary';

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [isSaving, setIsSaving] = useState(false);
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
        const loadedConfig = await getConfigAsync();
        
        // S'assurer que la propriété pages existe
        if (!loadedConfig.pages) {
          loadedConfig.pages = [
            { id: 1, name: "Accueil", href: "/", isDefault: true },
            { id: 2, name: "Produits", href: "/produits", isDefault: true },
            { id: 3, name: "Contact", href: "/contact", isDefault: true },
            { id: 4, name: "Réseaux Sociaux", href: "/reseaux-sociaux", isDefault: true }
          ];
        }
        setConfig(loadedConfig);
      } catch (error) {
        console.error('Error loading config:', error);
        setMessage('Erreur lors du chargement de la configuration');
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  const handleSave = async () => {
    if (!config) return;
    
    setIsSaving(true);
    try {
      const success = await saveConfigAsync(config);
      if (success) {
        setMessage('Configuration sauvegardée avec succès!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      setMessage('Erreur lors de la sauvegarde');
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfig = (section: keyof SiteConfig, updates: any) => {
    if (!config) return;
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        ...updates
      }
    });
  };

  const updatePageContent = (page: keyof SiteConfig['pageContent'], key: string, value: string) => {
    if (!config) return;
    setConfig({
      ...config,
      pageContent: {
        ...config.pageContent,
        [page]: {
          ...config.pageContent[page],
          [key]: value
        }
      }
    });
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

  const saveProduct = () => {
    if (!config || !editingProduct) return;
    
    const existingIndex = config.products.findIndex(p => p.id === editingProduct.id);
    let newProducts;
    
    if (existingIndex >= 0) {
      newProducts = [...config.products];
      newProducts[existingIndex] = editingProduct;
    } else {
      newProducts = [...config.products, editingProduct];
    }
    
    setConfig({ ...config, products: newProducts });
    setEditingProduct(null);
  };

  const deleteProduct = (id: number) => {
    if (!config) return;
    setConfig({
      ...config,
      products: config.products.filter(p => p.id !== id)
    });
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

  const saveCategory = () => {
    if (!config || !editingCategory) return;
    
    const existingIndex = config.categories.findIndex(c => c.id === editingCategory.id);
    let newCategories;
    
    if (existingIndex >= 0) {
      newCategories = [...config.categories];
      newCategories[existingIndex] = editingCategory;
    } else {
      newCategories = [...config.categories, editingCategory];
    }
    
    setConfig({ ...config, categories: newCategories });
    setEditingCategory(null);
  };

  const deleteCategory = (id: number) => {
    if (!config) return;
    setConfig({
      ...config,
      categories: config.categories.filter(c => c.id !== id)
    });
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

  const saveSocialMedia = () => {
    if (!config || !editingSocial) return;
    
    const existingIndex = config.socialMediaLinks.findIndex(s => s.id === editingSocial.id);
    let newSocials;
    
    if (existingIndex >= 0) {
      newSocials = [...config.socialMediaLinks];
      newSocials[existingIndex] = editingSocial;
    } else {
      newSocials = [...config.socialMediaLinks, editingSocial];
    }
    
    setConfig({ ...config, socialMediaLinks: newSocials });
    setEditingSocial(null);
  };

  const deleteSocialMedia = (id: number) => {
    if (!config) return;
    setConfig({
      ...config,
      socialMediaLinks: config.socialMediaLinks.filter(s => s.id !== id)
    });
  };

  // Farm management
  const addFarm = () => {
    if (!config) return;
    const newFarm: Farm = {
      id: getNextId(config.farms),
      name: '',
      description: '',
      image: '',
      location: '',
      contact: ''
    };
    setEditingFarm(newFarm);
  };

  const saveFarm = () => {
    if (!config || !editingFarm) return;
    
    const existingIndex = config.farms.findIndex(f => f.id === editingFarm.id);
    let newFarms;
    
    if (existingIndex >= 0) {
      newFarms = [...config.farms];
      newFarms[existingIndex] = editingFarm;
    } else {
      newFarms = [...config.farms, editingFarm];
    }
    
    setConfig({ ...config, farms: newFarms });
    setEditingFarm(null);
  };

  const deleteFarm = (id: number) => {
    if (!config) return;
    setConfig({
      ...config,
      farms: config.farms.filter(f => f.id !== id)
    });
  };

  // Page management
  const addPage = () => {
    if (!config) return;
    const newPage: Page = {
      id: getNextId(config.pages),
      name: '',
      href: '',
      isDefault: false
    };
    setEditingPage(newPage);
  };

  const savePage = () => {
    if (!config || !editingPage) return;
    
    const existingIndex = config.pages.findIndex(p => p.id === editingPage.id);
    let newPages;
    
    if (existingIndex >= 0) {
      newPages = [...config.pages];
      newPages[existingIndex] = editingPage;
    } else {
      newPages = [...config.pages, editingPage];
    }
    
    setConfig({ ...config, pages: newPages });
    setEditingPage(null);
  };

  const deletePage = (id: number) => {
    if (!config) return;
    setConfig({
      ...config,
      pages: config.pages.filter(p => p.id !== id)
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Erreur: Impossible de charger la configuration</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Recharger
          </button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                Panel d'Administration
              </Link>
              <div className="flex items-center space-x-4">
                {message && (
                  <span className={`px-3 py-1 rounded text-sm ${
                    message.includes('succès') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {message}
                  </span>
                )}
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'products', name: 'Produits', icon: '🛍️' },
                { id: 'categories', name: 'Catégories', icon: '📂' },
                { id: 'social', name: 'Réseaux Sociaux', icon: '📱' },
                { id: 'farms', name: 'Fermes', icon: '🏡' },
                { id: 'pages', name: 'Pages', icon: '📄' },
                { id: 'content', name: 'Contenu', icon: '✏️' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Produits</h2>
                <button
                  onClick={addProduct}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Ajouter un produit
                </button>
              </div>

              {editingProduct ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingProduct.id ? 'Modifier le produit' : 'Nouveau produit'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingProduct.name}
                        onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        {config.categories.map(cat => (
                          <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingProduct.description}
                        onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image principale</label>
                      <input
                        type="text"
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="URL de l'image"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Lien de commande</label>
                      <input
                        type="text"
                        value={editingProduct.orderLink}
                        onChange={(e) => setEditingProduct({...editingProduct, orderLink: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="URL de commande"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingProduct.popular}
                        onChange={(e) => setEditingProduct({...editingProduct, popular: e.target.checked})}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">Produit populaire</label>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={saveProduct}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.products.map((product) => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold">{product.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{product.description}</p>
                      <div className="text-sm text-gray-500">
                        <p>Catégorie: {product.category}</p>
                        {product.popular && <span className="text-green-600">⭐ Populaire</span>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Catégories</h2>
                <button
                  onClick={addCategory}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Ajouter une catégorie
                </button>
              </div>

              {editingCategory ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingCategory.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingCategory.name}
                        onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                      <input
                        type="text"
                        value={editingCategory.emoji}
                        onChange={(e) => setEditingCategory({...editingCategory, emoji: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="🌾"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingCategory.description}
                        onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={saveCategory}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingCategory(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.categories.map((category) => (
                    <div key={category.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            <span className="mr-2">{category.emoji}</span>
                            {category.name}
                          </h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Social Media Tab */}
          {activeTab === 'social' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Réseaux Sociaux</h2>
                <button
                  onClick={addSocialMedia}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Ajouter un réseau social
                </button>
              </div>

              {editingSocial ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingSocial.id ? 'Modifier le réseau social' : 'Nouveau réseau social'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingSocial.name}
                        onChange={(e) => setEditingSocial({...editingSocial, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                      <input
                        type="text"
                        value={editingSocial.emoji}
                        onChange={(e) => setEditingSocial({...editingSocial, emoji: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="📱"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="url"
                        value={editingSocial.url}
                        onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                      <input
                        type="color"
                        value={editingSocial.color}
                        onChange={(e) => setEditingSocial({...editingSocial, color: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={saveSocialMedia}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingSocial(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.socialMediaLinks.map((social) => (
                    <div key={social.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">
                            <span className="mr-2">{social.emoji}</span>
                            {social.name}
                          </h3>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingSocial(social)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteSocialMedia(social.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <a 
                        href={social.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 break-all"
                      >
                        {social.url}
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Farms Tab */}
          {activeTab === 'farms' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Fermes</h2>
                <button
                  onClick={addFarm}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Ajouter une ferme
                </button>
              </div>

              {editingFarm ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingFarm.id ? 'Modifier la ferme' : 'Nouvelle ferme'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingFarm.name}
                        onChange={(e) => setEditingFarm({...editingFarm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
                      <input
                        type="text"
                        value={editingFarm.location}
                        onChange={(e) => setEditingFarm({...editingFarm, location: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={editingFarm.description}
                        onChange={(e) => setEditingFarm({...editingFarm, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                      <input
                        type="text"
                        value={editingFarm.image}
                        onChange={(e) => setEditingFarm({...editingFarm, image: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="URL de l'image"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                      <input
                        type="text"
                        value={editingFarm.contact}
                        onChange={(e) => setEditingFarm({...editingFarm, contact: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={saveFarm}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingFarm(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.farms.map((farm) => (
                    <div key={farm.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{farm.name}</h3>
                          <p className="text-sm text-gray-500">{farm.location}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingFarm(farm)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deleteFarm(farm.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{farm.description}</p>
                      {farm.contact && (
                        <p className="text-sm text-gray-500">Contact: {farm.contact}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Pages Tab */}
          {activeTab === 'pages' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Gestion des Pages</h2>
                <button
                  onClick={addPage}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  + Ajouter une page
                </button>
              </div>

              {editingPage ? (
                <div className="bg-white p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-4">
                    {editingPage.id ? 'Modifier la page' : 'Nouvelle page'}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <input
                        type="text"
                        value={editingPage.name}
                        onChange={(e) => setEditingPage({...editingPage, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="text"
                        value={editingPage.href}
                        onChange={(e) => setEditingPage({...editingPage, href: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="/page"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={editingPage.isDefault}
                        onChange={(e) => setEditingPage({...editingPage, isDefault: e.target.checked})}
                        className="mr-2"
                      />
                      <label className="text-sm font-medium text-gray-700">Page par défaut</label>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button
                      onClick={savePage}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Sauvegarder
                    </button>
                    <button
                      onClick={() => setEditingPage(null)}
                      className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {config.pages.map((page) => (
                    <div key={page.id} className="bg-white p-6 rounded-lg shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{page.name}</h3>
                          <p className="text-sm text-gray-500">{page.href}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingPage(page)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      {page.isDefault && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Page par défaut
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Contenu du Site</h2>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Configuration Générale</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom du site</label>
                    <input
                      type="text"
                      value={config.siteName || ''}
                      onChange={(e) => updateConfig('siteName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description du site</label>
                    <input
                      type="text"
                      value={config.siteDescription || ''}
                      onChange={(e) => updateConfig('siteDescription', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                    <input
                      type="text"
                      value={config.logo || ''}
                      onChange={(e) => updateConfig('logo', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Couleur principale</label>
                    <input
                      type="color"
                      value={config.primaryColor || '#000000'}
                      onChange={(e) => updateConfig('primaryColor', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Contenu de la Page d'Accueil</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre principal</label>
                    <input
                      type="text"
                      value={config.pageContent?.home?.title || ''}
                      onChange={(e) => updatePageContent('home', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sous-titre</label>
                    <input
                      type="text"
                      value={config.pageContent?.home?.subtitle || ''}
                      onChange={(e) => updatePageContent('home', 'subtitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={config.pageContent?.home?.description || ''}
                      onChange={(e) => updatePageContent('home', 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4">Contenu de la Page Contact</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                    <input
                      type="text"
                      value={config.pageContent?.contact?.title || ''}
                      onChange={(e) => updatePageContent('contact', 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={config.pageContent?.contact?.description || ''}
                      onChange={(e) => updatePageContent('contact', 'description', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={config.pageContent?.contact?.email || ''}
                      onChange={(e) => updatePageContent('contact', 'email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input
                      type="text"
                      value={config.pageContent?.contact?.phone || ''}
                      onChange={(e) => updatePageContent('contact', 'phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}