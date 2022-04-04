import React, { useState, useEffect, Component, useRef } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json'
import Navbar from './Navbar'
import InvestorPage from './Main';
import InsurancePage from './InsurancePage';
import WeatherApp from './WeatherApp';
import InsuranceManagementView from './InsuranceManagementView';

function InsuranceManagement() {
    const [account, setAccount] = useState(0); // for current account
    const [farmerCount, setFarmerCount] = useState(0); // for total farmer count
    const [dealCount, setDealCount] = useState(0); // for total deal count
    const [farmerExchange, setFarmerExchange] = useState(0); // for smart contract
    const temp = useRef(0); // for storing current temperature
    const [farmers, setFarmers] = useState([]); // for storing farmer info

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
  setAccount(accounts[0]); // setting current account
  const networkId = await web3.eth.net.getId()
  const networkData = Insurance.networks[networkId]
  if(networkData) {
    const place = new web3.eth.Contract(Insurance.abi, networkData.address) // loading the smart contract
    setFarmerExchange(place); // setting the smart contract
    const count = await place.methods.insuranceCompanyCount().call()
    const count1 = await place.methods.insuranceFarmerCount().call()
    let insuranceCompanyToBeTriggered;
  for (var i = 1; i <= count; i++) {
      const farmer = await place.methods.insuranceCompanies(i).call()
      if (farmer.trigger > temp.current ){ // trigger condition of insurance contract
          insuranceCompanyToBeTriggered = farmer.insuranceCompanyId;
      }
    }
    setFarmerCount(count);
    let p = []
    let deals = [];
    for (var i = 1; i <= count1; i++) {
      const farmer = await place.methods.insuranceFarmers(i).call() // getting farmer
      if (farmer.insuranceFarmerId == insuranceCompanyToBeTriggered){
        p.push(farmer); // farmer to be paid
      }

    }
    setFarmers(p);
  } else {
    window.alert('Investment contract not deployed to detected network.')
  }
}

async function repayToInvestor(farmerId, insuranceFarmerId, insuranceCompanyId) {
      const f= await farmerExchange.methods.insuranceCompanies(insuranceCompanyId).call()
      const acc = await farmerExchange.methods.insuranceFarmers(insuranceFarmerId).call()
      const p = f.payoutValue*0.01*acc.premium; // calculating the amount
    farmerExchange.methods.payToInvestor(insuranceFarmerId).send({ from: account, value: p }) // paying back to investor
    
   
}

async function createAccount(name, type, trigger, payback) {

    farmerExchange.methods.createInsuranceCompany(name, type, trigger, payback).send({ from: account }) 
   .on('transactionHash', (hash) => {
     })                                          // creating the account
   var delayInMilliseconds = 8000; 
   setTimeout( async function() {
     loadBlockchainData(); // adding a delay for blockchain state update
     }, delayInMilliseconds);
   }

   useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);



const temperature = (data) => {
  temp.current = data; // storing current temperature
  }

  return (
    <div>
     <Navbar account={account} />
    <div className="container-fluid mt-5">
        <main role="main" className="">
          <InsuranceManagementView
             products={farmers}
             createInsurance={createAccount}
             repayToInvestor = {repayToInvestor}
          />
        <WeatherApp data = {temperature} />
        </main>
    </div> 
  </div>
  );
  
}

export default InsuranceManagement;