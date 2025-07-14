'use client';

import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useProducts, usePages, useCategories } from '@/hooks/useShop';
import { Package, FileText, Grid, Eye, ShoppingCart, TrendingUp, Users, Star } from 'lucide-react';

export default function AdminDashboard() {
  const { products } = useProducts();
  const { pages } = usePages();
  const { categories } = useCategories();

  const stats = [
    {
      title: 'Produits',
      value: products.length,
      icon: Package,
      color: 'bg-blue-500',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Pages',
      value: pages.length,
      icon: FileText,
      color: 'bg-green-500',
      change: '+3%',
      trend: 'up'
    },
    {
      title: 'Catégories',
      value: categories.length,
      icon: Grid,
      color: 'bg-purple-500',
      change: 'stable',
      trend: 'stable'
    },
    {
      title: 'Vues',
      value: '2.4k',
      icon: Eye,
      color: 'bg-yellow-500',
      change: '+8%',
      trend: 'up'
    }
  ];

  const recentProducts = products.slice(0, 5);
  const productsByCategory = categories.map(category => ({
    ...category,
    count: products.filter(p => p.category === category.id).length
  }));

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600">Aperçu de votre boutique CBD</p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <stat.icon size={24} className="text-white" />
                  </div>
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className={`
                    ${stat.trend === 'up' ? 'text-green-600' : 
                      stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}
                  `}>
                    {stat.change}
                  </span>
                  <span className="text-gray-600 ml-1">ce mois</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Produits récents */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Produits récents</h3>
            </div>
            <div className="card-body">
              {recentProducts.length > 0 ? (
                <div className="space-y-4">
                  {recentProducts.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4">
                      <img
                        src={product.images[0] || '/placeholder-product.jpg'}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{product.name}</h4>
                        <p className="text-sm text-gray-600">
                          {product.prices.length > 0 && `${product.prices[0].price.toFixed(2)} €`}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`badge ${product.inStock ? 'badge-success' : 'badge-danger'}`}>
                          {product.inStock ? 'En stock' : 'Rupture'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Package size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Aucun produit ajouté</p>
                </div>
              )}
            </div>
          </div>

          {/* Répartition par catégorie */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold">Produits par catégorie</h3>
            </div>
            <div className="card-body">
              {productsByCategory.length > 0 ? (
                <div className="space-y-4">
                  {productsByCategory.map((category) => (
                    <div key={category.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="font-medium text-gray-900">{category.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{category.count} produits</span>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${Math.min(100, (category.count / products.length) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Grid size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">Aucune catégorie créée</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">Actions rapides</h3>
          </div>
          <div className="card-body">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="btn-primary flex items-center justify-center">
                <Package size={20} className="mr-2" />
                Nouveau produit
              </button>
              <button className="btn-secondary flex items-center justify-center">
                <FileText size={20} className="mr-2" />
                Nouvelle page
              </button>
              <button className="btn-outline flex items-center justify-center">
                <Grid size={20} className="mr-2" />
                Nouvelle catégorie
              </button>
              <button className="btn-outline flex items-center justify-center">
                <Eye size={20} className="mr-2" />
                Voir la boutique
              </button>
            </div>
          </div>
        </div>

        {/* Aperçu des performances */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <div className="card-body text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-blue-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Croissance</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">+15%</p>
              <p className="text-sm text-gray-600">Ventes ce mois</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-green-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visiteurs</h3>
              <p className="text-2xl font-bold text-blue-600 mb-1">1.2k</p>
              <p className="text-sm text-gray-600">Cette semaine</p>
            </div>
          </div>

          <div className="card">
            <div className="card-body text-center">
              <div className="bg-yellow-100 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="text-yellow-600" size={32} />
              </div>
              <h3 className="font-semibold text-lg mb-2">Satisfaction</h3>
              <p className="text-2xl font-bold text-yellow-600 mb-1">4.8/5</p>
              <p className="text-sm text-gray-600">Note moyenne</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}