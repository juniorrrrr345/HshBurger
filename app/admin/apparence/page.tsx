'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useShopSettings } from '@/hooks/useShop';
import { Save, Upload, Image, Palette, Eye, RotateCcw } from 'lucide-react';

export default function AdminApparencePage() {
  const { settings, updateSettings, resetSettings } = useShopSettings();
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
    logo: settings.logo,
    colors: {
      primary: settings.colors.primary,
      secondary: settings.colors.secondary,
      text: settings.colors.text,
      background: settings.colors.background
    },
    background: {
      type: settings.background.type,
      value: settings.background.value,
      opacity: settings.background.opacity || 100
    }
  });

  const handleColorChange = (colorType: keyof typeof formData.colors, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorType]: value
      }
    }));
  };

  const handleBackgroundChange = (key: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      background: {
        ...prev.background,
        [key]: value
      }
    }));
  };

  const handleImageUpload = (type: 'logo' | 'background') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (type === 'logo') {
            setFormData(prev => ({ ...prev, logo: result }));
          } else {
            setFormData(prev => ({
              ...prev,
              background: {
                ...prev.background,
                type: 'image',
                value: result
              }
            }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleSave = () => {
    setSaveStatus('saving');
    
    updateSettings({
      logo: formData.logo,
      colors: formData.colors,
      background: formData.background
    });
    
    setTimeout(() => {
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 500);
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser l\'apparence ? Cette action est irréversible.')) {
      resetSettings();
      window.location.reload();
    }
  };

  const previewStyle = {
    '--primary-color': formData.colors.primary,
    '--secondary-color': formData.colors.secondary,
    '--text-color': formData.colors.text,
    '--background-color': formData.colors.background,
    '--background-image': formData.background.type === 'image' ? `url(${formData.background.value})` : '',
    '--background-opacity': formData.background.opacity.toString()
  } as React.CSSProperties;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Apparence</h1>
            <p className="text-gray-600">Personnalisez l'aspect de votre boutique</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleReset}
              className="btn-outline flex items-center"
            >
              <RotateCcw size={20} className="mr-2" />
              Réinitialiser
            </button>
            <button
              onClick={handleSave}
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
        </div>

        {/* Message de succès */}
        {saveStatus === 'success' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">Les modifications ont été sauvegardées avec succès !</p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Paramètres */}
          <div className="space-y-6">
            {/* Logo */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Logo de la boutique</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      {formData.logo ? (
                        <img
                          src={formData.logo}
                          alt="Logo"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Image size={24} className="text-gray-400" />
                      )}
                    </div>
                    <div>
                      <button
                        onClick={() => handleImageUpload('logo')}
                        className="btn-outline flex items-center"
                      >
                        <Upload size={16} className="mr-2" />
                        Changer le logo
                      </button>
                      <p className="text-sm text-gray-600 mt-1">
                        Formats acceptés: JPG, PNG, SVG
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Couleurs */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Couleurs</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Couleur primaire</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="form-input flex-1"
                        placeholder="#22c55e"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Couleur secondaire</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="form-input flex-1"
                        placeholder="#16a34a"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Couleur du texte</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.colors.text}
                        onChange={(e) => handleColorChange('text', e.target.value)}
                        className="form-input flex-1"
                        placeholder="#1f2937"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Couleur de fond</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="form-input flex-1"
                        placeholder="#ffffff"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fond de page */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold">Fond de page</h3>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <label className="form-label">Type de fond</label>
                    <select
                      value={formData.background.type}
                      onChange={(e) => handleBackgroundChange('type', e.target.value)}
                      className="form-input"
                    >
                      <option value="color">Couleur unie</option>
                      <option value="image">Image</option>
                    </select>
                  </div>

                  {formData.background.type === 'color' ? (
                    <div>
                      <label className="form-label">Couleur de fond</label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          value={formData.background.value}
                          onChange={(e) => handleBackgroundChange('value', e.target.value)}
                          className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                          type="text"
                          value={formData.background.value}
                          onChange={(e) => handleBackgroundChange('value', e.target.value)}
                          className="form-input flex-1"
                          placeholder="#f9fafb"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <label className="form-label">Image de fond</label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            {formData.background.value ? (
                              <img
                                src={formData.background.value}
                                alt="Fond"
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <Image size={24} className="text-gray-400" />
                            )}
                          </div>
                          <button
                            onClick={() => handleImageUpload('background')}
                            className="btn-outline flex items-center"
                          >
                            <Upload size={16} className="mr-2" />
                            Changer l'image
                          </button>
                        </div>
                        
                        <div>
                          <label className="form-label">
                            Opacité: {formData.background.opacity}%
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={formData.background.opacity}
                            onChange={(e) => handleBackgroundChange('opacity', parseInt(e.target.value))}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Aperçu */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold flex items-center">
                <Eye size={20} className="mr-2" />
                Aperçu en temps réel
              </h3>
            </div>
            <div className="card-body">
              <div 
                className="border rounded-lg overflow-hidden"
                style={previewStyle}
              >
                {/* Header preview */}
                <div className="bg-white shadow-sm p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {formData.logo && (
                        <img src={formData.logo} alt="Logo" className="w-8 h-8 mr-2" />
                      )}
                      <span 
                        className="font-bold text-lg"
                        style={{ color: formData.colors.primary }}
                      >
                        CBD Shop
                      </span>
                    </div>
                    <div className="flex space-x-4">
                      <span className="text-sm text-gray-600">Accueil</span>
                      <span className="text-sm text-gray-600">Produits</span>
                      <span className="text-sm text-gray-600">Contact</span>
                    </div>
                  </div>
                </div>

                {/* Content preview */}
                <div 
                  className={`p-6 ${formData.background.type === 'image' ? 'shop-background' : ''}`}
                  style={{
                    backgroundColor: formData.background.type === 'color' ? formData.background.value : 'transparent',
                    color: formData.colors.text
                  }}
                >
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <h2 className="text-xl font-bold mb-2">Produit exemple</h2>
                    <p className="text-gray-600 mb-4">
                      Description du produit CBD premium...
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-lg font-bold"
                        style={{ color: formData.colors.primary }}
                      >
                        29.90 €
                      </span>
                      <button 
                        className="px-4 py-2 rounded-lg text-white font-medium"
                        style={{ backgroundColor: formData.colors.primary }}
                      >
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-4">
                    <button 
                      className="w-full px-4 py-2 rounded-lg text-white font-medium mb-2"
                      style={{ backgroundColor: formData.colors.secondary }}
                    >
                      Bouton secondaire
                    </button>
                    <button 
                      className="w-full px-4 py-2 rounded-lg border-2 font-medium"
                      style={{ 
                        color: formData.colors.primary,
                        borderColor: formData.colors.primary
                      }}
                    >
                      Bouton outline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}