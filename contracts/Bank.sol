// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/utils/Address.sol";
contract Bank {
    using Address for address payable;

    mapping(address => uint256) public balanceOf;

    function deposit() external payable{
        balanceOf[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 depositedAmount = balanceOf[msg.sender];
        // this can also be used
        payable(msg.sender).sendValue(depositedAmount);
        // this can also be used
        // (bool sent , ) = msg.sender.call{value:depositedAmount}("");
        // require(sent,"failed to send Ether");
        balanceOf[msg.sender] = 0;
    }
}