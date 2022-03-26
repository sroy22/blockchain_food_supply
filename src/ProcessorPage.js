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
      <div id="content">
        <h2>All Farmer Products ready to be processed</h2>
        <table className="table">
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
        </table>
      <hr />
        <h2>Processor Account details</h2>
        <div style={{display: "flex", flexWrap: "wrap"}}>

        { this.props.processedGoods.map((product, key) => {
              return(
        <Card className="col-sm-5 classWithPad" key={key}>
          <Card.Header>
            <Card.Title>Farmer #{product.farmerId} : <b>{product.farmerName}</b></Card.Title>
            <Card.Options>
    
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
                    className="form-control"
                    placeholder="Price to sell"
                    required
                  />
                  <input
                    id={key}
                    name="quantityToSell"
                    value={quantityToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control"
                    placeholder="Quantity To Sell"
                    required
                  />
                  <input
                    id={key}
                    name="nameToSell"
                    value={nameToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control"
                    placeholder="Name of Product"
                    required />
                 
            {/* <p><b>Price: </b>{window.web3.utils.fromWei(product.expectedPrice.toString(), 'Ether')} Eth</p>
            <p><b>Location: </b>{product.location}</p>
            <p><b>Quantity: </b>{product.quantity}</p>
            <p><b>Expiry Date: </b>{product.expDate}</p>
            <p><b>Holding Remaining: </b>{product.holding}</p>
            <p><b>Cost to Produce: </b>{product.costToProduce}</p>
            <p><b>Address: </b></p> */}
          </Card.Body>
    </Card>
              )})}

          {/* {this.props.processedGoods.map((product, key) => {
            return (
              <div class="card">
                <div class="container">
                  <h4><b>Farmer Id:</b> {product.farmerId}</h4>
                  <p>Processor Id: {product.processorId}</p>
                  <p>Product Posted: {product.productPosted.toString()}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Processor Address: {product.processorAddress}</p>
                  <input
                    id={key}
                    name="priceToSell"
                    value={priceToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control"
                    placeholder="Price to sell"
                    required
                  />
                  <input
                    id={key}
                    name="quantityToSell"
                    value={quantityToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control"
                    placeholder="Quantity To Sell"
                    required
                  />
                  <input
                    id={key}
                    name="nameToSell"
                    value={nameToSell[key]}
                    type="text"
                    onChange={(input) => { this.updateVal(input) }}
                    className="form-control"
                    placeholder="Name of Product"
                    required />
                  {!product.productPosted
                    ? <button
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
                </div>
              </div>
            );
          })}; */}
        </div>
        {/* <table className="table">
          <thead>
            <tr>
              <th scope="col">Farmer ID</th>
              <th scope="col">Processor ID</th>
              <th scope="col">Product Posted</th>
              <th scope="col">Quantity</th>
              <th scope="col">Processor Address</th>

            </tr>
          </thead>
          <tbody id="productList">
            {this.props.processedGoods.map((product, key) => {
              // console.log(product);
              return (
                <tr key={key}>
                  <th scope="row">{product.farmerId}</th>
                  <td>{product.processorId}</td>
                  <td>{product.productPosted.toString()}</td>
                  <td>{product.quantity}</td>
                  <td>{product.processorAddress}</td>
                  {<div className="form-group mr-sm-4">
                    <input
                      id={key}
                      name="priceToSell"
                      value={priceToSell[key]}
                      type="text"
                      onChange={(input) => { this.updateVal(input) }}
                      className="form-control"
                      placeholder="Price to sell"
                      required />
                  </div>}
                  {<div className="form-group mr-sm-4">
                    <input
                      id={key}
                      name="quantityToSell"
                      value={quantityToSell[key]}
                      type="text"
                      onChange={(input) => { this.updateVal(input) }}
                      className="form-control"
                      placeholder="Quantity To Sell"
                      required />
                  </div>}
                  {<div className="form-group mr-sm-4">
                    <input
                      id={key}
                      name="nameToSell"
                      value={nameToSell[key]}
                      type="text"
                      onChange={(input) => { this.updateVal(input) }}
                      className="form-control"
                      placeholder="Name of Product"
                      required />
                  </div>}
                  {<td>
                    {!product.productPosted
                      ? <button
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
                  </td>}
                </tr>
              )
            })}
          </tbody>
        </table> */}
      </div>
    );
  }
}
export default ProcessorPage;