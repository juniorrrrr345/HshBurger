'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from './lib/config';
import Header from './components/Header';

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="min-h-screen" style={{ backgroundColor: config.shopInfo.backgroundColor }}>
      <Header currentPage="Accueil" />

      {/* Hero Section */}
      <section 
        className="text-white py-20 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}, ${config.shopInfo.secondaryColor})` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 filter drop-shadow-lg">
            {config.pageContent.homepage.heroTitle}
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto filter drop-shadow-md">
            {config.pageContent.homepage.heroSubtitle}
          </p>
          <Link 
            href="/produits" 
            className="inline-block bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 filter drop-shadow-lg"
          >
            {config.pageContent.homepage.heroButtonText}
          </Link>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-bold mb-4 md:mb-0" style={{ color: config.shopInfo.secondaryColor }}>
              {config.pageContent.homepage.sectionTitle}
            </h2>
            
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
                style={{ 
                  backgroundColor: config.shopInfo.primaryColor,
                  color: config.shopInfo.textColor 
                }}
              >
                <span>
                  {selectedCategory === 'all' 
                    ? '🌟 Toutes les catégories' 
                    : `${config.categories.find(cat => cat.name === selectedCategory)?.emoji} ${selectedCategory}`
                  }
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 z-10">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-black/5 transition-colors ${
                        selectedCategory === 'all' ? 'bg-black/10 font-medium' : ''
                      }`}
                    >
                      🌟 Toutes les catégories
                    </button>
                    {config.categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-black/5 transition-colors ${
                          selectedCategory === category.name ? 'bg-black/10 font-medium' : ''
                        }`}
                      >
                        {category.emoji} {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.slice(0, 6).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.popular && (
                    <div 
                      className="absolute top-2 right-2 text-white px-3 py-1 rounded-full text-sm font-semibold filter drop-shadow-md"
                      style={{ backgroundColor: config.shopInfo.primaryColor }}
                    >
                      Populaire
                    </div>
                  )}
                  <div className="absolute top-2 left-2 text-2xl filter drop-shadow-md">
                    {config.categories.find(cat => cat.name === product.category)?.emoji}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full border-2 border-transparent hover:border-green-500 transition-colors">
                          <span className="text-sm font-medium text-gray-700">{variant.name}</span>
                          <span className="text-sm font-bold ml-2" style={{ color: config.shopInfo.primaryColor }}>
                            €{variant.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/produit/${product.id}`}
                      className="flex-1 bg-gray-100 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 font-medium"
                    >
                      Voir détails
                    </Link>
                    <a
                      href={product.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-white text-center py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 font-medium filter drop-shadow-md"
                      style={{ backgroundColor: config.shopInfo.primaryColor }}
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
              className="inline-block text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 filter drop-shadow-lg"
              style={{ backgroundColor: config.shopInfo.primaryColor }}
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Logo Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-8xl mb-6 filter drop-shadow-lg">
            {config.shopInfo.logo}
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
            {config.shopInfo.name}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {config.shopInfo.description}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="py-8 text-center"
        style={{ 
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}, ${config.shopInfo.secondaryColor})`,
          color: config.shopInfo.textColor
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white/90">
            {config.pageContent.footer.copyrightText}
          </p>
        </div>
      </footer>
    </div>
  );
}