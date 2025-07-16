import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    // Utiliser les variables d'environnement Nhost pour construire l'URL
    const nhostSubdomain = process.env.NHOST_SUBDOMAIN || process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || 'placeholder';
    const nhostRegion = process.env.NHOST_REGION || process.env.NEXT_PUBLIC_NHOST_REGION || 'eu-central-1';
    
    // Construire l'URL Nhost publique
    const nhostUrl = `https://${nhostSubdomain}.${nhostRegion}.nhost.run`;
    
    // Configuration Nhost pour le client
    const nhostConfig = {
      subdomain: nhostSubdomain,
      region: nhostRegion,
      url: nhostUrl,
      graphqlEndpoint: `${nhostUrl}/v1/graphql`,
      authEndpoint: `${nhostUrl}/v1/auth`,
      storageEndpoint: `${nhostUrl}/v1/files`
    };

    return NextResponse.json(nhostConfig);
  } catch (error) {
    console.error('Error getting Nhost config:', error);
    return NextResponse.json({ error: 'Failed to get Nhost config' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Ici vous pouvez ajouter la logique pour sauvegarder la config Nhost
    // Par exemple, mettre à jour les variables d'environnement ou la config
    
    return NextResponse.json({ success: true, message: 'Nhost config updated' });
  } catch (error) {
    console.error('Error updating Nhost config:', error);
    return NextResponse.json({ error: 'Failed to update Nhost config' }, { status: 500 });
  }
}