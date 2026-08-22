const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("AINFTMinter Contract", function () {
  let minterContract;
  let owner;
  let user;

  beforeEach(async function () {
    // Récupérer des comptes de test simulés
    [owner, user] = await ethers.getSigners();

    // Déployer le contrat sur le réseau local Hardhat
    const AINFTMinter = await ethers.getContractFactory("AINFTMinter");
    minterContract = await AINFTMinter.deploy();
    await minterContract.waitForDeployment();
  });

  it("Devrait minter un NFT avec succès et lui attribuer un TokenURI", async function () {
    const fakeTokenURI = "ipfs://QmTest123456789";

    // L'utilisateur 'user' appelle la fonction mint
    const tx = await minterContract.connect(user).mintAINFT(fakeTokenURI);
    await tx.wait();

    // Vérifier que le propriétaire du Token ID 0 est bien 'user'
    expect(await minterContract.ownerOf(0)).to.equal(user.address);

    // Vérifier que le TokenURI enregistré est correct
    expect(await minterContract.tokenURI(0)).to.equal(fakeTokenURI);
  });
});
