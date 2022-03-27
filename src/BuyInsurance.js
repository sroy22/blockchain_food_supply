import React, { Component, useRef } from 'react';

class BuyInsurance extends Component {

  render() {
    this.props.products.map((product, key) => {
      console.log(product);
    });
    return (
      <div id="content">
        <h2>Insurance Products available to be sold</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Insurance Company ID</th>
              <th scope="col">Insurance Company Address</th>
              <th scope="col">Name</th>
              <th scope="col">Type</th>
              <th scope="col">Trigger</th>

              <th scope="col">Payout %</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
                console.log(product);
              return(
                <tr key={key}>
                  <th scope="row">{product.insuranceCompanyId}</th>
                  <td>{product.insuranceCompanyAddress}</td>
                  <td>{product.name}</td>
                  <td>{product.typeOf  } </td>
                  <td>{product.trigger}</td>
                  <td>{product.payoutValue} % </td>
          <div className="form-group mr-sm-4">
            <input
              id="premiumValue"
              type="text"
              ref={(input) => { this.premiumValue = input }}
              className="form-control"
              placeholder="Premium Value"
              required />
          </div>
                  <td>
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
export default BuyInsurance;
