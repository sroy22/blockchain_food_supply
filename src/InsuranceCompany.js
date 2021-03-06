import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json'
import Navbar from './Navbar'
import InvestorPage from './Main';
import InsurancePage from './InsurancePage';
import WeatherApp from './WeatherApp';



function InsuranceCompany() {
  const [account, setAccount] = useState(0); // for current account
  const [farmerCount, setFarmerCount] = useState(0); // for total farmer count
  const [dealCount, setDealCount] = useState(0); // for total deal count
  const [farmerExchange, setFarmerExchange] = useState(0); // for smart contract
  const [farmers, setFarmers] = useState([]); // for all farmers
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
      setFarmerExchange(place); // setting smart contract
      const count = await place.methods.insuranceCompanyCount().call()
      const count1 = await place.methods.insuranceFarmerCount().call()
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count1; i++) {
        const farmerDeals = await place.methods.insuranceFarmers(i).call() // reading all farmer deals
          p.push(farmerDeals);

      }
      setFarmers(p);
    } else {
      window.alert('Investment contract not deployed to detected network.')
    }
  }


  
async function repayToInvestor(farmerId, insuranceFarmerId, insuranceCompanyId) {
  const f= await farmerExchange.methods.insuranceCompanies(insuranceCompanyId).call()
  const acc = await farmerExchange.methods.insuranceFarmers(insuranceFarmerId).call()
  const p = f.payoutValue*0.01*acc.premium; // calculating amount to be paid
farmerExchange.methods.payToInvestor(insuranceFarmerId).send({ from: account, value: p }) // paying back to investor
}


 async function createAccount(name, type, trigger, payback) {

     farmerExchange.methods.createInsuranceCompany(name, type, trigger, payback).send({ from: account })
    .on('transactionHash', (hash) => {
      })               // creating the account
    var delayInMilliseconds = 8000; 
    setTimeout( async function() {
      loadBlockchainData(); // adding a delay for blockchain state update
      }, delayInMilliseconds);
    }

  // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      loadWeb3();
      loadBlockchainData();
    }, []);
  
  return (
    <div>
     <Navbar account={account} />
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" >
          
            <div> 
            <InsurancePage
              products={farmers}
              createInsurance={createAccount}
              repayToInvestor = {repayToInvestor}
              rep />
              <WeatherApp/>
                </div>
        </main>
      </div>
    </div> 
  </div>
  );
}
export default InsuranceCompany;