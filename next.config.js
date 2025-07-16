/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // nécessaire si tu utilises next/image
  },
  // Configuration pour Netlify
  trailingSlash: true,
  // Désactiver les fonctions serverless pour l'export statique
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
