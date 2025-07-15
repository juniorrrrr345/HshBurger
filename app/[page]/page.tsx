'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay pour améliorer la lisibilité */}
      <div 
        className="absolute inset-0 bg-black opacity-30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)'
        }}
      ></div>
      <Header currentPage={currentPage.name} />

      {/* Page Header */}
      <section 
        className="text-white py-16 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #000000, #333333)` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 filter drop-shadow-lg text-white">
            {currentPage.content?.title || currentPage.name}
          </h1>
          {currentPage.content?.subtitle && (
            <p className="text-xl max-w-2xl mx-auto filter drop-shadow-md text-white">
              {currentPage.content.subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Contenu principal */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
            
            {/* Description principale */}
            {currentPage.content?.description && (
              <div className="text-center mb-12">
                <div className="prose prose-lg mx-auto">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {currentPage.content.description}
                  </p>
                </div>
              </div>
            )}
            
            {/* Sections personnalisées */}
            {currentPage.content?.sections && currentPage.content.sections.length > 0 ? (
              <div className="space-y-12">
                {currentPage.content.sections.map((section: { title: string; content: string; type: 'text' | 'image' | 'video' | 'social' }, index: number) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                      {section.title}
                    </h3>
                    
                    {section.type === 'text' && (
                      <div className="prose prose-lg mx-auto">
                        <div dangerouslySetInnerHTML={{ __html: section.content }} />
                      </div>
                    )}
                    
                    {section.type === 'image' && (
                      <div className="text-center">
                        <img 
                          src={section.content} 
                          alt={section.title}
                          className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    {section.type === 'video' && (
                      <div className="text-center">
                        <video 
                          controls 
                          className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
                          src={section.content}
                        >
                          Votre navigateur ne supporte pas la lecture de vidéos.
                        </video>
                      </div>
                    )}
                    
                    {section.type === 'social' && (
                      <div className="text-center">
                        <div className="inline-block bg-gray-50 rounded-lg p-6 shadow-lg">
                          <div dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              /* Contenu par défaut si aucune section n'est définie */
              <div className="text-center py-16">
                <div className="text-6xl mb-6 filter drop-shadow-lg">📄</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  {currentPage.name}
                </h3>
                <p className="text-gray-500 mb-8 text-lg">
                  Cette page a été créée via le panel d'administration. 
                  Vous pouvez personnaliser son contenu en cliquant sur le bouton "Contenu" dans l'administration.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-8">
                  <p className="text-sm text-gray-500 mb-2">URL de la page :</p>
                  <code className="bg-white px-3 py-1 rounded text-sm font-mono border">
                    {currentPage.href}
                  </code>
                </div>
                <Link
                  href="/admin"
                  className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  Personnaliser cette page
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}