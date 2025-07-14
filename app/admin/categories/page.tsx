'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useCategories } from '@/hooks/useShop';
import { Category } from '@/types';
import { Plus, Edit, Trash2, Search, Save, X, Upload, Grid } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: ''
  });

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image || ''
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: ''
    });
    setShowModal(true);
  };

  const handleDelete = (categoryId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      deleteCategory(categoryId);
    }
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setFormData(prev => ({ ...prev, image: result }));
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
    } else {
      addCategory(formData);
    }
    
    setShowModal(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Catégories</h1>
            <p className="text-gray-600">Organisez vos produits par catégories</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Nouvelle catégorie
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="card">
          <div className="card-body">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Liste des catégories */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">
              {filteredCategories.length} catégorie{filteredCategories.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="card-body">
            {filteredCategories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-lg">{category.name}</h4>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {category.image && (
                      <div className="mb-3">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    
                    <p className="text-gray-600 text-sm">{category.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Grid size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucune catégorie trouvée</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Aucune catégorie ne correspond à votre recherche' 
                    : 'Commencez par créer votre première catégorie'
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
          <div className="modal-content">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingCategory ? 'Modifier la catégorie' : 'Nouvelle catégorie'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="form-label">Nom de la catégorie *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="form-input"
                  required
                  placeholder="Huiles CBD"
                />
              </div>

              <div>
                <label className="form-label">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="form-input"
                  rows={3}
                  required
                  placeholder="Description de la catégorie..."
                />
              </div>

              <div>
                <label className="form-label">Image de la catégorie</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      {formData.image ? (
                        <img
                          src={formData.image}
                          alt="Aperçu"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Grid size={24} className="text-gray-400" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="btn-outline flex items-center"
                    >
                      <Upload size={16} className="mr-2" />
                      {formData.image ? 'Changer' : 'Ajouter'} une image
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Format recommandé: JPG, PNG (300x200px)
                  </p>
                </div>
              </div>

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
                  {editingCategory ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}