'use client';

import React, { useState } from 'react';
import { SiteConfig, Farm } from '../../lib/config';

interface FarmsSectionProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export default function FarmsSection({ config, onUpdate }: FarmsSectionProps) {
  const [farms, setFarms] = useState(config.farms);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddFarm = () => {
    const newFarm: Farm = {
      id: Math.max(...farms.map(f => f.id), 0) + 1,
      name: '',
      emoji: '',
      description: ''
    };
    setEditingFarm(newFarm);
    setShowAddForm(true);
  };

  const handleEditFarm = (farm: Farm) => {
    setEditingFarm({ ...farm });
    setShowAddForm(true);
  };

  const handleDeleteFarm = (farmId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette ferme ?')) {
      const updatedFarms = farms.filter(f => f.id !== farmId);
      setFarms(updatedFarms);
      onUpdate({ farms: updatedFarms });
    }
  };

  const handleSaveFarm = () => {
    if (!editingFarm) return;

    if (!editingFarm.name.trim() || !editingFarm.emoji.trim()) {
      alert('Le nom et l\'emoji sont obligatoires');
      return;
    }

    let updatedFarms: Farm[];
    
    if (editingFarm.id > Math.max(...farms.map(f => f.id), 0)) {
      // Nouvelle ferme
      updatedFarms = [...farms, editingFarm];
    } else {
      // Modification d'une ferme existante
      updatedFarms = farms.map(f => 
        f.id === editingFarm.id ? editingFarm : f
      );
    }

    setFarms(updatedFarms);
    onUpdate({ farms: updatedFarms });
    setEditingFarm(null);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingFarm(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">🌾 Gestion des Fermes</h2>
        <button
          onClick={handleAddFarm}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
        >
          + Ajouter une ferme
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && editingFarm && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingFarm.id > Math.max(...farms.map(f => f.id), 0) ? 'Ajouter' : 'Modifier'} une ferme
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom de la ferme *
              </label>
              <input
                type="text"
                value={editingFarm.name}
                onChange={(e) => setEditingFarm({ ...editingFarm, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ex: Mountain"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emoji *
              </label>
              <input
                type="text"
                value={editingFarm.emoji}
                onChange={(e) => setEditingFarm({ ...editingFarm, emoji: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="🏔️"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <input
                type="text"
                value={editingFarm.description}
                onChange={(e) => setEditingFarm({ ...editingFarm, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Description de la ferme"
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
              onClick={handleSaveFarm}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}

      {/* Liste des fermes */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Fermes existantes</h3>
        </div>
        
        {farms.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucune ferme créée. Ajoutez votre première ferme !
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {farms.map((farm) => (
              <div key={farm.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{farm.emoji}</div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{farm.name}</h4>
                      {farm.description && (
                        <p className="text-sm text-gray-600">{farm.description}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditFarm(farm)}
                      className="text-green-600 hover:text-green-800 px-3 py-1 rounded-md hover:bg-green-50 transition-colors"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteFarm(farm.id)}
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
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-green-400">🌾</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              À propos des fermes
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>• Les fermes représentent vos partenaires ou lieux de production</p>
              <p>• Elles permettent d'organiser vos produits par origine</p>
              <p>• Chaque ferme peut avoir ses propres produits et caractéristiques</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}