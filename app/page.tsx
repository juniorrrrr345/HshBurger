'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from './lib/config';
import Header from './components/Header';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  const filteredProducts = selectedCategory === 'all' 
    ? config.products 
    : config.products.filter(product => product.category === selectedCategory);

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
        className="absolute inset-0 bg-black opacity-20"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)'
        }}
      ></div>
      {/* Couche de fond répétée pour améliorer la qualité */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px) brightness(0.8)'
        }}
      ></div>
      <Header currentPage="Accueil" />

      {/* Category Filter */}
      <section className="py-8 bg-white/95 backdrop-blur-md shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              {config.pageContent.homepage.sectionTitle}
            </h2>
            <p className="text-gray-600 mb-6">
              Filtrer par catégorie ou découvrir nos produits Farm
            </p>
          </div>
          
          {/* Filtres simples */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {/* Bouton Tous */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md ${
                selectedCategory === 'all' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
            >
              🌟 Tous les produits
            </button>
            
            {/* Boutons Catégories */}
            {config.categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md ${
                  selectedCategory === category.name 
                    ? 'bg-black text-white' 
                    : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
                }`}
              >
                {category.emoji} {category.name}
              </button>
            ))}
            
            {/* Bouton Farm */}
            <button
              onClick={() => setSelectedCategory('Farm')}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md ${
                selectedCategory === 'Farm' 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border-2 border-black hover:bg-black hover:text-white'
              }`}
            >
              🌾 Produits Farm
            </button>
            
            {/* Bouton Appeler Farm */}
            <button
              onClick={() => window.open('tel:+33123456789', '_blank')}
              className="px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md bg-green-600 text-white hover:bg-green-700"
            >
              📞 Appeler Farm
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.popular && (
                      <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold filter drop-shadow-md">
                        Populaire
                      </div>
                    )}
                    <div className="absolute top-2 left-2 text-2xl filter drop-shadow-md">
                      {config.categories.find(cat => cat.name === product.category)?.emoji}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-black">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {product.variants.map((variant, index) => (
                          <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full border-2 border-transparent hover:border-black transition-colors">
                            <span className="text-sm font-medium text-gray-700">{variant.name}</span>
                            <span className="text-sm font-bold ml-2 text-black">
                              €{variant.price}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Link
                        href={`/produit/${product.id}`}
                        className="flex-1 bg-gray-100 text-black text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium"
                      >
                        Voir détails
                      </Link>
                      <a
                        href={product.orderLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-black text-white text-center py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium hover:bg-gray-800"
                      >
                        Commander
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Voir plus de produits */}
            {filteredProducts.length > 6 && (
              <div className="text-center mt-8">
                <Link
                  href="/produits"
                  className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  Voir tous les produits
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}