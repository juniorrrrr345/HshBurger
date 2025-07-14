'use client';

import React from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useProducts, useShopSettings } from '@/hooks/useShop';
import { ArrowRight, Leaf, Shield, Truck, Award } from 'lucide-react';

export default function HomePage() {
  const { getFeaturedProducts } = useProducts();
  const { settings } = useShopSettings();
  
  const featuredProducts = getFeaturedProducts();

  if (!settings) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {settings.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {settings.description}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/produits" className="btn-primary inline-block">
                Découvrir nos produits
                <ArrowRight className="ml-2 inline" size={20} />
              </Link>
              <Link href="/pages/a-propos" className="btn-outline inline-block">
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">100% Naturel</h3>
              <p className="text-gray-600">Produits CBD naturels et bio</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Qualité Garantie</h3>
              <p className="text-gray-600">Testés en laboratoire</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Expédition sous 24h</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Expertise</h3>
              <p className="text-gray-600">Conseils personnalisés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Produits populaires */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nos Produits Populaires</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection des meilleurs produits CBD, 
              soigneusement choisis pour leur qualité exceptionnelle.
            </p>
          </div>
          
          {featuredProducts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredProducts.slice(0, 6).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Link href="/produits" className="btn-primary">
                  Voir tous les produits
                  <ArrowRight className="ml-2 inline" size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun produit populaire pour le moment.</p>
              <Link href="/admin/produits" className="btn-primary mt-4">
                Ajouter des produits
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à découvrir les bienfaits du CBD ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explorez notre gamme complète de produits CBD de qualité premium 
            et trouvez celui qui vous convient le mieux.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/produits" className="btn-secondary">
              Voir nos produits
            </Link>
            <Link href="/contact" className="btn-outline">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Ce que disent nos clients</h2>
            <p className="text-gray-600">Ils nous font confiance pour leur bien-être</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Excellente qualité de produits, livraison rapide et service client au top. 
                Je recommande vivement !"
              </p>
              <p className="font-semibold">- Marie L.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Les produits CBD de cette boutique m'ont vraiment aidé à mieux dormir. 
                Merci pour cette qualité !"
              </p>
              <p className="font-semibold">- Pierre D.</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Site facile à utiliser, produits de qualité et conseils personnalisés. 
                Parfait !"
              </p>
              <p className="font-semibold">- Sophie M.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}