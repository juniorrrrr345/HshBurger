'use client';

import React from 'react';
import Layout from '@/components/Layout';
import Diagnostic from '@/components/Diagnostic';
import Link from 'next/link';

export default function AdminSimplePage() {
  return (
    <Layout>
      <Diagnostic currentPath="/admin-simple" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-4">Admin (Version Simple)</h1>
        <p className="text-gray-600 mb-6">
          Cette page est une version simplifiée pour tester la navigation.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="btn-primary">
            Retour à l'accueil
          </Link>
          <Link href="/test" className="btn-secondary">
            Page de test
          </Link>
        </div>
      </div>
    </Layout>
  );
}