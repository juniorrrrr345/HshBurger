'use client';

import React, { useState } from 'react';
import { SiteConfig, SocialMediaLink } from '../../lib/config';

interface SocialMediaSectionProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export default function SocialMediaSection({ config, onUpdate }: SocialMediaSectionProps) {
  const [socialMediaLinks, setSocialMediaLinks] = useState(config.socialMediaLinks);
  const [editingLink, setEditingLink] = useState<SocialMediaLink | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddLink = () => {
    const newLink: SocialMediaLink = {
      id: Math.max(...socialMediaLinks.map(l => l.id), 0) + 1,
      name: '',
      emoji: '',
      url: '',
      color: '#000000'
    };
    setEditingLink(newLink);
    setShowAddForm(true);
  };

  const handleEditLink = (link: SocialMediaLink) => {
    setEditingLink({ ...link });
    setShowAddForm(true);
  };

  const handleDeleteLink = (linkId: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce réseau social ?')) {
      const updatedLinks = socialMediaLinks.filter(l => l.id !== linkId);
      setSocialMediaLinks(updatedLinks);
      onUpdate({ socialMediaLinks: updatedLinks });
    }
  };

  const handleSaveLink = () => {
    if (!editingLink) return;

    if (!editingLink.name.trim() || !editingLink.emoji.trim() || !editingLink.url.trim()) {
      alert('Le nom, l\'emoji et l\'URL sont obligatoires');
      return;
    }

    let updatedLinks: SocialMediaLink[];
    
    if (editingLink.id > Math.max(...socialMediaLinks.map(l => l.id), 0)) {
      // Nouveau lien
      updatedLinks = [...socialMediaLinks, editingLink];
    } else {
      // Modification d'un lien existant
      updatedLinks = socialMediaLinks.map(l => 
        l.id === editingLink.id ? editingLink : l
      );
    }

    setSocialMediaLinks(updatedLinks);
    onUpdate({ socialMediaLinks: updatedLinks });
    setEditingLink(null);
    setShowAddForm(false);
  };

  const handleCancelEdit = () => {
    setEditingLink(null);
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">📱 Gestion des Réseaux Sociaux</h2>
        <button
          onClick={handleAddLink}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          + Ajouter un réseau social
        </button>
      </div>

      {/* Formulaire d'ajout/modification */}
      {showAddForm && editingLink && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {editingLink.id > Math.max(...socialMediaLinks.map(l => l.id), 0) ? 'Ajouter' : 'Modifier'} un réseau social
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du réseau social *
              </label>
              <input
                type="text"
                value={editingLink.name}
                onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Ex: Instagram"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Emoji *
              </label>
              <input
                type="text"
                value={editingLink.emoji}
                onChange={(e) => setEditingLink({ ...editingLink, emoji: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="📸"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL du profil *
              </label>
              <input
                type="url"
                value={editingLink.url}
                onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://instagram.com/votre-profil"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Couleur
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={editingLink.color}
                  onChange={(e) => setEditingLink({ ...editingLink, color: e.target.value })}
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={editingLink.color}
                  onChange={(e) => setEditingLink({ ...editingLink, color: e.target.value })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="#E4405F"
                />
              </div>
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
              onClick={handleSaveLink}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}

      {/* Liste des réseaux sociaux */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Réseaux sociaux configurés</h3>
        </div>
        
        {socialMediaLinks.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Aucun réseau social configuré. Ajoutez votre premier réseau social !
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {socialMediaLinks.map((link) => (
              <div key={link.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div 
                      className="text-2xl p-2 rounded-full"
                      style={{ backgroundColor: link.color + '20' }}
                    >
                      {link.emoji}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900">{link.name}</h4>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 break-all"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditLink(link)}
                      className="text-purple-600 hover:text-purple-800 px-3 py-1 rounded-md hover:bg-purple-50 transition-colors"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
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
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-purple-400">📱</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-purple-800">
              Conseils pour les réseaux sociaux
            </h3>
            <div className="mt-2 text-sm text-purple-700">
              <p>• Utilisez des URLs complètes (https://...) pour chaque réseau</p>
              <p>• Choisissez des emojis représentatifs de chaque plateforme</p>
              <p>• Les couleurs personnalisées apparaîtront sur votre boutique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}