'use client';

import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { useProducts, useCategories } from '@/hooks/useShop';
import { Search, Filter, Grid, List } from 'lucide-react';
import { Product } from '@/types';

export default function ProduitsPage() {
  const { products, loading } = useProducts();
  const { categories } = useCategories();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    let filtered = [...products];

    // Filtrage par recherche
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrage par catégorie
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Tri
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_asc':
        filtered.sort((a, b) => {
          const priceA = Math.min(...a.prices.map(p => p.price));
          const priceB = Math.min(...b.prices.map(p => p.price));
          return priceA - priceB;
        });
        break;
      case 'price_desc':
        filtered.sort((a, b) => {
          const priceA = Math.min(...a.prices.map(p => p.price));
          const priceB = Math.min(...b.prices.map(p => p.price));
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Nos Produits</h1>
          <p className="text-gray-600">
            Découvrez notre gamme complète de produits CBD de qualité premium
          </p>
        </div>

        {/* Barre de recherche et filtres */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Bouton filtres mobile */}
            <button
              className="md:hidden btn-outline flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} className="mr-2" />
              Filtres
            </button>

            {/* Mode d'affichage */}
            <div className="hidden md:flex items-center space-x-2">
              <button
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Filtres */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="grid md:grid-cols-3 gap-4">
              {/* Catégorie */}
              <div>
                <label className="form-label">Catégorie</label>
                <select
                  className="form-input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tri */}
              <div>
                <label className="form-label">Trier par</label>
                <select
                  className="form-input"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Nom</option>
                  <option value="price_asc">Prix croissant</option>
                  <option value="price_desc">Prix décroissant</option>
                  <option value="newest">Plus récent</option>
                </select>
              </div>

              {/* Statut */}
              <div>
                <label className="form-label">Disponibilité</label>
                <select className="form-input">
                  <option value="all">Tous</option>
                  <option value="in_stock">En stock</option>
                  <option value="out_of_stock">Rupture de stock</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''} trouvé{filteredProducts.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Liste des produits */}
        {filteredProducts.length > 0 ? (
          <div className={`${viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-4">
              Essayez de modifier vos critères de recherche ou de filtrage
            </p>
            <button
              className="btn-primary"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('name');
              }}
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}

        {/* Pagination (si nécessaire) */}
        {filteredProducts.length > 12 && (
          <div className="flex justify-center mt-12">
            <div className="flex space-x-2">
              <button className="btn-outline px-3 py-2">Précédent</button>
              <button className="btn-primary px-3 py-2">1</button>
              <button className="btn-outline px-3 py-2">2</button>
              <button className="btn-outline px-3 py-2">3</button>
              <button className="btn-outline px-3 py-2">Suivant</button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}