'use client';

import React, { useState, useRef } from 'react';

interface FileUploadProps {
  onUpload: (url: string, type: 'image' | 'video') => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  className?: string;
}

export default function FileUpload({ 
  onUpload, 
  accept = "image/*,video/*", 
  multiple = false, 
  label = "Choisir un fichier",
  className = ""
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Vérifier le type de fichier
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        
        if (!isImage && !isVideo) {
          alert('Veuillez sélectionner une image ou une vidéo');
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          onUpload(result.url, isImage ? 'image' : 'video');
          setUploadProgress(((i + 1) / files.length) * 100);
        } else {
          const error = await response.json();
          alert(`Erreur lors de l'upload: ${error.error}`);
        }
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload du fichier');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        capture="environment"
      />
      
      <button
        type="button"
        onClick={handleClick}
        disabled={isUploading}
        className={`w-full px-4 py-4 border-2 border-dashed border-gray-300 rounded-lg text-center transition-colors ${
          isUploading 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-600 hover:border-green-500 hover:text-green-600 active:bg-green-50'
        }`}
      >
        {isUploading ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
            </div>
            <div className="text-sm">Upload en cours... {Math.round(uploadProgress)}%</div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-2xl">📱</div>
            <div className="font-medium">{label}</div>
            <div className="text-xs text-gray-500">
              Appuyez pour sélectionner depuis votre galerie
            </div>
          </div>
        )}
      </button>
    </div>
  );
}