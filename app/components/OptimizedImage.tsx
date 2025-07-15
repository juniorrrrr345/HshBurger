'use client';

import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: string;
}

export default function OptimizedImage({ 
  src, 
  alt, 
  className = "", 
  fallbackIcon = "📦" 
}: OptimizedImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 text-gray-400 text-4xl ${className}`}>
        {fallbackIcon}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center product-image mobile-optimized mobile-image transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)'
        }}
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      )}
    </div>
  );
}