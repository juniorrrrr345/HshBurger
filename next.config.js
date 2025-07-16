/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Commented out to fix Supabase error
  images: {
    unoptimized: true // nécessaire si tu utilises next/image
  }
};

module.exports = nextConfig;
