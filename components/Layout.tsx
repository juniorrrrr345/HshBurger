'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useShopSettings, usePages, useProducts } from '@/hooks/useShop';
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { settings } = useShopSettings();
  const { getActivePages } = usePages();
  const { products } = useProducts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    console.log('Layout: Component mounted');
    setPages(getActivePages());
  }, [getActivePages]);

  useEffect(() => {
    console.log('Layout: Settings loaded:', settings);
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

  // Ajout d'un état de chargement pour éviter les erreurs d'hydratation
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simuler un délai de chargement pour éviter les erreurs d'hydratation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des paramètres...</p>
        </div>
      </div>
    );
  }

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
              
              {/* Menu déroulant Produits */}
              <div className="relative">
                <button
                  onClick={() => setIsProductsOpen(!isProductsOpen)}
                  className="flex items-center text-gray-700 hover:text-primary transition-colors"
                >
                  Produits
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isProductsOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-4">
                      <Link 
                        href="/produits"
                        className="block text-gray-700 hover:text-primary font-medium mb-3"
                        onClick={() => {
                          console.log('Navigation vers /produits');
                          setIsProductsOpen(false);
                        }}
                      >
                        Tous les produits
                      </Link>
                      <div className="space-y-2">
                        {products.slice(0, 5).map((product) => (
                          <Link
                            key={product.id}
                            href={`/produits/${product.id}`}
                            className="block text-sm text-gray-600 hover:text-primary"
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <Link href="/livraison" className="text-gray-700 hover:text-primary transition-colors">
                Livraison
              </Link>
              <Link href="/qualite" className="text-gray-700 hover:text-primary transition-colors">
                Qualité
              </Link>
              <Link href="/a-propos" className="text-gray-700 hover:text-primary transition-colors">
                À propos
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/test" 
                className="btn-outline text-sm mr-2"
                onClick={() => console.log('Navigation vers /test')}
              >
                Test
              </Link>
              <Link 
                href="/produits-simple" 
                className="btn-outline text-sm mr-2"
                onClick={() => console.log('Navigation vers /produits-simple')}
              >
                Produits Simple
              </Link>
              <Link 
                href="/admin-simple" 
                className="btn-outline text-sm mr-2"
                onClick={() => console.log('Navigation vers /admin-simple')}
              >
                Admin Simple
              </Link>
              <Link 
                href="/admin" 
                className="btn-primary text-sm"
                onClick={() => console.log('Navigation vers /admin')}
              >
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
                  onClick={() => {
                    console.log('Navigation mobile vers /produits');
                    setIsMenuOpen(false);
                  }}
                >
                  Produits
                </Link>
                {pages.map((page) => (
                  <Link 
                    key={page.id} 
                    href={`/${page.slug}`} 
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