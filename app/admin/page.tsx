'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfigAsync, saveConfigAsync, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';

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
      emoji: '',
      description: ''
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
  const addNewPage = () => {
    if (!config) return;
    
    const newId = Math.max(...(config.pages?.map(p => p.id) || [0])) + 1;
    const newPage: Page = {
      id: newId,
      name: '',
      href: '',
      isDefault: false
    };
    
    setEditingPage(newPage);
  };

  const editExistingPage = (page: Page) => {
    setEditingPage({ ...page });
  };

  const savePage = () => {
    if (!editingPage || !config) {
      alert('Erreur: données manquantes');
      return;
    }
    
    if (!editingPage.name.trim()) {
      alert('Veuillez saisir un nom de page');
      return;
    }
    
    if (!editingPage.href.trim()) {
      alert('Veuillez saisir une URL');
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
    
    const action = isExisting ? 'modifiée' : 'ajoutée';
    alert(`Page ${action} avec succès !`);
  };

  const deletePage = (pageId: number) => {
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
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-md font-medium ${
                  isSaving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                } transition-colors`}
              >
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
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
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                {message}
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Produits</h3>
                  <button
                    onClick={addProduct}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    + Ajouter un produit
                  </button>
                </div>

                {editingProduct && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium mb-4">
                      {config.products.find(p => p.id === editingProduct.id) ? 'Modifier' : 'Ajouter'} un produit
                    </h4>
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
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input
                          type="url"
                          value={editingProduct.image}
                          onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Lien de commande</label>
                        <input
                          type="url"
                          value={editingProduct.orderLink}
                          onChange={(e) => setEditingProduct({...editingProduct, orderLink: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={saveProduct}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingProduct(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Produit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Catégorie
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {config.products.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-10 h-10 rounded-lg object-cover mr-3"
                              />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-indigo-600 hover:text-indigo-900 mr-3"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Supprimer
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Categories Tab */}
            {activeTab === 'categories' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Catégories</h3>
                  <button
                    onClick={addCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    + Ajouter une catégorie
                  </button>
                </div>

                {editingCategory && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium mb-4">
                      {config.categories.find(c => c.id === editingCategory.id) ? 'Modifier' : 'Ajouter'} une catégorie
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={editingCategory.description}
                          onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={saveCategory}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.categories.map((category) => (
                    <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium text-gray-900">
                            {category.emoji} {category.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{category.description}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Farms Tab */}
            {activeTab === 'farms' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Fermes</h3>
                  <button
                    onClick={addFarm}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    + Ajouter une ferme
                  </button>
                </div>

                {editingFarm && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium mb-4">
                      {config.farms.find(f => f.id === editingFarm.id) ? 'Modifier' : 'Ajouter'} une ferme
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                        <input
                          type="text"
                          value={editingFarm.emoji}
                          onChange={(e) => setEditingFarm({...editingFarm, emoji: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <input
                          type="text"
                          value={editingFarm.description}
                          onChange={(e) => setEditingFarm({...editingFarm, description: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={saveFarm}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingFarm(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.farms.map((farm) => (
                    <div key={farm.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium text-gray-900">
                            {farm.emoji} {farm.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{farm.description}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingFarm(farm)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteFarm(farm.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Media Tab */}
            {activeTab === 'social' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Réseaux Sociaux</h3>
                  <button
                    onClick={addSocialMedia}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    + Ajouter un réseau social
                  </button>
                </div>

                {editingSocial && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium mb-4">
                      {config.socialMediaLinks.find(s => s.id === editingSocial.id) ? 'Modifier' : 'Ajouter'} un réseau social
                    </h4>
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
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                        <input
                          type="url"
                          value={editingSocial.url}
                          onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingSocial(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.socialMediaLinks.map((social) => (
                    <div key={social.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium text-gray-900">
                            {social.emoji} {social.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{social.url}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingSocial(social)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteSocialMedia(social.id)}
                            className="text-red-600 hover:text-red-900 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Pages</h3>
                  <button
                    onClick={addNewPage}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  >
                    + Ajouter une page
                  </button>
                </div>

                {editingPage && (
                  <div className="mb-6 p-4 border border-gray-200 rounded-lg">
                    <h4 className="text-md font-medium mb-4">
                      {config.pages?.find(p => p.id === editingPage.id) ? 'Modifier' : 'Ajouter'} une page
                    </h4>
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
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={savePage}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                      >
                        Sauvegarder
                      </button>
                      <button
                        onClick={() => setEditingPage(null)}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.pages?.map((page) => (
                    <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-lg font-medium text-gray-900">
                            {page.name}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{page.href}</div>
                          {page.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              Page par défaut
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editExistingPage(page)}
                            className="text-indigo-600 hover:text-indigo-900 text-sm"
                          >
                            Modifier
                          </button>
                          {!page.isDefault && (
                            <button
                              onClick={() => deletePage(page.id)}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              Supprimer
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Settings Tab */}
            {activeTab === 'admin-settings' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Paramètres Admin</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'onglet Catégories</label>
                    <input
                      type="text"
                      value={config.adminSettings.categoriesTabName}
                      onChange={(e) => updateConfig('adminSettings', { categoriesTabName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de l'onglet Fermes</label>
                    <input
                      type="text"
                      value={config.adminSettings.farmsTabName}
                      onChange={(e) => updateConfig('adminSettings', { farmsTabName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton Catégories</label>
                    <input
                      type="text"
                      value={config.adminSettings.categoriesButtonText}
                      onChange={(e) => updateConfig('adminSettings', { categoriesButtonText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton Fermes</label>
                    <input
                      type="text"
                      value={config.adminSettings.farmsButtonText}
                      onChange={(e) => updateConfig('adminSettings', { farmsButtonText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Shop Settings Tab */}
            {activeTab === 'shop' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Paramètres de la Boutique</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nom de la boutique</label>
                    <input
                      type="text"
                      value={config.shopInfo.name}
                      onChange={(e) => updateConfig('shopInfo', { name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <input
                      type="text"
                      value={config.shopInfo.description}
                      onChange={(e) => updateConfig('shopInfo', { description: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <input
                      type="text"
                      value={config.shopInfo.logo}
                      onChange={(e) => updateConfig('shopInfo', { logo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Couleur primaire</label>
                    <input
                      type="color"
                      value={config.shopInfo.primaryColor}
                      onChange={(e) => updateConfig('shopInfo', { primaryColor: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Contact Settings Tab */}
            {activeTab === 'contact' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Paramètres de Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={config.contactInfo.email}
                      onChange={(e) => updateConfig('contactInfo', { email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={config.contactInfo.phone}
                      onChange={(e) => updateConfig('contactInfo', { phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Lien de commande</label>
                    <input
                      type="url"
                      value={config.contactInfo.orderLink}
                      onChange={(e) => updateConfig('contactInfo', { orderLink: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Texte du bouton de commande</label>
                    <input
                      type="text"
                      value={config.contactInfo.orderText}
                      onChange={(e) => updateConfig('contactInfo', { orderText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
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