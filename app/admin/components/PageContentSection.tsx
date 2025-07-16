'use client';

import React, { useState } from 'react';
import { SiteConfig } from '../../lib/config';

interface PageContentSectionProps {
  config: SiteConfig;
  onUpdate: (updates: Partial<SiteConfig>) => void;
}

export default function PageContentSection({ config, onUpdate }: PageContentSectionProps) {
  const [pageContent, setPageContent] = useState(config.pageContent);
  const [activePage, setActivePage] = useState('homepage');

  const handleContentChange = (page: string, section: string, field: string, value: string) => {
    const updatedContent = {
      ...pageContent,
      [page]: {
        ...pageContent[page as keyof typeof pageContent],
        [section]: {
          ...pageContent[page as keyof typeof pageContent][section as keyof any],
          [field]: value
        }
      }
    };
    setPageContent(updatedContent);
    onUpdate({ pageContent: updatedContent });
  };

  const pages = [
    { id: 'homepage', name: '🏠 Page d\'accueil', icon: '🏠' },
    { id: 'contact', name: '📞 Page Contact', icon: '📞' },
    { id: 'socialMedia', name: '📱 Page Réseaux Sociaux', icon: '📱' },
    { id: 'footer', name: '📄 Pied de page', icon: '📄' },
    { id: 'products', name: '🛍️ Page Produits', icon: '🛍️' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">📄 Contenu des Pages</h2>
      </div>

      {/* Navigation des pages */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Sélectionner une page</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
          {pages.map((page) => (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              className={`p-4 rounded-lg border-2 transition-colors ${
                activePage === page.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{page.icon}</span>
                <span className="font-medium">{page.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Contenu de la page sélectionnée */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {activePage === 'homepage' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏠 Page d'accueil</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre principal
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.heroTitle}
                  onChange={(e) => handleContentChange('homepage', 'heroTitle', 'heroTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Bienvenue sur notre boutique"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.heroSubtitle}
                  onChange={(e) => handleContentChange('homepage', 'heroSubtitle', 'heroSubtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Découvrez nos produits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte du bouton principal
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.heroButtonText}
                  onChange={(e) => handleContentChange('homepage', 'heroButtonText', 'heroButtonText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Voir nos produits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de section
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.sectionTitle}
                  onChange={(e) => handleContentChange('homepage', 'sectionTitle', 'sectionTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nos catégories"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label catégories
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.categoriesLabel}
                  onChange={(e) => handleContentChange('homepage', 'categoriesLabel', 'categoriesLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Catégories"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Label fermes
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.farmLabel}
                  onChange={(e) => handleContentChange('homepage', 'farmLabel', 'farmLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Fermes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte "Toutes les catégories"
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.allCategoriesLabel}
                  onChange={(e) => handleContentChange('homepage', 'allCategoriesLabel', 'allCategoriesLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Voir toutes les catégories"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte "Produits ferme"
                </label>
                <input
                  type="text"
                  value={pageContent.homepage.farmProductsLabel}
                  onChange={(e) => handleContentChange('homepage', 'farmProductsLabel', 'farmProductsLabel', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Produits de nos fermes"
                />
              </div>
            </div>
          </div>
        )}

        {activePage === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Page Contact</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la page
                </label>
                <input
                  type="text"
                  value={pageContent.contact.title}
                  onChange={(e) => handleContentChange('contact', 'title', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Contactez-nous"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={pageContent.contact.subtitle}
                  onChange={(e) => handleContentChange('contact', 'subtitle', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nous sommes là pour vous aider"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={pageContent.contact.description}
                  onChange={(e) => handleContentChange('contact', 'description', 'description', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description de la page contact..."
                />
              </div>
            </div>
          </div>
        )}

        {activePage === 'socialMedia' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📱 Page Réseaux Sociaux</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la page
                </label>
                <input
                  type="text"
                  value={pageContent.socialMedia.title}
                  onChange={(e) => handleContentChange('socialMedia', 'title', 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Suivez-nous"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre
                </label>
                <input
                  type="text"
                  value={pageContent.socialMedia.subtitle}
                  onChange={(e) => handleContentChange('socialMedia', 'subtitle', 'subtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Restez connectés"
                />
              </div>
            </div>
          </div>
        )}

        {activePage === 'footer' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">📄 Pied de page</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Texte de copyright
              </label>
              <input
                type="text"
                value={pageContent.footer.copyrightText}
                onChange={(e) => handleContentChange('footer', 'copyrightText', 'copyrightText', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="© 2024 Votre Boutique. Tous droits réservés."
              />
            </div>
          </div>
        )}

        {activePage === 'products' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🛍️ Page Produits</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de la page
                </label>
                <input
                  type="text"
                  value={pageContent.products.pageTitle}
                  onChange={(e) => handleContentChange('products', 'pageTitle', 'pageTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nos Produits"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sous-titre de la page
                </label>
                <input
                  type="text"
                  value={pageContent.products.pageSubtitle}
                  onChange={(e) => handleContentChange('products', 'pageSubtitle', 'pageSubtitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Découvrez notre sélection"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre du filtre
                </label>
                <input
                  type="text"
                  value={pageContent.products.filterTitle}
                  onChange={(e) => handleContentChange('products', 'filterTitle', 'filterTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Filtrer par"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte "Populaire"
                </label>
                <input
                  type="text"
                  value={pageContent.products.popularText}
                  onChange={(e) => handleContentChange('products', 'popularText', 'popularText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Populaire"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte "Détails"
                </label>
                <input
                  type="text"
                  value={pageContent.products.detailsText}
                  onChange={(e) => handleContentChange('products', 'detailsText', 'detailsText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Voir détails"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Texte "Commander"
                </label>
                <input
                  type="text"
                  value={pageContent.products.orderText}
                  onChange={(e) => handleContentChange('products', 'orderText', 'orderText', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Commander"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Informations */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <span className="text-blue-400">💡</span>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Conseils pour le contenu
            </h3>
            <div className="mt-2 text-sm text-blue-700">
              <p>• Personnalisez les textes selon votre identité de marque</p>
              <p>• Gardez les textes courts et percutants</p>
              <p>• Les modifications sont appliquées immédiatement sur votre boutique</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}