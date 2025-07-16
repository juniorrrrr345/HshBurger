import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, Farm, getNextId } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config.farms });
  } catch (error) {
    console.error('Error fetching farms:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des fermes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, farm } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'create':
        const newFarm: Farm = {
          id: getNextId(config.farms),
          name: farm.name,
          emoji: farm.emoji,
          description: farm.description
        };

        config.farms.push(newFarm);
        const createSuccess = await saveConfigAsync(config);
        
        if (createSuccess) {
          return NextResponse.json({ success: true, data: newFarm, message: 'Ferme créée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de la ferme' },
            { status: 500 }
          );
        }

      case 'update':
        const updateIndex = config.farms.findIndex(f => f.id === farm.id);
        if (updateIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Ferme non trouvée' },
            { status: 404 }
          );
        }

        config.farms[updateIndex] = farm;
        const updateSuccess = await saveConfigAsync(config);
        
        if (updateSuccess) {
          return NextResponse.json({ success: true, data: farm, message: 'Ferme mise à jour avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour de la ferme' },
            { status: 500 }
          );
        }

      case 'delete':
        const deleteIndex = config.farms.findIndex(f => f.id === farm.id);
        if (deleteIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Ferme non trouvée' },
            { status: 404 }
          );
        }

        // Vérifier si des produits utilisent cette ferme
        const productsUsingFarm = config.products.filter(p => p.farm === farm.name);
        if (productsUsingFarm.length > 0) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Impossible de supprimer cette ferme car ${productsUsingFarm.length} produit(s) l'utilise(nt)` 
            },
            { status: 400 }
          );
        }

        config.farms.splice(deleteIndex, 1);
        const deleteSuccess = await saveConfigAsync(config);
        
        if (deleteSuccess) {
          return NextResponse.json({ success: true, message: 'Ferme supprimée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression de la ferme' },
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
    console.error('Error in farms API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}