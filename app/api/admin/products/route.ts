import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, Product, getNextId } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({ success: true, data: config.products });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des produits' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, product } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'create':
        const newProduct: Product = {
          id: getNextId(config.products),
          name: product.name,
          description: product.description,
          image: product.image,
          images: product.images || [],
          video: product.video || '',
          category: product.category,
          variants: product.variants || [{ name: '', price: 0, size: '' }],
          orderLink: product.orderLink,
          popular: product.popular || false,
          farm: product.farm
        };

        config.products.push(newProduct);
        const createSuccess = await saveConfigAsync(config);
        
        if (createSuccess) {
          return NextResponse.json({ success: true, data: newProduct, message: 'Produit créé avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la création du produit' },
            { status: 500 }
          );
        }

      case 'update':
        const updateIndex = config.products.findIndex(p => p.id === product.id);
        if (updateIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Produit non trouvé' },
            { status: 404 }
          );
        }

        config.products[updateIndex] = product;
        const updateSuccess = await saveConfigAsync(config);
        
        if (updateSuccess) {
          return NextResponse.json({ success: true, data: product, message: 'Produit mis à jour avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la mise à jour du produit' },
            { status: 500 }
          );
        }

      case 'delete':
        const deleteIndex = config.products.findIndex(p => p.id === product.id);
        if (deleteIndex === -1) {
          return NextResponse.json(
            { success: false, error: 'Produit non trouvé' },
            { status: 404 }
          );
        }

        config.products.splice(deleteIndex, 1);
        const deleteSuccess = await saveConfigAsync(config);
        
        if (deleteSuccess) {
          return NextResponse.json({ success: true, message: 'Produit supprimé avec succès' });
        } else {
          return NextResponse.json(
            { success: false, error: 'Erreur lors de la suppression du produit' },
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
    console.error('Error in products API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}