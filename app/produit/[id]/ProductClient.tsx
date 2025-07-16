'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteConfig, Product } from '../../lib/config';
import Header from '../../components/Header';
import OptimizedImage from '../../components/OptimizedImage';

interface ProductClientProps {
  product: Product;
  config: SiteConfig;
}

export default function ProductClient({ product, config }: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Combiner l'image principale avec les images multiples
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header currentPage="Produits" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-green-600">
                Accueil
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link href="/produits" className="text-gray-700 hover:text-green-600">
                  Produits
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <OptimizedImage
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Miniatures */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-green-500' : 'border-transparent'
                      }`}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Video */}
              {product.video && (
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <video 
                    controls 
                    className="w-full h-full object-cover"
                    poster={product.image}
                  >
                    <source src={product.video} type="video/mp4" />
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {product.category}
                  </span>
                  {product.farm && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      {product.farm}
                    </span>
                  )}
                  {product.popular && (
                    <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      ⭐ Populaire
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Options disponibles</h3>
                <div className="space-y-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                        selectedVariant === variant
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-gray-900">{variant.name}</div>
                          {variant.size && (
                            <div className="text-sm text-gray-500">{variant.size}</div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-green-600">
                          €{variant.price.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price and Order */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl font-bold text-gray-900">
                    Prix: €{selectedVariant.price.toFixed(2)}
                  </div>
                </div>

                <div className="space-y-3">
                  <a
                    href={product.orderLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                  >
                    Commander maintenant
                  </a>
                  
                  <Link
                    href="/contact"
                    className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium text-center block"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {config.products
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/produit/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    <OptimizedImage
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedProduct.category}</p>
                    <div className="text-green-600 font-bold">
                      À partir de €{Math.min(...relatedProduct.variants.map(v => v.price)).toFixed(2)}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}