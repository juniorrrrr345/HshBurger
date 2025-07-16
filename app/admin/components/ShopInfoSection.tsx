'use client';

import React, { useState } from 'react';
import { SiteConfig } from '../../lib/config';

interface ShopInfoSectionProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export default function ShopInfoSection({ config, onUpdate }: ShopInfoSectionProps) {
  const [shopInfo, setShopInfo] = useState(config.shopInfo);
  const [contactInfo, setContactInfo] = useState(config.contactInfo);

  const handleShopInfoChange = (field: string, value: string) => {
    const updatedShopInfo = { ...shopInfo, [field]: value };
    setShopInfo(updatedShopInfo);
    onUpdate({ shopInfo: updatedShopInfo });
  };

  const handleContactInfoChange = (field: string, value: string) => {
    const updatedContactInfo = { ...contactInfo, [field]: value };
    setContactInfo(updatedContactInfo);
    onUpdate({ contactInfo: updatedContactInfo });
  };

  return (
    <div className="space-y-8">
      {/* Informations de la boutique */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">🏪 Informations de la Boutique</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de la boutique
            </label>
            <input
              type="text"
              value={shopInfo.name}
              onChange={(e) => handleShopInfoChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Nom de votre boutique"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={shopInfo.description}
              onChange={(e) => handleShopInfoChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Description de votre boutique"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo (emoji)
            </label>
            <input
              type="text"
              value={shopInfo.logo}
              onChange={(e) => handleShopInfoChange('logo', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="🌿"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL du logo (optionnel)
            </label>
            <input
              type="url"
              value={shopInfo.logoUrl}
              onChange={(e) => handleShopInfoChange('logoUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/logo.png"
            />
          </div>
        </div>
      </div>

      {/* Couleurs */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 Couleurs</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur principale
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={shopInfo.primaryColor}
                onChange={(e) => handleShopInfoChange('primaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={shopInfo.primaryColor}
                onChange={(e) => handleShopInfoChange('primaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur secondaire
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={shopInfo.secondaryColor}
                onChange={(e) => handleShopInfoChange('secondaryColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={shopInfo.secondaryColor}
                onChange={(e) => handleShopInfoChange('secondaryColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur du texte
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={shopInfo.textColor}
                onChange={(e) => handleShopInfoChange('textColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={shopInfo.textColor}
                onChange={(e) => handleShopInfoChange('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleur d'arrière-plan
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={shopInfo.backgroundColor}
                onChange={(e) => handleShopInfoChange('backgroundColor', e.target.value)}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={shopInfo.backgroundColor}
                onChange={(e) => handleShopInfoChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image d'arrière-plan (URL)
            </label>
            <input
              type="url"
              value={shopInfo.backgroundImage}
              onChange={(e) => handleShopInfoChange('backgroundImage', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/background.jpg"
            />
          </div>
        </div>
      </div>

      {/* Informations de contact */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Informations de Contact</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lien de commande
            </label>
            <input
              type="url"
              value={contactInfo.orderLink}
              onChange={(e) => handleContactInfoChange('orderLink', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/order"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Texte du bouton de commande
            </label>
            <input
              type="text"
              value={contactInfo.orderText}
              onChange={(e) => handleContactInfoChange('orderText', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Commandez maintenant"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="contact@boutique.fr"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => handleContactInfoChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+33 1 23 45 67 89"
            />
          </div>
        </div>
      </div>
    </div>
  );
}