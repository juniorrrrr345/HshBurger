/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true // nécessaire si tu utilises next/image
  }
};

module.exports = nextConfig;
