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
  await ensureDataDirectory();
  await fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
}

export async function GET() {
  try {
    const config = await readConfig();
    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading config:', error);
    return NextResponse.json({ error: 'Failed to read config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const config: SiteConfig = await request.json();
    await writeConfig(config);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving config:', error);
    return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
  }
}