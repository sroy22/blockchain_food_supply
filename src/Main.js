import React, { Component } from 'react';

class Main extends Component {


  render() {
    console.log(this.props.products);
    this.props.products.map((product, key) => {
console.log(product.farmerName);
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
          this.props.createProduct(name, location, crop, quantity, price, expiryDate, holding)
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
              placeholder="Expected Price"
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
            <input
              id="expiryDate"
              type="text"
              ref={(input) => { this.expiryDate = input }}
              className="form-control"
              placeholder="Expiry Date"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="holding"
              type="text"
              ref={(input) => { this.holding = input }}
              className="form-control"
              placeholder="Holding"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Farmer Details</button>
        </form>
        <p>&nbsp;</p>
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
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
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
                  <div className="form-group mr-sm-2">
            <input
              id="amount"
              type="text"
              ref={(input) => { this.amount = input
               }}
              className="form-control"
              placeholder="Investment amount"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="holdingPercent"
              type="text"
              ref={(input) => { this.holdingPercent = input }}
              className="form-control"
              placeholder="Holding Percent"
              required />
          </div>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.farmerId}
                          value={product.expectedPrice}
                          amount = {this.amount}
                          holdingPercent = {this.holdingPercent}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value, this.amount.value, this.holdingPercent.value)
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

export default Main;
