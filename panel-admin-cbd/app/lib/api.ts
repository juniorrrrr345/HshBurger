import { SiteConfig } from './types';

// URL de l'API du site principal
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://your-site.vercel.app';

export async function fetchConfig(): Promise<SiteConfig> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/config`);
    if (!response.ok) {
      throw new Error('Erreur lors du chargement de la configuration');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur fetchConfig:', error);
    throw error;
  }
}

export async function saveConfig(config: SiteConfig): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    
    return true;
  } catch (error) {
    console.error('Erreur saveConfig:', error);
    return false;
  }
}

export async function uploadFile(file: File): Promise<{ url: string; fileName: string }> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/api/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur uploadFile:', error);
    throw error;
  }
}

export async function cleanupFiles(usedUrls: string[]): Promise<void> {
  try {
    await fetch(`${API_BASE_URL}/api/cleanup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ usedUrls }),
    });
  } catch (error) {
    console.error('Erreur cleanupFiles:', error);
  }
}