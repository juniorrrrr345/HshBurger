'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteConfig, getConfig } from '../../lib/config';
import Header from '../../components/Header';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  const product = config.products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  const category = config.categories.find(cat => cat.name === product.category);
  const relatedProducts = config.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

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
      <Header />

      {/* Breadcrumb */}
      <div className="bg-white/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-black transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <Link href="/produits" className="text-gray-500 hover:text-black transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-black font-semibold">{product.name}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="aspect-square">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{category?.emoji}</span>
                  <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    {product.category}
                  </span>
                  {product.popular && (
                    <span className="text-sm font-medium text-white px-3 py-1 rounded-full bg-black">
                      Populaire
                    </span>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-4 text-black">
                  {product.name}
                </h1>
                <p className="text-gray-600 text-lg mb-6">{product.description}</p>
              </div>

              {/* Variants */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3 text-gray-900">Choisissez votre variante :</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(index)}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                        selectedVariant === index 
                          ? 'border-black bg-gray-100 shadow-md' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-center">
                        <div className="font-semibold text-gray-900">{variant.name}</div>
                        <div className="text-sm text-gray-600">{variant.size}</div>
                        <div className="text-lg font-bold mt-1 text-black">
                          €{variant.price}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Display */}
              <div className="mb-6">
                <div className="flex items-center space-x-4">
                  <span className="text-4xl font-bold text-black">
                    €{product.variants[selectedVariant].price}
                  </span>
                  <span className="text-gray-600">
                    pour {product.variants[selectedVariant].size}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <a
                  href={product.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-black text-white text-center py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  Commander maintenant
                </a>
                <Link
                  href="/produits"
                  className="flex-1 bg-gray-100 text-black text-center py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                >
                  Voir d'autres produits
                </Link>
              </div>

              {/* Product Features */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">Caractéristiques :</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="text-black mr-2">✓</span>
                    Produit 100% naturel
                  </li>
                  <li className="flex items-center">
                    <span className="text-black mr-2">✓</span>
                    Contrôlé et certifié
                  </li>
                  <li className="flex items-center">
                    <span className="text-black mr-2">✓</span>
                    Livraison rapide et discrète
                  </li>
                  <li className="flex items-center">
                    <span className="text-black mr-2">✓</span>
                    Paiement sécurisé
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-8 text-center text-black">
              Autres produits de la catégorie {category?.emoji} {product.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produit/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200"
                >
                  <div className="aspect-square relative">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 text-xl filter drop-shadow-md">
                      {category?.emoji}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{relatedProduct.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-black">
                        À partir de €{Math.min(...relatedProduct.variants.map(v => v.price))}
                      </span>
                      <span className="text-sm text-gray-500">
                        {relatedProduct.variants.length} variante{relatedProduct.variants.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}