"use client";

import { useState } from "react";

const ART_STYLES = ["ANIME", "CYBERPUNK", "3D RENDER"];

const DEFAULT_PREVIEW =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCH_aYe7z8OTd1LIQMcwRxAl32y3D3GH0dc46AFKYalphit6131ahkl47Hm5rmn_95L7XzOcIIlhGC4tvbIgnuvFREdbjLjLcRxuQ6K2eZw90bXVC-bHU_y4kRa3f5Chu8kKag-_TJEDvsKK1_YLQPVwdV0A5rddOKuYoB968wN4NfJBXLc_-9qzBWVSNpRRBTlTY4lE6FEozID-8XFToQFSpZyNkQU-3mezZDCBv9FH0uuSBxR31k_BA";

function ArtStyleButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "bg-secondary-fixed border-4 border-on-background px-4 py-2 font-label-sm text-label-sm neo-shadow transition-all"
          : "bg-surface-container-lowest border-4 border-on-background px-4 py-2 font-label-sm text-label-sm hover:bg-surface-container-highest neo-shadow neo-shadow-hover neo-shadow-active transition-all"
      }
    >
      {label}
    </button>
  );
}

export default function NeoGenDashboard({
  account,
  connectWallet,
  prompt,
  setPrompt,
  artStyle,
  setArtStyle,
  nftName,
  setNftName,
  description,
  setDescription,
  generatedImage,
  handleGenerateImage,
  handleMintNFT,
  loading,
  status,
  userNfts = []
}) {
  return (
    <div className="text-on-surface antialiased selection:bg-secondary-fixed selection:text-on-secondary-fixed min-h-screen flex flex-col bg-primary-container">
      {/* TopNavBar */}
      <nav className="flex justify-between items-center px-8 py-4 w-full sticky top-0 z-50 bg-surface border-b-4 border-on-background shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-4">
          <span className="font-display-lg text-headline-md uppercase tracking-tighter text-on-background">
            NEO-GEN AI
          </span>
        </div>
        <div>
          <button
            type="button"
            onClick={connectWallet}
            className="bg-secondary-fixed border-4 border-on-background px-6 py-3 font-headline-md text-sm neo-shadow neo-shadow-hover neo-shadow-active transition-all cursor-pointer"
          >
            {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connect Wallet"}
          </button>
        </div>
      </nav>

      {/* Marquee Ticker */}
      <div className="w-full bg-secondary-fixed border-b-4 border-on-background py-2 overflow-hidden whitespace-nowrap relative flex">
        <div className="animate-marquee inline-block font-label-sm text-label-sm uppercase tracking-widest text-on-background">
          {Array.from({ length: 8 }).map((_, i) => (
            <span className="mx-4" key={i}>
              LIVE MINTING • SECURE • AI DRIVEN • NO GAS FEES •
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Canvas */}
      <main className="flex-grow max-w-[1280px] mx-auto w-full px-8 py-12 flex flex-col gap-24 relative z-10">
        
        {/* Affichage des status / messages d'erreur */}
        {status && (
          <div className="bg-surface-container-lowest border-4 border-on-background p-4 font-data-mono text-sm neo-shadow">
            {status}
          </div>
        )}

        {/* Hero Split Layout */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Creator Form */}
          <div className="flex flex-col gap-6">
            <h1 className="font-display-lg text-6xl text-surface-container-lowest leading-none">
              BUILT FOR
              <br />
              CREATORS.
            </h1>
            <div className="bg-surface-container-lowest border-4 border-on-background p-6 neo-shadow flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm uppercase">
                  AI Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-surface-container-lowest border-4 border-on-background p-4 font-data-mono text-data-mono h-32 focus:outline-none focus:bg-surface-container-highest neo-shadow resize-none"
                  placeholder="Describe your masterpiece..."
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-sm text-label-sm uppercase">
                  Art Style
                </label>
                <div className="flex flex-wrap gap-4">
                  {ART_STYLES.map((style) => (
                    <ArtStyleButton
                      key={style}
                      label={style}
                      active={artStyle === style}
                      onClick={() => setArtStyle(style)}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm uppercase">
                    NFT Name
                  </label>
                  <input
                    type="text"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                    className="w-full bg-surface-container-lowest border-4 border-on-background p-3 font-data-mono text-data-mono focus:outline-none focus:bg-surface-container-highest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="CryptoPunk #42069"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-sm text-label-sm uppercase">
                    Description
                  </label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-surface-container-lowest border-4 border-on-background p-3 font-data-mono text-data-mono focus:outline-none focus:bg-surface-container-highest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    placeholder="A rare digital artifact."
                  />
                </div>
              </div>

              {/* Bouton de génération */}
              <button
                type="button"
                onClick={handleGenerateImage}
                disabled={loading}
                className="w-full bg-surface-container-highest border-4 border-on-background py-3 font-headline-md text-md uppercase neo-shadow transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "GÉNÉRATION..." : "1. GÉNÉRER L'IMAGE AI"}
              </button>

              {/* Bouton de mint */}
              <button
                type="button"
                onClick={handleMintNFT}
                disabled={loading}
                className="w-full bg-secondary-fixed border-4 border-on-background py-4 font-headline-md text-headline-md uppercase neo-shadow neo-shadow-hover neo-shadow-active transition-all cursor-pointer disabled:opacity-50"
              >
                {loading ? "TRAITEMENT..." : "2. MINT SUR LA BLOCKCHAIN"}
              </button>
            </div>
          </div>

          {/* Right Side: Preview OS Window */}
          <div className="flex flex-col justify-start">
            <div className="bg-surface-container-lowest border-4 border-on-background neo-shadow flex flex-col h-full min-h-[500px]">
              
              <div className="bg-surface-container-highest border-b-4 border-on-background px-4 py-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-on-background bg-error" />
                  <div className="w-4 h-4 rounded-full border-2 border-on-background bg-secondary-fixed" />
                  <div className="w-4 h-4 rounded-full border-2 border-on-background bg-secondary" />
                </div>
                <span className="font-label-sm text-label-sm uppercase">
                  PREVIEW.EXE
                </span>
                <div className="w-8" />
              </div>

              <div className="flex-grow p-6 flex flex-col items-center justify-center bg-surface-dim border-b-4 border-on-background relative overflow-hidden">
                <div
                  role="img"
                  aria-label="Aperçu de l'image générée par l'IA"
                  className="w-full h-full min-h-[300px] bg-cover bg-center border-4 border-on-background shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  style={{ backgroundImage: `url('${generatedImage || DEFAULT_PREVIEW}')` }}
                />
              </div>

              <div className="p-6 bg-surface-container-lowest flex justify-between items-center">
                <div className="flex gap-4">
                  <button
                    type="button"
                    aria-label="Share on X"
                    className="bg-surface-container-highest border-4 border-on-background p-2 neo-shadow transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined">share</span>
                  </button>
                </div>
                <a
                  className="font-label-sm text-label-sm uppercase underline decoration-4 underline-offset-4 hover:text-primary-container transition-colors"
                  href="#"
                >
                  VIEW ON OPENSEA
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* My NFT Gallery Section */}
      {account && (
          <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-6 md:gap-8 mt-12">
            <h2 className="font-headline-lg text-2xl md:text-headline-lg text-surface-container-lowest uppercase border-b-4 border-surface-container-lowest pb-4">
              MY GENERATED NFTS ({userNfts.length})
            </h2>
            
            {userNfts.length === 0 ? (
              <div className="bg-surface-container-lowest border-4 border-on-background p-6 font-data-mono text-center neo-shadow mb-8 mx-2">
                Aucun NFT trouvé pour ce portefeuille. Générez et mintez votre premier NFT ci-dessus !
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 pb-12 pr-4 w-full">
                {/* pr-4 (padding-right) empêche l'ombre neo-brutaliste (8px) de déborder de l'écran sur mobile */}
                {userNfts.map((nft, index) => {
                  const contractAddress = "0x65814b79C088aF2052C5D518e53D9655C8d89bE8";
                  
                  // URL vers Rarible Testnet
                  // Remplacez l'URL Rarible par l'URL Sepolia Etherscan (page du token spécifique)
                  const explorerUrl = `https://sepolia.etherscan.io/token/${contractAddress}?a=${nft.tokenId}`;
                  
                  // Texte de partage avec le lien Rarible
                  const shareText = encodeURIComponent(`Je viens de générer et minter "${nft.name}" sur la blockchain avec NeoGen AI ! 🎨✨\n\nRegardez mon NFT ici : ${explorerUrl}\n\n#Web3 #AINFT #NeoGen`);
                  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}`;

                  return (
                    <div
                      key={index}
                      className="bg-surface-container-lowest border-4 border-on-background neo-shadow flex flex-col"
                    >
                      <div className="h-48 md:h-56 border-b-4 border-on-background overflow-hidden relative group">
                        <img
                          src={nft.image}
                          alt={nft.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-2 right-2 bg-on-background text-surface-container-lowest font-data-mono text-xs px-2 py-1 font-bold">
                          #{nft.tokenId}
                        </div>
                      </div>
                      
                      <div className="p-4 flex flex-col gap-2 bg-surface-container-lowest flex-grow">
                        <h3 className="font-headline-md text-lg md:text-xl truncate" title={nft.name}>
                          {nft.name}
                        </h3>
                        <p className="font-data-mono text-xs text-on-surface line-clamp-2" title={nft.description}>
                          {nft.description}
                        </p>
                      </div>

                      <div className="p-4 border-t-4 border-on-background bg-surface-container flex flex-col xl:flex-row gap-2">
                        <a
                          href={explorerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-primary text-on-primary border-2 border-on-background text-center py-2 font-data-mono text-xs font-bold hover:bg-on-background hover:text-primary transition-colors whitespace-nowrap"
                        >
                          🔍 EXPLORER
                        </a>
                        <a
                          href={twitterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 bg-secondary text-on-secondary border-2 border-on-background text-center py-2 font-data-mono text-xs font-bold hover:bg-on-background hover:text-secondary transition-colors whitespace-nowrap"
                        >
                          🐦 SHARE
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

      <footer className="w-full py-12 px-margin flex flex-col md:flex-row justify-between items-center gap-8 mt-24 bg-on-background border-t-4 border-on-background">
        <span className="font-headline-md text-secondary">NEO-GEN AI</span>
        <div className="flex flex-wrap gap-6 justify-center">
          <a
            className="font-label-sm text-label-sm text-background hover:text-secondary-fixed transition-colors uppercase"
            href="#"
          >
            Documentation
          </a>
          <a
            className="font-label-sm text-label-sm text-background hover:text-secondary-fixed transition-colors uppercase"
            href="#"
          >
            Smart Contract
          </a>
          <a
            className="font-label-sm text-label-sm text-background hover:text-secondary-fixed transition-colors uppercase"
            href="#"
          >
            Terms of Chaos
          </a>
          <a
            className="font-label-sm text-label-sm text-background hover:text-secondary-fixed transition-colors uppercase"
            href="#"
          >
            Privacy Leak
          </a>
        </div>
        <span className="font-body-md text-body-md text-secondary">
          ©2026 NEO-GEN PROTOCOL. NO RIGHTS RESERVED.
        </span>
      </footer>
    </div>
  );
}
