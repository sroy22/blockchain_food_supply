import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import { updateVariableDeclaration } from 'typescript';
import { Button, Card, Form} from "tabler-react";
import './bootstrapCSS.css';

class ProcessorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceToSell: props.priceToSell,
      quantityToSell: props.quantityToSell,
      nameToSell: props.nameToSell
    }

    this.updateVal = this.updateVal.bind(this);
  }

  updateVal(e) {
    console.log(e, e.target);

    // let val = this.state[e.target.name];
    // val[e.target.id] = e.target.value;

    // console.log(val);

    // this.setState({
    //   [e.target.name]: val
    // })

    this.props.updateVal(e, e.target.id, e.target.name, e.target.value);
  }

  render() {
    const { priceToSell, quantityToSell, nameToSell } = this.props;
    console.log(">>>>", this.props)
    return (
      <div id="container">
        <h2>Products ready for processing</h2>
        <div className='row'>
        {this.props.products.map((product, key) => {
           return (
            <div>
            { product.quantity != 0 ?
<Card key={key} className="col-sm-5 classWithPad">
  <Card.Header>
    <Card.Title> #{product.farmerId} Farmer: <b>{product.farmerName}</b> selling <b>{product.crop}</b> </Card.Title>
  </Card.Header>
  <Card.Body>
            <p>Agriculture Product: <b>{product.crop}</b></p>
            <p>Price per unit: <b>{window.web3.utils.fromWei(product.expectedPrice.toString(), 'Ether')} Eth</b></p>
            <p>Location: <b>{product.landLocation}</b></p>
            <p>Quanity Remaining: <b>{product.quantity} units</b></p>
            <p>Expiry Date: <b>{product.expDate}</b></p>
            <p>Percentage holdings: <b>{product.holding}%</b></p>
            <p>Farmer cost to produce yield: <b>{product.costToProduce} ETH</b></p>
            <input 
                      id="quantityToBuy"
                      type="text"
                      ref={(input) => { this.quantityToBuy = input }}
                      className="form-control classWithPad"
                      placeholder="Quantity to buy"
                      required />
      {!product.purchased
                      ? <button
                        name={product.farmerId}
                        value={product.expectedPrice}
                        quantityToBuy={this.quantityToBuy}
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.purchaseProduct(product.crop, event.target.name, this.quantityToBuy.value, event.target.value)
                        }}
                      >
                        Buy
                      </button>
                      : null
                    }
  </Card.Body>
  <Card.Footer>Farmer Address: <b>{product.owner}</b></Card.Footer>
</Card>
: null }
</div>
           )})}
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Crop</th>
              <th scope="col">Price</th>
              <th scope="col">Location</th>
              <th scope="col">Quantity</th>
              <th scope="col">Expiry Date</th>
              <th scope="col">Holding</th>
              <th scope="col">Cost to produce</th>
              <th scope="col">Address</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            {this.props.products.map((product, key) => {
              console.log(this.quantityToBuy);
              return (
                <tr key={key}>
                  <th scope="row">{product.farmerId}</th>
                  <td>{product.farmerName}</td>
                  <td>{product.crop}</td>
                  <td>{window.web3.utils.fromWei(product.expectedPrice.toString(), 'Ether')} Eth</td>
                  <td>{product.landLocation}</td>
                  <td>{product.quantity}</td>
                  <td>{product.expDate}</td>
                  <td>{product.holding}</td>
                  <td>{product.costToProduce}</td>
                  <td>{product.owner}</td>
                  <div className="form-group mr-sm-4">
                    <input
                      id="quantityToBuy"
                      type="text"
                      ref={(input) => { this.quantityToBuy = input }}
                      className="form-control"
                      placeholder="Quantity to buy"
                      required />
                  </div>
                  <td>
                    {!product.purchased
                      ? <button
                        name={product.farmerId}
                        value={product.expectedPrice}
                        quantityToBuy={this.quantityToBuy}
                        onClick={(event) => {
                          event.preventDefault()
                          this.props.purchaseProduct(product.crop, event.target.name, this.quantityToBuy.value, event.target.value)
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
      <hr />
        <h2>Products ready for market</h2>
        <div className='row'>

        { this.props.processedGoods.map((product, key) => {
          
              return(
                <div>
                { product.quantity != 0 ?
        <Card className="col-sm-5 classWithPad" key={key}>
          <Card.Header>
            <Card.Title><h2>{product.item}</h2></Card.Title>
            <Card.Options>
    
    </Card.Options>
          </Card.Header>
          <Card.Body>
            <p><b>Processor ID: </b>{product.processorId}</p>
            <p><b>Processor Address:</b> {product.processorAddress}</p>
            <p>Product Posted: {product.productPosted.toString()}</p>
            <p>Quantity: {product.quantity}</p>
            <input
                    id={key}
                    name="priceToSell"
                    value={priceToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control classWithPad"
                    placeholder="Price to sell"
                    required
                  />
                  <input
                    id={key}
                    name="quantityToSell"
                    value={quantityToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control classWithPad"
                    placeholder="Quantity To Sell"
                    required
                  />
                  <input
                    id={key}
                    name="nameToSell"
                    value={nameToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control classWithPad"
                    placeholder="Name of Product"
                    required />
          </Card.Body>
          <Card.Footer>
          {!product.productPosted
                    ? <button
                    color="Primary"
                      name={product.processorId}
                      onClick={(event) => {
                        event.preventDefault();
                        console.log(key);

                        this.props.createMarketProduct(event.target.name, key)

                        this.props.updateVal(null, key, "priceToSell", '');
                        this.props.updateVal(null, key, "quantityToSell", '');
                        this.props.updateVal(null, key, "nameToSell", '');
                      }}
                    >
                      Post to Market
                    </button>
                    : null
                  }
          </Card.Footer>
    </Card> 
    : null }
    </div>
              )})}

        </div>
      </div>
    );
  }
}
export default ProcessorPage;