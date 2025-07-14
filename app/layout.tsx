import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CBD Shop - Boutique de produits CBD premium',
  description: 'Découvrez notre sélection de produits CBD de qualité premium. Huiles, fleurs, résines et plus encore. Livraison rapide et sécurisée.',
  keywords: 'CBD, huile CBD, fleurs CBD, résines CBD, boutique CBD, produits naturels',
  authors: [{ name: 'CBD Shop' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}