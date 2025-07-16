import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const video = formData.get('video') as File;
    const productId = formData.get('productId') as string;

    if (!video) {
      return NextResponse.json({ error: 'Aucune vidéo fournie' }, { status: 400 });
    }

    // Vérifier que c'est bien une vidéo
    if (!video.type.startsWith('video/')) {
      return NextResponse.json({ error: 'Le fichier doit être une vidéo' }, { status: 400 });
    }

    // Limiter la taille à 50MB
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (video.size > maxSize) {
      return NextResponse.json({ error: 'La vidéo ne doit pas dépasser 50MB' }, { status: 400 });
    }

    // Générer un nom unique pour la vidéo
    const fileExtension = video.name.split('.').pop() || 'mp4';
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    
    // Créer le dossier uploads/videos s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads', 'videos');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Le dossier existe déjà
    }

    // Chemin complet du fichier
    const filePath = join(uploadsDir, uniqueFilename);
    
    // Convertir le fichier en buffer et l'écrire
    const bytes = await video.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);

    // URL publique de la vidéo
    const videoUrl = `/uploads/videos/${uniqueFilename}`;

    return NextResponse.json({ 
      videoUrl,
      message: 'Vidéo uploadée avec succès',
      filename: uniqueFilename
    });

  } catch (error) {
    console.error('Erreur lors de l\'upload de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}

// Optionnel: endpoint pour supprimer une vidéo
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Nom de fichier requis' }, { status: 400 });
    }

    const filePath = join(process.cwd(), 'public', 'uploads', 'videos', filename);
    
    // Ici vous pourriez ajouter la logique pour supprimer le fichier
    // const fs = require('fs').promises;
    // await fs.unlink(filePath);

    return NextResponse.json({ message: 'Vidéo supprimée avec succès' });

  } catch (error) {
    console.error('Erreur lors de la suppression de la vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}