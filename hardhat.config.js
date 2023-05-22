require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL= process.env.GOERLI_URL
const PRIVATE_KEY= process.env.PRIVATE_KEY
module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY]
    },
  },
};
// 0x0c2d455aB62Be3856A5D2C48B5F98DE7511AE2d6
