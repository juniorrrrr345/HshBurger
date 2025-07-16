import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, Category, getNextId } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config.categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des catégories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, category } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'create':
        const newCategory: Category = {
          id: getNextId(config.categories),
          name: category.name,
          emoji: category.emoji,
          description: category.description
        };

        config.categories.push(newCategory);
        const createSuccess = await saveConfigAsync(config);
        
        if (createSuccess) {
          return NextResponse.json({ success: true, data: newCategory, message: 'Catégorie créée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la création de la catégorie' },
            { status: 500 }
          );
        }

      case 'update':
        const updateIndex = config.categories.findIndex(c => c.id === category.id);
        if (updateIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Catégorie non trouvée' },
            { status: 404 }
          );
        }

        config.categories[updateIndex] = category;
        const updateSuccess = await saveConfigAsync(config);
        
        if (updateSuccess) {
          return NextResponse.json({ success: true, data: category, message: 'Catégorie mise à jour avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour de la catégorie' },
            { status: 500 }
          );
        }

      case 'delete':
        const deleteIndex = config.categories.findIndex(c => c.id === category.id);
        if (deleteIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Catégorie non trouvée' },
            { status: 404 }
          );
        }

        // Vérifier si des produits utilisent cette catégorie
        const productsUsingCategory = config.products.filter(p => p.category === category.name);
        if (productsUsingCategory.length > 0) {
          return NextResponse.json(
            { 
              success: false, 
              error: `Impossible de supprimer cette catégorie car ${productsUsingCategory.length} produit(s) l'utilise(nt)` 
            },
            { status: 400 }
          );
        }

        config.categories.splice(deleteIndex, 1);
        const deleteSuccess = await saveConfigAsync(config);
        
        if (deleteSuccess) {
          return NextResponse.json({ success: true, message: 'Catégorie supprimée avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression de la catégorie' },
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
    console.error('Error in categories API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}