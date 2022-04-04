import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import FarmExchange from './abis/FarmExchange.json'
import Rating from './abis/Rating.json'

import Navbar from './Navbar'
import ProcessorPage from './ProcessorPage';




function Processor() {
  const [account, setAccount] = useState(0); // for current account
  const [farmerCount, setFarmerCount] = useState(0); // for total farmer count
  const [farmerExchange, setFarmerExchange] = useState(0); // for smart contract
  const [farmers, setFarmers] = useState([]); // for getting all farmers
  const [initial, setInitial] = useState(0); // for setting initial account
  const [processed, setProcessed] = useState([]); // for processed items
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
    setAccount(accounts[0]); // for setting current account
    const networkId = await web3.eth.net.getId()
    const networkData = FarmExchange.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(FarmExchange.abi, networkData.address) // loading the smart contract
      setFarmerExchange(place); // setting smart contract
      const count = await place.methods.farmerCount().call() // getting farmer count
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.farmers(i).call() // reading each farmer
        p.push(farmer);
      }
      
    let processedGoods = [];
    const process = await place.methods.processedItemsCount().call(); // getting all processed items
    for (var i = 1; i <= process; i++) {
      const processGood = await place.methods.processedItems(i).call()
      if (accounts[0] == processGood.processorAddress) { // ensuring only products of current account for access control
        processedGoods.push(processGood);
        }
    }
    const marketProducs = await place.methods.marketProductCount().call(); // getting all market products
    let marketGoodsToSell = [];
    for (var i = 1; i <= marketProducs; i++) {
      const marketGood = await place.methods.marketProducts(i).call() // reading each market product
      marketGoodsToSell.push(marketGood);
    }
    setProcessed(processedGoods);
    setFarmers(p);
    } else {
      window.alert('Investment contract 1 not deployed to detected network.')
    }
  }
  

async function   marketProductCreation(id, key) {
  const p = await farmerExchange.methods.processedItems(id).call();
  farmerExchange.methods.createMarketProduct(id, priceToSell[key], quantityToSell[key], nameToSell[key] ).send({ from: account}) // creating market product
  const l = await farmerExchange.methods.farmers(id).call();
  farmerExchange.methods.createFarmerRating(p.farmerId, farmerRating ).send({ from: account}) // create rating
  var delayInMilliseconds = 12000; 
  setTimeout( async function() {
    loadBlockchainData();     // adding a delay for blockchain state update
    }, delayInMilliseconds);
}

 async function   buyFarmerShare(crop, id, quantityToBuy, pricePerQuantity) {
   const price = quantityToBuy*pricePerQuantity ;
    const farmer = await farmerExchange.methods.farmers(id).call();
    farmerExchange.methods.purchaseProduct(id, quantityToBuy).send({ from: account, value: price, to: initial }) // purchase farmer crop
    farmerExchange.methods.createProcessedItem(crop, id, pricePerQuantity, quantityToBuy ).send({from: account}) // create processed item
    var delayInMilliseconds = 15000; 
  setTimeout( async function() {
    loadBlockchainData(); // adding delay for blockchain state update
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
              purchaseProduct={buyFarmerShare}
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
