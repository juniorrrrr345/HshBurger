import { NextRequest, NextResponse } from 'next/server';
import { SiteConfig, defaultConfig } from '../../lib/config';

// Service de stockage simple utilisant un endpoint externe
const STORAGE_URL = process.env.STORAGE_URL || 'https://api.jsonbin.io/v3/b';

// Fonction pour lire la configuration depuis le stockage cloud
async function readConfigFromCloud(): Promise<SiteConfig> {
  try {
    const response = await fetch(`${STORAGE_URL}/latest`, {
      headers: {
        'X-Master-Key': process.env.JSONBIN_MASTER_KEY || '$2a$10$placeholder',
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      return { ...defaultConfig, ...result.record };
    }
  } catch (error) {
    console.log('No config found in cloud storage, using default');
  }
  
  return defaultConfig;
}

// Fonction pour sauvegarder la configuration dans le stockage cloud
async function saveConfigToCloud(config: SiteConfig): Promise<boolean> {
  try {
    const response = await fetch(STORAGE_URL, {
      method: 'PUT',
      headers: {
        'X-Master-Key': process.env.JSONBIN_MASTER_KEY || '$2a$10$placeholder',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(config)
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving config to cloud:', error);
    return false;
  }
}

// Fallback vers le système de fichiers local (uniquement en développement)
async function readConfigFromFile(): Promise<SiteConfig> {
  if (process.env.NODE_ENV === 'production') {
    return defaultConfig;
  }

  try {
    const { promises: fs } = await import('fs');
    const path = await import('path');
    
    const configFilePath = path.join(process.cwd(), 'data', 'config.json');
    const data = await fs.readFile(configFilePath, 'utf-8');
    return { ...defaultConfig, ...JSON.parse(data) };
  } catch (error) {
    return defaultConfig;
  }
}

async function saveConfigToFile(config: SiteConfig): Promise<boolean> {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  try {
    const { promises: fs } = await import('fs');
    const path = await import('path');
    
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    
    const configFilePath = path.join(dataDir, 'config.json');
    await fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving config to file:', error);
    return false;
  }
}

export async function GET() {
  try {
    // Essayer le stockage cloud d'abord, puis fallback vers fichier local
    let config = await readConfigFromCloud();
    if (!config || Object.keys(config).length === 0) {
      config = await readConfigFromFile();
    }
    
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json(defaultConfig);
  }
}

export async function POST(request: NextRequest) {
  try {
    const config: SiteConfig = await request.json();
    
    // Essayer de sauvegarder dans le cloud d'abord
    let success = await saveConfigToCloud(config);
    
    // Si le cloud échoue, essayer le fichier local (développement uniquement)
    if (!success) {
      success = await saveConfigToFile(config);
    }
    
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: 'Failed to save config - no writable storage available' }, 
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}