'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';

interface PageProps {
  params: {
    page: string;
  };
}

export default function DynamicPage({ params }: PageProps) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [currentPage, setCurrentPage] = useState<any>(null);

  useEffect(() => {
    const loadedConfig = getConfig();
    setConfig(loadedConfig);
    
    // Trouver la page correspondante avec plusieurs méthodes de correspondance
    const page = loadedConfig.pages?.find(p => {
      // Correspondance exacte avec l'URL
      if (p.href === `/${params.page}` || p.href === params.page) {
        return true;
      }
      
      // Correspondance avec le nom de la page (slug)
      const pageSlug = p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      if (pageSlug === params.page) {
        return true;
      }
      
      // Correspondance avec l'URL sans le slash initial
      if (p.href.startsWith('/') && p.href.slice(1) === params.page) {
        return true;
      }
      
      return false;
    });
    
    setCurrentPage(page);
  }, [params.page]);

  if (!config || !currentPage) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
          <p className="text-gray-600 mb-4">La page que vous recherchez n'existe pas.</p>
          <a 
            href="/" 
            className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: config.shopInfo.backgroundColor,
      backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
      backgroundSize: '200px 200px',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat',
      backgroundAttachment: 'fixed'
    }}>
      <Header currentPage={currentPage.name} />

      {/* Contenu de la page */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {currentPage.name}
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📄 Page créée via l'administration
              </h2>
              <p className="text-gray-600 mb-4">
                Cette page a été configurée dans le panel d'administration et est maintenant accessible publiquement.
              </p>
              <div className="bg-white rounded-md p-4 border">
                <p className="text-sm text-gray-500 mb-2">URL de la page :</p>
                <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                  {currentPage.href}
                </code>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <a 
                href="/" 
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Retour à l'accueil
              </a>
              <a 
                href="/admin" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Administration
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}