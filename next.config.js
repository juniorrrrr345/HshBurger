/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true // nécessaire si tu utilises next/image
  }
};

module.exports = nextConfig;
