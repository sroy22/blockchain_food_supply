import React, { Component, useRef } from 'react';
import { Button, Card } from "tabler-react";
import './bootstrapCSS.css';

class NewInvestorPage extends Component {

  render() {
    this.props.products.map((product, key) => {
        console.log(product);
    });
    return (
      <div id="content">
        <h1>Add Farmer</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.farmerName.value
          const price = window.web3.utils.toWei(this.expectedPrice.value.toString(), 'Ether')
          const crop = this.cropName.value;
          const location = this.location.value;
          const quantity = parseInt(this.quantity.value);
          const expiryDate = this.expiryDate.value;
          const holding = this.holding.value;
          const costToProduce = this.costToProduce.value;
          this.props.createProduct(name, location, crop, quantity, price, expiryDate, holding, costToProduce)
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
           Expiry Date <input
              id="expiryDate"
              type="date"
              ref={(input) => { this.expiryDate = input }}
              className="form-control"
              placeholder="Expiry Date"
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
        <p>&nbsp;</p>
        <h2>Farmer Account details</h2>
           <div className="container-fluid">
          <div className="row">
        { this.props.products.map((product, key) => {
            console.log(product);
              return(
        <Card className="col-sm-5 classWithPad" key={key}>
          <Card.Header>
            <Card.Title>Farmer #{product.farmerId} : <b>{product.farmerName}</b></Card.Title>
          </Card.Header>
          <Card.Body>
            <p><b>Crop: </b>{product.crop}</p>
            <p><b>Price: </b>{window.web3.utils.fromWei(product.expectedPrice.toString(), 'Ether')} Eth</p>
            <p><b>Location: </b>{product.location}</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Expiry Date: </b>{product.expDate}</p>
            <p><b>Holding Remaining: </b>{product.holding}</p>
            <p><b>Cost to Produce: </b>{product.costToProduce}</p>
            <p><b>Address: </b></p>
                    <input
                      id="quantityToBuy"
                      type="text"
                      ref={(input) => { this.quantityToBuy = input }}
                      className="form-control"
                      placeholder="Quantity to buy"
                      required />
                  <div>
                    {!product.purchased
                      ? <button
                        name={product.farmerId}
                        value={product.expectedPrice}
                        quantityToBuy={this.quantityToBuy}
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.purchaseProduct(event.target.name, product.costToProduce, this.quantityToBuy.value)
                        }}
                      >
                        Buy
                      </button>
                      : null
                    }
                    { product.investmentMade && product.boughtByProcesor
                      ? <button
                          name={product.farmerId}
                          onClick={(event) => {
                            this.props.repayToInvestor(event.target.name)
                          }}
                        >
                          Repay
                        </button>
                      : null
                    }
                  </div>
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
export default NewInvestorPage;
