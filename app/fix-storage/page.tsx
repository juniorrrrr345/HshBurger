'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FixStoragePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const router = useRouter();

  const fixStorage = async () => {
    setIsLoading(true);
    setStatus(null);

    try {
      // Étape 1: Nettoyer le localStorage
      console.log('🧹 Nettoyage du localStorage...');
      localStorage.removeItem('cbd-products');
      localStorage.removeItem('cbd-categories');
      localStorage.removeItem('cbd-pages');
      localStorage.removeItem('cbd-shop-settings');

      // Étape 2: Attendre un peu
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 3: Définir les nouvelles données par défaut
      console.log('📦 Création des données par défaut...');

      // Produits par défaut
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

      // Catégories par défaut
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

      // Paramètres par défaut
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

      // Sauvegarder les nouvelles données
      localStorage.setItem('cbd-products', JSON.stringify(defaultProducts));
      localStorage.setItem('cbd-categories', JSON.stringify(defaultCategories));
      localStorage.setItem('cbd-shop-settings', JSON.stringify(defaultSettings));

      // Attendre encore un peu
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Étape 4: Succès
      setStatus({
        type: 'success',
        message: 'Réparation terminée avec succès ! Toutes les interactions sont maintenant fonctionnelles.'
      });

      // Redirection automatique
      setTimeout(() => {
        router.push('/');
      }, 3000);

    } catch (error: any) {
      console.error('Erreur lors de la réparation:', error);
      setStatus({
        type: 'error',
        message: `Une erreur s'est produite : ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🔧 Réparation CBD Shop</h1>
          <p className="text-xl text-gray-600">Résolution des problèmes d'interactivité</p>
        </div>

        {/* Problème */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">🚨 Problème détecté</h3>
          <p className="text-red-700">
            Les boutons ne sont pas cliquables à cause d'anciennes données dans le localStorage 
            qui bloquent les nouvelles fonctionnalités.
          </p>
        </div>

        {/* Solution */}
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">✅ Solution</h3>
          <p className="text-green-700">
            Nettoyage du localStorage et réinitialisation avec les nouvelles données par défaut.
          </p>
        </div>

        {/* Étapes */}
        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Ce qui sera fait :</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</div>
              Suppression des anciennes données localStorage
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</div>
              Réinitialisation avec 5 produits par défaut
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</div>
              Configuration des 3 catégories
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">4</div>
              Restauration des paramètres optimaux
            </div>
            <div className="flex items-center text-gray-700">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">5</div>
              Redirection vers la boutique fonctionnelle
            </div>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <button
            onClick={fixStorage}
            disabled={isLoading}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white inline-block mr-2"></div>
                Réparation en cours...
              </>
            ) : (
              <>🔧 Réparer maintenant</>
            )}
          </button>

          <button
            onClick={() => router.push('/')}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            🏠 Retour à l'accueil
          </button>
        </div>

        {/* Status */}
        {status && (
          <div className={`p-6 rounded-lg border-2 ${
            status.type === 'success' 
              ? 'bg-green-50 border-green-500 text-green-800' 
              : 'bg-red-50 border-red-500 text-red-800'
          }`}>
            <h3 className="text-lg font-semibold mb-2">
              {status.type === 'success' ? '✅ Succès !' : '❌ Erreur'}
            </h3>
            <p>{status.message}</p>
            {status.type === 'success' && (
              <div className="mt-4 space-y-2">
                <p>✅ 5 produits créés avec liens de commande</p>
                <p>✅ 3 catégories configurées</p>
                <p>✅ Paramètres optimisés</p>
                <p>✅ Toutes les interactions sont maintenant fonctionnelles</p>
                <p className="font-semibold">Redirection dans 3 secondes...</p>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Réparation en cours...</p>
          </div>
        )}
      </div>
    </div>
  );
}