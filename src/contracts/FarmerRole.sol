// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


// Define a contract 'FarmerRole' to manage this role 
contract FarmerRole {

    mapping(address => bool) public farmers;

function  addFarmer() public {
    farmers[msg.sender] = true;
}

function  onlyFarmer()  public view {
  require(farmers[msg.sender]);
}

}