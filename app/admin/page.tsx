'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig, saveConfig, getNextId, Product, Category, SocialMediaLink } from '../lib/config';

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState('products');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialMediaLink | null>(null);

  useEffect(() => {
    setConfig(getConfig());
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
                { id: 'categories', name: 'Catégories' },
                { id: 'social', name: 'Réseaux Sociaux' },
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.products.map((product) => (
                    <div key={product.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{product.name}</h4>
                          <p className="text-sm text-gray-600">{product.category}</p>
                          <p className="text-sm text-gray-500 truncate">{product.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {product.variants.map((variant, index) => (
                              <span key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                {variant.name}: €{variant.price}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </button>
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
                  <h3 className="text-lg font-medium text-gray-900">Gestion des Catégories</h3>
                  <button
                    onClick={addCategory}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                  >
                    + Ajouter une catégorie
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {config.categories.map((category) => (
                    <div key={category.id} className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{category.emoji}</span>
                            <h4 className="font-semibold text-gray-900">{category.name}</h4>
                          </div>
                          <p className="text-sm text-gray-500">{category.description}</p>
                        </div>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => setEditingCategory(category)}
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Supprimer
                          </button>
                        </div>
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
                          {editingCategory.id ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
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

                {/* Aperçu */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-4">Aperçu</h4>
                  <div 
                    className="rounded-lg p-4 text-center"
                    style={{ backgroundColor: config.shopInfo.backgroundColor }}
                  >
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-3xl">{config.shopInfo.logo}</span>
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