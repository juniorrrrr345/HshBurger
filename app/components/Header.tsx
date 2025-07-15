'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';

interface HeaderProps {
  currentPage?: string;
}

export default function Header({ currentPage = '' }: HeaderProps) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return null;
  }

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Produits', href: '/produits' },
    { name: 'Contact', href: '/contact' },
    { name: 'Réseaux Sociaux', href: '/reseaux-sociaux' }
  ];

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <header className="shadow-lg relative bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Logo et nom de la boutique en haut */}
      <div className="text-center py-6 border-b-2 relative bg-white/90 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center justify-center space-x-4 group">
          {config.shopInfo.logoUrl && !logoError ? (
            <div className="relative">
              <img 
                src={config.shopInfo.logoUrl} 
                alt="Logo" 
                className="h-16 w-16 object-contain rounded-lg bg-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 filter drop-shadow-lg" 
                onError={handleLogoError}
                onLoad={() => setLogoError(false)}
              />
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ) : (
            <div className="relative">
              <span className="text-5xl filter drop-shadow-lg hover:scale-110 transition-all duration-300 group-hover:rotate-12 inline-block">
                {config.shopInfo.logo}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </div>
          )}
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-black group-hover:scale-105 transition-all duration-300 bg-gradient-to-r from-black via-gray-800 to-black bg-clip-text text-transparent filter drop-shadow-lg">
              {config.shopInfo.name}
            </h1>
            <p className="text-sm md:text-base mt-2 text-gray-600 italic group-hover:text-gray-800 transition-colors duration-300">
              {config.shopInfo.description}
            </p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 mx-auto">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                    currentPage === item.name
                      ? 'bg-black text-white shadow-lg'
                      : 'text-black hover:bg-black hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset transition-colors"
              >
                <span className="sr-only">Ouvrir le menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                    currentPage === item.name
                      ? 'bg-black text-white shadow-lg'
                      : 'text-black hover:bg-black hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}