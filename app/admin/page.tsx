'use client';

import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import Diagnostic from '@/components/Diagnostic';
import { useProducts, usePages, useCategories } from '@/hooks/useShop';
import { Package, FileText, Grid, Eye, ShoppingCart, TrendingUp, Users, Star } from 'lucide-react';

export default function AdminDashboard() {
  const { products, loading: productsLoading } = useProducts();
  const { pages, loading: pagesLoading } = usePages();
  const { categories, loading: categoriesLoading } = useCategories();

  // Ajout d'un état de chargement pour éviter les erreurs d'hydratation
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simuler un délai de chargement pour éviter les erreurs d'hydratation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (productsLoading || pagesLoading || categoriesLoading) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des données...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

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
      <Diagnostic currentPath="/admin" />
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
              <Link href="/admin/produits" className="btn-primary flex items-center justify-center">
                <Package size={20} className="mr-2" />
                Nouveau produit
              </Link>
              <Link href="/admin/pages" className="btn-secondary flex items-center justify-center">
                <FileText size={20} className="mr-2" />
                Nouvelle page
              </Link>
              <Link href="/admin/categories" className="btn-outline flex items-center justify-center">
                <Grid size={20} className="mr-2" />
                Nouvelle catégorie
              </Link>
              <Link href="/" target="_blank" className="btn-outline flex items-center justify-center">
                <Eye size={20} className="mr-2" />
                Voir la boutique
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}