import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteConfig, getConfig, defaultConfig } from '../../lib/config';
import Header from '../../components/Header';
import OptimizedImage from '../../components/OptimizedImage';
import ProductPageClient from './ProductPageClient';

export async function generateStaticParams() {
  return defaultConfig.products.map((product) => ({ id: product.id.toString() }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const config = getConfig();
  const product = config.products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  const category = config.categories.find(cat => cat.name === product.category);
  const relatedProducts = config.products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <ProductPageClient 
      product={product}
      category={category}
      config={config}
      relatedProducts={relatedProducts}
    />
  );
}