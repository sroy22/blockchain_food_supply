import React, { Component, useRef } from 'react';

class CustomerPage extends Component {

  render() {
    this.props.products.map((product, key) => {
    });
    return (
      <div id="content">
        <h2>Products available to be sold</h2>
        <table className="table">
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
        </table>
      </div>
    );
  }
}
export default CustomerPage;
