
const hre = require("hardhat");
async function getBalances(address){
  const balancedBigInt= await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balancedBigInt)
}

async function consoleBalances(addresses){
  let counter=0;
  for(const address of addresses){
    console.log(`Address ${counter} balance:`, await getBalances(address))
  }
}
async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp= memo.timestamp;
    const name= memo.name;
    const address= memo.from;
    const message= memo.message;
    console.log(`At ${timestamp}, name ${name}, address ${address}, message ${message}`)
  }
}
// consoleMemos();
async function main() {
  const [owner, from1, from2, from3]= await hre.ethers.getSigners();
  const chai= await hre.ethers.getContractFactory("chai");
  const contract= await chai.deploy();

  await contract.deployed();
  console.log("address of contract: ", contract.address)

  const addresses= [owner.address, from1.address]
  console.log("before buying chai");
  await consoleBalances(addresses);
  const amount= {value: hre.ethers.utils.parseEther("1")}
  await contract.connect(from1).buyChai("from1", "very nice", amount)
  await contract.connect(from2).buyChai("from2", "very nice", amount)
  await contract.connect(from3).buyChai("from3", "very nice", amount)
  console.log("after buying chai");
  await consoleBalances(addresses);
  const memos = await contract.getMemos();
  consoleMemos(memos)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
