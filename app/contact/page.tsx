'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';

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
    <div className="min-h-screen" style={{ backgroundColor: config.shopInfo.backgroundColor }}>
      <Header currentPage="Contact" />

      {/* Page Header */}
      <section 
        className="text-white py-16 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, ${config.shopInfo.primaryColor}, ${config.shopInfo.secondaryColor})` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 filter drop-shadow-lg">
            {config.pageContent.contact.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto filter drop-shadow-md">
            {config.pageContent.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-lg shadow-xl p-12 transform hover:scale-105 transition-all duration-300">
            <div className="text-6xl mb-6 filter drop-shadow-lg">💬</div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
              Prêt à commander ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {config.pageContent.contact.description}
            </p>
            <a
              href={config.contactInfo.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 filter drop-shadow-lg"
              style={{ backgroundColor: config.shopInfo.primaryColor }}
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