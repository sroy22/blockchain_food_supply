import React, { useState, useEffect, useRef } from 'react';
import Web3 from 'web3'
import FarmExchange from './abis/FarmExchange.json'
import Navbar from './Navbar'
import CustomerPage from './CustomerPage';



function Customer() {
  const [account, setAccount] = useState(0);
  const [marketProductsCount, setMarketProductsCount] = useState(0);
  const [farmerExchange, setFarmerExchange] = useState(0);
  const [marketProducts, setMarketProducts] = useState([]);
  const [chainFarmerId, setChainFarmerId] = useState(null);
  const [chainFarmerAddress, setChainFarmerAddress] = useState(null);
  const [chainProcessorId, setChainProcessorId] = useState(null);
  const [chainProcessorAddress, setChainProcessorAddress] = useState(null);
  const chain = useRef(false);

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
      const count = await place.methods.marketProductCount().call()
      const marketProduct = await place.methods.marketProducts(count).call();
      let chainBuyerAddress = marketProduct.buyerAddress;
      setChainProcessorAddress(marketProduct.processorAddress)
      setChainProcessorId(marketProduct.processorId)
      const processedGood = await place.methods.processedItems(marketProduct.processorId).call();
      let chainFarmerId = processedGood.farmerId;
      setChainFarmerId(chainFarmerId)
      let farmer = await place.methods.farmers(chainFarmerId).call();
      let chainFarmer = farmer.owner;
      let chainProcessor = farmer.processor;
      setChainFarmerAddress(chainFarmer)
      setMarketProductsCount(count);
      let p = []
      let goodsToSell = [];
      for (var i = 1; i <= count; i++) {
        const marketProduct = await place.methods.marketProducts(i).call()
        goodsToSell.push(marketProduct);
      }
      setMarketProducts(goodsToSell);
    } else {
      window.alert('Investment contract 3 not deployed to detected network.')
    }
  }

async function   submitRatings(rating, marketProductId) {
  farmerExchange.methods.createMarketProductRating(marketProductId, rating ).send({ from: account})
}


 async function   purchaseProduct(id, pricePerUnit, quantity, processorAddress) {
   chain.current = true;
    const price = pricePerUnit * quantity + "000000000000000000";
    farmerExchange.methods.purchaseMarketProduct(id, quantity).send({ from: account, value: price });
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
        <main role="main" >   
            <CustomerPage
              products={marketProducts}
              submitRatings = {submitRatings}
              purchaseProduct={purchaseProduct}
              farmerAddress = {chainFarmerAddress}
              farmerId = {chainFarmerId}
              processorId = {chainProcessorId}
              processorAddress = {chainProcessorAddress}  />    
        </main>
    </div> 
  );
}
export default Customer;
