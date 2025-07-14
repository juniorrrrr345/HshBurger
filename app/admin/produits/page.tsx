'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProducts, useCategories } from '@/hooks/useShop';
import { Product, ProductPrice } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  Eye,
  Save,
  X,
  Upload,
  Minus
} from 'lucide-react';

export default function AdminProduitsPage() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    images: [''],
    prices: [{ id: '', variant: '', price: 0, originalPrice: 0, unit: '' }] as ProductPrice[],
    category: '',
    inStock: true,
    featured: false
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      images: product.images.length > 0 ? product.images : [''],
      prices: product.prices.map(p => ({ ...p })),
      category: product.category,
      inStock: product.inStock,
      featured: product.featured
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      images: [''],
      prices: [{ id: Date.now().toString(), variant: '', price: 0, originalPrice: 0, unit: '' }],
      category: '',
      inStock: true,
      featured: false
    });
    setShowModal(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      deleteProduct(productId);
    }
  };

  const handleImageUpload = (index: number) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const newImages = [...formData.images];
          newImages[index] = result;
          setFormData(prev => ({ ...prev, images: newImages }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addPrice = () => {
    setFormData(prev => ({
      ...prev,
      prices: [...prev.prices, { 
        id: Date.now().toString(), 
        variant: '', 
        price: 0, 
        originalPrice: 0, 
        unit: '' 
      }]
    }));
  };

  const removePrice = (index: number) => {
    if (formData.prices.length > 1) {
      setFormData(prev => ({
        ...prev,
        prices: prev.prices.filter((_, i) => i !== index)
      }));
    }
  };

  const updatePrice = (index: number, field: keyof ProductPrice, value: string | number) => {
    const newPrices = [...formData.prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setFormData(prev => ({ ...prev, prices: newPrices }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      ...formData,
      images: formData.images.filter(img => img !== ''),
      prices: formData.prices.map(p => ({
        ...p,
        originalPrice: p.originalPrice || undefined
      }))
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
    } else {
      addProduct(productData);
    }
    
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Produits</h1>
            <p className="text-gray-600">Gérez vos produits CBD</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Nouveau produit
          </button>
        </div>

        {/* Filtres */}
        <div className="card">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  className="form-input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="form-input"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">
              {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="card-body">
            {filteredProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Produit</th>
                      <th className="text-left p-4">Catégorie</th>
                      <th className="text-left p-4">Prix</th>
                      <th className="text-left p-4">Stock</th>
                      <th className="text-left p-4">Statut</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.images[0] || '/placeholder-product.jpg'}
                              alt={product.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-600">
                                {product.description.substring(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="badge badge-info">
                            {categories.find(c => c.id === product.category)?.name || 'Non défini'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {product.prices.map((price, index) => (
                              <div key={price.id} className="text-sm">
                                <span className="font-medium">{price.price.toFixed(2)} €</span>
                                {price.originalPrice && (
                                  <span className="text-gray-500 line-through ml-1">
                                    {price.originalPrice.toFixed(2)} €
                                  </span>
                                )}
                                <span className="text-gray-600 ml-1">
                                  ({price.variant})
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`badge ${product.inStock ? 'badge-success' : 'badge-danger'}`}>
                            {product.inStock ? 'En stock' : 'Rupture'}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            {product.featured && (
                              <span className="badge badge-warning">Populaire</span>
                            )}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">
                  {searchTerm || filterCategory !== 'all' 
                    ? 'Aucun produit ne correspond à vos critères' 
                    : 'Commencez par ajouter votre premier produit'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Informations de base */}
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Nom du produit *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="form-input"
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      className="form-input"
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <label className="form-label">Catégorie *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      className="form-input"
                      required
                    >
                      <option value="">Sélectionnez une catégorie</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="mr-2"
                      />
                      En stock
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                        className="mr-2"
                      />
                      Produit populaire
                    </label>
                  </div>
                </div>

                {/* Images */}
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Images du produit</label>
                    <div className="space-y-3">
                      {formData.images.map((image, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="image-preview">
                            {image ? (
                              <>
                                <img src={image} alt={`Image ${index + 1}`} />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="remove-button"
                                >
                                  <X size={12} />
                                </button>
                              </>
                            ) : (
                              <Upload size={24} className="text-gray-400" />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleImageUpload(index)}
                            className="btn-outline flex items-center"
                          >
                            <Upload size={16} className="mr-2" />
                            {image ? 'Changer' : 'Ajouter'}
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addImage}
                        className="btn-outline flex items-center"
                      >
                        <Plus size={16} className="mr-2" />
                        Ajouter une image
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Prix et variantes */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="form-label">Prix et variantes *</label>
                  <button
                    type="button"
                    onClick={addPrice}
                    className="btn-outline flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Ajouter un prix
                  </button>
                </div>
                <div className="space-y-3">
                  {formData.prices.map((price, index) => (
                    <div key={index} className="grid grid-cols-5 gap-3 items-center">
                      <input
                        type="text"
                        placeholder="Variante (ex: 10ml)"
                        value={price.variant}
                        onChange={(e) => updatePrice(index, 'variant', e.target.value)}
                        className="form-input"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Prix"
                        value={price.price}
                        onChange={(e) => updatePrice(index, 'price', parseFloat(e.target.value) || 0)}
                        className="form-input"
                        step="0.01"
                        min="0"
                        required
                      />
                      <input
                        type="number"
                        placeholder="Prix original"
                        value={price.originalPrice || ''}
                        onChange={(e) => updatePrice(index, 'originalPrice', parseFloat(e.target.value) || 0)}
                        className="form-input"
                        step="0.01"
                        min="0"
                      />
                      <input
                        type="text"
                        placeholder="Unité"
                        value={price.unit}
                        onChange={(e) => updatePrice(index, 'unit', e.target.value)}
                        className="form-input"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removePrice(index)}
                        className="text-red-600 hover:text-red-800"
                        disabled={formData.prices.length <= 1}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save size={20} className="mr-2" />
                  {editingProduct ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}