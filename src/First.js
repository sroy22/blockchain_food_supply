import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";
import Navbar from './Navbar'

import "tabler-react/dist/Tabler.css";
import { Card, Button } from "tabler-react";


function First (props) {

    return (
      
      <div id="container">
         <Navbar  />
  <Card>
  <Card.Header>
    <Card.Title>Farmer</Card.Title>
    <Card.Options>
      <Button color="primary" size="sm">
        <Link to="/farmer" style={{color:"white"}}> Farmer Account</Link>
      </Button>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Farmer account page. Place your crop yields on the market.
  </Card.Body>
</Card>
<Card>
  <Card.Header>
    <Card.Title>Investor</Card.Title>
    <Card.Options>
      <Button color="primary" size="sm">
      <Link to="/farmer" style={{color:"white"}}> Invest </Link>
      </Button>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Invest ETH into a particular farmer's crop. 
  </Card.Body>
</Card>
<Card>
  <Card.Header>
    <Card.Title>Insurance</Card.Title>
    <Card.Options>
      <Button color="primary" size="sm" >
      <Link to = {{
            pathname: "/insurance", 
            state: {
                customers: []
                }
            }} style={{color:"white"}}>Insurance</Link>
      </Button>
    </Card.Options>
  </Card.Header>
  <Card.Body>
  Buy flood, drought or wind insurance as a farmer. Reimburse insurance payments to farmers.
  </Card.Body>
</Card>
<Card>
  <Card.Header>
    <Card.Title>Processor</Card.Title>
    <Card.Options>
      <Button color="primary" size="sm">
      <Link to="/processor" style={{color:"white"}}> Processor</Link>
      </Button>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Processor account page. Buy yielded crops from a farmer and set products for sale on the market. 
  </Card.Body>
</Card>
<Card>
  <Card.Header>
    <Card.Title>Customer</Card.Title>
    <Card.Options>
      <Button color="primary" size="sm">
      <Link to="/customer" style={{color:"white"}}> Customer</Link>
      </Button>
    </Card.Options>
  </Card.Header>
  <Card.Body>
    Buy finished products from the market. 
  </Card.Body>
</Card>

        <Outlet />
      </div>
      
      
    );
}

export default First;
