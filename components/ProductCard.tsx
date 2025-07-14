'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const lowestPrice = Math.min(...product.prices.map(p => p.price));
  const hasOriginalPrice = product.prices.some(p => p.originalPrice);
  const lowestOriginalPrice = hasOriginalPrice 
    ? Math.min(...product.prices.filter(p => p.originalPrice).map(p => p.originalPrice!))
    : null;

  return (
    <div className="product-card">
      {/* Image du produit */}
      <div className="relative">
        <Link href={`/produits/${product.id}`}>
          <img
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            className="product-image"
          />
        </Link>
        
        {/* Badge stock */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Rupture
          </div>
        )}
        
        {/* Badge featured */}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Populaire
          </div>
        )}

        {/* Actions au survol */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link 
            href={`/produits/${product.id}`} 
            className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Eye size={20} />
          </Link>
        </div>
      </div>

      {/* Informations produit */}
      <div className="product-info">
        <Link href={`/produits/${product.id}`}>
          <h3 className="product-title hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="product-description">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description
          }
        </p>

        {/* Prix */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="product-price">
              {lowestPrice.toFixed(2)} €
            </span>
            {lowestOriginalPrice && (
              <span className="product-original-price">
                {lowestOriginalPrice.toFixed(2)} €
              </span>
            )}
          </div>
          
          {/* Variantes disponibles */}
          {product.prices.length > 1 && (
            <span className="text-xs text-gray-500">
              {product.prices.length} variantes
            </span>
          )}
        </div>

        {/* Bouton d'action */}
        <div className="mt-4">
          {product.inStock ? (
            <Link 
              href={`/produits/${product.id}`} 
              className="btn-primary w-full text-center inline-block"
            >
              Voir le produit
            </Link>
          ) : (
            <button 
              className="btn-outline w-full cursor-not-allowed opacity-50"
              disabled
            >
              Produit indisponible
            </button>
          )}
        </div>
      </div>
    </div>
  );
}