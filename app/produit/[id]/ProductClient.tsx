'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteConfig, Product } from '../../lib/config';

interface ProductClientProps {
  product: Product;
  config: SiteConfig;
}

export default function ProductClient({ product, config }: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);

  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundColor: '#1a1a1a',
        backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}
    >
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-white text-sm">
        <span className="font-medium">23:32</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div className="ml-2">
            <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
              <path d="M2 17h20v2H2zm1.15-4.05L4 11.47l.85 1.48L6.3 11.47 7.15 12.95l1.45-1.48L9.45 12.95 10.3 11.47 11.15 12.95l1.45-1.48L13.45 12.95 14.3 11.47 15.15 12.95l1.45-1.48L17.45 12.95 18.3 11.47 19.15 12.95l1.45-1.48L21.45 12.95 22 11.47V7H2v4.47z"/>
            </svg>
          </div>
          <div className="bg-white text-black px-1 py-0.5 rounded text-xs font-medium">59</div>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gray-800 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button className="text-white">
              <span className="text-lg">Fermer</span>
            </button>
          </div>
          <div className="text-center">
            <h1 className="text-white text-lg font-semibold">Lafleche 33 Bot 🤖</h1>
            <p className="text-gray-300 text-sm">mini-application</p>
          </div>
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Banner */}
      <div className="bg-purple-600 text-white text-center py-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-yellow-300">⭐</span>
          <span className="font-bold">NUMERO 1 SUR BORDEAUX</span>
        </div>
      </div>

      {/* Content */}
      <div className="relative bg-black bg-opacity-50 min-h-screen">
        {/* Background Image with Logo */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iNTAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzMzMzMzMyIgb3BhY2l0eT0iMC4xIj5MQUZMRUNIRTMzPC90ZXh0Pjwvc3ZnPg==")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}>
        </div>

        <div className="relative px-4 py-6">
          {/* Back Button */}
          <Link 
            href="/produits"
            className="flex items-center text-white mb-4"
          >
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Retour</span>
          </Link>

          {/* Product Header */}
          <div className="text-center mb-6">
            <div className="inline-block text-6xl font-bold text-white mb-2" style={{
              background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd700, #32cd32, #00bfff, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
            }}>
              LAFLECHE SOFTECH
            </div>
          </div>

          {/* Product Card */}
          <div className="bg-gray-900 rounded-lg overflow-hidden mx-4 mb-6">
            {/* Product Image */}
            <div className="aspect-video relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzMzMzMzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5JbWFnZSBkdSBwcm9kdWl0PC90ZXh0Pgo8L3N2Zz4K';
                }}
              />
            </div>

            {/* Product Info */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-white text-2xl font-bold">REAL FARMZ</h2>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-blue-400 text-sm">• {product.name}</span>
                  </div>
                </div>
                <div className="bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                  120U ++<span className="text-red-300"> 📦</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-white font-semibold">CURE AU TOP <span className="text-orange-500">🔥</span></p>
              </div>

              {/* Price Options */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedVariant === variant
                        ? 'border-blue-500 bg-blue-500 bg-opacity-20'
                        : 'border-gray-600 bg-gray-800 hover:border-gray-500'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-white text-sm font-medium">{variant.name}</div>
                      <div className="text-blue-400 text-lg font-bold">{variant.price}€</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Order Button */}
              <a
                href={product.orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-blue-500 text-white py-4 rounded-lg font-bold text-center block hover:bg-blue-600 transition-colors"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306-.004.472-.125 1.096-.562 6.911-.562 6.911-.05.738-.312.984-.51 1.055-.168.06-.756.049-1.554-.305l-2.88-1.747-1.358 1.308c-.25.251-.455.464-.933.464-.05 0-.098-.012-.145-.028-.145-.054-.24-.166-.24-.32l-.001-3.39c0 0 4.958-4.982 5.06-5.109.008-.01.033-.07-.011-.118-.056-.05-.12-.007-.166.01-1.085.918-7.297 4.522-7.297 4.522-.348.155-.744.166-1.179.045l-2.198-.789c-.463-.171-.504-.457-.504-.629 0-.187.113-.356.598-.571l16.044-6.014c.435-.162.936-.089 1.21.333.12.2.055.426.047.506z"/>
                  </svg>
                  <span>COMMANDER VIA TELEGRAM</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700">
          <div className="grid grid-cols-4 py-2">
            <Link href="/" className="flex flex-col items-center py-2 text-blue-400">
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="text-xs">Menu</span>
            </Link>
            <Link href="/contact" className="flex flex-col items-center py-2 text-gray-400">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"></path>
              </svg>
              <span className="text-xs">Infos</span>
            </Link>
            <a href={config.shopInfo.telegramLink || '#'} className="flex flex-col items-center py-2 text-gray-400">
              <svg className="w-6 h-6 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306-.004.472-.125 1.096-.562 6.911-.562 6.911-.05.738-.312.984-.51 1.055-.168.06-.756.049-1.554-.305l-2.88-1.747-1.358 1.308c-.25.251-.455.464-.933.464-.05 0-.098-.012-.145-.028-.145-.054-.24-.166-.24-.32l-.001-3.39c0 0 4.958-4.982 5.06-5.109.008-.01.033-.07-.011-.118-.056-.05-.12-.007-.166.01-1.085.918-7.297 4.522-7.297 4.522-.348.155-.744.166-1.179.045l-2.198-.789c-.463-.171-.504-.457-.504-.629 0-.187.113-.356.598-.571l16.044-6.014c.435-.162.936-.089 1.21.333.12.2.055.426.047.506z"/>
              </svg>
              <span className="text-xs">Canal</span>
            </a>
            <Link href="/contact" className="flex flex-col items-center py-2 text-gray-400">
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Contact</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}