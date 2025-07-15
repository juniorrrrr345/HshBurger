'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig, saveConfig, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';

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
  const [editingPageContent, setEditingPageContent] = useState<Page | null>(null);

  useEffect(() => {
    const loadedConfig = getConfig();
    
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
  }, []);

  const handleSave = async () => {
    if (!config) return;
    
    setIsSaving(true);
    try {
      saveConfig(config);
      setMessage('Configuration sauvegardée avec succès!');
      setTimeout(() => setMessage(''), 3000);
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
    
    // Créer une nouvelle page avec un ID unique
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
    // Copier la page pour l'édition
    setEditingPage({ ...page });
  };

  const savePage = () => {
    if (!editingPage || !config) {
      alert('Erreur: données manquantes');
      return;
    }
    
    // Validation
    if (!editingPage.name.trim()) {
      alert('Veuillez saisir un nom de page');
      return;
    }
    
    if (!editingPage.href.trim()) {
      alert('Veuillez saisir une URL');
      return;
    }
    
    // Préparer la nouvelle liste de pages
    const currentPages = config.pages || [];
    const isExisting = currentPages.some(p => p.id === editingPage.id);
    
    let newPages;
    if (isExisting) {
      // Modifier une page existante
      newPages = currentPages.map(p => 
        p.id === editingPage.id ? { ...editingPage } : p
      );
    } else {
      // Ajouter une nouvelle page
      newPages = [...currentPages, { ...editingPage }];
    }
    
    // Sauvegarder
    const updatedConfig = { ...config, pages: newPages };
    setConfig(updatedConfig);
    setEditingPage(null);
    
    // Message de succès
    const action = isExisting ? 'modifiée' : 'ajoutée';
    setMessage(`Page ${action} avec succès !`);
    setTimeout(() => setMessage(''), 3000);
  };

  const deletePage = (pageId: number) => {
    if (!config || !config.pages) return;
    
    const page = config.pages.find(p => p.id === pageId);
    if (!page) return;
    
    if (confirm(`Supprimer la page "${page.name}" ?`)) {
      const newPages = config.pages.filter(p => p.id !== pageId);
      const updatedConfig = { ...config, pages: newPages };
      setConfig(updatedConfig);
      setMessage('Page supprimée !');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const cancelPageEdit = () => {
    setEditingPage(null);
  };

  const editPageContent = (page: Page) => {
    setEditingPageContent({ ...page });
  };

  const savePageContent = () => {
    if (!editingPageContent || !config) return;
    
    const currentPages = config.pages || [];
    const newPages = currentPages.map(p => 
      p.id === editingPageContent.id ? { ...editingPageContent } : p
    );
    
    const updatedConfig = { ...config, pages: newPages };
    setConfig(updatedConfig);
    setEditingPageContent(null);
    
    setMessage('Contenu de la page sauvegardé !');
    setTimeout(() => setMessage(''), 3000);
  };

  const cancelPageContentEdit = () => {
    setEditingPageContent(null);
  };

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement du panel admin...</p>
      </div>
    </div>;
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
              <div className={`mb-4 p-4 rounded-md ${
                message.includes('succès') || message.includes('supprimée') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
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

                {/* Product Editor Modal */}
                {editingProduct && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {editingProduct.id ? 'Modifier le produit' : 'Ajouter un produit'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={editingProduct.description}
                              onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                              type="url"
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Images multiples (URLs séparées par des virgules)</label>
                            <textarea
                              value={editingProduct.images?.join(', ') || ''}
                              onChange={(e) => setEditingProduct({...editingProduct, images: e.target.value.split(',').map(url => url.trim()).filter(url => url)})}
                              rows={3}
                              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">Séparez les URLs par des virgules</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vidéo URL (optionnel)</label>
                            <input
                              type="url"
                              value={editingProduct.video || ''}
                              onChange={(e) => setEditingProduct({...editingProduct, video: e.target.value})}
                              placeholder="https://example.com/video.mp4"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <p className="text-xs text-gray-500 mt-1">URL directe vers un fichier vidéo (MP4, WebM, etc.)</p>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                            <select
                              value={editingProduct.category}
                              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              {config.categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Ferme (optionnel)</label>
                            <select
                              value={editingProduct.farm || ''}
                              onChange={e => setEditingProduct({ ...editingProduct, farm: e.target.value || undefined })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            >
                              <option value="">Aucune</option>
                              {config.farms.map(farm => (
                                <option key={farm.id} value={farm.name}>{farm.name}</option>
                              ))}
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Lien de commande</label>
                            <input
                              type="url"
                              value={editingProduct.orderLink}
                              onChange={(e) => setEditingProduct({...editingProduct, orderLink: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="popular"
                              checked={editingProduct.popular}
                              onChange={(e) => setEditingProduct({...editingProduct, popular: e.target.checked})}
                              className="mr-2"
                            />
                            <label htmlFor="popular" className="text-sm text-gray-700">Produit populaire</label>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Variantes de prix</label>
                            {editingProduct.variants.map((variant, index) => (
                              <div key={index} className="flex space-x-2 mb-2">
                                <input
                                  type="text"
                                  placeholder="Nom (ex: 10%, 1g)"
                                  value={variant.name}
                                  onChange={(e) => {
                                    const newVariants = [...editingProduct.variants];
                                    newVariants[index].name = e.target.value;
                                    setEditingProduct({...editingProduct, variants: newVariants});
                                  }}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                  type="number"
                                  placeholder="Prix"
                                  value={variant.price}
                                  onChange={(e) => {
                                    const newVariants = [...editingProduct.variants];
                                    newVariants[index].price = parseFloat(e.target.value) || 0;
                                    setEditingProduct({...editingProduct, variants: newVariants});
                                  }}
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                  type="text"
                                  placeholder="Taille"
                                  value={variant.size}
                                  onChange={(e) => {
                                    const newVariants = [...editingProduct.variants];
                                    newVariants[index].size = e.target.value;
                                    setEditingProduct({...editingProduct, variants: newVariants});
                                  }}
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                  onClick={() => {
                                    const newVariants = editingProduct.variants.filter((_, i) => i !== index);
                                    setEditingProduct({...editingProduct, variants: newVariants});
                                  }}
                                  className="text-red-600 hover:text-red-800 px-2"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newVariants = [...editingProduct.variants, { name: '', price: 0, size: '' }];
                                setEditingProduct({...editingProduct, variants: newVariants});
                              }}
                              className="text-green-600 hover:text-green-800 text-sm"
                            >
                              + Ajouter une variante
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveProduct}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

                {/* Category Editor Modal */}
                {editingCategory && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {editingCategory.id ? `Modifier la ${config.adminSettings.categoriesTabName.slice(0, -1).toLowerCase()}` : `Ajouter une ${config.adminSettings.categoriesTabName.slice(0, -1).toLowerCase()}`}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                            <input
                              type="text"
                              value={editingCategory.emoji}
                              onChange={(e) => setEditingCategory({...editingCategory, emoji: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="🌿"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={editingCategory.description}
                              onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setEditingCategory(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveCategory}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

                {/* Farm Editor Modal */}
                {editingFarm && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {editingFarm.id ? `Modifier la ${config.adminSettings.farmsTabName.slice(0, -1).toLowerCase()}` : `Ajouter une ${config.adminSettings.farmsTabName.slice(0, -1).toLowerCase()}`}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={editingFarm.name}
                              onChange={(e) => setEditingFarm({...editingFarm, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                            <input
                              type="text"
                              value={editingFarm.emoji}
                              onChange={(e) => setEditingFarm({...editingFarm, emoji: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="🏔️"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={editingFarm.description}
                              onChange={(e) => setEditingFarm({...editingFarm, description: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setEditingFarm(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveFarm}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* MODAL SIMPLE POUR PAGES */}
                {editingPage && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {config?.pages?.some(p => p.id === editingPage.id) ? 'Modifier la page' : 'Ajouter une page'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nom de la page *
                            </label>
                            <input
                              type="text"
                              value={editingPage.name || ''}
                              onChange={(e) => setEditingPage({...editingPage, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Ex: À propos, Conditions..."
                              autoFocus
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              URL de la page *
                            </label>
                            <input
                              type="text"
                              value={editingPage.href || ''}
                              onChange={(e) => setEditingPage({...editingPage, href: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Ex: /a-propos ou https://external.com"
                            />
                          </div>
                          
                          <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                            <p className="text-sm text-blue-800">
                              💡 <strong>Exemples :</strong><br />
                              • Page interne : <code>/a-propos</code><br />
                              • Lien externe : <code>https://monsite.com</code><br />
                              • Email : <code>mailto:contact@monsite.com</code>
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={cancelPageEdit}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={savePage}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.socialMediaLinks.map((social) => (
                    <div key={social.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{social.emoji}</span>
                            <h4 className="font-semibold text-gray-900">{social.name}</h4>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{social.url}</p>
                          <div 
                            className="w-4 h-4 rounded-full inline-block mt-1"
                            style={{ backgroundColor: social.color }}
                          ></div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => setEditingSocial(social)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteSocialMedia(social.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Media Editor Modal */}
                {editingSocial && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full">
                      <div className="p-6">
                        <h3 className="text-lg font-medium mb-4">
                          {editingSocial.id ? 'Modifier le réseau social' : 'Ajouter un réseau social'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                            <input
                              type="text"
                              value={editingSocial.name}
                              onChange={(e) => setEditingSocial({...editingSocial, name: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="Instagram"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Emoji</label>
                            <input
                              type="text"
                              value={editingSocial.emoji}
                              onChange={(e) => setEditingSocial({...editingSocial, emoji: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="📸"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                            <input
                              type="url"
                              value={editingSocial.url}
                              onChange={(e) => setEditingSocial({...editingSocial, url: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                              placeholder="https://instagram.com/username"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Couleur</label>
                            <input
                              type="color"
                              value={editingSocial.color}
                              onChange={(e) => setEditingSocial({...editingSocial, color: e.target.value})}
                              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-6">
                          <button
                            onClick={() => setEditingSocial(null)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveSocialMedia}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            Enregistrer
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Admin Settings Tab */}
            {activeTab === 'admin-settings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Paramètres d'Administration</h3>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-gray-800 mb-4">Personnalisation des Onglets</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'onglet "Catégories"
                      </label>
                      <input
                        type="text"
                        value={config.adminSettings.categoriesTabName}
                        onChange={(e) => updateConfig('adminSettings', { categoriesTabName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Catégories"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ce nom sera affiché dans la navigation du panel d'administration
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'onglet "Fermes"
                      </label>
                      <input
                        type="text"
                        value={config.adminSettings.farmsTabName}
                        onChange={(e) => updateConfig('adminSettings', { farmsTabName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Fermes"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ce nom sera affiché dans la navigation du panel d'administration
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du bouton "Catégories"
                      </label>
                      <input
                        type="text"
                        value={config.adminSettings.categoriesButtonText}
                        onChange={(e) => updateConfig('adminSettings', { categoriesButtonText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Catégories"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ce nom sera affiché sur les boutons de filtrage des catégories
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom du bouton "Fermes"
                      </label>
                      <input
                        type="text"
                        value={config.adminSettings.farmsButtonText}
                        onChange={(e) => updateConfig('adminSettings', { farmsButtonText: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Fermes"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Ce nom sera affiché sur les boutons de filtrage des fermes
                      </p>
                    </div>
                  </div>

                  {/* Aperçu de la navigation */}
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Aperçu de la navigation</h5>
                    <div className="bg-white rounded-lg border p-4">
                      <div className="flex space-x-4 text-sm">
                        <span className="text-gray-500">Produits</span>
                        <span className="text-green-600 font-medium">{config.adminSettings.categoriesTabName}</span>
                        <span className="text-green-600 font-medium">{config.adminSettings.farmsTabName}</span>
                        <span className="text-gray-500">Réseaux Sociaux</span>
                        <span className="text-gray-500">Paramètres Admin</span>
                      </div>
                    </div>
                  </div>

                  {/* Aperçu des boutons de filtrage */}
                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">Aperçu des boutons de filtrage</h5>
                    <div className="bg-white rounded-lg border p-4 space-y-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Bouton Catégories:</span>
                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                          🌟 Toutes les {config.adminSettings.categoriesButtonText.toLowerCase()}
                        </button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-600">Bouton Fermes:</span>
                        <button className="px-4 py-2 bg-black text-white rounded-lg text-sm">
                          🌾 Toutes les {config.adminSettings.farmsButtonText.toLowerCase()}
                        </button>
                      </div>
                    </div>
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo (URL image)</label>
                    <input
                      type="url"
                      value={config.shopInfo.logoUrl}
                      onChange={(e) => updateConfig('shopInfo', { logoUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://..."
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

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image de fond (URL)</label>
                    <input
                      type="url"
                      value={config.shopInfo.backgroundImage}
                      onChange={(e) => updateConfig('shopInfo', { backgroundImage: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="https://..."
                    />
                    <p className="text-xs text-gray-500 mt-1">Laissez vide pour utiliser la couleur de fond</p>
                  </div>
                </div>

                {/* Aperçu */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Aperçu</h4>
                  <div 
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: config.shopInfo.backgroundColor }}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      {config.shopInfo.logoUrl ? (
                        <img src={config.shopInfo.logoUrl} alt="Logo" className="h-12 w-12 object-contain rounded bg-white shadow" />
                      ) : (
                        <span className="text-3xl">{config.shopInfo.logo}</span>
                      )}
                      <h3 
                        className="text-2xl font-bold"
                        style={{ color: config.shopInfo.secondaryColor }}
                      >
                        {config.shopInfo.name}
                      </h3>
                    </div>
                    <p style={{ color: config.shopInfo.secondaryColor }}>
                      {config.shopInfo.description}
                    </p>
                    <button
                      className="mt-4 px-4 py-2 rounded-md text-white font-medium"
                      style={{ backgroundColor: config.shopInfo.primaryColor }}
                    >
                      Bouton d'exemple
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Pages Tab */}
            {activeTab === 'pages' && (
              <div className="space-y-8">
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

                {/* NOUVEAU SYSTÈME DE PAGES - SIMPLE ET FONCTIONNEL */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">📄 Gestion des Pages</h3>
                      <p className="text-sm text-gray-600">
                        {config?.pages?.length || 0} page(s) configurée(s)
                      </p>
                    </div>
                    <button
                      onClick={addNewPage}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                    >
                      + Ajouter une page
                    </button>
                  </div>
                  
                  {/* Liste des pages */}
                  <div className="space-y-3">
                    {config?.pages?.map((page) => (
                      <div key={page.id} className="bg-white p-4 rounded-lg border flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{page.name || 'Sans nom'}</h4>
                            {page.isDefault && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Défaut
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{page.href || 'Sans URL'}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editExistingPage(page)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => editPageContent(page)}
                            className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600"
                          >
                            Contenu
                          </button>
                          <button
                            onClick={() => deletePage(page.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {(!config?.pages || config.pages.length === 0) && (
                      <div className="text-center py-8 text-gray-500">
                        <p>Aucune page configurée</p>
                        <p className="text-sm">Cliquez sur "Ajouter une page" pour commencer</p>
                      </div>
                    )}
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

      {/* Modal d'édition des pages */}
      {editingPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingPage.id > 0 ? 'Modifier la page' : 'Ajouter une page'}
              </h3>
              <button
                onClick={cancelPageEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la page *
                </label>
                <input
                  type="text"
                  value={editingPage.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    const newHref = newName.toLowerCase()
                      .replace(/[^a-z0-9\s-]/g, '')
                      .replace(/\s+/g, '-')
                      .replace(/-+/g, '-')
                      .replace(/^-|-$/g, '');
                    
                    setEditingPage({ 
                      ...editingPage, 
                      name: newName,
                      href: newHref
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: À propos"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de la page *
                </label>
                <input
                  type="text"
                  value={editingPage.href}
                  onChange={(e) => setEditingPage({ ...editingPage, href: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Ex: a-propos"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Saisissez l'URL sans le / (ex: a-propos, notre-histoire, etc.)
                </p>
              </div>
              

            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={cancelPageEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={savePage}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                {editingPage.id > 0 ? 'Modifier' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition du contenu des pages */}
      {editingPageContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-gray-900">
                Éditer le contenu : {editingPageContent.name}
              </h3>
              <button
                onClick={cancelPageContentEdit}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre de la page
                  </label>
                  <input
                    type="text"
                    value={editingPageContent.content?.title || ''}
                    onChange={(e) => setEditingPageContent({
                      ...editingPageContent,
                      content: {
                        ...editingPageContent.content,
                        title: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Titre personnalisé (optionnel)"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sous-titre
                  </label>
                  <input
                    type="text"
                    value={editingPageContent.content?.subtitle || ''}
                    onChange={(e) => setEditingPageContent({
                      ...editingPageContent,
                      content: {
                        ...editingPageContent.content,
                        subtitle: e.target.value
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Sous-titre (optionnel)"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description principale
                </label>
                <textarea
                  value={editingPageContent.content?.description || ''}
                  onChange={(e) => setEditingPageContent({
                    ...editingPageContent,
                    content: {
                      ...editingPageContent.content,
                      description: e.target.value
                    }
                  })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Description de la page..."
                />
              </div>
              
              {/* Sections personnalisées */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Sections personnalisées</h4>
                  <button
                    onClick={() => setEditingPageContent({
                      ...editingPageContent,
                      content: {
                        ...editingPageContent.content,
                        sections: [
                          ...(editingPageContent.content?.sections || []),
                          { title: '', content: '', type: 'text' as const }
                        ]
                      }
                    })}
                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                  >
                    + Ajouter une section
                  </button>
                </div>
                
                <div className="space-y-4">
                  {editingPageContent.content?.sections?.map((section: { title: string; content: string; type: 'text' | 'image' | 'video' | 'social' }, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Titre de la section
                          </label>
                          <input
                            type="text"
                            value={section.title}
                            onChange={(e) => {
                              const newSections = [...(editingPageContent.content?.sections || [])];
                              newSections[index].title = e.target.value;
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Titre de la section"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Type de contenu
                          </label>
                          <select
                            value={section.type}
                            onChange={(e) => {
                              const newSections = [...(editingPageContent.content?.sections || [])];
                              newSections[index].type = e.target.value as 'text' | 'image' | 'video' | 'social';
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <option value="text">Texte</option>
                            <option value="image">Image</option>
                            <option value="video">Vidéo</option>
                            <option value="social">Réseaux sociaux</option>
                          </select>
                        </div>
                        
                        <div className="flex items-end">
                          <button
                            onClick={() => {
                              const newSections = editingPageContent.content?.sections?.filter((_, i) => i !== index) || [];
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            className="px-3 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contenu
                        </label>
                        {section.type === 'text' && (
                          <textarea
                            value={section.content}
                            onChange={(e) => {
                              const newSections = [...(editingPageContent.content?.sections || [])];
                              newSections[index].content = e.target.value;
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            rows={6}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Contenu de la section (HTML autorisé)..."
                          />
                        )}
                        
                        {(section.type === 'image' || section.type === 'video') && (
                          <input
                            type="url"
                            value={section.content}
                            onChange={(e) => {
                              const newSections = [...(editingPageContent.content?.sections || [])];
                              newSections[index].content = e.target.value;
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder={`URL de ${section.type === 'image' ? 'l\'image' : 'la vidéo'}`}
                          />
                        )}
                        
                        {section.type === 'social' && (
                          <textarea
                            value={section.content}
                            onChange={(e) => {
                              const newSections = [...(editingPageContent.content?.sections || [])];
                              newSections[index].content = e.target.value;
                              setEditingPageContent({
                                ...editingPageContent,
                                content: {
                                  ...editingPageContent.content,
                                  sections: newSections
                                }
                              });
                            }}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Code HTML pour les réseaux sociaux (ex: boutons de partage, widgets...)"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {(!editingPageContent.content?.sections || editingPageContent.content.sections.length === 0) && (
                    <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                      <p>Aucune section personnalisée</p>
                      <p className="text-sm">Cliquez sur "Ajouter une section" pour commencer</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
              <button
                onClick={cancelPageContentEdit}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={savePageContent}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Sauvegarder le contenu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}