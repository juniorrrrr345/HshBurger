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
    <header className="shadow-lg relative bg-white/95 backdrop-blur-md border-b border-gray-200">
      {/* Logo et nom de la boutique en haut */}
      <div className="text-center py-4 border-b-2 relative bg-white/90 backdrop-blur-sm">
        <Link href="/" className="inline-flex items-center justify-center space-x-3">
          {config.shopInfo.logoUrl ? (
            <img src={config.shopInfo.logoUrl} alt="Logo" className="h-10 w-10 object-contain rounded bg-white shadow" />
          ) : (
            <span className="text-3xl filter drop-shadow-lg hover:scale-110 transition-transform">{config.shopInfo.logo}</span>
          )}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-black hover:scale-105 transition-transform">
              {config.shopInfo.name}
            </h1>
            <p className="text-sm md:text-base mt-2 text-gray-600 italic">
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