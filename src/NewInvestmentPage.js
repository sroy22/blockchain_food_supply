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
        <p>&nbsp;</p>
        <h2>Investment opportunities</h2>
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
            <p><b>Quantity Remaining: </b>{product.quantity}</p>
            <p><b>Holding Remaining: </b>{product.holding}%</p>
            <p><b>Cost to Produce: </b>{product.costToProduce}</p>
                    <input
                      id="quantityToBuy"
                      type="text"
                      ref={(input) => { this.quantityToBuy = input }}
                      className="form-control classWithPad"
                      placeholder="percentage to invest"
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
