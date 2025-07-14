'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useShopSettings, usePages } from '@/hooks/useShop';
import { ShoppingCart, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { settings } = useShopSettings();
  const { getActivePages } = usePages();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    setPages(getActivePages());
  }, [getActivePages]);

  useEffect(() => {
    if (settings) {
      // Appliquer les variables CSS personnalisées
      const root = document.documentElement;
      root.style.setProperty('--primary-color', settings.colors.primary);
      root.style.setProperty('--secondary-color', settings.colors.secondary);
      root.style.setProperty('--text-color', settings.colors.text);
      root.style.setProperty('--background-color', settings.colors.background);
      
      if (settings.background.type === 'image') {
        root.style.setProperty('--background-image', `url(${settings.background.value})`);
      } else {
        root.style.setProperty('--background-image', '');
      }
      
      root.style.setProperty('--background-opacity', settings.background.opacity?.toString() || '100');
    }
  }, [settings]);

  if (!settings) return null;

  return (
    <div className={`min-h-screen ${settings.background.type === 'image' ? 'shop-background' : ''}`}>
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              {settings.logo && (
                <img 
                  src={settings.logo} 
                  alt={settings.name} 
                  className="h-8 w-8 mr-2"
                />
              )}
              <span className="font-bold text-xl primary-color">
                {settings.name}
              </span>
            </Link>

            {/* Navigation desktop */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link href="/produits" className="text-gray-700 hover:text-primary transition-colors">
                Produits
              </Link>
              {pages.map((page) => (
                <Link 
                  key={page.id} 
                  href={`/pages/${page.slug}`} 
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {page.title}
                </Link>
              ))}
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:text-primary transition-colors">
                <ShoppingCart size={20} />
              </button>
              <Link href="/admin" className="btn-primary text-sm">
                Admin
              </Link>
              
              {/* Menu mobile */}
              <button
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Menu mobile */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <nav className="px-2 pt-2 pb-3 space-y-1">
                <Link 
                  href="/" 
                  className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Accueil
                </Link>
                <Link 
                  href="/produits" 
                  className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Produits
                </Link>
                {pages.map((page) => (
                  <Link 
                    key={page.id} 
                    href={`/pages/${page.slug}`} 
                    className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {page.title}
                  </Link>
                ))}
                <Link 
                  href="/contact" 
                  className="block px-3 py-2 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}