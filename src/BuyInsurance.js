import React, { Component, useRef } from 'react';
import {Card} from 'tabler-react'
import './bootstrapCSS.css';

class BuyInsurance extends Component {

  render() {
    this.props.products.map((product, key) => {
    });
    return (
      <div id="content">
        <h2>Insurance Products available to be sold</h2>
       <div className='container'>
         <div className='row'>
        { this.props.products.map((product, key) => {
              return(
        <Card className="col-sm-5 classWithPad" key={key}>
              <Card.Header>
              <Card.Title>Insurance plan #{product.insuranceCompanyId} by <b><u>{product.name}</u></b></Card.Title>
              </Card.Header>
              <Card.Body>
                        <p>Insurance Type: <b>{product.typeOf}</b></p>
                        <p>Insurance Trigger: <b>{product.trigger}</b></p>
                        <p>Payout Return: <b>{product.payoutValue}</b>%</p>
              <input
              id="premiumValue"
              type="text"
              ref={(input) => { this.premiumValue = input }}
              className="form-control classWithPad"
              placeholder="Premium Value"
              required />

              { !product.purchased
                      ? <button
                          name={product.insuranceCompanyId}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, this.premiumValue.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
              </Card.Body>
              <Card.Footer>{product.insuranceCompanyAddress}</Card.Footer>          
        </Card>
              )})}
              </div>
              </div>
      </div>
    )
  }
}
export default BuyInsurance;
