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
    </Layout>
  );
}