'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';

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
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
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
                      🌟 Toutes les catégories
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
                      ? '🌾 Toutes les fermes' 
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
                        }`