'use client';

import React, { useState, useEffect } from 'react';
import { SiteConfig, getConfig } from '../lib/config';
import Header from '../components/Header';

export default function InformationsPage() {
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
    <div className="min-h-screen bg-gray-900" style={{
      backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="poker" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse"><rect width="50" height="50" fill="%23111827"/><circle cx="25" cy="25" r="8" fill="%23374151" opacity="0.3"/><polygon points="15,15 35,15 30,30 20,30" fill="%234B5563" opacity="0.2"/></pattern></defs><rect width="100" height="100" fill="url(%23poker)"/></svg>')`,
      backgroundSize: '200px 200px'
    }}>
      <Header currentPage="Informations" />

      {/* Hero Section avec logo Lafleche */}
      <section className="text-white py-8 relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-purple-800">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          {/* Logo Lafleche stylisé */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 via-purple-400 to-blue-400 bg-clip-text text-transparent filter drop-shadow-2xl">
              LAFLECHE SORTEZ
            </h1>
            <div className="flex justify-center items-center mt-2">
              <span className="text-yellow-400 text-2xl">⚡</span>
              <span className="text-purple-400 text-2xl mx-2">🎯</span>
              <span className="text-blue-400 text-2xl">⚡</span>
            </div>
          </div>
          
          <div className="bg-purple-600 text-white px-6 py-2 rounded-full inline-block mb-4">
            <span className="font-bold">⭐ NUMERO 1 BORDEAUX ⭐</span>
          </div>
        </div>
      </section>

      {/* Section Informations */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-8 text-center">
            Informations
          </h2>

          {/* Services */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* MEETUP */}
              <div className="flex items-center space-x-4 bg-gray-700/50 rounded-xl p-4">
                <div className="text-3xl">📍</div>
                <div>
                  <span className="text-white font-bold text-lg">MEETUP</span>
                  <span className="text-gray-300 ml-2">(33) 50€ MIN</span>
                </div>
              </div>

              {/* LIVRAISON */}
              <div className="flex items-center space-x-4 bg-gray-700/50 rounded-xl p-4">
                <div className="text-3xl">🏁</div>
                <div>
                  <span className="text-white font-bold text-lg">LIVRAISON</span>
                  <span className="text-gray-300 ml-2">(33) 50€ MIN</span>
                </div>
              </div>

              {/* ENVOI POSTAL */}
              <div className="flex items-center space-x-4 bg-gray-700/50 rounded-xl p-4 md:col-span-2">
                <div className="text-3xl">📦</div>
                <div>
                  <span className="text-white font-bold text-lg">ENVOI POSTAL</span>
                  <span className="text-gray-300 ml-2">Toute l'Europe via mondial relais 50€ MIN</span>
                </div>
              </div>

              {/* SERVICE ESPAGNOL */}
              <div className="flex items-center space-x-4 bg-gray-700/50 rounded-xl p-4 md:col-span-2">
                <div className="text-3xl">🇪🇸</div>
                <div>
                  <span className="text-white font-bold text-lg">SERVICE ESPAGNOL ULTRA EFFICACE</span>
                  <span className="text-gray-300 ml-2">100G MIN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conditions d'expédition */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">📮</span>
                <span className="text-white font-medium">Envoie sous 24h sauf Dimanche et jours fériés.</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-2xl">⏰</span>
                <span className="text-white font-medium">Temps d'expédition de 3 à 5 jours ouvrés.</span>
              </div>
            </div>
          </div>

          {/* Pays desservis */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Pays desservis :</h3>
            <div className="flex flex-wrap gap-3 text-white">
              <span className="bg-blue-600 px-3 py-1 rounded-full">France 🇫🇷</span>
              <span className="bg-red-600 px-3 py-1 rounded-full">Allemagne 🇩🇪</span>
              <span className="bg-red-600 px-3 py-1 rounded-full">Autriche 🇦🇹</span>
              <span className="bg-yellow-600 px-3 py-1 rounded-full">Belgique 🇧🇪</span>
              <span className="bg-red-600 px-3 py-1 rounded-full">Espagne 🇪🇸</span>
              <span className="bg-green-600 px-3 py-1 rounded-full">Italie 🇮🇹</span>
              <span className="bg-blue-600 px-3 py-1 rounded-full">Luxembourg 🇱🇺</span>
              <span className="bg-orange-600 px-3 py-1 rounded-full">Pays-Bas 🇳🇱</span>
              <span className="bg-red-600 px-3 py-1 rounded-full">Pologne 🇵🇱</span>
              <span className="bg-green-600 px-3 py-1 rounded-full">Portugal 🇵🇹</span>
              <span className="text-gray-300">Et bien +</span>
            </div>
          </div>

          {/* Cryptomonnaies acceptées */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Les cryptomonnaies accepté sont :</h3>
            <div className="flex flex-wrap gap-3 text-white font-semibold">
              <span className="bg-orange-500 px-4 py-2 rounded-lg">BTC</span>
              <span className="bg-blue-500 px-4 py-2 rounded-lg">ETH</span>
              <span className="bg-purple-500 px-4 py-2 rounded-lg">SOL</span>
              <span className="bg-yellow-500 px-4 py-2 rounded-lg text-black">XRP</span>
            </div>
          </div>

          {/* Paysafecard */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">Nous acceptons aussi les paysafecard à hauteur de</h3>
            <div className="text-lg text-gray-300">
              <span className="text-green-400 font-bold">500€ maximum</span> par transaction
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Footer Style Telegram */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 px-4 py-2">
        <div className="flex justify-around items-center max-w-lg mx-auto">
          <a href="/" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">🏠</span>
            <span className="text-xs font-medium">Menu</span>
          </a>
          <a href="/informations" className="flex flex-col items-center space-y-1 text-blue-400">
            <span className="text-xl">ℹ️</span>
            <span className="text-xs font-medium">Infos</span>
          </a>
          <a href="/contact" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">📨</span>
            <span className="text-xs font-medium">Canal</span>
          </a>
          <a href="/contact" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-white transition-colors">
            <span className="text-xl">✉️</span>
            <span className="text-xs font-medium">Contact</span>
          </a>
        </div>
      </nav>
    </div>
  );
}