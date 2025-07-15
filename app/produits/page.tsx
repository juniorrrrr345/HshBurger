'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';
import OptimizedImage from '../components/OptimizedImage';

export default function ProduitsPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFarm, setSelectedFarm] = useState<string>('all');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isFarmDropdownOpen, setIsFarmDropdownOpen] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  // Filtrer les produits selon la catégorie et la ferme sélectionnées
  let filteredProducts = config.products;
  
  if (selectedCategory !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === selectedCategory);
    
    // Si c'est la catégorie Farm et qu'une ferme spécifique est sélectionnée
    if (selectedCategory === 'Farm' && selectedFarm !== 'all') {
      filteredProducts = filteredProducts.filter(product => product.farm === selectedFarm);
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: config.shopInfo.backgroundColor }}>
      <Header currentPage="Produits" />

      {/* Page Header */}
      <section 
        className="text-white py-16 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}, #333333)` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 filter drop-shadow-lg">
            Nos Produits
          </h1>
          <p className="text-xl max-w-2xl mx-auto filter drop-shadow-md">
            Découvrez toute notre gamme de produits CBD de qualité premium
          </p>
        </div>
      </section>

      {/* Category and Farm Filter */}
      <section className="py-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-6">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-black">
                Filtrer par catégorie
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} 
                {selectedCategory !== 'all' && ` dans ${selectedCategory}`}
                {selectedCategory === 'Farm' && selectedFarm !== 'all' && ` - ${selectedFarm}`}
              </p>
            </div>
            
            {/* Category Dropdown */}
            <div className="relative w-full md:w-auto">
              <button
                onClick={() => {
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                  setIsFarmDropdownOpen(false);
                }}
                className="flex items-center justify-between w-full md:w-auto space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md bg-black text-white"
              >
                <span className="text-sm md:text-base">
                  {selectedCategory === 'all' 
                    ? `🌟 Toutes les ${config.adminSettings.categoriesButtonText.toLowerCase()}` 
                    : `${config.categories.find(cat => cat.name === selectedCategory)?.emoji} ${selectedCategory}`
                  }
                </span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCategoryDropdownOpen && (
                <div className="absolute left-0 md:right-0 mt-2 w-full md:w-64 bg-white rounded-lg shadow-xl border z-50 max-h-60 overflow-y-auto">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedFarm('all');
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                        selectedCategory === 'all' ? 'bg-gray-100 font-medium' : ''
                      }`}
                    >
                      🌟 Toutes les {config.adminSettings.categoriesButtonText.toLowerCase()}
                    </button>
                    {config.categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.name);
                          setSelectedFarm('all');
                          setIsCategoryDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedCategory === category.name ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        <span className="mr-2">{category.emoji}</span>
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Farm Filter (only show when Farm category is selected) */}
          {selectedCategory === 'Farm' && (
            <div className="flex justify-center mb-6">
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => {
                    setIsFarmDropdownOpen(!isFarmDropdownOpen);
                    setIsCategoryDropdownOpen(false);
                  }}
                  className="flex items-center justify-between w-full md:w-auto space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md bg-black text-white"
                >
                  <span className="text-sm md:text-base">
                    {selectedFarm === 'all' 
                      ? `🌾 Toutes les ${config.adminSettings.farmsButtonText.toLowerCase()}` 
                      : `${config.farms.find(farm => farm.name === selectedFarm)?.emoji} ${selectedFarm}`
                    }
                  </span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isFarmDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isFarmDropdownOpen && (
                  <div className="absolute left-0 md:left-0 mt-2 w-full md:w-64 bg-white rounded-lg shadow-xl border z-50 max-h-60 overflow-y-auto">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedFarm('all');
                          setIsFarmDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                          selectedFarm === 'all' ? 'bg-gray-100 font-medium' : ''
                        }`}
                      >
                        🌾 Toutes les {config.adminSettings.farmsButtonText.toLowerCase()}
                      </button>
                      {config.farms.map((farm) => (
                        <button
                          key={farm.id}
                          onClick={() => {
                            setSelectedFarm(farm.name);
                            setIsFarmDropdownOpen(false);
                          }}
                          className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-100 transition-colors ${
                            selectedFarm === farm.name ? 'bg-gray-100 font-medium' : ''
                          }`}
                        >
                          <span className="mr-2">{farm.emoji}</span>
                          {farm.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold mb-4 text-gray-600">
                Aucun produit dans cette catégorie
              </h3>
              <p className="text-gray-500 mb-8">
                Essayez de sélectionner une autre catégorie ou ajoutez des produits depuis le panel admin.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedFarm('all');
                }}
                className="inline-block text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 filter drop-shadow-md"
                style={{ backgroundColor: config.shopInfo.primaryColor }}
              >
                Voir tous les produits
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
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
                        className="absolute top-2 right-2 text-white px-3 py-1 rounded-full text-sm font-semibold filter drop-shadow-md"
                        style={{ backgroundColor: config.shopInfo.primaryColor }}
                      >
                        Populaire
                      </div>
                    )}
                    <div className="absolute top-2 left-2 text-2xl filter drop-shadow-md">
                      {config.categories.find(cat => cat.name === product.category)?.emoji}
                    </div>
                    {product.farm && (
                      <div className="absolute bottom-2 left-2 text-white px-2 py-1 rounded text-xs font-semibold filter drop-shadow-md"
                           style={{ backgroundColor: config.shopInfo.primaryColor }}>
                        {config.farms.find(farm => farm.name === product.farm)?.emoji} {product.farm}
                      </div>
                    )}
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
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2024 {config.shopInfo.name}. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
