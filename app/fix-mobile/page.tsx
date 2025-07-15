'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FixMobilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [autoFix, setAutoFix] = useState(false);
  const router = useRouter();

  // Auto-fix au chargement si demandé
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('auto') === 'true') {
      setAutoFix(true);
      setTimeout(() => {
        fixStorage();
      }, 1000);
    }
  }, []);

  const fixStorage = async () => {
    setIsLoading(true);
    setStatus('loading');

    try {
      // Nettoyage du localStorage
      localStorage.clear();
      
      // Attendre un peu
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Créer les données par défaut
      const defaultProducts = [
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

      const defaultCategories = [
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

      const defaultSettings = {
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

      // Sauvegarder les données
      localStorage.setItem('cbd-products', JSON.stringify(defaultProducts));
      localStorage.setItem('cbd-categories', JSON.stringify(defaultCategories));
      localStorage.setItem('cbd-shop-settings', JSON.stringify(defaultSettings));

      // Attendre encore un peu
      await new Promise(resolve => setTimeout(resolve, 1000));

      setStatus('success');
      
      // Redirection automatique
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (error) {
      console.error('Erreur:', error);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (autoFix) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
          <div className="text-6xl mb-6">🔧</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Réparation automatique</h1>
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-500 mx-auto"></div>
            <p className="text-lg text-gray-600">Correction en cours...</p>
            <p className="text-sm text-gray-500">Redirection automatique dans quelques secondes</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-purple-600 p-4">
      <div className="max-w-md mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6 text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Boutons cassés ?</h1>
          <p className="text-gray-600">Réparation mobile rapide</p>
        </div>

        {/* Problème */}
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg mb-4">
          <h3 className="font-bold text-red-800 mb-2">🚨 Problème</h3>
          <p className="text-red-700 text-sm">
            Les boutons ne sont pas cliquables à cause d'anciennes données.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded-lg mb-6">
          <h3 className="font-bold text-green-800 mb-2">✅ Solution</h3>
          <p className="text-green-700 text-sm">
            Nettoyage automatique et réinitialisation avec les bonnes données.
          </p>
        </div>

        {/* Boutons */}
        <div className="space-y-4">
          
          {/* Bouton principal */}
          <button
            onClick={fixStorage}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-6 px-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mr-3"></div>
                Réparation...
              </div>
            ) : (
              <>🔧 RÉPARER MAINTENANT</>
            )}
          </button>

          {/* Bouton auto */}
          <button
            onClick={() => window.location.href = '/fix-mobile?auto=true'}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-6 px-6 rounded-2xl font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🚀 RÉPARATION AUTO
          </button>

          {/* Bouton retour */}
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            🏠 Retour boutique
          </button>
        </div>

        {/* Status */}
        {status === 'success' && (
          <div className="mt-6 bg-green-100 border-2 border-green-500 p-6 rounded-2xl text-center">
            <div className="text-4xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-green-800 mb-2">Réparé !</h3>
            <div className="text-green-700 text-sm space-y-1">
              <p>✅ 5 produits créés</p>
              <p>✅ 3 catégories configurées</p>
              <p>✅ Boutons fonctionnels</p>
              <p className="font-bold">Redirection...</p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 bg-red-100 border-2 border-red-500 p-6 rounded-2xl text-center">
            <div className="text-4xl mb-3">❌</div>
            <h3 className="text-lg font-bold text-red-800 mb-2">Erreur</h3>
            <p className="text-red-700 text-sm">Réessayez ou contactez le support.</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="font-bold text-blue-800 mb-2">📱 Instructions</h3>
          <div className="text-blue-700 text-sm space-y-1">
            <p>1. Cliquez sur "RÉPARER MAINTENANT"</p>
            <p>2. Attendez 5 secondes</p>
            <p>3. Redirection automatique</p>
            <p>4. Tous les boutons marchent !</p>
          </div>
        </div>
      </div>
    </div>
  );
}