'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  Package, 
  Settings, 
  FileText, 
  Grid, 
  Palette,
  Menu,
  X,
  Eye,
  ShoppingBag,
  Users,
  BarChart3
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    {
      name: 'Tableau de bord',
      href: '/admin',
      icon: Home,
      active: pathname === '/admin'
    },
    {
      name: 'Produits',
      href: '/admin/produits',
      icon: Package,
      active: pathname.startsWith('/admin/produits')
    },
    {
      name: 'Catégories',
      href: '/admin/categories',
      icon: Grid,
      active: pathname.startsWith('/admin/categories')
    },
    {
      name: 'Pages',
      href: '/admin/pages',
      icon: FileText,
      active: pathname.startsWith('/admin/pages')
    },
    {
      name: 'Apparence',
      href: '/admin/apparence',
      icon: Palette,
      active: pathname.startsWith('/admin/apparence')
    },
    {
      name: 'Paramètres',
      href: '/admin/parametres',
      icon: Settings,
      active: pathname.startsWith('/admin/parametres')
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-50 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="admin-sidebar h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">Admin CBD</h1>
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-8">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`admin-sidebar-item ${item.active ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Actions rapides */}
          <div className="mt-8 px-4">
            <div className="border-t border-gray-800 pt-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Actions rapides</h3>
              <div className="space-y-2">
                <Link
                  href="/"
                  target="_blank"
                  className="admin-sidebar-item"
                  onClick={() => setSidebarOpen(false)}
                >
                  <Eye size={16} className="mr-2" />
                  Voir la boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="admin-header">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
              >
                <Menu size={20} />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Administration
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="btn-outline text-sm"
              >
                <Eye size={16} className="mr-2" />
                Voir la boutique
              </Link>
            </div>
          </div>
        </header>

        {/* Contenu */}
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}