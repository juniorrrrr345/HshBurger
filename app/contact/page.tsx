'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';

export default function ContactPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    setConfig(getConfig());
  }, []);

  if (!config) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">{config.shopInfo.name}</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
              <Link href="/produits" className="text-gray-700 hover:text-green-600">Produits</Link>
              <Link href="/contact" className="text-green-600 font-semibold">Contact</Link>
              <Link href="/reseaux-sociaux" className="text-gray-700 hover:text-green-600">Réseaux Sociaux</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {config.pageContent.contact.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {config.pageContent.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-lg p-12">
            <div className="text-6xl mb-6">💬</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Prêt à commander ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {config.pageContent.contact.description}
            </p>
            <a
              href={config.contactInfo.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors"
            >
              {config.contactInfo.orderText}
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">&copy; 2024 {config.shopInfo.name}. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}