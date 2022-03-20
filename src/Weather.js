import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Investment from './abis/Investment.json'
import Marketplace from './abis/Marketplace.json'

function Weather (props) {

  const [account, setAccount] = useState(0);
  const [investment, setInvestment] = useState(null);
  const [marketplace, setMarketplace] = useState(null);

  const [farmerCount, setFarmerCount] = useState(0);
  const [farmers, setFarmers] = useState([]);

  const [productCount, setProductCount] = useState(0);
  const [products, setProducts] = useState([]);

  const [pro, setPro] = useState(0);
  const [initial, setInitial] = useState(0);
  const [investorCount, SetInvestorCount] = useState(0);

  const [farmerName, setFarmenName] = useState('');
  const [premium, setPremium] = useState(0);
  const [type, setType] = useState('');

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
      // Load products

      const dealcount = await place.methods.dealCount().call()
      SetInvestorCount(dealcount);
      let p = []
      let deals = [];
      let c;
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
      window.alert('Marketplace contract not deployed to detected network.')
    }

    const networkDataMarketplace = Marketplace.networks[networkId]
    if(networkDataMarketplace) {
      const place = new web3.eth.Contract(Marketplace.abi, networkDataMarketplace.address)
      setMarketplace(place);
      const count = await place.methods.productCount().call()
      console.log(count);
      setProductCount(count);
      // Load products

      let p = []
      let deals = [];
      let c;
      for (var i = 1; i <= count; i++) {
        const farmer = await place.methods.products(i).call()
        p.push(farmer);
      }
      setProducts(p);
    } else {
      window.alert('Marketplace contract not deployed to detected network.')
    }
  }


  async function createInsurance(name, price) {
    console.log(initial);
     console.log("Hhsjdhfskj");
     marketplace.methods.createProduct(name, price, initial).send({ from: account, value: price })
     .on('transactionHash', (hash) => {
       setPro(1);
     })
 
     var delayInMilliseconds = 8000; //1 second
 
 setTimeout( async function() {
   //your code to be executed after 1 second
   loadBlockchainData();
 
 }, delayInMilliseconds);
 
     // let tx = await marketplace.methods.createProduct(name, price).send({ from: account })
     // tx.wait().then({
     //   loadBlockchainData
     // })
   }
 
   function   reimburse(id, price) {
     console.log(price);
     console.log(id);
     console.log(initial);
     console.log(account);
      marketplace.methods.purchaseProduct(id).send({ from: account, value: price, to: initial })
     .once('receipt', (receipt) => {
 //      this.setState({ loading: false })
     })
 
 
     var delayInMilliseconds = 8000; //1 second
 
 setTimeout( async function() {
   //your code to be executed after 1 second
   loadBlockchainData();
 
 }, delayInMilliseconds);
   }
   window.ethereum.on('accountsChanged', function (accounts) {
     // Time to reload your interface with accounts[0]!
     console.log(accounts);
     setAccount(accounts[0])
   })
  
 async function createProduct(name, location, crop, quantity, price, expiryDate, holding) {
    investment.methods.createFarmer(name, location, crop, quantity, price, expiryDate, holding).send({ from: account })
    var delayInMilliseconds = 8000; //1 second
setTimeout( async function() {
  //your code to be executed after 1 second
  loadBlockchainData();

}, delayInMilliseconds);
  }



  async function payBackToInvestor(event){
    let deals = [];
    for (var i = 1; i <= investorCount; i++) {
      const deal = await investment.methods.deals(i).call()
      deal.amount = deal.amount + "000000000000000000";
      investment.methods.repay(deal.farmerID).send({ from: account, value: deal.amount, to: deal.investorAddress})
      deals.push(deal);
    }
  }

  function   purchaseProduct(id, price, amount, holdingPercent) {
     investment.methods.purchaseProduct(id).send({ from: account, value: price, to: initial })

    investment.methods.createAgreement(id,amount, holdingPercent).send({ from: account })
    .on('transactionHash', (hash) => {
      setPro(1);
    })
        var delayInMilliseconds = 8000; //1 second

setTimeout( async function() {
  //your code to be executed after 1 second
  loadBlockchainData();

}, delayInMilliseconds);
  }
  window.ethereum.on('accountsChanged', function (accounts) {
    // Time to reload your interface with accounts[0]!
    setAccount(accounts[0])
  })

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
    // Update the document title using the browser API
  }, []);

    return (
      <div id="content">
        <h1>Buy Insurance</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const premiumVal = window.web3.utils.toWei(premium.toString(), 'Ether')
          this.props.createInsurance(farmerName, premiumVal, type)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="farmerName"
              type="text"
              ref={(input) => { setFarmenName(input) }}
              className="form-control"
              placeholder="Famer Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="premium"
              type="text"
              ref={(input) => { setPremium(input) }}
              className="form-control"
              placeholder="Premium"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="type"
              type="text"
              ref={(input) => { setType(input) }}
              className="form-control"
              placeholder="type"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Farmer Details</button>
        </form>
        <p>&nbsp;</p>
        <h2>Farmer Payouts</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Premium</th>
              <th scope="col">Type</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { products.map((product, key) => {
              console.log(product);
              return(
                <tr key={key}>
                  <th scope="row">{product.farmerId}</th>
                  <td>{product.name}</td>
                  <td>{product.type}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.reimburse(event.target.name, event.target.value)
                          }}
                        >
                          Reimburse
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  
}

export default Weather;
