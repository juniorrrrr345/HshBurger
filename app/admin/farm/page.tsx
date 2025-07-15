'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig, getConfig, saveConfig, getNextId } from '../../lib/config';
import AdminLayout from '../components/AdminLayout';

export default function FarmPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    image: string;
    images: string[];
    video: string;
    category: string;
    variants: { name: string; price: number; size: string }[];
    orderLink: string;
    popular: boolean;
  }>({
    name: '',
    description: '',
    image: '',
    images: [],
    video: '',
    category: 'Farm',
    variants: [{ name: '', price: 0, size: '' }],
    orderLink: '',
    popular: false
  });

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  const farmProducts = config.products.filter(product => product.category === 'Farm');

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.description && newProduct.image) {
      const product = {
        ...newProduct,
        id: getNextId(config.products),
        variants: newProduct.variants.filter(v => v.name && v.price > 0)
      };

      const updatedConfig = {
        ...config,
        products: [...config.products, product]
      };

      setConfig(updatedConfig);
      saveConfig(updatedConfig);
      setNewProduct({
        name: '',
        description: '',
        image: '',
        images: [],
        video: '',
        category: 'Farm',
        variants: [{ name: '', price: 0, size: '' }],
        orderLink: '',
        popular: false
      });
      setIsAddingProduct(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      description: product.description,
      image: product.image,
      images: product.images || [],
      video: product.video || '',
      category: product.category,
      variants: product.variants,
      orderLink: product.orderLink,
      popular: product.popular
    });
    setIsAddingProduct(true);
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.description && newProduct.image) {
      const updatedConfig = {
        ...config,
        products: config.products.map(p => 
          p.id === editingProduct.id 
            ? { ...p, ...newProduct, variants: newProduct.variants.filter(v => v.name && v.price > 0) }
            : p
        )
      };

      setConfig(updatedConfig);
      saveConfig(updatedConfig);
      setEditingProduct(null);
      setNewProduct({
        name: '',
        description: '',
        image: '',
        images: [],
        video: '',
        category: 'Farm',
        variants: [{ name: '', price: 0, size: '' }],
        orderLink: '',
        popular: false
      });
      setIsAddingProduct(false);
    }
  };

  const handleDeleteProduct = (productId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit Farm ?')) {
      const updatedConfig = {
        ...config,
        products: config.products.filter(p => p.id !== productId)
      };

      setConfig(updatedConfig);
      saveConfig(updatedConfig);
    }
  };

  const addVariant = () => {
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, { name: '', price: 0, size: '' }]
    });
  };

  const removeVariant = (index: number) => {
    if (newProduct.variants.length > 1) {
      setNewProduct({
        ...newProduct,
        variants: newProduct.variants.filter((_, i) => i !== index)
      });
    }
  };

  const updateVariant = (index: number, field: string, value: any) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setNewProduct({ ...newProduct, variants: updatedVariants });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">🌾 Gestion des Produits Farm</h1>
          <button
            onClick={() => {
              setIsAddingProduct(true);
              setEditingProduct(null);
              setNewProduct({
                name: '',
                description: '',
                image: '',
                images: [],
                video: '',
                category: 'Farm',
                variants: [{ name: '', price: 0, size: '' }],
                orderLink: '',
                popular: false
              });
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            + Ajouter un produit Farm
          </button>
        </div>

        {/* Add/Edit Product Form */}
        {isAddingProduct && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Modifier le produit Farm' : 'Ajouter un nouveau produit Farm'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nom du produit Farm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Images multiples (URLs séparées par des virgules)</label>
                <textarea
                  value={newProduct.images?.join(', ') || ''}
                  onChange={(e) => setNewProduct({...newProduct, images: e.target.value.split(',').map(url => url.trim()).filter(url => url)})}
                  rows={2}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">Séparez les URLs par des virgules</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vidéo URL (optionnel)</label>
                <input
                  type="url"
                  value={newProduct.video || ''}
                  onChange={(e) => setNewProduct({...newProduct, video: e.target.value})}
                  placeholder="https://example.com/video.mp4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <p className="text-xs text-gray-500 mt-1">URL directe vers un fichier vidéo (MP4, WebM, etc.)</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                rows={3}
                placeholder="Description du produit Farm"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Lien de commande</label>
              <input
                type="url"
                value={newProduct.orderLink}
                onChange={(e) => setNewProduct({...newProduct, orderLink: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="https://example.com/order"
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={newProduct.popular}
                  onChange={(e) => setNewProduct({...newProduct, popular: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Produit populaire</span>
              </label>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Variantes</label>
                <button
                  type="button"
                  onClick={addVariant}
                  className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  + Ajouter variante
                </button>
              </div>
              
              {newProduct.variants.map((variant, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => updateVariant(index, 'name', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Nom (ex: 10%)"
                  />
                  <input
                    type="number"
                    step="0.01"
                    value={variant.price}
                    onChange={(e) => updateVariant(index, 'price', parseFloat(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Prix"
                  />
                  <div className="flex">
                    <input
                      type="text"
                      value={variant.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Taille (ex: 10ml)"
                    />
                    {newProduct.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(index)}
                        className="ml-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {editingProduct ? 'Mettre à jour' : 'Ajouter'}
              </button>
              <button
                onClick={() => {
                  setIsAddingProduct(false);
                  setEditingProduct(null);
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Products List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Produits Farm ({farmProducts.length})
            </h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produit
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Variantes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {farmProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
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
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        🌾 {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.variants.length} variante{product.variants.length > 1 ? 's' : ''}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.popular ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Populaire
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}