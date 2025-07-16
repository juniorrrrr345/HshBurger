import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, Page, getNextId } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config.pages });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des pages' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, page } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'create':
        const newPage: Page = {
          id: getNextId(config.pages),
          name: page.name,
          href: page.href,
          isDefault: page.isDefault || false
        };

        config.pages.push(newPage);
        const createSuccess = await saveConfigAsync(config);
        
        if (createSuccess) {
          return NextResponse.json({ success: true, data: newPage, message: 'Page créée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de la page' },
            { status: 500 }
          );
        }

      case 'update':
        const updateIndex = config.pages.findIndex(p => p.id === page.id);
        if (updateIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Page non trouvée' },
            { status: 404 }
          );
        }

        config.pages[updateIndex] = page;
        const updateSuccess = await saveConfigAsync(config);
        
        if (updateSuccess) {
          return NextResponse.json({ success: true, data: page, message: 'Page mise à jour avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour de la page' },
            { status: 500 }
          );
        }

      case 'delete':
        const deleteIndex = config.pages.findIndex(p => p.id === page.id);
        if (deleteIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Page non trouvée' },
            { status: 404 }
          );
        }

        // Empêcher la suppression des pages par défaut
        if (page.isDefault) {
          return NextResponse.json(
            { success: false, error: 'Impossible de supprimer une page par défaut' },
            { status: 400 }
          );
        }

        config.pages.splice(deleteIndex, 1);
        const deleteSuccess = await saveConfigAsync(config);
        
        if (deleteSuccess) {
          return NextResponse.json({ success: true, message: 'Page supprimée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression de la page' },
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
    console.error('Error in pages API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}