import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { imageBase64, name, description } = await request.json();

    if (!imageBase64 || !name) {
      return NextResponse.json({ error: "Données manquantes (image ou nom)" }, { status: 400 });
    }

    // 1. Convertir l'image Base64 en Buffer brut
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, 'base64');

    // 2. Préparer l'envoi de l'image sur Pinata
    const formData = new FormData();
    const blob = new Blob([buffer], { type: 'image/jpeg' });
    formData.append('file', blob, 'nft-image.jpg');

    const pinataFileRes = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: formData,
    });

    const fileData = await pinataFileRes.json();
    if (!pinataFileRes.ok) {
      throw new Error(fileData.error || "Erreur lors de l'upload de l'image sur Pinata");
    }

    const imageIpfsHash = fileData.IpfsHash;
    const imageUrl = `https://gateway.pinata.cloud/ipfs/${imageIpfsHash}`;

    // 3. Créer et uploader le fichier JSON de métadonnées sur Pinata
    const metadata = {
      name: name,
      description: description,
      image: imageUrl,
    };

    const pinataJsonRes = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: JSON.stringify(metadata),
    });

    const jsonData = await pinataJsonRes.json();
    if (!pinataJsonRes.ok) {
      throw new Error(jsonData.error || "Erreur lors de l'upload des métadonnées sur Pinata");
    }

    const tokenURI = `https://gateway.pinata.cloud/ipfs/${jsonData.IpfsHash}`;

    return NextResponse.json({ tokenURI });
  } catch (error) {
    console.error("Erreur serveur /api/ipfs:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
