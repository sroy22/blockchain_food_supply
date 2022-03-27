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
    //this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()
    const networkData = FarmExchange.networks[networkId]
    if(networkData) {
      const place = new web3.eth.Contract(FarmExchange.abi, networkData.address)
      setFarmerExchange(place);
      const count = await place.methods.marketProductCount().call()
console.log(count);
      const marketProduct = await place.methods.marketProducts(count).call();
      let chainBuyerAddress = marketProduct.buyerAddress;
console.log(marketProduct);

      //let chainProcesserAddress = marketProduct.processorAddress;
      setChainProcessorAddress(marketProduct.processorAddress)
      //let chainProcessorId = marketProduct.processorId;
      setChainProcessorId(marketProduct.processorId)
      
      const processedGood = await place.methods.processedItems(marketProduct.processorId).call();
      
      console.log(processedGood);
      
      let chainFarmerId = processedGood.farmerId;
      setChainFarmerId(chainFarmerId)
      let farmer = await place.methods.farmers(chainFarmerId).call();
      console.log(farmer);
      let chainFarmer = farmer.owner;
      let chainProcessor = farmer.processor;

      setChainFarmerAddress(chainFarmer)


      console.log(marketProduct);
      console.log(count);
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


//   async function createInsurance(name, price) {
//      investment.methods.createProduct(name, price, initial).send({ from: account, value: price })
//      .on('transactionHash', (hash) => {
//      })
//      var delayInMilliseconds = 8000; //1 second
//     setTimeout( async function() {
//     //your code to be executed after 1 second
//     loadBlockchainData();
//     }, delayInMilliseconds);
//    }
 
//    function   reimburse(id, price) {
//       investment.methods.purchaseProduct(id).send({ from: account, value: price, to: initial }) 
//       var delayInMilliseconds = 8000; //1 second
//       setTimeout( async function() {
//       loadBlockchainData();
//       }, delayInMilliseconds);
//     }

//    window.ethereum.on('accountsChanged', function (accounts) {
//      // Time to reload your interface with accounts[0]!
//      setAccount(accounts[0])
//    })
  
//  async function createAccount(name, location, crop, quantity, price, expiryDate, holding, costToProduce) {

//     farmerExchange.methods.createFarmer(name, location, crop, quantity, price, expiryDate, holding, costToProduce).send({ from: account })
//     .on('transactionHash', (hash) => {
//       })
//     var delayInMilliseconds = 8000; //1 second
//     setTimeout( async function() {
//       //your code to be executed after 1 second
//       loadBlockchainData();
//       }, delayInMilliseconds);
//     }

    console.log("JJ");

//   async function payBackToInvestor(event){
//     let deals = [];
//     console.log(investorCount);
//     for (var i = 1; i <= investorCount; i++) {
//       const deal = await investment.methods.deals(i).call()
//       deal.amount = deal.amount;
//       investment.methods.repay(deal.farmerID).send({ from: account, value: deal.amount, to: deal.investorAddress})
//       deals.push(deal);
//     }
//   }

 async function   purchaseProduct(id, pricePerUnit, quantity, processorAddress) {
   chain.current = true;
    const price = pricePerUnit * quantity + "000000000000000000";
    // const farmer = await investment.methods.farmers(id).call();
    farmerExchange.methods.purchaseMarketProduct(id, quantity).send({ from: account, value: price });
    console.log(price);
    console.log(id);
    console.log(pricePerUnit);
    console.log(quantity);
    //investment.methods.createAgreement(id,price, holdingPercent).send({ from: account })
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
    
        <main role="main" >   
            <CustomerPage
              products={marketProducts}
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
