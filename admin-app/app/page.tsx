'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig, Product, Category, Farm, SocialMediaLink } from './lib/types';
import { fetchConfig, saveConfig, cleanupFiles } from './lib/api';
import FileUpload from './components/FileUpload';

export default function AdminPanel() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialMediaLink | null>(null);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setIsLoading(true);
      const data = await fetchConfig();
      setConfig(data);
    } catch (error) {
      console.error('Erreur chargement config:', error);
      setMessage('Erreur lors du chargement de la configuration');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;
    
    setIsSaving(true);
    try {
      // Collecter toutes les URLs utilisées
      const usedUrls: string[] = [];
      
      // URLs des produits
      config.products.forEach(product => {
        if (product.image) usedUrls.push(product.image);
        if (product.images) usedUrls.push(...product.images);
        if (product.video) usedUrls.push(product.video);
      });
      
      // URLs de la boutique
      if (config.shopInfo.logoUrl) usedUrls.push(config.shopInfo.logoUrl);
      if (config.shopInfo.backgroundImage) usedUrls.push(config.shopInfo.backgroundImage);
      
      // Nettoyer les fichiers inutilisés
      await cleanupFiles(usedUrls);
      
      const success = await saveConfig(config);
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

  const getNextId = (items: { id: number }[]) => {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du panel admin...</p>
        </div>
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-gray-600">Erreur de chargement de la configuration</p>
          <button 
            onClick={loadConfig}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Réessayer
          </button>
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
              <h1 className="text-2xl font-bold text-gray-900">
                🛠️ Panel Admin CBD
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-md font-medium ${
                  isSaving
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                } transition-colors`}
              >
                {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <a
                href="/"
                target="_blank"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Voir le site
              </a>
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
                { id: 'dashboard', name: '📊 Tableau de bord' },
                { id: 'products', name: '📦 Produits' },
                { id: 'categories', name: '🏷️ Catégories' },
                { id: 'farms', name: '🏡 Fermes' },
                { id: 'social', name: '📱 Réseaux Sociaux' },
                { id: 'shop', name: '🏪 Boutique' },
                { id: 'pages', name: '📄 Pages' },
                { id: 'contact', name: '📞 Contact' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
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

            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Tableau de bord</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{config.products.length}</div>
                    <div className="text-sm text-blue-600">Produits</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{config.categories.length}</div>
                    <div className="text-sm text-green-600">Catégories</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{config.farms.length}</div>
                    <div className="text-sm text-purple-600">Fermes</div>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">{config.socialMediaLinks.length}</div>
                    <div className="text-sm text-orange-600">Réseaux sociaux</div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Actions rapides</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setActiveTab('products')}
                      className="p-4 bg-white rounded-lg border hover:border-primary-300 transition-colors"
                    >
                      <div className="text-2xl mb-2">📦</div>
                      <div className="font-medium">Ajouter un produit</div>
                    </button>
                    <button
                      onClick={() => setActiveTab('categories')}
                      className="p-4 bg-white rounded-lg border hover:border-primary-300 transition-colors"
                    >
                      <div className="text-2xl mb-2">🏷️</div>
                      <div className="font-medium">Gérer les catégories</div>
                    </button>
                    <button
                      onClick={() => setActiveTab('shop')}
                      className="p-4 bg-white rounded-lg border hover:border-primary-300 transition-colors"
                    >
                      <div className="text-2xl mb-2">🏪</div>
                      <div className="font-medium">Configurer la boutique</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Produits</h3>
                  <button
                    onClick={addProduct}
                    className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
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
                        
                        {/* Image principale */}
                        {product.image && (
                          <div className="relative">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            {product.popular && (
                              <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-medium">
                                ⭐ Populaire
                              </span>
                            )}
                          </div>
                        )}
                        
                        <p className="text-sm text-gray-600 font-medium">{product.category}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
                        
                        {/* Images supplémentaires */}
                        {product.images && product.images.length > 0 && (
                          <div className="flex space-x-1 overflow-x-auto">
                            {product.images.map((img, index) => (
                              <img 
                                key={index}
                                src={img} 
                                alt={`${product.name} ${index + 1}`}
                                className="w-12 h-12 object-cover rounded border flex-shrink-0"
                              />
                            ))}
                          </div>
                        )}
                        
                        {/* Vidéo */}
                        {product.video && (
                          <div className="text-xs text-blue-600">
                            🎥 Vidéo disponible
                          </div>
                        )}
                        
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={editingProduct.description}
                              onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Image principale</label>
                            {editingProduct.image && (
                              <div className="mb-3">
                                <img 
                                  src={editingProduct.image} 
                                  alt="Image principale" 
                                  className="w-32 h-32 object-cover rounded-lg border"
                                />
                                <button
                                  onClick={() => setEditingProduct({...editingProduct, image: ''})}
                                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                >
                                  Supprimer l'image
                                </button>
                              </div>
                            )}
                            <FileUpload
                              onUpload={(url) => setEditingProduct({...editingProduct, image: url})}
                              accept="image/*"
                              label="📸 Choisir une image principale"
                              className="mb-4"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Images supplémentaires</label>
                            {editingProduct.images && editingProduct.images.length > 0 && (
                              <div className="mb-3">
                                <div className="grid grid-cols-4 gap-2 mb-2">
                                  {editingProduct.images.map((img, index) => (
                                    <div key={index} className="relative">
                                      <img 
                                        src={img} 
                                        alt={`Image ${index + 1}`} 
                                        className="w-16 h-16 object-cover rounded border"
                                      />
                                      <button
                                        onClick={() => {
                                          const newImages = editingProduct.images?.filter((_, i) => i !== index) || [];
                                          setEditingProduct({...editingProduct, images: newImages});
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                            <FileUpload
                              onUpload={(url) => {
                                const newImages = [...(editingProduct.images || []), url];
                                setEditingProduct({...editingProduct, images: newImages});
                              }}
                              accept="image/*"
                              multiple={true}
                              label="📸 Ajouter des images supplémentaires"
                              className="mb-4"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Vidéo (optionnel)</label>
                            {editingProduct.video && (
                              <div className="mb-3">
                                <video 
                                  src={editingProduct.video} 
                                  controls 
                                  className="w-full max-w-md rounded-lg border"
                                />
                                <button
                                  onClick={() => setEditingProduct({...editingProduct, video: ''})}
                                  className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                >
                                  Supprimer la vidéo
                                </button>
                              </div>
                            )}
                            <FileUpload
                              onUpload={(url) => setEditingProduct({...editingProduct, video: url})}
                              accept="video/*"
                              label="🎥 Choisir une vidéo"
                              className="mb-4"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                            <select
                              value={editingProduct.category}
                              onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
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
                              className="text-primary-600 hover:text-primary-800 text-sm"
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
                            className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
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

            {/* Autres onglets à implémenter... */}
            {activeTab !== 'dashboard' && activeTab !== 'products' && (
              <div className="text-center py-12">
                <div className="text-4xl mb-4">🚧</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">En cours de développement</h3>
                <p className="text-gray-600">Cette section sera bientôt disponible</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}