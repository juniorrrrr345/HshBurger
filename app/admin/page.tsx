'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfigAsync, saveConfigAsync, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';
import ErrorBoundary from './components/ErrorBoundary';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
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
  const [uploadingVideo, setUploadingVideo] = useState(false);

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
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
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'JuniorAdmin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'authenticated');
      setAuthError('');
    } else {
      setAuthError('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
    setPassword('');
  };

  const handleVideoUpload = async (file: File, productId: number) => {
    if (!file) return;

    setUploadingVideo(true);
    try {
      const formData = new FormData();
      formData.append('video', file);
      formData.append('productId', productId.toString());

      const response = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const { videoUrl } = await response.json();
        
        // Mettre à jour le produit avec l'URL de la vidéo
        if (editingProduct) {
          setEditingProduct({ ...editingProduct, video: videoUrl });
        }
        
        setMessage('Vidéo uploadée avec succès!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        throw new Error('Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Video upload error:', error);
      setMessage('Erreur lors de l\'upload de la vidéo');
    } finally {
      setUploadingVideo(false);
    }
  };

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
    const page = config.pages.find(p => p.id === id);
    if (page && page.isDefault) {
      setMessage('Impossible de supprimer une page par défaut');
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    setConfig({
      ...config,
      pages: config.pages.filter(p => p.id !== id)
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

  // Si pas encore chargé
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Formulaire de connexion
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              🛠️ Panel d'Administration
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Accès sécurisé requis
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Mot de passe d'administration"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {authError && (
              <div className="text-red-600 text-sm text-center">{authError}</div>
            )}
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Se connecter
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-red-600">Erreur lors du chargement de la configuration</p>
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
                🛠️ Panel d'Administration
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {message && (
            <div className={`mb-4 p-4 rounded-md ${message.includes('Erreur') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {message}
            </div>
          )}

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex">
                {[
                  { id: 'products', name: 'Produits', icon: '🛍️' },
                  { id: 'categories', name: 'Catégories', icon: '📂' },
                  { id: 'pages', name: 'Pages', icon: '📄' },
                  { id: 'social', name: 'Réseaux Sociaux', icon: '📱' },
                  { id: 'farms', name: 'Fermes', icon: '🌾' },
                  { id: 'settings', name: 'Paramètres', icon: '⚙️' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-2 px-4 border-b-2 font-medium text-sm`}
                  >
                    {tab.icon} {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Onglet Produits */}
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Gestion des Produits</h2>
                    <button
                      onClick={addProduct}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Ajouter un produit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    {config.products.map((product) => (
                      <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium">{product.name || 'Produit sans nom'}</h3>
                            <p className="text-gray-600 mt-1">{product.description}</p>
                            <p className="text-sm text-gray-500 mt-2">Catégorie: {product.category}</p>
                            {product.video && (
                              <p className="text-sm text-blue-600 mt-1">📹 Vidéo associée</p>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteProduct(product.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal d'édition de produit */}
                  {editingProduct && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          {editingProduct.id ? 'Modifier le produit' : 'Nouveau produit'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                              type="text"
                              value={editingProduct.name}
                              onChange={(e) => setEditingProduct({...editingProduct, name: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                              value={editingProduct.description}
                              onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                              rows={3}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">URL de l'image</label>
                            <input
                              type="url"
                              value={editingProduct.image}
                              onChange={(e) => setEditingProduct({...editingProduct, image: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Vidéo du produit</label>
                            <div className="mt-1 space-y-2">
                              <input
                                type="file"
                                accept="video/*"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleVideoUpload(file, editingProduct.id);
                                  }
                                }}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                disabled={uploadingVideo}
                              />
                              {uploadingVideo && (
                                <p className="text-sm text-blue-600">Upload en cours...</p>
                              )}
                              {editingProduct.video && (
                                <p className="text-sm text-green-600">✅ Vidéo associée</p>
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                            <select
                              value={editingProduct.category}
                              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            >
                              {config.categories.map(cat => (
                                <option key={cat.id} value={cat.name}>{cat.name}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Lien de commande</label>
                            <input
                              type="url"
                              value={editingProduct.orderLink}
                              onChange={(e) => setEditingProduct({...editingProduct, orderLink: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
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

                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveProduct}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Sauvegarder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Onglet Catégories */}
              {activeTab === 'categories' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Gestion des Catégories</h2>
                    <button
                      onClick={addCategory}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Ajouter une catégorie
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {config.categories.map((category) => (
                      <div key={category.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{category.emoji} {category.name}</h3>
                            <p className="text-gray-600 mt-1">{category.description}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingCategory(category)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Supprimer
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal d'édition de catégorie */}
                  {editingCategory && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          {editingCategory.id ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nom</label>
                            <input
                              type="text"
                              value={editingCategory.name}
                              onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Emoji</label>
                            <input
                              type="text"
                              value={editingCategory.emoji}
                              onChange={(e) => setEditingCategory({...editingCategory, emoji: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                              value={editingCategory.description}
                              onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                              rows={3}
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => setEditingCategory(null)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={saveCategory}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Sauvegarder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Onglet Pages */}
              {activeTab === 'pages' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Gestion des Pages</h2>
                    <button
                      onClick={addPage}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    >
                      Ajouter une page
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {config.pages.map((page) => (
                      <div key={page.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium">{page.name}</h3>
                            <p className="text-gray-600 mt-1">{page.href}</p>
                            {page.isDefault && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mt-2 inline-block">
                                Page par défaut
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setEditingPage(page)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Modifier
                            </button>
                            {!page.isDefault && (
                              <button
                                onClick={() => deletePage(page.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Supprimer
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Modal d'édition de page */}
                  {editingPage && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">
                          {editingPage.id ? 'Modifier la page' : 'Nouvelle page'}
                        </h3>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">Nom de la page</label>
                            <input
                              type="text"
                              value={editingPage.name}
                              onChange={(e) => setEditingPage({...editingPage, name: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700">URL (href)</label>
                            <input
                              type="text"
                              value={editingPage.href}
                              onChange={(e) => setEditingPage({...editingPage, href: e.target.value})}
                              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2"
                              placeholder="/ma-nouvelle-page"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                          <button
                            onClick={() => setEditingPage(null)}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={savePage}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Sauvegarder
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Bouton de sauvegarde global */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                    isSaving ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
                >
                  {isSaving ? 'Sauvegarde en cours...' : 'Sauvegarder toutes les modifications'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}