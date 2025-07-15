'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';

export default function ReseauxSociauxPage() {
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
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
              <Link href="/reseaux-sociaux" className="text-green-600 font-semibold">Réseaux Sociaux</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {config.pageContent.socialMedia.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            {config.pageContent.socialMedia.subtitle}
          </p>
        </div>
      </section>

      {/* Social Media Cards */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Instagram */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6">
                <div className="flex items-center justify-center text-white">
                  <div className="text-4xl mb-2">📸</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Instagram</h3>
                <p className="text-gray-600 mb-4">
                  Découvrez nos produits en images et suivez notre actualité quotidienne
                </p>
                <a
                  href={config.socialMediaLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  Nous suivre
                </a>
              </div>
            </div>

            {/* Facebook */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-blue-600 p-6">
                <div className="flex items-center justify-center text-white">
                  <div className="text-4xl mb-2">📘</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Facebook</h3>
                <p className="text-gray-600 mb-4">
                  Rejoignez notre communauté et participez aux discussions
                </p>
                <a
                  href={config.socialMediaLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Nous suivre
                </a>
              </div>
            </div>

            {/* Twitter */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-blue-400 p-6">
                <div className="flex items-center justify-center text-white">
                  <div className="text-4xl mb-2">🐦</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Twitter</h3>
                <p className="text-gray-600 mb-4">
                  Suivez nos actualités et informations en temps réel
                </p>
                <a
                  href={config.socialMediaLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-400 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
                >
                  Nous suivre
                </a>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-green-500 p-6">
                <div className="flex items-center justify-center text-white">
                  <div className="text-4xl mb-2">💬</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">WhatsApp</h3>
                <p className="text-gray-600 mb-4">
                  Contactez-nous directement pour toute question ou commande
                </p>
                <a
                  href={config.socialMediaLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Nous contacter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            {config.pageContent.socialMedia.ctaTitle}
          </h2>
          <p className="text-xl mb-8">
            {config.pageContent.socialMedia.ctaSubtitle}
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href={config.socialMediaLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Instagram
            </a>
            <a
              href={config.socialMediaLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Facebook
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