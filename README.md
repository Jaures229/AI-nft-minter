# 🚀 NeoGen AI NFT Minter

> A modern Web3 application with a neo-brutalist design that allows users to generate unique AI artwork, store metadata decentrally on IPFS (via Pinata), and mint them as NFTs (ERC-721) on the Ethereum blockchain (Sepolia).

---

## 📜 Smart Contract Information

The smart contract is already deployed and live on the **Sepolia Testnet**. You can check the code and transactions directly on Etherscan:

* **Network:** Ethereum Sepolia Testnet
* **Contract Address:** `0x65814b79C088aF2052C5D518e53D9655C8d89bE8`
* **Etherscan Link:** [View on Sepolia Etherscan](https://sepolia.etherscan.io/address/0x65814b79C088aF2052C5D518e53D9655C8d89bE8)

---

## 🌟 Key Features

* **AI Image Generation:** Instant creation of artistic images powered by Pollinations.ai (Flux model).
* **Decentralized Storage:** Automatic upload of images and JSON metadata to IPFS using **Pinata**.
* **ERC-721 Smart Contract:** Standard NFT implementation with owner tracking, metadata support, and royalties (ERC-2981).
* **Connected Personal Gallery:** Automatic detection and display of all NFTs owned by the connected wallet.
* **Blockchain Traceability:** Direct links to Etherscan for verifying individual tokens and sharing options on social media.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (App Router), ReactJS, Tailwind CSS (Neo-brutalist UI).
* **Web3:** Ethers.js, MetaMask.
* **Storage:** IPFS via Pinata API.
* **AI:** Pollinations.ai.

---

## 📦 Setup and Configuration Guide

To run this application locally and connect it to the deployed contract, follow these steps:

### 1. Clone the repository and install dependencies

Open your terminal and run:

```bash
git clone <your-repository-url>
cd AI-nft-minter
npm install

```

### 2. Configure Pinata API Keys & Permissions

To allow the app to upload generated images and metadata to IPFS, you need a free Pinata account.

1. Go to your [Pinata API Keys Dashboard](https://app.pinata.cloud/developers/api-keys).
2. Click on **"New Key"**.
3. Give your key a name (e.g., `NeoGen Minter`).
4. **Configure the required permissions (Scopes):**
* **V3 Resources / Files:** Select `Write` (this allows uploading images and JSON metadata files).
* **Legacy Endpoints (Pinning):** Enable all pinning permissions (`pinFileToIPFS` / `pinJSONToIPFS`).


5. Click **Create Key** and copy your `Pinata API Key` and `Pinata Secret API Key`.

### 3. Configure environment variables (`.env`)

At the root of your project, create a file named **`.env`** and paste your Pinata keys:

```env
PINATA_JWT="your_pinata_JWT"

```

### 4. Running the Application

Depending on what you want to do, use the following commands:

* **Development Mode** (with hot-reloading for editing code):
```bash
npm run dev

```


Open [http://localhost:3000](http://localhost:3000) in your browser.
* **Production Build** (to compile the app properly using Next.js):
```bash
npm run build

```


* **Production Server** (to run the compiled app locally):
```bash
npm run start

```



---

## 🎮 How to Use

1. **Connect Wallet:** Click the connect button to link your MetaMask wallet. Make sure your wallet is switched to the **Sepolia Testnet** and that you have a little Sepolia ETH for gas fees (available via free faucets).
2. **Generate Image:** Type a description (prompt) of your choice, pick an art style, and click **Generate**.
3. **Mint NFT:** Fill in a name and description for your creation, then click the **Mint** button.
* *Behind the scenes:* The app packages your image, pushes it to IPFS via Pinata using your scoped permissions, retrieves the token URI, and triggers MetaMask to sign the transaction.


4. **Explore:** View your generated creations in your personal gallery at the bottom of the page and click **EXPLORER** to check your token on Etherscan!

---

## 📄 License

This project is open-source and free to use for educational and demonstration purposes.
