'use client';

import React, { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Layout from '@/components/Layout';
import { usePages } from '@/hooks/useShop';
import { Page } from '@/types';
import { Calendar, User } from 'lucide-react';

export default function CustomPage() {
  const { slug } = useParams();
  const { getPageBySlug } = usePages();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      const pageData = getPageBySlug(slug as string);
      setPage(pageData || null);
      setLoading(false);
    }
  }, [slug, getPageBySlug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  if (!page) {
    notFound();
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête de la page */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{page.title}</h1>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <span>
                Mis à jour le {new Date(page.updatedAt).toLocaleDateString('fr-FR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Contenu de la page */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <div 
            className="content-editor prose max-w-none"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </Layout>
  );
}