'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import LoadingSpinner from '@/components/admin/LoadingSpinner';
import { useProducts } from '@/hooks/useShop';
import { Product } from '@/types';
import { 
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getProductById, products, loading } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPriceIndex, setSelectedPriceIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (loading || !id) return;
    
    const productData = getProductById(id as string);
    if (productData) {
      setProduct(productData);
      
      // Produits similaires
      const related = products
        .filter(p => p.id !== id && p.category === productData.category && p.inStock)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id, getProductById, products, loading]);

  if (loading || !product) {
    return <LoadingSpinner />;
  }

  const selectedPrice = product.prices[selectedPriceIndex];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span>/</span>
            <Link href="/produits" className="hover:text-primary">Produits</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        {/* Bouton retour */}
        <button
          onClick={() => router.back()}
          className="btn-outline flex items-center mb-6"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </button>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Galerie d'images */}
          <div>
            {/* Image principale */}
            <div className="mb-4">
              <img
                src={product.images[selectedImageIndex] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Miniatures */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImageIndex === index ? 'border-primary' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Vidéos */}
            {product.videos && product.videos.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Vidéos du produit</h3>
                <div className="space-y-4">
                  {product.videos.map((video, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <video
                        controls
                        className="w-full h-64 object-cover"
                        poster={product.images[0]}
                      >
                        <source src={video} type="video/mp4" />
                        Votre navigateur ne supporte pas les vidéos.
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Informations produit */}
          <div>
            <div className="mb-4">
              {product.featured && (
                <span className="badge badge-warning mb-2">Produit populaire</span>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Sélection de variante */}
            <div className="mb-6">
              <h3 className="form-label">Choisissez votre variante :</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.prices.map((price, index) => (
                  <button
                    key={price.id}
                    onClick={() => setSelectedPriceIndex(index)}
                    className={`p-3 border-2 rounded-lg text-left transition-all ${
                      selectedPriceIndex === index 
                        ? 'border-primary bg-green-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{price.variant}</span>
                      <div className="text-right">
                        <span className="font-bold text-primary">{price.price.toFixed(2)} €</span>
                        {price.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {price.originalPrice.toFixed(2)} €
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">/{price.unit}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prix sélectionné */}
            <div className="mb-6">
              <div className="text-2xl font-bold text-primary">
                {product.prices[selectedPriceIndex].price.toFixed(2)} €
                {product.prices[selectedPriceIndex].originalPrice && (
                  <span className="ml-2 text-lg text-gray-500 line-through">
                    {product.prices[selectedPriceIndex].originalPrice.toFixed(2)} €
                  </span>
                )}
              </div>
            </div>

            {/* Bouton Commander */}
            <div className="mb-6">
              {product.inStock ? (
                <>
                  {product.orderLink ? (
                    <a 
                      href={product.orderLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center"
                    >
                      <ExternalLink size={20} className="mr-2" />
                      Commander
                    </a>
                  ) : (
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                      <p className="text-gray-600">Lien de commande non configuré</p>
                      <p className="text-sm text-gray-500">
                        Configurez le lien dans le panel admin
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <button className="btn-outline w-full cursor-not-allowed opacity-50" disabled>
                  Produit indisponible
                </button>
              )}
            </div>



            {/* Statut stock */}
            <div className="mb-6">
              {product.inStock ? (
                <span className="badge badge-success">En stock</span>
              ) : (
                <span className="badge badge-danger">Rupture de stock</span>
              )}
            </div>
          </div>
        </div>

        {/* Description détaillée */}
        <div className="mt-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Description détaillée</h2>
            <div className="prose max-w-none">
              <p className="mb-4">{product.description}</p>
              <h3 className="text-lg font-semibold mb-2">Caractéristiques :</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-700">
                <li>Produit 100% naturel</li>
                <li>Extraction CO2 supercritique</li>
                <li>Testé en laboratoire</li>
                <li>Conforme à la réglementation française</li>
                <li>Taux de THC &lt; 0,3%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Produits similaires */}
        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Produits similaires</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}