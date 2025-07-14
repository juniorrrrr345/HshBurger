'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Truck, Clock, MapPin, Package } from 'lucide-react';

export default function LivraisonPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Livraison</h1>
          <p className="text-gray-600 text-lg">
            Toutes les informations sur nos modalités de livraison
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Truck className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Livraison standard</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Livraison en 2-3 jours ouvrés partout en France métropolitaine.
            </p>
            <div className="text-2xl font-bold text-green-600">4,90 €</div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Clock className="text-blue-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Livraison express</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Livraison en 24h pour les commandes passées avant 15h.
            </p>
            <div className="text-2xl font-bold text-blue-600">9,90 €</div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <Package className="text-green-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Livraison gratuite</h2>
          </div>
          <p className="text-gray-700">
            Profitez de la livraison gratuite dès 50€ d'achat !
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Zones de livraison</h2>
          <div className="space-y-3">
            <div className="flex items-center">
              <MapPin className="text-gray-400 mr-3" size={16} />
              <span>France métropolitaine</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-gray-400 mr-3" size={16} />
              <span>Corse (délais supplémentaires)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-gray-400 mr-3" size={16} />
              <span>DOM-TOM (nous consulter)</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}