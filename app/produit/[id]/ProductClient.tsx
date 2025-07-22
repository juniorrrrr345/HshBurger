'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, Product } from '../../lib/config';

interface ProductClientProps {
  product: Product;
  config: SiteConfig;
}

export default function ProductClient({ product, config }: ProductClientProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  };

  const rewind = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, video.currentTime - 10);
  };

  const forward = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.min(duration, video.currentTime + 10);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Utiliser une vidéo par défaut si aucune vidéo n'est configurée
  const videoUrl = product.video || "https://sample-videos.com/zip/10/mp4/SampleVideo_720x480_1mb.mp4";

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* En-tête fixe */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4 pt-12">
        <div className="flex items-center justify-between text-white">
          <Link href="/produits" className="flex items-center space-x-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Retour</span>
          </Link>
          <div className="text-center">
            <div className="text-lg font-bold">{config.shopInfo.name}</div>
            <div className="text-xs opacity-75">mini-application</div>
          </div>
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="p-2"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Bannière défilante */}
      <div className="absolute top-20 left-0 right-0 z-20 bg-purple-600 text-white text-center py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-8">⭐ ENVOI POSTAL ⭐</span>
          <span className="mx-8">⭐ NUMERO 1 SUR BORDEAUX ET ENVOI PARTOUT EN FRANCE ⭐</span>
        </div>
      </div>

      {/* Vidéo principale */}
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={product.image}
          loop
          playsInline
          muted
        >
          <source src={videoUrl} type="video/mp4" />
        </video>

        {/* Logo et titre coloré du produit en overlay */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10 pointer-events-none">
          <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 via-pink-500 via-purple-500 to-blue-500 drop-shadow-2xl">
            {product.name.toUpperCase()}
          </div>
        </div>

        {/* Contrôles vidéo */}
        <div className="absolute inset-0 flex items-center justify-center z-15">
          <div className="flex items-center space-x-8">
            <button
              onClick={rewind}
              className="bg-black/50 text-white rounded-full p-4 backdrop-blur-sm"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-lg font-bold">10</span>
              </div>
            </button>

            <button
              onClick={togglePlay}
              className="bg-black/50 text-white rounded-full p-6 backdrop-blur-sm"
            >
              {isPlaying ? (
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-8 bg-white"></div>
                    <div className="w-2 h-8 bg-white"></div>
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 flex items-center justify-center pl-1">
                  <div className="w-0 h-0 border-l-8 border-r-0 border-t-4 border-b-4 border-l-white border-t-transparent border-b-transparent"></div>
                </div>
              )}
            </button>

            <button
              onClick={forward}
              className="bg-black/50 text-white rounded-full p-4 backdrop-blur-sm"
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <span className="text-lg font-bold">10</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Barre de progression et contrôles inférieurs */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/90 to-transparent p-4 pb-8">
        {/* Barre de progression */}
        <div className="mb-4">
          <div className="flex items-center text-white text-sm mb-2">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-600 rounded-full h-1">
                <div 
                  className="bg-white h-1 rounded-full transition-all duration-100"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
            <span>-{formatTime(duration - currentTime)}</span>
          </div>
        </div>

        {/* Informations produit */}
        <div className="text-white mb-4">
          <div className="text-2xl font-bold mb-2">{product.name}</div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="bg-green-600 px-3 py-1 rounded-full text-sm font-bold">
              {selectedVariant.price.toFixed(2)}€
            </span>
            <span className="bg-red-600 px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              120U ++  🔥
            </span>
          </div>
          <div className="text-lg font-semibold">• {product.category.toUpperCase()}</div>
          <div className="text-base opacity-90">CURE AU TOP 🔥</div>
        </div>

        {/* Menu de navigation inférieur */}
        <div className="grid grid-cols-4 gap-4 text-center text-white">
          <Link href="/" className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs">Menu</span>
          </Link>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="flex flex-col items-center space-y-1"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <span className="text-xs">Infos</span>
          </button>
          
          <a 
            href={product.orderLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center space-y-1"
          >
            <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="text-xs">Canal</span>
          </a>
          
          <Link href="/contact" className="flex flex-col items-center space-y-1">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
            <span className="text-xs">Contact</span>
          </Link>
        </div>
      </div>

      {/* Panel de détails coulissant */}
      {showDetails && (
        <div className="absolute inset-0 z-30 bg-black/95 backdrop-blur-sm">
          <div className="h-full overflow-y-auto p-6 pt-20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Détails du produit</h2>
              <button 
                onClick={() => setShowDetails(false)}
                className="text-white p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
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
                <h3 className="text-lg font-semibold text-white mb-3">Options disponibles</h3>
                <div className="space-y-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedVariant(variant)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                        selectedVariant === variant
                          ? 'border-green-500 bg-green-500/20'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium text-white">{variant.name}</div>
                          {variant.size && (
                            <div className="text-sm text-gray-400">{variant.size}</div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-green-400">
                          €{variant.price.toFixed(2)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={product.orderLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-center block"
                >
                  Commander maintenant - €{selectedVariant.price.toFixed(2)}
                </a>
                
                <Link
                  href="/contact"
                  className="w-full border border-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium text-center block"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
}