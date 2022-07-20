require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.14",
  networks:{
    ganache:{
      url:'HTTP://127.0.0.1:7545',
      // chainId:5777,
    }
  }
};
