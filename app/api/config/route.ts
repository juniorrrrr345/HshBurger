import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../lib/supabase';
import { SiteConfig, defaultConfig } from '../../lib/config';

// Lire la configuration depuis Supabase
async function readConfig(): Promise<SiteConfig> {
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('config_data')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error reading config from Supabase:', error);
      return defaultConfig;
    }

    if (data && data.config_data) {
      return { ...defaultConfig, ...data.config_data };
    }

    return defaultConfig;
  } catch (error) {
    console.error('Error reading config:', error);
    return defaultConfig;
  }
}

// Écrire la configuration dans Supabase
async function writeConfig(config: SiteConfig): Promise<void> {
  try {
    const { error } = await supabase
      .from('site_config')
      .insert({ config_data: config });

    if (error) {
      console.error('Error saving config to Supabase:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error writing config:', error);
    throw error;
  }
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