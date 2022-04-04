import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json';
import FarmExchange from './abis/FarmExchange.json'


import BuyInsurance from './BuyInsurance';
import Navbar from './Navbar'
import WeatherApp from './WeatherApp';



function FarmerInsurance() {
  const [account, setAccount] = useState(0); // setting current account
  const [farmerCount, setFarmerCount] = useState(0); // get all farmers count
  const [farmerExchange, setFarmerExchange] = useState(0); // get smart contract
  const [insurancePolicy, setInsurancePolicy] = useState([]); // get all farmers

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
    loadBlockchainData();
  })

  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0]); // set current account
    const networkId = await web3.eth.net.getId()
    const networkData = Insurance.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(Insurance.abi, networkData.address) // load smart contract
      setFarmerExchange(place); // set smart contract
      const count = await place.methods.insuranceCompanyCount().call() // get all insurance policy count
      setFarmerCount(count); // set farmer count
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const insurancePolicies = await place.methods.insuranceCompanies(i).call() // read all insurance policies
        p.push(insurancePolicies);
      }
      setInsurancePolicy(p);  // set all insurance policies
    } else {
      window.alert('Investment contract 1 not deployed to detected network.')
    }
  }
  
 async function   makeInvestment(insuranceCompanyId, price) {
  const web3 = window.web3
    // Load account
  const accounts = await web3.eth.getAccounts()
  const networkId = await web3.eth.net.getId()
  const networkData = FarmExchange.networks[networkId]
  if(networkData) {
    const place1 = new web3.eth.Contract(FarmExchange.abi, networkData.address) //load smart contract
    const count = await place1.methods.farmerCount().call()
    let f;
    for (var i = 1; i <= count; i++) {
      const farmer = await place1.methods.farmers(i).call() // read each farmer
      if (farmer.owner == account) { // check if this account is the current logged in for access control
        f = farmer;
        let finalPrice = price + "000000000000000000"; // format to ether
        farmerExchange.methods.purchaseProduct(insuranceCompanyId, farmer.farmerId).send({ from: account, value: finalPrice }) // purchase the insurance
    }
  }
} else {
  window.alert('Investment contract 1 not deployed to detected network.')
}
 var delayInMilliseconds = 15000; 
  setTimeout( async function() {
    loadBlockchainData(); // add a delay for blockchain state to be updated
    }, delayInMilliseconds);

    }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);
  
  return (
    <div>
      {}
     <Navbar account={account} />
    <div className="container-fluid mt-5">
        <main role="main" >
            <div> 
            <BuyInsurance
              products={insurancePolicy}
              purchaseProduct={makeInvestment}
            />
             <WeatherApp/>
                </div>
        </main>
    </div> 
  </div>
  );
}
export default FarmerInsurance;
