import React, { Component, useRef } from 'react';
import { Button, Card } from "tabler-react";
import './bootstrapCSS.css';

class InsurancePage extends Component {

  render() {
    this.props.products.map((product, key) => {
      console.log(product);
    });
    return (
      <div id="content">
        <h1>Add Insurance Company</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.insuranceCompany.value
          const type = this.insuranceType.value
          const trigger = parseInt(this.insuranceTrigger.value)
          const payback = parseInt(this.insurancePayback.value);

          this.props.createInsurance(name, type, trigger, payback)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="insuranceCompany"
              type="text"
              ref={(input) => { this.insuranceCompany = input }}
              className="form-control"
              placeholder="Insurance Company Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="type"
              type="text"
              ref={(input) => { this.insuranceType = input }}
              className="form-control"
              placeholder="Insurance Type"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="trigger"
              type="text"
              ref={(input) => { this.insuranceTrigger = input }}
              className="form-control"
              placeholder="Insurance Trigger"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="payback"
              type="text"
              ref={(input) => { this.insurancePayback = input }}
              className="form-control"
              placeholder="Insurance Payback %"
              required />
          </div>
          {/* <div className="form-group mr-sm-2">
           Expiry Date <input
              id="expiryDate"
              type="date"
              ref={(input) => { this.expiryDate = input }}
              className="form-control"
              placeholder="Expiry Date"
              required />
          </div> */}
          <button type="submit" className="btn btn-primary">Add Insurance Company Details</button>
        </form>
      </div>
    );
  }
}
export default InsurancePage;
