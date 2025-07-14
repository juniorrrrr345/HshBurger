'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { usePages } from '@/hooks/useShop';
import { Page } from '@/types';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Eye,
  Save,
  X,
  EyeOff,
  Calendar,
  FileText
} from 'lucide-react';

export default function AdminPagesPage() {
  const { pages, addPage, updatePage, deletePage } = usePages();
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    isActive: true
  });

  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[ùûü]/g, 'u')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ç]/g, 'c')
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleEdit = (page: Page) => {
    setEditingPage(page);
    setFormData({
      title: page.title,
      slug: page.slug,
      content: page.content,
      isActive: page.isActive
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingPage(null);
    setFormData({
      title: '',
      slug: '',
      content: '',
      isActive: true
    });
    setShowModal(true);
  };

  const handleDelete = (pageId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette page ?')) {
      deletePage(pageId);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingPage) {
      updatePage(editingPage.id, formData);
    } else {
      addPage(formData);
    }
    
    setShowModal(false);
  };

  const togglePageStatus = (pageId: string, currentStatus: boolean) => {
    updatePage(pageId, { isActive: !currentStatus });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
            <p className="text-gray-600">Gérez les pages de votre boutique</p>
          </div>
          <button
            onClick={handleAdd}
            className="btn-primary flex items-center"
          >
            <Plus size={20} className="mr-2" />
            Nouvelle page
          </button>
        </div>

        {/* Barre de recherche */}
        <div className="card">
          <div className="card-body">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Rechercher une page..."
                className="form-input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Liste des pages */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold">
              {filteredPages.length} page{filteredPages.length !== 1 ? 's' : ''}
            </h3>
          </div>
          <div className="card-body">
            {filteredPages.length > 0 ? (
              <div className="space-y-4">
                {filteredPages.map((page) => (
                  <div key={page.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-lg">{page.title}</h4>
                          <span className={`badge ${page.isActive ? 'badge-success' : 'badge-danger'}`}>
                            {page.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          URL: /pages/{page.slug}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>
                              Créé le {new Date(page.createdAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <FileText size={14} className="mr-1" />
                            <span>
                              Mis à jour le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => togglePageStatus(page.id, page.isActive)}
                          className={`p-2 rounded-lg ${page.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                          title={page.isActive ? 'Désactiver' : 'Activer'}
                        >
                          {page.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                        </button>
                        <button
                          onClick={() => handleEdit(page)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Modifier"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(page.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FileText size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucune page trouvée</h3>
                <p className="text-gray-600">
                  {searchTerm 
                    ? 'Aucune page ne correspond à votre recherche' 
                    : 'Commencez par créer votre première page'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal d'ajout/modification */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content max-w-4xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">
                {editingPage ? 'Modifier la page' : 'Nouvelle page'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Titre de la page *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="form-input"
                    required
                    placeholder="À propos de nous"
                  />
                </div>
                <div>
                  <label className="form-label">URL (slug) *</label>
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-2">/pages/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      className="form-input"
                      required
                      placeholder="a-propos-de-nous"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    URL générée automatiquement à partir du titre
                  </p>
                </div>
              </div>

              <div>
                <label className="form-label">Contenu *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  className="form-input"
                  rows={12}
                  required
                  placeholder="Écrivez le contenu de votre page ici. Vous pouvez utiliser du HTML basique."
                />
                <p className="text-sm text-gray-600 mt-1">
                  Vous pouvez utiliser du HTML basique : &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;, &lt;strong&gt;, &lt;em&gt;
                </p>
              </div>

              <div className="flex items-center">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    className="mr-2"
                  />
                  Page active (visible sur le site)
                </label>
              </div>

              {/* Aperçu */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Aperçu du contenu :</h3>
                <div className="border rounded-lg p-4 bg-gray-50 max-h-64 overflow-y-auto">
                  <div 
                    className="content-editor"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>Tapez votre contenu pour voir l\'aperçu...</p>' }}
                  />
                </div>
              </div>

              {/* Boutons */}
              <div className="flex justify-end space-x-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-outline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="btn-primary flex items-center"
                >
                  <Save size={20} className="mr-2" />
                  {editingPage ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}