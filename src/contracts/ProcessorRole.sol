// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


// Define a contract 'ProcessorRole' to manage this role 
contract ProcessorRole {

    mapping(address => bool) public processors;

function  addProcessor() public {
    processors[msg.sender] = true;
}

function  onlyProcessor()  public view {
  require(processors[msg.sender]);
}

}