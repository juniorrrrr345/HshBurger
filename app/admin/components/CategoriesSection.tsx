'use client';

import React, { useState } from 'react';
import { SiteConfig, Category } from '../../lib/config';

interface CategoriesSectionProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export default function CategoriesSection({ config, onUpdate }: CategoriesSectionProps) {
  const [categories, setCategories] = useState(config.categories);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCategory = () => {
    const newCategory: Category = {
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      name: '',
      emoji: '',
      description: ''
    };
    setEditingCategory(newCategory);
    setShowAddForm(true);
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory({ ...category });
    setShowAddForm(true);
  };

  const handleDeleteCategory = (categoryId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      const updatedCategories = categories.filter(c => c.id !== categoryId);
      setCategories(updatedCategories);
      onUpdate({ categories: updatedCategories });
    }
  };

  const handleSaveCategory = () => {
    if (!editingCategory) return;

    if (!editingCategory.name.trim() || !editingCategory.emoji.trim()) {
      alert('Le nom et l\'emoji sont obligatoires');
      return;
    }

    let updatedCategories: Category[];
    
    if (editingCategory.id > Math.max(...categories.map(c => c.id), 0)) {
      // Nouvelle catégorie
      updatedCategories = [...categories, editingCategory];
    } else {
      // Modification d'une catégorie existante
      updatedCategories = categories.map(c => 
        c.id === editingCategory.id ? editingCategory : c
      );
    }

    setCategories(updatedCategories);
    onUpdate({ categories: updatedCategories });
    setEditingCategory(null);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">📂 Gestion des Catégories</h2>
        <button
          onClick={handleAddCategory}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          + Ajouter une catégorie
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && editingCategory && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingCategory.id > Math.max(...categories.map(c => c.id), 0) ? 'Ajouter' : 'Modifier'} une catégorie
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la catégorie *
              </label>
              <input
                type="text"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ex: Huiles"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emoji *
              </label>
              <input
                type="text"
                value={editingCategory.emoji}
                onChange={(e) => setEditingCategory({ ...editingCategory, emoji: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="💧"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={editingCategory.description}
                onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Description de la catégorie"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleCancelEdit}
              className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSaveCategory}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}

      {/* Liste des catégories */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Catégories existantes</h3>
        </div>
        
        {categories.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucune catégorie créée. Ajoutez votre première catégorie !
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {categories.map((category) => (
              <div key={category.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{category.emoji}</div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                      {category.description && (
                        <p className="text-sm text-gray-600">{category.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-yellow-400">⚠️</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Information importante
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>• Les catégories sont utilisées pour organiser vos produits</p>
              <p>• Assurez-vous que les emojis sont compatibles avec tous les appareils</p>
              <p>• La suppression d'une catégorie peut affecter les produits associés</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}