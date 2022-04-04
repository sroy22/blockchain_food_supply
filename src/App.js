import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import FarmExchange from './abis/FarmExchange.json'
import Navbar from './Navbar'
import NewInvestorPage from './NewInvestmentPage';
import './App.css';



function FarmerInvestor() {
  const [account, setAccount] = useState(0); // for current account in meta mask
  const [investment, setInvestment] = useState(null); // for smart contract
  const [farmerCount, setFarmerCount] = useState(0);
  const [farmers, setFarmers] = useState([]); // for getting all farmer
  const [initial, setInitial] = useState(0); // for setting initial account
  const [investorCount, SetInvestorCount] = useState(0); // for getting all investors

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
  async function loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    setInitial(accounts[0]); // set initial account
    setAccount(accounts[0]); // set current account
    const networkId = await web3.eth.net.getId()
    const networkData = FarmExchange.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(FarmExchange.abi, networkData.address) // get contract methods
      setInvestment(place);
      const count = await place.methods.farmerCount().call() // get total farmer count
      setFarmerCount(count);
      const dealcount = await place.methods.dealCount().call() // get total deal counts
      SetInvestorCount(dealcount);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.farmers(i).call() // reading each farmer
        p.push(farmer);
      }
      setFarmers(p);
    } else {
      window.alert('Investment contract 4 not deployed to detected network.')
    }
  }

  async function createInsurance(name, price) {
     investment.methods.createProduct(name, price, initial).send({ from: account, value: price })
     .on('transactionHash', (hash) => {
     })
     var delayInMilliseconds = 8000; 
    setTimeout( async function() {
    loadBlockchainData();
    }, delayInMilliseconds);
   }
 
   function   reimburse(id, price) {
      investment.methods.purchaseProduct(id).send({ from: account, value: price, to: initial }) 
      var delayInMilliseconds = 8000; //1 second
      setTimeout( async function() {
      loadBlockchainData();
      }, delayInMilliseconds);
    }

   window.ethereum.on('accountsChanged', function (accounts) {
     // Time to reload your interface with accounts[0]!
     setAccount(accounts[0])
   })
  
 async function createAccount(name, location, crop, quantity, price, expiryDate, holding, costToProduce) {
    investment.methods.createFarmer(name, location, crop, quantity, price, expiryDate, holding, costToProduce).send({ from: account })
    var delayInMilliseconds = 8000; 
    setTimeout( async function() {
      loadBlockchainData(); // setting a delay for blockchain state to update
      }, delayInMilliseconds);
    }

  async function payBackToInvestor(event){
    let deals = [];
    for (var i = 1; i <= investorCount; i++) {
      const deal = await investment.methods.deals(i).call() // reading each deal
      deal.amount = deal.amount;
      investment.methods.repay(deal.farmerID).send({ from: account, value: deal.amount, to: deal.investorAddress}) // paying back to the investor
      deals.push(deal);
    }
  }


 async function   makeInvestment(id, costToProduce, holdingPercent) {
    const price = holdingPercent*0.01*costToProduce +  "000000000000000000"; // calculating the investment amount and formatting for ether
    const farmer = await investment.methods.farmers(id).call();
    investment.methods.purchaseFarmerShare(id).send({ from: account, value: price }) // purchasing the farmer share
    investment.methods.createAgreement(id,price,holdingPercent).send({ from: account }) // creating the agreement
    var delayInMilliseconds = 8000; 
    setTimeout( async function() {
      loadBlockchainData(); // adding a deplay to reflect updated blockchain state
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
      <main role="main" className="col-lg-12">          
            <div> 
            <NewInvestorPage
              products={farmers}
              createProduct={createAccount}
              purchaseProduct={makeInvestment}
              repayToInvestor = {payBackToInvestor}
              />
                </div>
        </main>
      </div>
    </div>
  </div>
  );
}
export default FarmerInvestor;
