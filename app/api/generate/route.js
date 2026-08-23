import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Le prompt est vide" }, { status: 400 });
    }

    // Utilisation d'un générateur direct par URL (gratuit et sans clé API complexe)
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=1024&nologo=true`;

    // On vérifie que l'image répond bien
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      throw new Error("Erreur lors de la génération de l'image");
    }

    // Convertir l'image en Base64 pour votre frontend
    const arrayBuffer = await imageRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = `data:image/jpeg;base64,${buffer.toString("base64")}`;

    return NextResponse.json({ imageUrl: base64Image });
  } catch (error) {
    console.error("Erreur serveur /api/generate:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
