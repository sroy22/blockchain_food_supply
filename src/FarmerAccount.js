import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import FarmExchange from './abis/FarmExchange.json'
import Navbar from './Navbar'
import InvestorPage from './Main';



function FarmerAccount() {
  const [account, setAccount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [dealCount, setDealCount] = useState(0);
  const [farmerExchange, setFarmerExchange] = useState(0);
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
    const networkId = await web3.eth.net.getId()
    const networkData = FarmExchange.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(FarmExchange.abi, networkData.address)
      setFarmerExchange(place);
      const count = await place.methods.farmerCount().call()
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.farmers(i).call()
        if (farmer.owner == accounts[0]){
          p.push(farmer);
        }
      const dealCount1 = await place.methods.dealCount().call()
      }
      setFarmers(p);
    } else {
      window.alert('Investment contract not deployed to detected network.')
    }
  }
  
async function repayToInvestor(id) {
    
  const dealCount1 = await farmerExchange.methods.dealCount().call()
  let d;
          for (var i = 1; i <= dealCount1; i++) {
            const deal = await farmerExchange.methods.deals(i).call()
            if(deal.farmerID == id) {
              d = deal;
            }
  }

  const f= await farmerExchange.methods.farmers(id).call()
  const pri = f.processorPrice * d.holding;
  const finalPrie = d.holdingPercent * 0.01 * f.processorPrice;
  farmerExchange.methods.payToInvestor(id).send({ from: account, value: finalPrie })
  .on('transactionHash', (hash) => {
    })
  var delayInMilliseconds = 8000; 
    setTimeout( async function() {
    loadBlockchainData();
    }, delayInMilliseconds);

}


 async function createAccount(name, location, crop, quantity, price,  holding, costToProduce) {

    farmerExchange.methods.createFarmer(name,  crop, quantity, price,  holding, costToProduce).send({ from: account })
    .on('transactionHash', (hash) => {
      })
    var delayInMilliseconds = 8000; 
    setTimeout( async function() {
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
        <main role="main">     
            <InvestorPage
              products={farmers}
              createProduct={createAccount}
              repayToInvestor = {repayToInvestor}
              rep />
        </main>

  </div>
  );
}
export default FarmerAccount;