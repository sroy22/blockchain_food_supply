import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from './Navbar'

import "tabler-react/dist/Tabler.css";
import { Card, Button } from "tabler-react";
import './bootstrapCSS.css';

function First (props) {

    return (
      
<div id="container">
         <Navbar  />
<div className='row' >
  <Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Farmer</Card.Title>
  </Card.Header>
  <Card.Body>
    Farmer account page. Place your crop yields on the market.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
        <Link to="/farmer" style={{color:"white"}}> Farmer Account</Link>
      </Button>
  </Card.Footer>
</Card>
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Investor</Card.Title>
  </Card.Header>
  <Card.Body>
    Invest ETH into a particular farmer's crop. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/investment" style={{color:"white"}}> Invest </Link>
      </Button>
  </Card.Footer>
</Card>
{/* <Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Insurance</Card.Title>
  </Card.Header>
  <Card.Body>
  Buy flood, drought or wind insurance as a farmer. Reimburse insurance payments to farmers.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm" >
      <Link to = {{
            pathname: "/insurance", 
            state: {
                customers: []
                }
            }} style={{color:"white"}}>Buy Insurance</Link>
      </Button>
  </Card.Footer>
</Card> */}
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Processor</Card.Title>
    <Card.Options>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Processor account page. Buy yielded crops from a farmer and set products for sale on the market. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/processor" style={{color:"white"}}> Processor</Link>
      </Button>
  </Card.Footer>
</Card>
<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Customer</Card.Title>
  </Card.Header>
  <Card.Body>
    Buy finished products from the market. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/customer" style={{color:"white"}}> Go to Market</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Create Insurance</Card.Title>
  </Card.Header>
  <Card.Body>
    Create risk insurance plans as an insurance company.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/insuranceCompany" style={{color:"white"}}> Create insurance</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Insurance Management</Card.Title>
  </Card.Header>
  <Card.Body>
    Manage inurance payouts to farmers.
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/insuranceManagement" style={{color:"white"}}> Manage Insurance</Link>
      </Button>
  </Card.Footer>
</Card>

<Card className='col-md-2 classWithPad'>
  <Card.Header>
    <Card.Title>Buy Insurance</Card.Title>
  </Card.Header>
  <Card.Body>
    Buy disaster and risk insurance plans as a farmer. 
  </Card.Body>
  <Card.Footer>
  <Button color="primary" size="sm">
      <Link to="/buyInsurance" style={{color:"white"}}> Buy the insurance</Link>
      </Button>
  </Card.Footer>
</Card>

        <Outlet />
      </div> </div>
    );
}

export default First;
