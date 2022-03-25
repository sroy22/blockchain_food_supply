import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Investment from './abis/Investment.json'
import Navbar from './Navbar'
import InvestorPage from './Main';
import './App.css';



function FarmerInvestor() {
  const [account, setAccount] = useState(0);
  const [investment, setInvestment] = useState(null);
  const [farmerCount, setFarmerCount] = useState(0);
  const [farmers, setFarmers] = useState([]);
  const [initial, setInitial] = useState(0);
  const [investorCount, SetInvestorCount] = useState(0);

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
    setInitial(accounts[0]);
    setAccount(accounts[0]);
    //this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = Investment.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(Investment.abi, networkData.address)
      setInvestment(place);
      const count = await place.methods.farmerCount().call()
      setFarmerCount(count);
      const dealcount = await place.methods.dealCount().call()
      SetInvestorCount(dealcount);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.farmers(i).call()
        p.push(farmer);
      }
      for (var i = 1; i <= dealcount; i++) {
        const deal = await place.methods.deals(i).call()
        deals.push(deal);
      }
      setFarmers(p);
    } else {
      window.alert('Investment contract not deployed to detected network.')
    }
  }


  async function createInsurance(name, price) {
     investment.methods.createProduct(name, price, initial).send({ from: account, value: price })
     .on('transactionHash', (hash) => {
     })
     var delayInMilliseconds = 8000; //1 second
    setTimeout( async function() {
    //your code to be executed after 1 second
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
    var delayInMilliseconds = 8000; //1 second
    setTimeout( async function() {
      //your code to be executed after 1 second
      loadBlockchainData();
      }, delayInMilliseconds);
    }

  async function payBackToInvestor(event){
    let deals = [];
    console.log(investorCount);
    for (var i = 1; i <= investorCount; i++) {
      const deal = await investment.methods.deals(i).call()
      deal.amount = deal.amount;
      investment.methods.repay(deal.farmerID).send({ from: account, value: deal.amount, to: deal.investorAddress})
      deals.push(deal);
    }
  }

 async function   makeInvestment(id, costToProduce, holdingPercent) {
    const price = holdingPercent*0.01*costToProduce +  "000000000000000000";
    const farmer = await investment.methods.farmers(id).call();
    investment.methods.purchaseProduct(id).send({ from: account, value: price, to: initial })
    console.log(price);
    console.log(id);
    console.log(holdingPercent);
    investment.methods.createAgreement(id,price, holdingPercent).send({ from: account })
    var delayInMilliseconds = 8000; //1 second
  setTimeout( async function() {
        //your code to be executed after 1 second
    loadBlockchainData();
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
            <InvestorPage
              products={farmers}
              createProduct={createAccount}
              purchaseProduct={makeInvestment} />
                </div>
                <button type="submit" className="btn btn-primary" onClick= {payBackToInvestor}>Pay back to investors</button>
        </main>
      </div>
    </div>
  </div>
  );
}
export default FarmerInvestor;
