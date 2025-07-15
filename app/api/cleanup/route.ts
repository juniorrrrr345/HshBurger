import { NextRequest, NextResponse } from 'next/server';
import { readdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function POST(request: NextRequest) {
  try {
    const { usedUrls } = await request.json();
    
    if (!usedUrls || !Array.isArray(usedUrls)) {
      return NextResponse.json({ error: 'URLs utilisées non fournies' }, { status: 400 });
    }

    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      return NextResponse.json({ message: 'Dossier uploads inexistant' });
    }

    const files = await readdir(uploadsDir);
    let deletedCount = 0;

    for (const file of files) {
      if (file === '.gitkeep') continue;
      
      const fileUrl = `/uploads/${file}`;
      const isUsed = usedUrls.some((url: string) => url === fileUrl);
      
      if (!isUsed) {
        try {
          await unlink(join(uploadsDir, file));
          deletedCount++;
        } catch (error) {
          console.error(`Erreur lors de la suppression de ${file}:`, error);
        }
      }
    }

    return NextResponse.json({ 
      success: true, 
      deletedCount,
      message: `${deletedCount} fichier(s) supprimé(s)`
    });

  } catch (error) {
    console.error('Erreur lors du nettoyage:', error);
    return NextResponse.json({ error: 'Erreur lors du nettoyage' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: 'API Cleanup active' });
}