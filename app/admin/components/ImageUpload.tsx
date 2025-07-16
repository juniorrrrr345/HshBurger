'use client';

import React, { useState, useRef } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
}

export default function ImageUpload({ 
  value, 
  onChange, 
  label, 
  placeholder = "Cliquez pour sélectionner une image",
  accept = "image/*,video/*",
  multiple = false 
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Vérifier le type de fichier
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      alert('Veuillez sélectionner une image ou une vidéo');
      return;
    }

    // Vérifier la taille (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximum : 10MB');
      return;
    }

    // Créer une URL temporaire pour la prévisualisation
    const url = URL.createObjectURL(file);
    setPreview(url);
    
    // Simuler un upload vers un service (dans un vrai projet, vous utiliseriez un service comme Cloudinary, AWS S3, etc.)
    // Pour l'instant, on utilise l'URL temporaire
    onChange(url);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const removeImage = () => {
    setPreview(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      
      <div
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-green-500 bg-green-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
        />
        
        {preview ? (
          <div className="space-y-2">
            {preview.startsWith('blob:') ? (
              // Prévisualisation locale
              <div className="relative">
                {preview.includes('image') ? (
                  <img
                    src={preview}
                    alt="Prévisualisation"
                    className="max-h-32 mx-auto rounded"
                  />
                ) : (
                  <video
                    src={preview}
                    controls
                    className="max-h-32 mx-auto rounded"
                  />
                )}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              // URL externe
              <div className="relative">
                <img
                  src={preview}
                  alt="Image"
                  className="max-h-32 mx-auto rounded"
                  onError={() => setPreview(null)}
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeImage();
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📷</div>
            <p className="text-sm text-gray-600">{placeholder}</p>
            <p className="text-xs text-gray-500">
              Glissez-déposez ou cliquez pour sélectionner
            </p>
          </div>
        )}
      </div>
      
      {value && !preview && (
        <div className="text-xs text-gray-500">
          URL actuelle : {value}
        </div>
      )}
    </div>
  );
}