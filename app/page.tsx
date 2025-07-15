'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from './lib/config';

// Données statiques des produits avec plusieurs variantes de prix
const products = [
  {
    id: 1,
    name: "Huile CBD",
    variants: [
      { name: "10%", price: 29.90, size: "10ml" },
      { name: "15%", price: 39.90, size: "10ml" },
      { name: "20%", price: 49.90, size: "10ml" }
    ],
    image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
    category: "huiles",
    description: "Huile de CBD premium, extraction CO2 supercritique.",
    orderLink: "https://example.com/order/huile-cbd"
  },
  {
    id: 2,
    name: "Fleurs CBD Amnesia",
    variants: [
      { name: "1g", price: 8.90, size: "1g" },
      { name: "3g", price: 24.90, size: "3g" },
      { name: "5g", price: 39.90, size: "5g" }
    ],
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs de CBD Amnesia séchées, arôme fruité.",
    orderLink: "https://example.com/order/fleurs-amnesia"
  },
  {
    id: 3,
    name: "Résine CBD Hash",
    variants: [
      { name: "1g", price: 12.90, size: "1g" },
      { name: "3g", price: 35.90, size: "3g" },
      { name: "5g", price: 55.90, size: "5g" }
    ],
    image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
    category: "resines",
    description: "Résine CBD Hash artisanale, texture fondante.",
    orderLink: "https://example.com/order/resine-hash"
  },
  {
    id: 4,
    name: "Huile CBD Full Spectrum",
    variants: [
      { name: "5%", price: 19.90, size: "10ml" },
      { name: "10%", price: 34.90, size: "10ml" },
      { name: "15%", price: 49.90, size: "10ml" }
    ],
    image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
    category: "huiles",
    description: "Huile de CBD Full Spectrum, effet d'entourage.",
    orderLink: "https://example.com/order/huile-full-spectrum"
  },
  {
    id: 5,
    name: "Fleurs CBD Lemon Haze",
    variants: [
      { name: "1g", price: 9.90, size: "1g" },
      { name: "3g", price: 27.90, size: "3g" },
      { name: "5g", price: 44.90, size: "5g" }
    ],
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs CBD Lemon Haze au parfum citronné.",
    orderLink: "https://example.com/order/fleurs-lemon-haze"
  }
];

export default function HomePage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">{config.shopInfo.name}</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
              <Link href="/produits" className="text-gray-700 hover:text-green-600">Produits</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
              <Link href="/reseaux-sociaux" className="text-gray-700 hover:text-green-600">Réseaux Sociaux</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            {config.pageContent.homepage.heroTitle}
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            {config.pageContent.homepage.heroSubtitle}
          </p>
          <Link 
            href="/produits" 
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {config.pageContent.homepage.heroButtonText}
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{config.pageContent.homepage.sectionTitle}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Populaire
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map((variant, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                          <span className="text-sm font-medium text-gray-700">{variant.name}</span>
                          <span className="text-sm text-green-600 font-bold ml-2">€{variant.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/produit/${product.id}`}
                      className="flex-1 bg-gray-100 text-center py-2 px-4 rounded hover:bg-gray-200 transition-colors"
                    >
                      Voir détails
                    </Link>
                    <a
                      href={product.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition-colors"
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
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">Produits Naturels</h3>
              <p className="text-gray-600">100% naturel et bio</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Expédition sous 24h</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Transactions protégées</p>
            </div>
          </div>
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