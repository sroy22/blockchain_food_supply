import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json';
import FarmExchange from './abis/FarmExchange.json'


import BuyInsurance from './BuyInsurance';
import Navbar from './Navbar'
import ProcessorPage from './ProcessorPage';
import WeatherApp from './WeatherApp';



function FarmerInsurance() {
  const [account, setAccount] = useState(0);
  const [farmerCount, setFarmerCount] = useState(0);
  const [farmerExchange, setFarmerExchange] = useState(0);
  const [farmers, setFarmers] = useState([]);
  const [initial, setInitial] = useState(0);
  const [processed, setProcessed] = useState([]);
  const [priceToSell, setPriceToSell] = useState([]);
  const [quantityToSell, setQuantityToSell] = useState([]);
  const [nameToSell, setNameToSell] = useState([]);


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
      console.log("KLKL");
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
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.insuranceCompanies(i).call()
        p.push(farmer);
      }
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
  farmerExchange.methods.createMarketProduct(id, priceToSell[key], quantityToSell[key], nameToSell[key] ).send({ from: account})
  var delayInMilliseconds = 5000; //1 second
  setTimeout( async function() {   
    loadBlockchainData();
    }, delayInMilliseconds);
}

 async function   makeInvestment(insuranceCompanyId, price) {
const web3 = window.web3
// Load account
const accounts = await web3.eth.getAccounts()
//this.setState({ account: accounts[0] })
const networkId = await web3.eth.net.getId()
const networkData = FarmExchange.networks[networkId]
if(networkData) {
  const place1 = new web3.eth.Contract(FarmExchange.abi, networkData.address)
  const count = await place1.methods.farmerCount().call()
  let f;
  for (var i = 1; i <= count; i++) {
    const farmer = await place1.methods.farmers(i).call()
    if (farmer.owner == account) {
        f = farmer;
        let finalPrice = price + "000000000000000000";
        farmerExchange.methods.purchaseProduct(insuranceCompanyId, farmer.farmerId).send({ from: account, value: finalPrice })
    }
  }
} else {
  window.alert('Investment contract 1 not deployed to detected network.')
}
 var delayInMilliseconds = 15000; //1 second
  setTimeout( async function() {
    loadBlockchainData();
    }, delayInMilliseconds);

    }

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

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
      {}
     <Navbar account={account} />
    <div className="container-fluid mt-5">
      
        <main role="main" >
          
            <div> 
            <BuyInsurance
              products={farmers}
              purchaseProduct={makeInvestment}
            />
             <WeatherApp/>
                </div>
        </main>
    </div> 
  </div>
  );
}
export default FarmerInsurance;
