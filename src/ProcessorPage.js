import React, { Component } from 'react';

class ProcessorPage extends Component {


  render() {
    this.props.products.map((product, key) => {
    });
    return (
      <div id="content">
        <h2>Invest in Farmer</h2>
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
            { this.props.products.map((product, key) => {
              console.log(this.quantityToBuy);
              return(
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
                    { !product.purchased
                      ? <button
                          name={product.farmerId}
                          value={product.expectedPrice}
                          quantityToBuy = {this.quantityToBuy}
                          onClick={(event) => {
                            event.preventDefault()
                            this.props.purchaseProduct(product.crop, event.target.name, this.quantityToBuy.value, event.target.value  )
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
        <p>&nbsp;</p>
        <h2>Farmer Account details</h2>
        <table className="table">
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
            { this.props.processedGoods.map((product, key) => {
              console.log(product);
              return(
                <tr key={key}>
                  <th scope="row">{product.farmerId}</th>
                  <td>{product.processorId}</td>
                  <td>{product.productPosted.toString()}</td>
                  <td>{product.quantity}</td>
                  <td>{product.processorAddress}</td>
                            {<div className="form-group mr-sm-4">
            <input
              id="priceToSell"
              type="text"
              ref={(input) => { this.priceToSell = input }}
              className="form-control"
              placeholder="Price to sell"
              required />
          </div>}
          {<div className="form-group mr-sm-4">
            <input
              id="quantityToSell"
              type="text"
              ref={(input) => { this.quantityToSell = input }}
              className="form-control"
              placeholder="Quantity To Sell"
              required />
          </div>}
          {<div className="form-group mr-sm-4">
            <input
              id="nameToSell"
              type="text"
              ref={(input) => { this.nameToSell = input }}
              className="form-control"
              placeholder="Name of Product"
              required />
          </div>}
                            { <td>
                    { !product.productPosted
                      ? <button
                          name={product.processorId}
                          priceToSell = {this.priceToSell}
                          quantityToSell = {this.quantityToSell}
                          nameToSell = {this.nameToSell}
                          onClick={(event) => {
                            event.preventDefault();
                            this.props.createMarketProduct(event.target.name,   this.priceToSell.value, this.quantityToSell.value, this.nameToSell.value)
                          }}
                        >
                          Post to Market
                        </button>
                      : null
                    }
                    </td> }
                  </tr>
                                )
                              })}
                              </tbody>
                            </table>
      </div>
    );
  }
}
export default ProcessorPage;