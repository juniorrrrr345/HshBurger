import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { SiteConfig, defaultConfig } from '../../lib/config';

export async function GET() {
  try {
    console.log('GET /api/config - Starting fetch process');
    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: config, error } = await supabase
      .from('site_config')
      .select('config')
      .single();

    if (error) {
      console.error('GET /api/config - Supabase error:', error);
      // Retourner la config par défaut si pas de données dans Supabase
      return NextResponse.json(defaultConfig);
    }

    console.log('GET /api/config - Config loaded successfully');
    const response = NextResponse.json(config?.config || defaultConfig);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('GET /api/config - Error:', error);
    return NextResponse.json(defaultConfig);
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
    console.log('POST /api/config - Config received:', Object.keys(config));
    
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('site_config')
      .upsert({ 
        id: 1, // Toujours utiliser l'ID 1 pour la config principale
        config: config,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('POST /api/config - Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('POST /api/config - Config saved successfully:', data);
    const response = NextResponse.json({ success: true, data });
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('POST /api/config - Error:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : String(error) }, { status: 500 });
  }
}