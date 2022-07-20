const { expect } = require("chai");
const { ethers } = require("hardhat");
const {loadFixture} = require("@nomicfoundation/hardhat-network-helpers");

describe("Deploy contracts",()=>{
    
    let deployer, user, attacker;
    beforeEach(async function () {
        [deployer, user, attacker] = await ethers.getSigners();
    
        const BankFactory = await ethers.getContractFactory("Bank", deployer);
         bankContract = await BankFactory.deploy();
    
        await bankContract.deposit({ value: ethers.utils.parseEther("5") });
        await bankContract.connect(user).deposit({ value: ethers.utils.parseEther("5") });
    
        const AttackerFactory = await ethers.getContractFactory("Attacker", attacker);
         attackerContract = await AttackerFactory.deploy(bankContract.address);
         await attackerContract.deployed();
      });
    describe("Test deposit and widthdraw of Bank Contract",async()=>{
        it("Should accept deposits",async()=>{
            // console.log(deployer.address);
            const deployerbalance = await bankContract.balanceOf(deployer.address)
            // console.log(deployerbalance.toString());
           expect(deployerbalance.toString()).to.be.equal(ethers.utils.parseEther("5"));
           const userbalance = await bankContract.balanceOf(user.address);
           expect(userbalance.toString()).to.be.equal(ethers.utils.parseEther("5"));
        })
    })
        it("Should accept withdrawls",async()=>{
            await bankContract.withdraw();
            const deployerbalance = await bankContract.balanceOf(deployer.address);
            const userbalance = await bankContract.balanceOf(user.address);
            expect(deployerbalance.toString()).to.be.equal(ethers.utils.parseEther("0"))
            expect(userbalance.toString()).to.be.equal(ethers.utils.parseEther("5"));
        })

        it("Perfrom Attack", async()=>{
           console.log("");
           console.log("*** Before Attack ***");
           console.log(`BANK Balance ${(await ethers.provider.getBalance(bankContract.address)).toString()}`);
           console.log(`ATTACKER Balance ${(await ethers.provider.getBalance(attacker.address)).toString()}`);
        //    console.log(await attackerContract.attack({value :100}));
           await attackerContract.attack({ value: ethers.utils.parseEther("10")})
           console.log("");
           console.log("*** After Attack***");
           console.log(`BANK Balance ${(await ethers.provider.getBalance(bankContract.address)).toString()}`);
           console.log(`ATTACKER Balance ${(await ethers.provider.getBalance(attacker.address)).toString()}`);
           console.log("");
     
        //    expect(await ethers.provider.getBalance(bankContract.address)).to.be.equal(0);
        })
})