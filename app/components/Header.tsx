'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = '' }: HeaderProps) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return null;
  }

  // Utiliser les pages dynamiques de la configuration
  const navItems = config?.pages || [];

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <header className="shadow-lg relative backdrop-blur-md border-b border-gray-200" style={{
      backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Logo et nom de la boutique en haut */}
      <div className="text-center py-3 border-b-2 relative backdrop-blur-sm bg-white/80">
        <Link href="/" className="inline-flex items-center justify-center space-x-4 group">
          {config.shopInfo.logoUrl && !logoError ? (
            <div className="relative">
              <img 
                src={config.shopInfo.logoUrl} 
                alt="Logo" 
                className="h-12 w-12 object-contain rounded-lg bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 filter drop-shadow-lg" 
                onError={handleLogoError}
                onLoad={() => setLogoError(false)}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="relative">
              <span className="text-4xl filter drop-shadow-lg hover:scale-110 transition-all duration-300 group-hover:rotate-12 inline-block">
                {config.shopInfo.logo}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          )}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent filter drop-shadow-lg">
              {config.shopInfo.name}
            </h1>
            <p className="text-xs md:text-sm mt-1 text-gray-600 italic group-hover:text-gray-800 transition-colors duration-300">
              {config.shopInfo.description}
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation - Liens directement visibles */}
      <nav className="backdrop-blur-sm shadow-sm bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-12">
            
            {/* Navigation toujours visible */}
            <div className="flex space-x-2 sm:space-x-4 md:space-x-8">
              {navItems.map((item) => {
                const isExternal = item.href.startsWith('http://') || item.href.startsWith('https://');
                
                if (isExternal) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2 sm:px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                        currentPage === item.name
                          ? 'bg-black text-white shadow-lg'
                          : 'text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {item.name}
                    </a>
                  );
                } else {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`px-2 sm:px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                        currentPage === item.name
                          ? 'bg-black text-white shadow-lg'
                          : 'text-black hover:bg-black hover:text-white'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}