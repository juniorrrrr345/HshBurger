'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import ShopInfoSection from './components/ShopInfoSection';
import CategoriesSection from './components/CategoriesSection';
import FarmsSection from './components/FarmsSection';
import SocialMediaSection from './components/SocialMediaSection';
import PageContentSection from './components/PageContentSection';
import { SiteConfig } from '../lib/config';

export default function AdminPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('shop-info');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/api/config');
      if (response.ok) {
        const data = await response.json();
        setConfig(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la configuration:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveConfig = async (updatedConfig: SiteConfig) => {
    setSaveStatus('saving');
    try {
      const response = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedConfig),
      });

      if (response.ok) {
        setConfig(updatedConfig);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 2000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setSaveStatus('error');
    }
  };

  const handleConfigUpdate = (updates: Partial<SiteConfig>) => {
    if (config) {
      const updatedConfig = { ...config, ...updates };
      saveConfig(updatedConfig);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        </div>
      </AdminLayout>
    );
  }

  if (!config) {
    return (
      <AdminLayout>
        <div className="text-center py-8">
          <p className="text-red-600">Erreur lors du chargement de la configuration</p>
        </div>
      </AdminLayout>
    );
  }

  const tabs = [
    { id: 'shop-info', name: '🏪 Informations Boutique', icon: '🏪' },
    { id: 'categories', name: '📂 Catégories', icon: '📂' },
    { id: 'farms', name: '🌾 Fermes', icon: '🌾' },
    { id: 'social-media', name: '📱 Réseaux Sociaux', icon: '📱' },
    { id: 'page-content', name: '📄 Contenu Pages', icon: '📄' },
  ];

  return (
    <AdminLayout>
      <div className="bg-white rounded-lg shadow-sm">
        {/* Header avec statut de sauvegarde */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Configuration de la Boutique</h1>
            <div className="flex items-center space-x-2">
              {saveStatus === 'saving' && (
                <div className="flex items-center text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                  Sauvegarde...
                </div>
              )}
              {saveStatus === 'saved' && (
                <div className="flex items-center text-green-600">
                  <span className="mr-2">✓</span>
                  Sauvegardé
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex items-center text-red-600">
                  <span className="mr-2">✗</span>
                  Erreur
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Navigation par onglets */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Contenu des onglets */}
        <div className="p-6">
          {activeTab === 'shop-info' && (
            <ShopInfoSection 
              config={config} 
              onUpdate={handleConfigUpdate} 
            />
          )}
          {activeTab === 'categories' && (
            <CategoriesSection 
              config={config} 
              onUpdate={handleConfigUpdate} 
            />
          )}
          {activeTab === 'farms' && (
            <FarmsSection 
              config={config} 
              onUpdate={handleConfigUpdate} 
            />
          )}
          {activeTab === 'social-media' && (
            <SocialMediaSection 
              config={config} 
              onUpdate={handleConfigUpdate} 
            />
          )}
          {activeTab === 'page-content' && (
            <PageContentSection 
              config={config} 
              onUpdate={handleConfigUpdate} 
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}