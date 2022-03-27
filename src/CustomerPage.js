import React, { Component, useRef } from 'react';
import {Card, Button} from 'tabler-react'
import './bootstrapCSS.css';

import {AiOutlineArrowDown} from 'react-icons/ai';

class CustomerPage extends Component {

  render() {
    this.props.products.map((product, key) => {
    });
    return (
  
      <div id="container">
         
        <h2>Consumer Marketplace</h2>
        <div className="row">
        { this.props.products.map((product, key) => {
          return (
            
              <Card key={key} className="col-md-5 classWithPad">
              <Card.Header>
                <Card.Title><h2><u>{product.name}</u> for sale</h2></Card.Title>
              </Card.Header>
              <Card.Body>
                <h4><b>Crop Traceability</b></h4>
                <p><b>Farmer</b> - {this.props.farmerAddress}</p>
                <AiOutlineArrowDown />
                <p><b>Processor</b> - {this.props.processorAddress}</p>
                <hr/>
                <p>Price per unit: <b>{product.price} Eth</b></p>
                <p>Quantity left: <b>{product.quantity}</b></p>
                <p>Processor ID: <b>{product.processorId}</b></p>
                { product.quantity != 0 
                ?
                <div>
                <input
                id="holdingPercent"
                type="text"
                ref={(input) => { this.quantityToBuy = input }}
                className="form-control classWithPad"
                placeholder="Quantity to buy"
                required />
                { !product.purchased
                        ? <button
                            name={product.marketProductId}
                            value={product.price}
                            quantityToBuy = {this.quantityToBuy}
                            onClick={(event) => {
                              this.props.purchaseProduct(event.target.name, event.target.value, this.quantityToBuy.value, product.processorAddress)
                            }}
                          >
                            Buy
                          </button>
                        : null
                      }
                      </div>
                      : null }
              </Card.Body>
              <Card.Footer>{product.processorAddress}</Card.Footer>
            </Card>
           
        )})}
        </div>
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">Market Product ID</th>
              <th scope="col">Processor ID</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
                console.log(product);
              return(
                <tr key={key}>
                  <th scope="row">{product.marketProductId}</th>
                  <td>{product.processorId}</td>
                  <td>{product.name}</td>
                  <td>{product.price  } Eth</td>
                  <td>{product.quantity}</td>
          <div className="form-group mr-sm-4">
            <input
              id="holdingPercent"
              type="text"
              ref={(input) => { this.quantityToBuy = input }}
              className="form-control"
              placeholder="Quantity to buy"
              required />
          </div>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.marketProductId}
                          value={product.price}
                          quantityToBuy = {this.quantityToBuy}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value, this.quantityToBuy.value, product.processorAddress)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table> */}
      </div>
    );
  }
}
export default CustomerPage;
