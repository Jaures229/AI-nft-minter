'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import NeoGenDashboard from '../components/NeoGenDashboard';

// Adresse de déploiement du Smart Contract
const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// ABI étendu avec les fonctions de lecture ERC721Enumerable/Standard
const CONTRACT_ABI_WITH_READ = [
  "function mintAINFT(string memory tokenURI) public returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export default function AINFTMinter() {
  // États de l'application
  const [account, setAccount] = useState('');
  const [prompt, setPrompt] = useState('');
  const [artStyle, setArtStyle] = useState('CYBERPUNK');
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  
  const [generatedImage, setGeneratedImage] = useState(null);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [userNfts, setUserNfts] = useState([]);

  // 1. Connecter le Wallet MetaMask
  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert("Veuillez installer MetaMask pour utiliser cette application.");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (error) {
      console.error("Erreur de connexion wallet :", error);
      alert("Impossible de connecter le portefeuille.");
    }
  };

  // Récupérer les NFTs possédés par l'utilisateur connecté
  const fetchUserNFTs = async (walletAddress) => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI_WITH_READ, provider);
      
      const balance = await contract.balanceOf(walletAddress);
      const targetBalance = Number(balance);
      const nfts = [];
      
      // On parcourt les tokenIds existants (en partant de 0)
      // Jusqu'à ce qu'on ait trouvé tous les NFTs appartenant à l'utilisateur
      let tokenId = 0;
      let foundCount = 0;
      
      // Sécurité : on met une boucle maximale (ex: 100 iterations) pour éviter une boucle infinie
      while (foundCount < targetBalance && tokenId < 100) {
        try {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() === walletAddress.toLowerCase()) {
            const tokenURI = await contract.tokenURI(tokenId);
            
            // Conversion de l'URI ipfs:// en URL HTTP standard
            const fixedURI = tokenURI.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
            const metadataRes = await fetch(fixedURI);
            const metadata = await metadataRes.json();
  
            const imageUrl = metadata.image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
  
            nfts.push({
              tokenId: tokenId.toString(),
              name: metadata.name,
              description: metadata.description,
              image: imageUrl
            });
  
            foundCount++;
          }
        } catch (err) {
          // Le token n'existe peut-être pas encore, on continue
        }
        tokenId++;
      }
  
      setUserNfts(nfts);
    } catch (error) {
      console.error("Erreur lors de la récupération de la galerie:", error);
    }
  };

  // Écouter les changements de compte et charger les NFTs
  useEffect(() => {
    if (account) {
      fetchUserNFTs(account);
    } else {
      setUserNfts([]);
    }

    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        setAccount(accounts[0] || '');
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        }
      };
    }
  }, [account]);

  // 2. Générer l'image via l'API Hugging Face
  const handleGenerateImage = async (e) => {
    e.preventDefault();
    if (!prompt) return alert("Veuillez entrer une description (prompt) !");

    setLoading(true);
    setStatus("🎨 Génération de l'image par l'IA en cours...");
    setGeneratedImage(null);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: `${prompt}, style ${artStyle}` }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Erreur lors de la génération');

      setGeneratedImage(data.imageUrl);
      setStatus("✨ Image générée avec succès ! Complétez les détails ci-dessous pour la minter.");
    } catch (error) {
      console.error(error);
      setStatus(`❌ Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // 3. Upload sur IPFS + Mint du NFT
  const handleMintNFT = async () => {
    if (!account) return alert("Veuillez d'abord connecter votre portefeuille MetaMask.");
    if (!generatedImage) return alert("Veuillez d'abord générer une image.");
    if (!nftName) return alert("Veuillez donner un nom à votre NFT.");

    setLoading(true);
    setStatus("📦 Option 1/2 : Envoi de l'image et métadonnées sur IPFS (Pinata)...");

    try {
      const ipfsRes = await fetch('/api/ipfs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: generatedImage,
          name: nftName,
          description: description || `Généré avec le prompt: "${prompt}"`,
        }),
      });

      const ipfsData = await ipfsRes.json();
      if (!ipfsRes.ok) throw new Error(ipfsData.error || "Erreur lors de l'upload IPFS");

      const tokenURI = ipfsData.tokenURI;
      setStatus("🚀 Option 2/2 : Validation de la transaction dans MetaMask...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI_WITH_READ, signer);

      const tx = await contract.mintAINFT(tokenURI);
      setStatus("⏳ Transaction envoyée ! Attente de la confirmation sur la blockchain...");
      
      await tx.wait();

      setStatus("🎉 Félicitations ! Votre AI NFT a été minté avec succès !");
      
      // Actualiser automatiquement la galerie après le mint
      fetchUserNFTs(account);
    } catch (error) {
      console.error(error);
      setStatus(`❌ Erreur lors du Mint: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NeoGenDashboard
      account={account}
      connectWallet={connectWallet}
      prompt={prompt}
      setPrompt={setPrompt}
      artStyle={artStyle}
      setArtStyle={setArtStyle}
      nftName={nftName}
      setNftName={setNftName}
      description={description}
      setDescription={setDescription}
      generatedImage={generatedImage}
      handleGenerateImage={handleGenerateImage}
      handleMintNFT={handleMintNFT}
      loading={loading}
      status={status}
      userNfts={userNfts}
    />
  );
}
