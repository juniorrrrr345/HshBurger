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
    orderLink: "https://example.com/order/huile-cbd-10"
  },
  {
    id: 2,
    name: "Fleurs CBD Amnesia",
    price: 8.90,
    originalPrice: 12.90,
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs de CBD Amnesia séchées, arôme fruité.",
    orderLink: "https://example.com/order/fleurs-amnesia"
  },
  {
    id: 3,
    name: "Résine CBD Hash",
    price: 12.90,
    originalPrice: 16.90,
    image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop",
    category: "resines",
    description: "Résine CBD Hash artisanale, texture fondante.",
    orderLink: "https://example.com/order/resine-hash"
  },
  {
    id: 4,
    name: "Huile CBD 15%",
    price: 49.90,
    originalPrice: 59.90,
    image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop",
    category: "huiles",
    description: "Huile de CBD 15% concentration élevée.",
    orderLink: "https://example.com/order/huile-cbd-15"
  },
  {
    id: 5,
    name: "Fleurs CBD Lemon Haze",
    price: 9.90,
    originalPrice: 13.90,
    image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop",
    category: "fleurs",
    description: "Fleurs CBD Lemon Haze au parfum citronné.",
    orderLink: "https://example.com/order/fleurs-lemon-haze"
  }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CBD Shop Premium</h1>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
              <Link href="/produits" className="text-gray-700 hover:text-green-600">Produits</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Produits CBD Premium
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Découvrez notre sélection de produits CBD de qualité supérieure
          </p>
          <Link 
            href="/produits" 
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Voir nos produits
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Produits Populaires</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    Populaire
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600">€{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">€{product.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      href={`/produit/${product.id}`}
                      className="flex-1 bg-gray-100 text-center py-2 px-4 rounded hover:bg-gray-200 transition-colors"
                    >
                      Voir détails
                    </Link>
                    <a
                      href={product.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-green-600 text-white text-center py-2 px-4 rounded hover:bg-green-700 transition-colors"
                    >
                      Commander
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/produits"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2">Produits Naturels</h3>
              <p className="text-gray-600">100% naturel et bio</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Expédition sous 24h</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600">Transactions protégées</p>
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