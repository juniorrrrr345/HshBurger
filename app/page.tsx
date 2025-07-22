'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from './lib/config';
import Header from './components/Header';
import OptimizedImage from './components/OptimizedImage';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFarm, setSelectedFarm] = useState<string>('all');
  const [isCategoryAccordionOpen, setIsCategoryAccordionOpen] = useState(true);
  const [isFarmAccordionOpen, setIsFarmAccordionOpen] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  // Filtrer les produits selon la catégorie sélectionnée
  let filteredProducts = config.products;
  
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
  }
  if (selectedFarm !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.farm === selectedFarm);
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
      <Header currentPage="Accueil" />

      {/* Hero Section */}
      <section 
        className="text-white py-8 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}, #333333)` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 filter drop-shadow-lg">
            {config.pageContent.homepage.heroTitle}
          </h2>
          <p className="text-base md:text-lg mb-4 max-w-2xl mx-auto filter drop-shadow-md">
            {config.pageContent.homepage.heroSubtitle}
          </p>
          <Link 
            href="/produits" 
            className="inline-block bg-white/60 backdrop-blur-md text-black px-6 py-2 rounded-lg font-semibold hover:bg-white/80 transition-all duration-300 transform hover:scale-105 filter drop-shadow-lg border border-white/30 shadow-lg"
          >
            {config.pageContent.homepage.heroButtonText}
          </Link>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <div className="flex min-h-screen">
        {/* Sidebar - Volets Roulants */}
        <div className="w-80 bg-gray-900 text-white p-4 shadow-2xl">
          {/* Catégories Accordion */}
          <div className="mb-6">
            <button
              onClick={() => setIsCategoryAccordionOpen(!isCategoryAccordionOpen)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              <span className="text-white font-semibold flex items-center">
                <span className="mr-2">✓</span>
                Toutes les catégories
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isCategoryAccordionOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isCategoryAccordionOpen && (
              <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left p-4 hover:bg-gray-700 transition-colors border-l-4 ${
                    selectedCategory === 'all' ? 'border-green-500 bg-gray-700' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="w-4 h-4 bg-yellow-500 rounded-sm mr-3 inline-block"></span>
                      120U ++ 🔥
                    </span>
                  </div>
                </button>

                {config.categories.map((category) => {
                  const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                  const colorClass = colors[category.id % colors.length];
                  
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left p-4 hover:bg-gray-700 transition-colors border-l-4 ${
                        selectedCategory === category.name ? 'border-green-500 bg-gray-700' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className={`w-4 h-4 ${colorClass} rounded-sm mr-3 inline-block`}></span>
                          {category.name.toUpperCase()} {category.emoji}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Farms Accordion */}
          <div className="mb-6">
            <button
              onClick={() => setIsFarmAccordionOpen(!isFarmAccordionOpen)}
              className="w-full flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              <span className="text-white font-semibold">
                Toutes les farms
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${isFarmAccordionOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isFarmAccordionOpen && (
              <div className="mt-2 bg-gray-800 rounded-lg overflow-hidden">
                <button
                  onClick={() => setSelectedFarm('all')}
                  className={`w-full text-left p-4 hover:bg-gray-700 transition-colors border-l-4 ${
                    selectedFarm === 'all' ? 'border-green-500 bg-gray-700' : 'border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-sm mr-3 inline-block"></span>
                      TOUTES LES FARMS 🏡
                    </span>
                  </div>
                </button>

                {config.farms.map((farm) => {
                  const farmColors = ['bg-green-600', 'bg-blue-600', 'bg-purple-600', 'bg-teal-600'];
                  const colorClass = farmColors[farm.id % farmColors.length];
                  
                  return (
                    <button
                      key={farm.id}
                      onClick={() => setSelectedFarm(farm.name)}
                      className={`w-full text-left p-4 hover:bg-gray-700 transition-colors border-l-4 ${
                        selectedFarm === farm.name ? 'border-green-500 bg-gray-700' : 'border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center">
                          <span className={`w-4 h-4 ${colorClass} rounded-sm mr-3 inline-block`}></span>
                          {farm.name.toUpperCase()} {farm.emoji}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Products Grid */}
          <section className="py-12 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
                {config.pageContent.homepage.sectionTitle}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.slice(0, 6).map((product) => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-square relative bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-t-lg"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyNSAyNTAgMTUwIDI1MCAyMDAgMTUwWiIgZmlsbD0iI0QxRDVEMCIvPgo8L3N2Zz4K';
                        }}
                      />
                      {product.popular && (
                        <div 
                          className="absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs font-semibold filter drop-shadow-md"
                          style={{ backgroundColor: config.shopInfo.primaryColor }}
                        >
                          Populaire
                        </div>
                      )}
                      <div className="absolute top-2 left-2 text-lg filter drop-shadow-md">
                        {config.categories.find(cat => cat.name === product.category)?.emoji}
                      </div>
                      {product.farm && (
                        <div className="absolute bottom-2 left-2 text-black px-2 py-1 rounded text-xs font-semibold filter drop-shadow-md bg-white/90 backdrop-blur-sm border border-gray-200">
                          {config.farms.find(farm => farm.name === product.farm)?.emoji} {product.farm}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {product.variants.slice(0, 2).map((variant, index) => (
                            <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full border-2 border-transparent hover:border-green-500 transition-colors">
                              <span className="text-sm font-medium text-gray-700">{variant.name}</span>
                              <span className="text-sm font-bold ml-2" style={{ color: config.shopInfo.primaryColor }}>
                                €{variant.price}
                              </span>
                            </div>
                          ))}
                          {product.variants.length > 2 && (
                            <div className="flex items-center bg-white/80 px-2 py-1 rounded-full">
                              <span className="text-xs text-gray-500">+{product.variants.length - 2} autres</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Link
                          href={`/produit/${product.id}`}
                          className="flex-1 bg-gray-100 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium text-sm"
                        >
                          Détails
                        </Link>
                        <a
                          href={product.orderLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 text-white text-center py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium filter drop-shadow-md text-sm"
                          style={{ backgroundColor: config.shopInfo.primaryColor }}
                        >
                          Commander
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <Link
                  href="/produits"
                  className="inline-block text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 filter drop-shadow-lg"
                  style={{ backgroundColor: config.shopInfo.primaryColor }}
                >
                  Voir tous les produits
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}