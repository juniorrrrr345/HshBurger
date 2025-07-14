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

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Informations boutique */}
            <div>
              <h3 className="font-bold text-lg mb-4">{settings.name}</h3>
              <p className="text-gray-400 mb-4">{settings.description}</p>
              <div className="flex space-x-4">
                {settings.social.facebook && (
                  <a 
                    href={settings.social.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {settings.social.instagram && (
                  <a 
                    href={settings.social.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {settings.social.twitter && (
                  <a 
                    href={settings.social.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="font-bold text-lg mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/produits" className="text-gray-400 hover:text-white transition-colors">
                    Produits
                  </Link>
                </li>
                {pages.map((page) => (
                  <li key={page.id}>
                    <Link 
                      href={`/pages/${page.slug}`} 
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center text-gray-400">
                  <Phone size={16} className="mr-2" />
                  <span>{settings.contact.phone}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <Mail size={16} className="mr-2" />
                  <span>{settings.contact.email}</span>
                </div>
                <div className="flex items-center text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span>{settings.contact.address}</span>
                </div>
              </div>
            </div>

            {/* Informations légales */}
            <div>
              <h3 className="font-bold text-lg mb-4">Informations</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/pages/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
                    Mentions légales
                  </Link>
                </li>
                <li>
                  <Link href="/pages/conditions-generales" className="text-gray-400 hover:text-white transition-colors">
                    CGV
                  </Link>
                </li>
                <li>
                  <Link href="/pages/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">
                    Politique de confidentialité
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} {settings.name}. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}