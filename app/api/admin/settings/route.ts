import { NextRequest, NextResponse } from 'next/server';
import { getConfigAsync, saveConfigAsync, SiteConfig } from '../../../../lib/config';

export async function GET() {
  try {
    const config = await getConfigAsync();
    return NextResponse.json({
      success: true,
      data: {
        shopInfo: config.shopInfo,
        contactInfo: config.contactInfo,
        adminSettings: config.adminSettings,
        pageContent: config.pageContent
      }
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du chargement des paramètres' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, section, data } = body;
    const config = await getConfigAsync();

    switch (action) {
      case 'updateShopInfo':
        config.shopInfo = { ...config.shopInfo, ...data };
        break;

      case 'updateContactInfo':
        config.contactInfo = { ...config.contactInfo, ...data };
        break;

      case 'updateAdminSettings':
        config.adminSettings = { ...config.adminSettings, ...data };
        break;

      case 'updatePageContent':
        if (section && config.pageContent[section as keyof typeof config.pageContent]) {
          config.pageContent[section as keyof typeof config.pageContent] = {
            ...config.pageContent[section as keyof typeof config.pageContent],
            ...data
          };
        } else {
          return NextResponse.json(
            { success: false, error: 'Section de contenu invalide' },
            { status: 400 }
          );
        }
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Action non reconnue' },
          { status: 400 }
        );
    }

    const saveSuccess = await saveConfigAsync(config);
    
    if (saveSuccess) {
      return NextResponse.json({ 
        success: true, 
        message: 'Paramètres mis à jour avec succès',
        data: {
          shopInfo: config.shopInfo,
          contactInfo: config.contactInfo,
          adminSettings: config.adminSettings,
          pageContent: config.pageContent
        }
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Erreur lors de la sauvegarde des paramètres' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in settings API:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}