'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SiteConfig, getConfigAsync, saveConfigAsync, getNextId, Product, Category, SocialMediaLink, Farm, Page } from '../lib/config';
import AdminLayout from './components/AdminLayout';
import AdminCard from './components/AdminCard';
import AdminButton from './components/AdminButton';
import AdminInput from './components/AdminInput';
import AdminTextarea from './components/AdminTextarea';
import ErrorBoundary from './components/ErrorBoundary';
import { Plus, Edit, Trash2, Save, X, Package, ShoppingCart, Home, Users, Settings, BarChart3 } from 'lucide-react';

export default function AdminPage() {
  const searchParams = useSearchParams();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingSocial, setEditingSocial] = useState<SocialMediaLink | null>(null);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tab = searchParams.get('tab') || 'dashboard';
    setActiveTab(tab);
  }, [searchParams]);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const loadedConfig = await getConfigAsync();
        
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

  if (isLoading) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!config) {
    return (
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        <div className="text-center">
          <p className="text-red-600">Erreur lors du chargement de la configuration</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <ErrorBoundary>
      <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
        {/* Message */}
        {message && (
          <div className={`mb-4 p-4 rounded-md ${
            message.includes('succès') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdminCard title="Produits" description={`${config.products.length} produits`}>
                <div className="flex items-center">
                  <Package className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{config.products.length}</p>
                    <p className="text-sm text-gray-500">Produits</p>
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Catégories" description={`${config.categories.length} catégories`}>
                <div className="flex items-center">
                  <ShoppingCart className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{config.categories.length}</p>
                    <p className="text-sm text-gray-500">Catégories</p>
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Fermes" description={`${config.farms.length} fermes`}>
                <div className="flex items-center">
                  <Home className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{config.farms.length}</p>
                    <p className="text-sm text-gray-500">Fermes</p>
                  </div>
                </div>
              </AdminCard>

              <AdminCard title="Réseaux sociaux" description={`${config.socialMediaLinks.length} liens`}>
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <p className="text-2xl font-bold">{config.socialMediaLinks.length}</p>
                    <p className="text-sm text-gray-500">Liens</p>
                  </div>
                </div>
              </AdminCard>
            </div>

            <AdminCard title="Actions rapides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminButton onClick={() => setActiveTab('products')} className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter un produit
                </AdminButton>
                <AdminButton onClick={() => setActiveTab('categories')} variant="secondary" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une catégorie
                </AdminButton>
                <AdminButton onClick={() => setActiveTab('farms')} variant="secondary" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Ajouter une ferme
                </AdminButton>
                <AdminButton onClick={handleSave} loading={isSaving} variant="success" className="w-full">
                  <Save className="mr-2 h-4 w-4" />
                  Sauvegarder
                </AdminButton>
              </div>
            </AdminCard>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des produits</h2>
              <AdminButton onClick={addProduct}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un produit
              </AdminButton>
            </div>

            {editingProduct ? (
              <AdminCard title="Éditer le produit">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminInput
                    label="Nom du produit"
                    value={editingProduct.name}
                    onChange={(value) => setEditingProduct({ ...editingProduct, name: value })}
                    required
                  />
                  <AdminInput
                    label="Catégorie"
                    value={editingProduct.category}
                    onChange={(value) => setEditingProduct({ ...editingProduct, category: value })}
                  />
                  <AdminTextarea
                    label="Description"
                    value={editingProduct.description}
                    onChange={(value) => setEditingProduct({ ...editingProduct, description: value })}
                    rows={3}
                    className="md:col-span-2"
                  />
                  <AdminInput
                    label="Image principale"
                    value={editingProduct.image}
                    onChange={(value) => setEditingProduct({ ...editingProduct, image: value })}
                    type="url"
                  />
                  <AdminInput
                    label="Lien de commande"
                    value={editingProduct.orderLink}
                    onChange={(value) => setEditingProduct({ ...editingProduct, orderLink: value })}
                    type="url"
                  />
                </div>
                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="popular"
                    checked={editingProduct.popular}
                    onChange={(e) => setEditingProduct({ ...editingProduct, popular: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="popular" className="text-sm text-gray-700">Produit populaire</label>
                </div>
                <div className="flex space-x-2 mt-4">
                  <AdminButton onClick={saveProduct} variant="success">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </AdminButton>
                  <AdminButton onClick={() => setEditingProduct(null)} variant="secondary">
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </AdminButton>
                </div>
              </AdminCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.products.map((product) => (
                  <AdminCard key={product.id} title={product.name} className="relative">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-sm font-medium">Catégorie: {product.category}</p>
                      {product.popular && (
                        <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Populaire
                        </span>
                      )}
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-1">
                      <AdminButton
                        onClick={() => setEditingProduct(product)}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit className="h-3 w-3" />
                      </AdminButton>
                      <AdminButton
                        onClick={() => deleteProduct(product.id)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="h-3 w-3" />
                      </AdminButton>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des catégories</h2>
              <AdminButton onClick={addCategory}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une catégorie
              </AdminButton>
            </div>

            {editingCategory ? (
              <AdminCard title="Éditer la catégorie">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminInput
                    label="Nom de la catégorie"
                    value={editingCategory.name}
                    onChange={(value) => setEditingCategory({ ...editingCategory, name: value })}
                    required
                  />
                  <AdminInput
                    label="Emoji"
                    value={editingCategory.emoji}
                    onChange={(value) => setEditingCategory({ ...editingCategory, emoji: value })}
                  />
                  <AdminTextarea
                    label="Description"
                    value={editingCategory.description}
                    onChange={(value) => setEditingCategory({ ...editingCategory, description: value })}
                    rows={3}
                    className="md:col-span-2"
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <AdminButton onClick={saveCategory} variant="success">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </AdminButton>
                  <AdminButton onClick={() => setEditingCategory(null)} variant="secondary">
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </AdminButton>
                </div>
              </AdminCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.categories.map((category) => (
                  <AdminCard key={category.id} title={`${category.emoji} ${category.name}`}>
                    <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-end space-x-2">
                      <AdminButton
                        onClick={() => setEditingCategory(category)}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Modifier
                      </AdminButton>
                      <AdminButton
                        onClick={() => deleteCategory(category.id)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </AdminButton>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Farms Tab */}
        {activeTab === 'farms' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des fermes</h2>
              <AdminButton onClick={addFarm}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter une ferme
              </AdminButton>
            </div>

            {editingFarm ? (
              <AdminCard title="Éditer la ferme">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminInput
                    label="Nom de la ferme"
                    value={editingFarm.name}
                    onChange={(value) => setEditingFarm({ ...editingFarm, name: value })}
                    required
                  />
                  <AdminInput
                    label="Emoji"
                    value={editingFarm.emoji}
                    onChange={(value) => setEditingFarm({ ...editingFarm, emoji: value })}
                  />
                  <AdminTextarea
                    label="Description"
                    value={editingFarm.description}
                    onChange={(value) => setEditingFarm({ ...editingFarm, description: value })}
                    rows={3}
                    className="md:col-span-2"
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <AdminButton onClick={saveFarm} variant="success">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </AdminButton>
                  <AdminButton onClick={() => setEditingFarm(null)} variant="secondary">
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </AdminButton>
                </div>
              </AdminCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.farms.map((farm) => (
                  <AdminCard key={farm.id} title={`${farm.emoji} ${farm.name}`}>
                    <p className="text-sm text-gray-600 mb-4">{farm.description}</p>
                    <div className="flex justify-end space-x-2">
                      <AdminButton
                        onClick={() => setEditingFarm(farm)}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Modifier
                      </AdminButton>
                      <AdminButton
                        onClick={() => deleteFarm(farm.id)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </AdminButton>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Social Media Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Gestion des réseaux sociaux</h2>
              <AdminButton onClick={addSocialMedia}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter un réseau social
              </AdminButton>
            </div>

            {editingSocial ? (
              <AdminCard title="Éditer le réseau social">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AdminInput
                    label="Nom du réseau"
                    value={editingSocial.name}
                    onChange={(value) => setEditingSocial({ ...editingSocial, name: value })}
                    required
                  />
                  <AdminInput
                    label="Emoji"
                    value={editingSocial.emoji}
                    onChange={(value) => setEditingSocial({ ...editingSocial, emoji: value })}
                  />
                  <AdminInput
                    label="URL"
                    value={editingSocial.url}
                    onChange={(value) => setEditingSocial({ ...editingSocial, url: value })}
                    type="url"
                    required
                  />
                  <AdminInput
                    label="Couleur"
                    value={editingSocial.color}
                    onChange={(value) => setEditingSocial({ ...editingSocial, color: value })}
                    type="color"
                  />
                </div>
                <div className="flex space-x-2 mt-4">
                  <AdminButton onClick={saveSocialMedia} variant="success">
                    <Save className="mr-2 h-4 w-4" />
                    Sauvegarder
                  </AdminButton>
                  <AdminButton onClick={() => setEditingSocial(null)} variant="secondary">
                    <X className="mr-2 h-4 w-4" />
                    Annuler
                  </AdminButton>
                </div>
              </AdminCard>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {config.socialMediaLinks.map((social) => (
                  <AdminCard key={social.id} title={`${social.emoji} ${social.name}`}>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600 break-all">{social.url}</p>
                      <div className="flex items-center">
                        <div
                          className="w-4 h-4 rounded-full mr-2"
                          style={{ backgroundColor: social.color }}
                        ></div>
                        <span className="text-xs text-gray-500">{social.color}</span>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <AdminButton
                        onClick={() => setEditingSocial(social)}
                        variant="secondary"
                        size="sm"
                      >
                        <Edit className="mr-1 h-3 w-3" />
                        Modifier
                      </AdminButton>
                      <AdminButton
                        onClick={() => deleteSocialMedia(social.id)}
                        variant="danger"
                        size="sm"
                      >
                        <Trash2 className="mr-1 h-3 w-3" />
                        Supprimer
                      </AdminButton>
                    </div>
                  </AdminCard>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres de la boutique</h2>

            <AdminCard title="Informations de la boutique">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput
                  label="Nom de la boutique"
                  value={config.shopInfo.name}
                  onChange={(value) => updateConfig('shopInfo', { name: value })}
                />
                <AdminInput
                  label="Logo (emoji)"
                  value={config.shopInfo.logo}
                  onChange={(value) => updateConfig('shopInfo', { logo: value })}
                />
                <AdminTextarea
                  label="Description"
                  value={config.shopInfo.description}
                  onChange={(value) => updateConfig('shopInfo', { description: value })}
                  rows={3}
                  className="md:col-span-2"
                />
                <AdminInput
                  label="Couleur primaire"
                  value={config.shopInfo.primaryColor}
                  onChange={(value) => updateConfig('shopInfo', { primaryColor: value })}
                  type="color"
                />
                <AdminInput
                  label="Couleur secondaire"
                  value={config.shopInfo.secondaryColor}
                  onChange={(value) => updateConfig('shopInfo', { secondaryColor: value })}
                  type="color"
                />
              </div>
            </AdminCard>

            <AdminCard title="Informations de contact">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <AdminInput
                  label="Email"
                  value={config.contactInfo.email}
                  onChange={(value) => updateConfig('contactInfo', { email: value })}
                  type="email"
                />
                <AdminInput
                  label="Téléphone"
                  value={config.contactInfo.phone}
                  onChange={(value) => updateConfig('contactInfo', { phone: value })}
                />
                <AdminInput
                  label="Lien de commande"
                  value={config.contactInfo.orderLink}
                  onChange={(value) => updateConfig('contactInfo', { orderLink: value })}
                  type="url"
                />
                <AdminInput
                  label="Texte du bouton de commande"
                  value={config.contactInfo.orderText}
                  onChange={(value) => updateConfig('contactInfo', { orderText: value })}
                />
              </div>
            </AdminCard>

            <div className="flex justify-end">
              <AdminButton onClick={handleSave} loading={isSaving} variant="success">
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder les paramètres
              </AdminButton>
            </div>
          </div>
        )}

        {/* Save button for all tabs */}
        {activeTab !== 'settings' && (
          <div className="fixed bottom-6 right-6">
            <AdminButton onClick={handleSave} loading={isSaving} variant="success" size="lg">
              <Save className="mr-2 h-4 w-4" />
              Sauvegarder
            </AdminButton>
          </div>
        )}
      </AdminLayout>
    </ErrorBoundary>
  );
}