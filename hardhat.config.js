require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.24",
    settings: {
      evmVersion: "cancun", // 👈 Force la prise en charge de l'instruction mcopy
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    // Le réseau local Hardhat
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    }
  }
};
