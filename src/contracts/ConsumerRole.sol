// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;


// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {


    mapping(address => bool) public consumers;

function  addConsumer() public {
    consumers[msg.sender] = true;
}

// function  onlyConsumer()  public {
//   require(consumers[msg.sender]);
//   _;
// }

}