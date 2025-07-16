/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out to fix Supabase error
  images: {
    unoptimized: true // nécessaire si tu utilises next/image
  },
  // Désactiver les pages pour utiliser uniquement l'App Router
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
