'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from './lib/config';
import Header from './components/Header';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);
  const [selectedFarmCategory, setSelectedFarmCategory] = useState<string>('all');

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
        className="absolute inset-0 bg-black opacity-30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)'
        }}
      ></div>
      <Header currentPage="Accueil" />

      {/* Category Filter */}
      <section className="py-8 bg-white/95 backdrop-blur-md shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <h2 className="text-2xl font-bold text-black">
              {config.pageContent.homepage.sectionTitle}
            </h2>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Category Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md bg-black text-white hover:bg-gray-800 min-w-[200px]"
                >
                  <span className="text-center">
                    {selectedCategory === 'all' 
                      ? `🌟 ${config.pageContent.homepage.categoryDropdownTitle}` 
                      : `${config.categories.find(cat => cat.name === selectedCategory)?.emoji} ${selectedCategory}`
                    }
                  </span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedCategory('all');
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedCategory === 'all' ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        🌟 {config.pageContent.homepage.categoryDropdownTitle}
                      </button>
                      {config.categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => {
                            setSelectedCategory(category.name);
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                            selectedCategory === category.name ? 'bg-gray-100 font-medium' : ''
                          }`}
                        >
                          {category.emoji} {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Farm Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsFarmDropdownOpen(!isFarmDropdownOpen)}
                  className="flex items-center justify-center space-x-2 px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md bg-black text-white hover:bg-gray-800 min-w-[200px]"
                >
                  <span className="text-center">
                    {selectedFarmCategory === 'all' 
                      ? `🌾 ${config.pageContent.homepage.farmDropdownTitle}` 
                      : selectedFarmCategory === 'Farm' 
                        ? '🌾 Produits Farm'
                        : `🌾 ${selectedFarmCategory}`
                    }
                  </span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isFarmDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isFarmDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedFarmCategory('all');
                          setSelectedCategory('all');
                          setIsFarmDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedFarmCategory === 'all' ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        🌾 Tous les produits
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFarmCategory('Farm');
                          setSelectedCategory('Farm');
                          setIsFarmDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedFarmCategory === 'Farm' ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        🌾 Produits Farm
                      </button>
                      <button
                        onClick={() => {
                          setIsFarmDropdownOpen(false);
                          // Ici vous pouvez ajouter la logique pour appeler Farm
                          window.open('tel:+33123456789', '_blank');
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                      >
                        📞 Appeler Farm
                      </button>
                      <button
                        onClick={() => {
                          setIsFarmDropdownOpen(false);
                          // Ici vous pouvez ajouter la logique pour envoyer un email
                          window.open('mailto:farm@cbdshop.fr', '_blank');
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                      >
                        📧 Email Farm
                      </button>
                      <button
                        onClick={() => {
                          setIsFarmDropdownOpen(false);
                          // Ici vous pouvez ajouter la logique pour la localisation
                          window.open('https://maps.google.com/?q=farm+cbd', '_blank');
                        }}
                        className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors"
                      >
                        📍 Localisation Farm
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
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
          
          <div className="text-center mt-12">
            <Link
              href="/produits"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </div>
      </section>


    </div>
  );
}