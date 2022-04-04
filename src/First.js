import React, { Component, useState, useEffect } from 'react';
import { Outlet, Link } from "react-router-dom";
import Web3 from 'web3'
import Navbar from './Navbar'
import ConsumerRole from './abis/ConsumerRole.json'


import "tabler-react/dist/Tabler.css";
import { Card, Button } from "tabler-react";
import './bootstrapCSS.css';

function First (props) {

  const [account, setAccount] = useState(0);

async function getRole(event){
  event.preventDefault();

  const web3 = window.web3
  // Load account
  const accounts = await web3.eth.getAccounts()
  setAccount(accounts[0]);
  const networkId = await web3.eth.net.getId()
  const networkData = ConsumerRole.networks[networkId]
  if(networkData) {
    const place = new web3.eth.Contract(ConsumerRole.abi, networkData.address)
    place.methods.addConsumer().send({from : accounts[0]})
    const p = await place.methods.consumers("0x04deBc1e733eFb99fc6730bBdc026B88d6216a2F").call();
}
}

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    await window.ethereum.enable()
  }
  else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
  }
  else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
  }
}

window.ethereum.on('accountsChanged', function (accounts) {
  // Time to reload your interface with accounts[0]!
  setAccount(accounts[0])
})

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    loadWeb3();
    //loadBlockchainData();
  }, []);


    return (
      
<div id="container">
         <Navbar  />
<div className='row' >
  <Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Farmer</Card.Title>
  </Card.Header>
  <Card.Body>
    Farmer account page. Place your crop yields on the market.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
        <Link to="/farmer" style={{color:"white"}}> Farmer Account</Link>
      </Button>
  </Card.Footer>
</Card>
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Investor</Card.Title>
  </Card.Header>
  <Card.Body>
    Invest ETH into a particular farmer's crop. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/investment" style={{color:"white"}}> Invest </Link>
      </Button>
  </Card.Footer>
</Card>
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Processor</Card.Title>
    <Card.Options>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Processor account page. Buy yielded crops from a farmer and set products for sale on the market. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/processor" style={{color:"white"}}> Processor</Link>
      </Button>
  </Card.Footer>
</Card>
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Customer</Card.Title>
  </Card.Header>
  <Card.Body>
    Buy finished products from the market. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/customer" style={{color:"white"}}> Go to Market</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Create Insurance</Card.Title>
  </Card.Header>
  <Card.Body>
    Create risk insurance plans as an insurance company.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/insuranceCompany" style={{color:"white"}}> Create insurance</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Insurance Management</Card.Title>
  </Card.Header>
  <Card.Body>
    Manage inurance payouts to farmers.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/insuranceManagement" style={{color:"white"}}> Manage Insurance</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Buy Insurance</Card.Title>
  </Card.Header>
  <Card.Body>
    Buy disaster and risk insurance plans as a farmer. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/buyInsurance" style={{color:"white"}}> Buy the insurance</Link>
      </Button>
  </Card.Footer>
</Card>

        <Outlet />
      </div>
      </div>
    );
}

export default First;
