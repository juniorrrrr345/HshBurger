import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, SiteConfig } from '../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error('Error fetching config:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement de la configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    switch (action) {
      case 'saveConfig':
        const success = await saveConfigAsync(data as SiteConfig);
        if (success) {
          return NextResponse.json({ success: true, message: 'Configuration sauvegardée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la sauvegarde' },
            { status: 500 }
          );
        }

      default:
        return NextResponse.json(
          { success: false, error: 'Action non reconnue' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in admin API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}