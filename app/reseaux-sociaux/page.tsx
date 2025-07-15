'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';

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
    <div 
      className="min-h-screen relative"
      style={{ 
        backgroundImage: config.shopInfo.backgroundImage ? `url(${config.shopInfo.backgroundImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay pour améliorer la lisibilité */}
      <div 
        className="absolute inset-0 bg-black opacity-30"
        style={{ 
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.4) 100%)'
        }}
      ></div>
      <Header currentPage="Réseaux Sociaux" />

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
            {config.pageContent.socialMedia.title}
          </h1>
          <p className="text-xl max-w-2xl mx-auto filter drop-shadow-md text-white">
            {config.pageContent.socialMedia.subtitle}
          </p>
        </div>
      </section>

      {/* Social Media Cards */}
      <section className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/95 backdrop-blur-md rounded-lg p-8 shadow-xl border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {config.socialMediaLinks.map((social) => (
                <div key={social.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-200">
                  <div className="p-6 relative overflow-hidden bg-black">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full transform translate-x-8 -translate-y-8"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full transform -translate-x-6 translate-y-6"></div>
                    <div className="relative flex items-center justify-center text-white">
                      <div className="text-5xl mb-2 filter drop-shadow-lg">{social.emoji}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-black">
                      {social.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {social.name === 'WhatsApp' ? 'Contactez-nous directement pour toute question ou commande' :
                       social.name === 'Instagram' ? 'Découvrez nos produits en images et suivez notre actualité quotidienne' :
                       social.name === 'Facebook' ? 'Rejoignez notre communauté et participez aux discussions' :
                       social.name === 'Twitter' ? 'Suivez nos actualités et informations en temps réel' :
                       `Suivez-nous sur ${social.name} pour ne rien manquer !`}
                    </p>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                    >
                      {social.name === 'WhatsApp' ? 'Nous contacter' : 'Nous suivre'}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty state if no social media links */}
            {config.socialMediaLinks.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📱</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-600">
                  Aucun réseau social configuré
                </h3>
                <p className="text-gray-500 mb-8">
                  Ajoutez vos réseaux sociaux depuis le panel admin pour les afficher ici.
                </p>
                <Link
                  href="/admin"
                  className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-gray-800"
                >
                  Accéder au panel admin
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}