'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfigAsync } from '../lib/config';
import Header from '../components/Header';

export default function ContactPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const loadedConfig = await getConfigAsync();
        setConfig(loadedConfig);
      } catch (error) {
        console.error('Error loading config:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadConfig();
  }, []);

  if (!config || isLoading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    </div>;
  }

  return (
    <div 
      className="min-h-screen"
      style={{ 
        backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      <Header currentPage="Contact" />

      {/* Page Header */}
      <section 
        className="text-white py-16 relative overflow-hidden"
        style={{ 
          background: `linear-gradient(135deg, #000000, #333333)` 
        }}
      >
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 filter drop-shadow-lg text-white">
            {config.pageContent.contact.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto filter drop-shadow-md text-white">
            {config.pageContent.contact.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-12 transform hover:scale-105 transition-all duration-300 border border-gray-200">
            <div className="text-6xl mb-6 filter drop-shadow-lg">💬</div>
            <h2 className="text-3xl font-bold mb-6 text-black">
              Prêt à commander ?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {config.pageContent.contact.description}
            </p>
            <a
              href={config.contactInfo.orderLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
            >
              {config.contactInfo.orderText}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}