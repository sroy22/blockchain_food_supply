import React, { useState, useEffect, Component, useRef } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json'
import Navbar from './Navbar'
import InvestorPage from './Main';
import InsurancePage from './InsurancePage';
import WeatherApp from './WeatherApp';
import InsuranceManagementView from './InsuranceManagementView';

function InsuranceManagement() {
    const [account, setAccount] = useState(0);
    const [farmerCount, setFarmerCount] = useState(0);
    const [dealCount, setDealCount] = useState(0);

  const [farmerExchange, setFarmerExchange] = useState(0);
  const temp = useRef(0);

  const [farmers, setFarmers] = useState([]);

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
  setAccount(accounts[0]);
  //this.setState({ account: accounts[0] })
  const networkId = await web3.eth.net.getId()
  const networkData = Insurance.networks[networkId]
  if(networkData) {
    const place = new web3.eth.Contract(Insurance.abi, networkData.address)
    setFarmerExchange(place);
    const count = await place.methods.insuranceCompanyCount().call()
    console.log(count);

    const count1 = await place.methods.insuranceFarmerCount().call()
    console.log(temp);

    let insuranceCompanyToBeTriggered;

    for (var i = 1; i <= count; i++) {
      const farmer = await place.methods.insuranceCompanies(i).call()
      console.log(farmer.trigger);
      console.log(temp.current);
      if (farmer.trigger > temp.current ){
          insuranceCompanyToBeTriggered = farmer.insuranceCompanyId;
      }

    }
    console.log(insuranceCompanyToBeTriggered);

    console.log(count1);
    setFarmerCount(count);
    let p = []
    let deals = [];
    for (var i = 1; i <= count1; i++) {
      const farmer = await place.methods.insuranceFarmers(i).call()

      if (farmer.insuranceCompanyId == insuranceCompanyToBeTriggered){
      console.log(farmer);
        p.push(farmer);
      }

    }
    setFarmers(p);
  } else {
    window.alert('Investment contract not deployed to detected network.')
  }
}

async function repayToInvestor(farmerId, insuranceFarmerId, insuranceCompanyId) {
    
    console.log(farmerId);
    //console.log(insuranceId);
    
    
      const f= await farmerExchange.methods.insuranceCompanies(insuranceCompanyId).call()
      const acc = await farmerExchange.methods.insuranceFarmers(insuranceFarmerId).call()
    console.log(acc);
      const p = f.payoutValue*0.01*acc.premium;
    // console.log(f);
    farmerExchange.methods.payToInvestor(insuranceFarmerId).send({ from: account, value: p })
    
   
}

async function createAccount(name, type, trigger, payback) {

    farmerExchange.methods.createInsuranceCompany(name, type, trigger, payback).send({ from: account })
   .on('transactionHash', (hash) => {
     })
   var delayInMilliseconds = 8000; //1 second
   setTimeout( async function() {
     //your code to be executed after 1 second
     loadBlockchainData();
     }, delayInMilliseconds);
   }

   useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);



  const temperature = (data) => {
    console.log(data);

    console.log(data);

temp.current = data;

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