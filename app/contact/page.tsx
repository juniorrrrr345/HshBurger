'use client';

import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useShopSettings } from '@/hooks/useShop';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const { settings } = useShopSettings();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simuler l'envoi du formulaire
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Réinitialiser le statut après 3 secondes
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!settings) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Une question ? Un conseil ? Notre équipe est là pour vous aider. 
            N'hésitez pas à nous contacter !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Informations de contact */}
          <div>
            <h2 className="text-2xl font-bold mb-6">Nos coordonnées</h2>
            
            <div className="space-y-6">
              {/* Adresse */}
              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <MapPin className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Adresse</h3>
                  <p className="text-gray-600">{settings.contact.address}</p>
                </div>
              </div>

              {/* Téléphone */}
              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Téléphone</h3>
                  <p className="text-gray-600">{settings.contact.phone}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Mail className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Email</h3>
                  <p className="text-gray-600">{settings.contact.email}</p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start">
                <div className="bg-green-100 rounded-lg p-3 mr-4">
                  <Clock className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Horaires</h3>
                  <div className="text-gray-600 space-y-1">
                    <p>Lundi - Vendredi : 9h00 - 18h00</p>
                    <p>Samedi : 9h00 - 12h00</p>
                    <p>Dimanche : Fermé</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                {settings.social.facebook && (
                  <a
                    href={settings.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Facebook
                  </a>
                )}
                {settings.social.instagram && (
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white p-3 rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Instagram
                  </a>
                )}
                {settings.social.twitter && (
                  <a
                    href={settings.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-3 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Twitter
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
              
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <p className="text-green-800">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800">
                    Une erreur s'est produite lors de l'envoi. Veuillez réessayer.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="form-label">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="form-label">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="form-input"
                  >
                    <option value="">Choisissez un sujet</option>
                    <option value="info">Demande d'informations</option>
                    <option value="product">Question sur un produit</option>
                    <option value="order">Suivi de commande</option>
                    <option value="support">Support technique</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="form-label">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-input"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner w-5 h-5 mr-2"></div>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Envoyer le message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Questions fréquentes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Délais de livraison</h3>
              <p className="text-gray-600">
                Nous expédions sous 24h (jours ouvrés). La livraison prend généralement 2-3 jours ouvrés.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Retours et échanges</h3>
              <p className="text-gray-600">
                Vous avez 14 jours pour retourner un produit non ouvert. Les frais de retour sont à votre charge.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">
                Nous acceptons les cartes bancaires, PayPal et les virements. Tous les paiements sont sécurisés.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Légalité des produits</h3>
              <p className="text-gray-600">
                Tous nos produits CBD contiennent moins de 0,3% de THC et sont conformes à la législation française.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}