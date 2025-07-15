'use client';

import React from 'react';
import Link from 'next/link';
import { Settings, Package, Users, ShoppingCart, Home, BarChart3 } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Tableau de bord', icon: BarChart3, href: '/admin' },
  { id: 'products', label: 'Produits', icon: Package, href: '/admin?tab=products' },
  { id: 'categories', label: 'Catégories', icon: ShoppingCart, href: '/admin?tab=categories' },
  { id: 'farms', label: 'Fermes', icon: Home, href: '/admin?tab=farms' },
  { id: 'social', label: 'Réseaux sociaux', icon: Users, href: '/admin?tab=social' },
  { id: 'settings', label: 'Paramètres', icon: Settings, href: '/admin?tab=settings' },
];

export default function AdminLayout({ children, activeTab = 'dashboard', onTabChange }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Administration CloudCanon</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Voir le site
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => onTabChange?.(item.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}