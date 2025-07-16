import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { SiteConfig } from '../../lib/config';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: config, error } = await supabase
      .from('site_config')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching config from Supabase:', error);
      return NextResponse.json({ error: 'Failed to fetch config' }, { status: 500 });
    }

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error in GET /api/config-supabase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const config: SiteConfig = await request.json();

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
      console.error('Error saving config to Supabase:', error);
      return NextResponse.json({ error: 'Failed to save config' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error in POST /api/config-supabase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}