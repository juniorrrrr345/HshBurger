import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, SocialMediaLink, getNextId } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config.socialMediaLinks });
  } catch (error) {
    console.error('Error fetching social media links:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des réseaux sociaux' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, socialMedia } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'create':
        const newSocialMedia: SocialMediaLink = {
          id: getNextId(config.socialMediaLinks),
          name: socialMedia.name,
          emoji: socialMedia.emoji,
          url: socialMedia.url,
          color: socialMedia.color
        };

        config.socialMediaLinks.push(newSocialMedia);
        const createSuccess = await saveConfigAsync(config);
        
        if (createSuccess) {
          return NextResponse.json({ success: true, data: newSocialMedia, message: 'Réseau social créé avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du réseau social' },
            { status: 500 }
          );
        }

      case 'update':
        const updateIndex = config.socialMediaLinks.findIndex(s => s.id === socialMedia.id);
        if (updateIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Réseau social non trouvé' },
            { status: 404 }
          );
        }

        config.socialMediaLinks[updateIndex] = socialMedia;
        const updateSuccess = await saveConfigAsync(config);
        
        if (updateSuccess) {
          return NextResponse.json({ success: true, data: socialMedia, message: 'Réseau social mis à jour avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour du réseau social' },
            { status: 500 }
          );
        }

      case 'delete':
        const deleteIndex = config.socialMediaLinks.findIndex(s => s.id === socialMedia.id);
        if (deleteIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Réseau social non trouvé' },
            { status: 404 }
          );
        }

        config.socialMediaLinks.splice(deleteIndex, 1);
        const deleteSuccess = await saveConfigAsync(config);
        
        if (deleteSuccess) {
          return NextResponse.json({ success: true, message: 'Réseau social supprimé avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du réseau social' },
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
    console.error('Error in social media API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}