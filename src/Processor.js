import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import FarmExchange from './abis/FarmExchange.json'
import Rating from './abis/Rating.json'

import Navbar from './Navbar'
import ProcessorPage from './ProcessorPage';




function Processor() {
  const [account, setAccount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [farmerExchange, setFarmerExchange] = useState(0);
  const [ratingExchange, setRatingExchange] = useState(0);
  const [farmers, setFarmers] = useState([]);
  const [initial, setInitial] = useState(0);
  const [processed, setProcessed] = useState([]);
  const [priceToSell, setPriceToSell] = useState([]);
  const [quantityToSell, setQuantityToSell] = useState([]);
  const [nameToSell, setNameToSell] = useState([]);
  const [farmerRating, setFarmerRating] = useState(0);

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
    const ratingNetworkData = Rating.networks[networkId]
    if (ratingNetworkData){
      const ratingPlace = new web3.eth.Contract(Rating.abi, ratingNetworkData.address)
      setRatingExchange(ratingPlace);
    }
    if(networkData) {
      const place = new web3.eth.Contract(FarmExchange.abi, networkData.address)
      setFarmerExchange(place);
      const count = await place.methods.farmerCount().call()
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.farmers(i).call()
        console.log(farmer);
        p.push(farmer);
      }
      
    let processedGoods = [];
    const process = await place.methods.processedItemsCount().call();

    for (var i = 1; i <= process; i++) {
      const processGood = await place.methods.processedItems(i).call()
      if (accounts[0] == processGood.processorAddress) {
        processedGoods.push(processGood);
        }
    }
    const marketProducs = await place.methods.marketProductCount().call();
    let marketGoodsToSell = [];
    for (var i = 1; i <= marketProducs; i++) {
      const marketGood = await place.methods.marketProducts(i).call()
      marketGoodsToSell.push(marketGood);
    }
    setProcessed(processedGoods);
      setFarmers(p);
    } else {
      window.alert('Investment contract 1 not deployed to detected network.')
    }
  }
  
 async function createAccount(name, location, crop, quantity, price, expiryDate, holding, costToProduce) {

    farmerExchange.methods.createFarmer(name, location, crop, quantity, price, expiryDate, holding, costToProduce).send({ from: account })
    .on('transactionHash', (hash) => {
      })
    var delayInMilliseconds = 15000; //1 second
    setTimeout( async function() {
      //your code to be executed after 1 second
      loadBlockchainData();
      }, delayInMilliseconds);
    }

async function   marketProductCreation(id, key) {
  const p = await farmerExchange.methods.processedItems(id).call();
  farmerExchange.methods.createMarketProduct(id, priceToSell[key], quantityToSell[key], nameToSell[key] ).send({ from: account})

  const l = await farmerExchange.methods.farmers(id).call();
  farmerExchange.methods.createFarmerRating(p.farmerId, farmerRating ).send({ from: account})

  var delayInMilliseconds = 12000; //1 second
  setTimeout( async function() {
        //your code to be executed after 1 second
    loadBlockchainData();    
    }, delayInMilliseconds);
}

 async function   makeInvestment(crop, id, quantityToBuy, pricePerQuantity) {
   const price = quantityToBuy*pricePerQuantity ;
    const farmer = await farmerExchange.methods.farmers(id).call();
    farmerExchange.methods.purchaseProduct(id, quantityToBuy).send({ from: account, value: price, to: initial })
    farmerExchange.methods.createProcessedItem(crop, id, pricePerQuantity, quantityToBuy ).send({from: account})
    var delayInMilliseconds = 15000; //1 second
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

function updateRate(value){
  setFarmerRating(value);
}

  function updateVal(e, id, name, value) {
    let val;
    if(name === "priceToSell") {
      val = priceToSell.slice();
      val[id] = value;
      setPriceToSell(val);
    } else if(name === "quantityToSell") {
      val = quantityToSell.slice();
      val[id] = value;
      setQuantityToSell(val);
    } else if(name === "nameToSell") {
      val = nameToSell.slice();
      val[id] = value;
      setNameToSell(val);
    }
    }
  
  return (
    <div>
     <Navbar account={account} />
        <main role="main" >
            <ProcessorPage
              products={farmers}
              processedGoods = {processed}
              createMarketProduct = {marketProductCreation}
              purchaseProduct={makeInvestment}
              updateVal = {updateVal}
              updateRate = {updateRate}
              priceToSell={priceToSell}
              quantityToSell={quantityToSell}
              nameToSell={nameToSell}
            />
        </main>
  </div>
  );
}
export default Processor;
