"use client";

import { useState } from "react";

const ART_STYLES = ["ANIME", "CYBERPUNK", "3D RENDER"];

const TRENDING_COLLECTIONS = [
  {
    name: "VOID WALKERS",
    volume: "4.2k ETH",
    change: "+12%",
    changeClass: "text-secondary-fixed-dim bg-on-background",
    cardBg: "bg-surface-container-lowest",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDqhEem0Y1l9BChuCUfe9cgh-qGVi2kdjLSsoqh1scC8zF65neWnH_t5FkkWmnd_FBqUik_DPE0vqMpxc8DOPVYWJIRxhVG2IgZYtWSF6Opo6u3_5KkKY2kec8yxItJl8vjkTe7scdwbrz7HY82Hz1Uz9rIyvnsU-0vrwOrK8a8BxGWfIF0oPNLGycqP7Y4OlAFV9tZeTloEuoe_M4MVyoVkDWz2PK7GovcqtMIFy2efWuUAGuhUP4_A",
  },
  {
    name: "NEO-PETS",
    volume: "2.1k ETH",
    change: "+5%",
    changeClass: "bg-on-background text-secondary-fixed",
    cardBg: "bg-secondary-fixed",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAyYLwZSbrq96-p1N_Hp7DC4r0Zt83Qsn-UsBwwka_eiCilSK09o_h6mGleUuoELTmvpMYgy1wWb3xkbjO5Rwv79z7da9o-3Yfhux3DQ28v9ylCBDA4NyJyNM7fP8w-47GHzste3SddkXpCdMffWASZKsEQfcsUItSIWErIXxpRvBmmmg79eB7cqwOJnS_l6u4EWY6StM0MHG5CNNhOyKH5-ds0_tn_nVMwhas3BWphg2jNv0d_yMgbUg",
  },
  {
    name: "SYNTAX ERRORS",
    volume: "8.9k ETH",
    change: "+42%",
    changeClass: "text-secondary-fixed-dim bg-on-background",
    cardBg: "bg-surface-container-lowest",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdvyAb_cUGa9isAg9bse3j2pt8EQf11Haru_yjjBoa6oB-0MJwvY2AiyPGopfcayQ_lx_i3znnDI27e-lZ97NPOpdFt3WngDDGjt0nhX4Nt4zKn6xrHBpmy_Bn6e_GYlHU-EaGhsRTuVcq6fdIJ3D_5DOYtjolXR_yXTz_EQhX3dr_hd6jaA89Ns66_Z2PBFE9rq5Cfw7xMF7DgoCS8frE0aRsbe_LocVCFdyal3VBC1CfrL-Hhw9aKw",
  },
  {
    name: "DATA MONOLITHS",
    volume: "1.2k ETH",
    change: "-2%",
    changeClass: "text-error bg-on-background",
    cardBg: "bg-surface-container-lowest",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo_MhD1fYMZA39FGMXMe96WhlJ2P4sKnNUuZMoxiKsJv_H0C3phgoU-nwwNGW_1qaE-1uf_gFMB7p6HGetfWN8gC6dLEqz7hWng5AnoYBrNQsY8_akfOqYIC6buiERTD4Z5mrrdB7c29sIQNT6G_aZSQ0z7feQw9JFtDkqeiIPT3-Re6QPUicbT924rMF1jW_TnjXroohX9SgF_mO0yfFcRnP_LwTZTEcTMMHmDjdTYB6fnXtRAjhbgA",
  },
];

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
    <section className="flex flex-col gap-8 mt-12">
        <h2 className="font-headline-lg text-headline-lg text-surface-container-lowest uppercase border-b-4 border-surface-container-lowest pb-4">
        MY GENERATED NFTS ({userNfts.length})
        </h2>
        {userNfts.length === 0 ? (
        <div className="bg-surface-container-lowest border-4 border-on-background p-6 font-data-mono text-center neo-shadow">
            Aucun NFT trouvé pour ce portefeuille. Générez et minté votre premier NFT ci-dessus !
        </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
            {userNfts.map((nft, index) => (
            <div
                key={index}
                className="bg-surface-container-lowest border-4 border-on-background neo-shadow flex flex-col"
            >
                <div className="h-48 border-b-4 border-on-background overflow-hidden">
                <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                />
                </div>
                <div className="p-4 flex flex-col gap-2 bg-surface-container-lowest">
                <h3 className="font-headline-md text-headline-md truncate">
                    {nft.name}
                </h3>
                <p className="font-data-mono text-xs text-on-surface truncate">
                    {nft.description}
                </p>
                <span className="font-data-mono text-xs font-bold text-primary-container mt-2">
                    Token ID: #{nft.tokenId}
                </span>
                </div>
            </div>
            ))}
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
          ©2024 NEO-GEN PROTOCOL. NO RIGHTS RESERVED.
        </span>
      </footer>
    </div>
  );
}
