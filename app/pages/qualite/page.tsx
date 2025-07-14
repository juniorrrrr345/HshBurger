'use client';

import React from 'react';
import Layout from '@/components/Layout';
import { Shield, Award, CheckCircle, Beaker } from 'lucide-react';

export default function QualitePage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Qualité</h1>
          <p className="text-gray-600 text-lg">
            Notre engagement pour des produits CBD de qualité premium
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Shield className="text-green-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Contrôle qualité</h2>
            </div>
            <p className="text-gray-600">
              Tous nos produits sont testés en laboratoire pour garantir leur pureté et leur conformité.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Award className="text-blue-600 mr-3" size={24} />
              <h2 className="text-xl font-semibold">Certification</h2>
            </div>
            <p className="text-gray-600">
              Produits certifiés conformes à la réglementation européenne et française.
            </p>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
                            <Beaker className="text-green-600 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Tests laboratoire</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Chaque lot est analysé pour vérifier :
          </p>
          <ul className="space-y-2">
            <li className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={16} />
              <span>Taux de CBD et THC</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={16} />
              <span>Absence de pesticides</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={16} />
              <span>Métaux lourds</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-green-600 mr-2" size={16} />
              <span>Microbiologie</span>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Nos garanties</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold">100% Légal</h3>
              <p className="text-gray-600">Taux de THC inférieur à 0,3%</p>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold">Origine contrôlée</h3>
              <p className="text-gray-600">Chanvre cultivé en Europe</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold">Extraction naturelle</h3>
              <p className="text-gray-600">Méthode CO2 supercritique</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}