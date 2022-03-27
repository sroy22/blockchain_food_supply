import React, { Component } from 'react';
import {Nav} from "tabler-react"

class Navbar extends Component {

  render() {
    return (

<Nav>
 <Nav.Item value="CSC 2512 Blockchain Food Supply" id="account" to="https://github.com/sroy22/blockchain_food_supply" icon="globe"/>
  <Nav.Item icon="home" value="Home" to="/" />
  <Nav.Item hasSubNav value="Menu" icon="menu">
    <Nav.SubItem value="Farmer" to="/farmer" />
    <Nav.SubItem value="Processor" to="/processor" />
    <Nav.SubItem value="Investor" to="/investment" />
    <Nav.SubItem value="Insurance" to="/insurance" />
    {/* <Nav.SubItem value="Insurance" to={{
            pathname: "/insurance", 
            state: {
                customers: []
                }
            }}/> */}
    <Nav.SubItem value="Customer" to="/customer" />
  </Nav.Item>
  <Nav.Item active icon="user" id="account">
   {this.props.account}
  </Nav.Item>
</Nav>
    );
  }
}

export default Navbar;
