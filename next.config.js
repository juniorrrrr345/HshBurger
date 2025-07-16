/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true // nécessaire pour l'optimisation des images
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
