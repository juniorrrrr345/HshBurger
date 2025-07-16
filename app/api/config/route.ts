import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { SiteConfig, defaultConfig } from '../../lib/config';

const configFilePath = path.join(process.cwd(), 'data', 'config.json');

// Assurer que le dossier data existe
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Lire la configuration depuis le fichier
async function readConfig(): Promise<SiteConfig> {
  try {
    await ensureDataDirectory();
    const data = await fs.readFile(configFilePath, 'utf-8');
    return { ...defaultConfig, ...JSON.parse(data) };
  } catch (error) {
    // Si le fichier n'existe pas, retourner la config par défaut
    return defaultConfig;
  }
}

// Écrire la configuration dans le fichier
async function writeConfig(config: SiteConfig): Promise<void> {
  console.log('writeConfig - Ensuring data directory exists');
  await ensureDataDirectory();
  console.log('writeConfig - Writing config to file:', configFilePath);
  await fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
  console.log('writeConfig - Config written successfully');
}

export async function GET() {
  try {
    const config = await readConfig();
    const response = NextResponse.json(config);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/config - Starting save process');
    console.log('POST /api/config - Request headers:', Object.fromEntries(request.headers.entries()));
    
    const config: SiteConfig = await request.json();
    console.log('POST /api/config - Config received, writing to file');
    console.log('POST /api/config - Config structure:', Object.keys(config));
    
    await writeConfig(config);
    console.log('POST /api/config - Config saved successfully');
    
    const response = NextResponse.json({ success: true });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save config', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}