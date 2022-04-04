import React, { useState, Component } from 'react';
import {Nav} from "tabler-react"

class Navbar extends Component {
  
  render() { 
    return (
      <div>
<Nav>
 <Nav.Item value="CSC 2512 Blockchain Food Supply" id="account" to="https://github.com/sroy22/blockchain_food_supply" icon="globe"/>
  <Nav.Item icon="home" value="Home" to="/" />
  <Nav.Item hasSubNav value="Menu" icon="menu">
    <Nav.SubItem value="Farmer" to="/farmer" />
    <Nav.SubItem value="Processor" to="/processor" />
    <Nav.SubItem value="Investor" to="/investment" />
    <Nav.SubItem value="Create Insurance" to="/insuranceCompany" />
    <Nav.SubItem value="Manage Insurance" to="/insuranceManagement" />
    <Nav.SubItem value="Buy Insurance" to="/buyinsurance" />
    <Nav.SubItem value="Customer Market" to="/customer" />
  </Nav.Item>
  <Nav.Item active icon="user" id="account">
   {this.props.account}
  </Nav.Item>
</Nav>
</div>
    );
  }
}

export default Navbar;
