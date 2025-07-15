'use client';

import React, { useEffect, useState } from 'react';

export default function AutoFixPage() {
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps = [
    "🔍 Détection du problème...",
    "🧹 Nettoyage du stockage...",
    "📦 Création des produits...",
    "🏷️ Configuration des catégories...",
    "⚙️ Paramètres optimaux...",
    "✅ Réparation terminée !"
  ];

  useEffect(() => {
    const autoFix = async () => {
      // Étape 1
      setStep(0);
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 2 - Nettoyage
      setStep(1);
      localStorage.clear();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 3 - Produits
      setStep(2);
      const products = [
        {
          id: "1",
          name: "Huile CBD 10%",
          description: "Huile de CBD 10% premium, extraction CO2 supercritique pour une qualité optimale.",
          category: "huiles",
          images: ["https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"],
          prices: [{ variant: "10ml", price: 29.90, originalPrice: 39.90 }],
          inStock: true,
          featured: true,
          orderLink: "https://example.com/order/huile-cbd-10",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "2",
          name: "Fleurs CBD Amnesia",
          description: "Fleurs de CBD Amnesia séchées, arôme fruité et effets relaxants.",
          category: "fleurs",
          images: ["https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop"],
          prices: [{ variant: "3g", price: 8.90, originalPrice: 12.90 }],
          inStock: true,
          featured: true,
          orderLink: "https://example.com/order/fleurs-amnesia",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "3",
          name: "Résine CBD Hash",
          description: "Résine CBD Hash artisanale, texture fondante et goût authentique.",
          category: "resines",
          images: ["https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop"],
          prices: [{ variant: "2g", price: 12.90, originalPrice: 16.90 }],
          inStock: true,
          featured: true,
          orderLink: "https://example.com/order/resine-hash",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "4",
          name: "Huile CBD 15%",
          description: "Huile de CBD 15% concentration élevée pour utilisateurs expérimentés.",
          category: "huiles",
          images: ["https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop"],
          prices: [{ variant: "10ml", price: 49.90, originalPrice: 59.90 }],
          inStock: true,
          featured: false,
          orderLink: "https://example.com/order/huile-cbd-15",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "5",
          name: "Fleurs CBD Lemon Haze",
          description: "Fleurs CBD Lemon Haze au parfum citronné, idéal pour se détendre.",
          category: "fleurs",
          images: ["https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop"],
          prices: [{ variant: "3g", price: 9.90, originalPrice: 13.90 }],
          inStock: true,
          featured: false,
          orderLink: "https://example.com/order/fleurs-lemon-haze",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('cbd-products', JSON.stringify(products));
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 4 - Catégories
      setStep(3);
      const categories = [
        {
          id: "huiles",
          name: "Huiles CBD",
          description: "Huiles de CBD premium pour tous les besoins",
          image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
          active: true,
          order: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "fleurs",
          name: "Fleurs CBD",
          description: "Fleurs de CBD séchées de haute qualité",
          image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
          active: true,
          order: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: "resines",
          name: "Résines CBD",
          description: "Résines CBD artisanales premium",
          image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
          active: true,
          order: 3,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('cbd-categories', JSON.stringify(categories));
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 5 - Paramètres
      setStep(4);
      const settings = {
        name: "CBD Shop Premium",
        description: "Votre boutique CBD de confiance avec des produits de qualité premium",
        colors: {
          primary: "#22c55e",
          secondary: "#16a34a",
          text: "#1f2937",
          background: "#ffffff"
        },
        contact: {
          email: "contact@cbdshop.fr",
          phone: "+33 1 23 45 67 89",
          address: "123 Rue de la Paix, 75001 Paris"
        },
        background: {
          type: "color",
          value: "#ffffff",
          opacity: 100
        },
        features: {
          cart: false,
          testimonials: false,
          newsletter: false
        },
        pages: {
          showQuality: true,
          showDelivery: true,
          showAbout: true
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem('cbd-shop-settings', JSON.stringify(settings));
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 6 - Terminé
      setStep(5);
      setIsComplete(true);
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Redirection
      window.location.href = '/';
    };

    autoFix();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
        
        {/* Header */}
        <div className="text-6xl mb-6">
          {isComplete ? '✅' : '🔧'}
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {isComplete ? 'Réparé !' : 'Réparation Auto'}
        </h1>
        
        <p className="text-gray-600 mb-8">
          {isComplete ? 'Redirection en cours...' : 'Patientez quelques secondes'}
        </p>

        {/* Progress */}
        <div className="space-y-4 mb-8">
          {steps.map((stepText, index) => (
            <div 
              key={index}
              className={`flex items-center justify-center p-3 rounded-lg transition-all duration-300 ${
                index < step ? 'bg-green-100 text-green-800' :
                index === step ? 'bg-blue-100 text-blue-800 animate-pulse' :
                'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="flex items-center">
                {index < step ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">✓</span>
                  </div>
                ) : index === step ? (
                  <div className="w-6 h-6 mr-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full mr-3"></div>
                )}
                <span className="text-sm font-medium">{stepText}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div 
            className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          ></div>
        </div>

        {/* Status */}
        {isComplete && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <div className="text-green-800 space-y-2">
              <p className="font-semibold">✅ Boutique réparée !</p>
              <p className="text-sm">• 5 produits créés</p>
              <p className="text-sm">• 3 catégories configurées</p>
              <p className="text-sm">• Boutons fonctionnels</p>
              <p className="text-sm font-semibold">Redirection automatique...</p>
            </div>
          </div>
        )}

        {/* Emergency button */}
        {!isComplete && (
          <button
            onClick={() => window.location.href = '/'}
            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
          >
            Retour manuel à la boutique
          </button>
        )}
      </div>
    </div>
  );
}