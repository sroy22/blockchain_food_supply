import React, { useState, useEffect } from 'react';
import Web3 from 'web3'
import Insurance from './abis/Insurance.json'
import Navbar from './Navbar'
import InvestorPage from './Main';
import InsurancePage from './InsurancePage';
import WeatherApp from './WeatherApp';



function InsuranceCompany() {
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
      console.log(count);

      const count1 = await place.methods.insuranceFarmerCount().call()
      console.log(count1);
      setFarmerCount(count);
      let p = []
      let deals = [];
      for (var i = 1; i <= count1; i++) {
        const farmer = await place.methods.insuranceFarmers(i).call()
        console.log(farmer);
          p.push(farmer);

      }
      setFarmers(p);
    } else {
      window.alert('Investment contract not deployed to detected network.')
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
  
async function repayToInvestor(farmerId, insuranceFarmerId, insuranceCompanyId) {
    
console.log(farmerId);
//console.log(insuranceId);


  const f= await farmerExchange.methods.insuranceCompanies(insuranceCompanyId).call()
  const acc = await farmerExchange.methods.insuranceFarmers(insuranceFarmerId).call()
console.log(acc);
  const p = f.payoutValue*0.01*acc.premium;
// console.log(f);
farmerExchange.methods.payToInvestor(insuranceFarmerId).send({ from: account, value: p })








//   let d;
//   console.log(dealCount1);
//           for (var i = 1; i <= dealCount1; i++) {
//             const deal = await farmerExchange.methods.deals(i).call()
//             if(deal.farmerID == id) {
//               d = deal;
//             }
//   }

//   const f= await farmerExchange.methods.farmers(id).call()
// console.log(f);
// const pri = f.processorPrice * d.holding;
// console.log(f.processorPrice);
// console.log(d.holdingPercent);
// const finalPrie = d.holdingPercent * 0.01 * f.processorPrice;


// farmerExchange.methods.payToInvestor(id).send({ from: account, value: finalPrie })
// .on('transactionHash', (hash) => {
//   })
// var delayInMilliseconds = 8000; //1 second
// setTimeout( async function() {
//   //your code to be executed after 1 second
//   loadBlockchainData();
//   }, delayInMilliseconds);

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

//  async function   makeInvestment(id, costToProduce, holdingPercent) {
//     const price = holdingPercent*0.01*costToProduce +  "000000000000000000";
//     const farmer = await investment.methods.farmers(id).call();
//     investment.methods.purchaseProduct(id).send({ from: account, value: price, to: initial })
//     console.log(price);
//     console.log(id);
//     console.log(holdingPercent);
//     investment.methods.createAgreement(id,price, holdingPercent).send({ from: account })
//     var delayInMilliseconds = 8000; //1 second
//   setTimeout( async function() {
//         //your code to be executed after 1 second
//     loadBlockchainData();
//     }, delayInMilliseconds);
//     }

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
        <main role="main" className="col-lg-12 d-flex">
          
            <div> 
            <InsurancePage
              products={farmers}
              createInsurance={createAccount}
              repayToInvestor = {repayToInvestor}
              rep />
              <WeatherApp/>
                </div>
        </main>
      </div>
    </div> 
  </div>
  );
}
export default InsuranceCompany;