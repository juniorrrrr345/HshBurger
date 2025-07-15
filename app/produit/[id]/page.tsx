import Link from 'next/link';
import { notFound } from 'next/navigation';

const products = [
  { id: 1, name: "Huile CBD 10%", price: 29.90, image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop", orderLink: "https://example.com/order/huile-cbd-10" },
  { id: 2, name: "Fleurs CBD Amnesia", price: 8.90, image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop", orderLink: "https://example.com/order/fleurs-amnesia" },
  { id: 3, name: "Résine CBD Hash", price: 12.90, image: "https://images.unsplash.com/photo-1616684547847-8b0e6b6ae8b6?w=400&h=400&fit=crop", orderLink: "https://example.com/order/resine-hash" },
  { id: 4, name: "Huile CBD 15%", price: 49.90, image: "https://images.unsplash.com/photo-1587736793948-7b6b17f06c8d?w=400&h=400&fit=crop", orderLink: "https://example.com/order/huile-cbd-15" },
  { id: 5, name: "Fleurs CBD Lemon Haze", price: 9.90, image: "https://images.unsplash.com/photo-1600996506180-b6d92c6d8b62?w=400&h=400&fit=crop", orderLink: "https://example.com/order/fleurs-lemon-haze" }
];

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">CBD Shop Premium</Link>
            </div>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-green-600">Accueil</Link>
              <Link href="/produits" className="text-gray-700 hover:text-green-600">Produits</Link>
              <Link href="/contact" className="text-gray-700 hover:text-green-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-lg mb-6">Description complète du produit {product.name}</p>
            
            <div className="flex items-center mb-8">
              <span className="text-4xl font-bold text-green-600">€{product.price}</span>
            </div>

            <div className="flex space-x-4 mb-8">
              <a
                href={product.orderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white text-center py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Commander maintenant
              </a>
              <Link
                href="/contact"
                className="flex-1 bg-gray-100 text-gray-900 text-center py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}