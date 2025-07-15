import React from 'react';
import Link from 'next/link';

// Données statiques des produits
const products = [
  {
    id: 1,
    name: "Huile CBD 10%",
    price: 29.90,
    originalPrice: 39.90,
    image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
    category: "huiles",
    description: "Huile de CBD 10% premium, extraction CO2 supercritique.",
    orderLink: "https://example.com/order/huile-cbd-10",
    popular: true
  },
  {
    id: 2,
    name: "Fleurs CBD Amnesia",
    price: 8.90,
    originalPrice: 12.90,
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs de CBD Amnesia séchées, arôme fruité.",
    orderLink: "https://example.com/order/fleurs-amnesia",
    popular: true
  },
  {
    id: 3,
    name: "Résine CBD Hash",
    price: 12.90,
    originalPrice: 16.90,
    image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
    category: "resines",
    description: "Résine CBD Hash artisanale, texture fondante.",
    orderLink: "https://example.com/order/resine-hash",
    popular: true
  },
  {
    id: 4,
    name: "Huile CBD 15%",
    price: 49.90,
    originalPrice: 59.90,
    image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
    category: "huiles",
    description: "Huile de CBD 15% concentration élevée.",
    orderLink: "https://example.com/order/huile-cbd-15",
    popular: false
  },
  {
    id: 5,
    name: "Fleurs CBD Lemon Haze",
    price: 9.90,
    originalPrice: 13.90,
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs CBD Lemon Haze au parfum citronné.",
    orderLink: "https://example.com/order/fleurs-lemon-haze",
    popular: false
  }
];

const categories = [
  { id: 'tous', name: 'Tous les produits' },
  { id: 'huiles', name: 'Huiles CBD' },
  { id: 'fleurs', name: 'Fleurs CBD' },
  { id: 'resines', name: 'Résines CBD' }
];

export default function ProduitsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">CBD Shop Premium</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
              <Link href="/produits" className="text-green-600 font-semibold">Produits</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Nos Produits CBD
          </h1>
          <p className="text-xl max-w-2xl mx-auto">
            Découvrez notre gamme complète de produits CBD premium
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <Link href="/" className="text-gray-500 hover:text-green-600">
                  Accueil
                </Link>
              </li>
              <li>
                <span className="text-gray-500">/</span>
              </li>
              <li>
                <span className="text-gray-900 font-semibold">Produits</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Catégories</h2>
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="px-6 py-2 rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.popular && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      Populaire
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="mb-2">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded uppercase tracking-wide">
                      {product.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                      )}
                    </div>
                    {product.originalPrice && (
                      <span className="text-sm text-green-600 font-semibold">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/produit/${product.id}`}
                      className="flex-1 bg-gray-100 text-center py-2 px-4 rounded hover:bg-gray-200 transition-colors font-semibold"
                    >
                      Voir détails
                    </Link>
                    <a
                      href={product.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition-colors font-semibold"
                    >
                      Commander
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-green-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Besoin d'aide pour choisir ?
              </h3>
              <p className="text-gray-600 mb-6">
                Notre équipe est là pour vous conseiller et vous aider à trouver le produit qui vous convient.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">CBD Shop Premium</h3>
              <p className="text-gray-400">Votre boutique CBD de confiance</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Utiles</h4>
              <ul className="space-y-2">
                <li><Link href="/produits" className="text-gray-400 hover:text-white">Produits</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-gray-400">Email: contact@cbdshop.fr</p>
              <p className="text-gray-400">Tél: +33 1 23 45 67 89</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2024 CBD Shop Premium. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}