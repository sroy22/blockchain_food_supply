import React, { Component, useRef } from 'react';
import { Button, Card } from "tabler-react";
import './bootstrapCSS.css';

class InvestorPage extends Component {

  render() {
    this.props.products.map((product, key) => {
      console.log(product);
    });
    return (
      <div className='container'>
       <div className='row'>
        <div className='col-md-10'>
        <h1>Create crop yield </h1>
        </div>
        
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.farmerName.value
          const price = window.web3.utils.toWei(this.expectedPrice.value.toString(), 'Ether')
          const crop = this.cropName.value;
          const location = this.location.value;
          const quantity = parseInt(this.quantity.value);
          const holding = this.holding.value;
          const costToProduce = this.costToProduce.value;
          this.props.createProduct(name, location, crop, quantity, price, holding, costToProduce)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="farmerName"
              type="text"
              ref={(input) => { this.farmerName = input }}
              className="form-control"
              placeholder="Famer Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="cropName"
              type="text"
              ref={(input) => { this.cropName = input }}
              className="form-control"
              placeholder="Crop Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="location"
              type="text"
              ref={(input) => { this.location = input }}
              className="form-control"
              placeholder="Location"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="expectedPrice"
              type="text"
              ref={(input) => { this.expectedPrice = input }}
              className="form-control"
              placeholder="Price per unit"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="quantity"
              type="text"
              ref={(input) => { this.quantity = input }}
              className="form-control"
              placeholder="Quantity"
              required />
          </div>
          <div className="form-group mr-sm-2">
            Holding
            <input
              id="holding"
              type="text"
              value = "100"
              ref={(input) => { this.holding = input }}
              className="form-control"
              placeholder="Holding"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="holding"
              type="text"
              ref={(input) => { this.costToProduce = input }}
              className="form-control"
              placeholder="costToProduce"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Farmer Details</button>
        </form>
        </div>
      <hr/>
        
<div className="container">
          <div className='row'>
            <div className='col-md-110'>
          <h2>Expected Yields</h2>
          </div>
          </div>
          <div className="row">
        { this.props.products.map((product, key) => {
          console.log(product);
              return(
        <Card className="col-sm-3 " key={key}>
          <Card.Header>
            <Card.Title>Farmer: <b>{product.farmerName}</b></Card.Title>
          </Card.Header>
          <Card.Body>
            <p><b>Crop: </b>{product.crop}</p>
            <p><b>Price: </b>{window.web3.utils.fromWei(product.expectedPrice.toString(), 'Ether')} Eth</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Holding Remaining: </b>{product.holding}</p>
            <p><b>Cost to Produce: </b>{product.costToProduce}</p>
            { product.investmentMade == true && product.boughtByProcessor  == true
                      ? <button
                          name={product.farmerId}
                          onClick={(event) => {
                            this.props.repayToInvestor(event.target.name)
                          }}
                        >
                          Repay to investor
                        </button>
                      : null
                    }
          </Card.Body>
          <Card.Footer>{product.owner}</Card.Footer>                    
    </Card>
              )})}
              </div>
              </div>
      </div>
    );
  }
}
export default InvestorPage;
