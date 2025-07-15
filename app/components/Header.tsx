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

  return (
    <header 
      className="shadow-lg relative"
      style={{ 
        backgroundColor: config.shopInfo.backgroundColor,
        backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Logo et nom de la boutique en haut */}
      <div 
        className="text-center py-4 border-b-2 relative"
        style={{ 
          borderColor: config.shopInfo.primaryColor,
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}20, ${config.shopInfo.secondaryColor}20)`
        }}
      >
        {/* Logo en haut à gauche */}
        <div className="absolute top-2 left-4">
          <Link href="/" className="inline-flex items-center space-x-2">
            <span className="text-3xl filter drop-shadow-lg hover:scale-110 transition-transform">
              {config.shopInfo.logo}
            </span>
          </Link>
        </div>

        <Link href="/" className="inline-flex items-center space-x-2">
          <h1 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent filter drop-shadow-lg hover:scale-105 transition-transform"
            style={{ 
              textShadow: `2px 2px 4px ${config.shopInfo.primaryColor}50`,
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}
          >
            {config.shopInfo.name}
          </h1>
        </Link>
        <p 
          className="text-sm md:text-base mt-2 opacity-80 italic"
          style={{ color: config.shopInfo.secondaryColor }}
        >
          {config.shopInfo.description}
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
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
                      ? 'text-white shadow-lg filter drop-shadow-md'
                      : 'text-gray-700 hover:text-white hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: currentPage === item.name ? config.shopInfo.primaryColor : 'transparent',
                    borderColor: config.shopInfo.primaryColor,
                    border: '2px solid transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.name) {
                      e.currentTarget.style.backgroundColor = config.shopInfo.primaryColor;
                      e.currentTarget.style.borderColor = config.shopInfo.secondaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.name) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.borderColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset transition-colors"
                style={{ 
                  backgroundColor: isMenuOpen ? config.shopInfo.primaryColor : 'transparent'
                }}
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
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-white hover:shadow-md'
                  }`}
                  style={{
                    backgroundColor: currentPage === item.name ? config.shopInfo.primaryColor : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.name) {
                      e.currentTarget.style.backgroundColor = config.shopInfo.primaryColor;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.name) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
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