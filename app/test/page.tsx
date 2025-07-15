'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function TestPage() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Page de Test</h1>
        <p className="text-gray-600 mb-6">
          Cette page est utilisée pour tester la navigation.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/produits" className="btn-secondary">
            Aller aux produits
          </Link>
          <Link href="/admin" className="btn-outline">
            Aller à l'admin
          </Link>
        </div>
      </div>
    </Layout>
  );
}