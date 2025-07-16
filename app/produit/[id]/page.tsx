import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteConfig, getConfigAsync } from '../../lib/config';
import Header from '../../components/Header';
import OptimizedImage from '../../components/OptimizedImage';
import ProductClient from './ProductClient';

// Export static params for static export
export async function generateStaticParams() {
  try {
    const config = await getConfigAsync();
    return config.products.map((product) => ({
      id: product.id.toString(),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const config = await getConfigAsync();
  const product = config.products.find(p => p.id === parseInt(params.id));
  
  if (!product) {
    notFound();
  }

  return <ProductClient product={product} config={config} />;
}