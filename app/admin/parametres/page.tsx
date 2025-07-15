'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useShopSettings } from '@/hooks/useShop';
import { Save, AlertCircle, CheckCircle, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function AdminParametresPage() {
  const { settings, updateSettings } = useShopSettings();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  if (!settings) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="loading-spinner"></div>
        </div>
      </AdminLayout>
    );
  }

  const [formData, setFormData] = useState({
    name: settings.name,
    description: settings.description,
    contact: {
      email: settings.contact.email,
      phone: settings.contact.phone,
      address: settings.contact.address
    },
    social: {
      facebook: settings.social.facebook || '',
      instagram: settings.social.instagram || '',
      twitter: settings.social.twitter || ''
    }
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value
      }
    }));
  };

  const handleSocialChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social: {
        ...prev.social,
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus('saving');
    
    updateSettings(formData);
    
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  // Fonction pour réinitialiser les données
  const resetToDefaults = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cbd-products');
      localStorage.removeItem('cbd-categories');
      localStorage.removeItem('cbd-pages');
      localStorage.removeItem('cbd-shop-settings');
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600">Configurez les informations de votre boutique</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={saveStatus === 'saving'}
            className="btn-primary flex items-center"
          >
            {saveStatus === 'saving' ? (
              <>
                <div className="loading-spinner w-5 h-5 mr-2"></div>
                Sauvegarde...
              </>
            ) : (
              <>
                <Save size={20} className="mr-2" />
                Sauvegarder
              </>
            )}
          </button>
        </div>

        {/* Messages de statut */}
        {saveStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
            <CheckCircle size={20} className="text-green-600 mr-2" />
            <p className="text-green-800">Les paramètres ont été sauvegardés avec succès !</p>
          </div>
        )}

        {saveStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
            <AlertCircle size={20} className="text-red-600 mr-2" />
            <p className="text-red-800">Une erreur s'est produite lors de la sauvegarde.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informations générales */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Informations générales</h3>
            </div>
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Nom de la boutique *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="form-input"
                    required
                    placeholder="CBD Shop"
                  />
                </div>
                <div>
                  <label className="form-label">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    className="form-input"
                    rows={3}
                    required
                    placeholder="Votre boutique CBD de qualité premium"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informations de contact */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Informations de contact</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div>
                  <label className="form-label flex items-center">
                    <Mail size={16} className="mr-2" />
                    Adresse email *
                  </label>
                  <input
                    type="email"
                    value={formData.contact.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    className="form-input"
                    required
                    placeholder="contact@cbdshop.com"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center">
                    <Phone size={16} className="mr-2" />
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    className="form-input"
                    required
                    placeholder="+33 1 23 45 67 89"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center">
                    <MapPin size={16} className="mr-2" />
                    Adresse *
                  </label>
                  <textarea
                    value={formData.contact.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    className="form-input"
                    rows={3}
                    required
                    placeholder="123 Rue de la Paix, 75001 Paris"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
            </div>
            <div className="card-body">
              <div className="space-y-4">
                <div>
                  <label className="form-label flex items-center">
                    <Facebook size={16} className="mr-2" />
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.social.facebook}
                    onChange={(e) => handleSocialChange('facebook', e.target.value)}
                    className="form-input"
                    placeholder="https://facebook.com/votre-page"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center">
                    <Instagram size={16} className="mr-2" />
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.social.instagram}
                    onChange={(e) => handleSocialChange('instagram', e.target.value)}
                    className="form-input"
                    placeholder="https://instagram.com/votre-compte"
                  />
                </div>
                <div>
                  <label className="form-label flex items-center">
                    <Twitter size={16} className="mr-2" />
                    Twitter
                  </label>
                  <input
                    type="url"
                    value={formData.social.twitter}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    className="form-input"
                    placeholder="https://twitter.com/votre-compte"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Informations système */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Informations système</h3>
            </div>
            <div className="card-body">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Stockage des données</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Vos données sont actuellement stockées localement dans votre navigateur. 
                  Elles sont automatiquement sauvegardées à chaque modification.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Type de stockage:</span>
                    <span className="font-medium">LocalStorage</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sauvegarde automatique:</span>
                    <span className="font-medium text-green-600">Activée</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Hébergement:</span>
                    <span className="font-medium">Vercel</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Actions</h3>
            </div>
            <div className="card-body">
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => {
                    const data = {
                      products: localStorage.getItem('cbd-products'),
                      settings: localStorage.getItem('cbd-shop-settings'),
                      pages: localStorage.getItem('cbd-pages'),
                      categories: localStorage.getItem('cbd-categories')
                    };
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'cbd-shop-backup.json';
                    a.click();
                    URL.revokeObjectURL(url);
                  }}
                  className="btn-outline"
                >
                  Exporter les données
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action remplacera tout par les données par défaut avec les liens de commande.')) {
                      resetToDefaults();
                    }
                  }}
                  className="btn-outline text-red-600 border-red-300 hover:bg-red-50"
                >
                  Réinitialiser avec données par défaut
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}