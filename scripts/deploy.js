const hre = require("hardhat");

async function main() {
  // Récupérer le compte qui déploie (le premier compte configuré dans Hardhat)
  const [deployer] = await hre.ethers.getSigners();
  console.log("Déploiement des contrats avec le compte :", deployer.address);

  // Récupérer la factory du contrat AINFT
  const AINFT = await hre.ethers.getContractFactory("AINFT");

  // Déployer le contrat en passant l'adresse du deployer comme initialOwner
  console.log("Déploiement en cours...");
  const ainfT = await AINFT.deploy(deployer.address);

  // Attendre que le déploiement soit totalement terminé
  await ainfT.waitForDeployment();

  const address = await ainfT.getAddress();
  console.log(`AINFT déployé avec succès à l'adresse : ${address}`);
}

main().catch((error) => {
  console.error("Erreur lors du déploiement :", error);
  process.exitCode = 1;
});
