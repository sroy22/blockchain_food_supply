import React, { Component, useRef } from 'react';
import { Button, Card } from "tabler-react";
import './bootstrapCSS.css';

class InsuranceManagementView extends Component {
    render() {
        this.props.products.map((product, key) => {
        });
        return (
          <div id="content">
            <h2>Manage Insurance Payouts to Farmers</h2>
               <div className="container">
              <div className="row">
            { this.props.products.map((product, key) => {
                  return(
            <Card className="col-sm-5 classWithPad" key={key}>
              <Card.Header>
              <Card.Title>Insurance #{product.insuranceFarmerId}</Card.Title>
              </Card.Header>
              <Card.Body>
                <p>Farmer ID : {product.farmerId}</p>
                <p><b>Premium: </b>{window.web3.utils.fromWei(product.premium.toString(), 'Ether')} Eth</p>
                { !product.investmentMade
                          ? <button
                              name={product.farmerId}
                              value = {product.insuranceFarmerId}
                              onClick={(event) => {
                                this.props.repayToInvestor(event.target.name, event.target.value, product.insuranceCompanyId)
                              }}
                            >
                              Reimburse farmer
                            </button>
                          : null
                        }
                        
              </Card.Body>
              <Card.Footer>{product.farmerAddress}</Card.Footer>          
        </Card>
                  )})}
                  </div>
                  </div>
          </div>
        );
      }
    }


export default InsuranceManagementView;