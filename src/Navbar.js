import React, { Component } from 'react';
import {Nav} from "tabler-react"

class Navbar extends Component {

  render() {
    return (

<Nav>
  <Nav.Item hasSubNav value="CSC 2512 blockchain_food_supply" icon="globe" to="https://github.com/sroy22/blockchain_food_supply">
  </Nav.Item>
  <Nav.Item active icon="user" id="account">
   {this.props.account}
  </Nav.Item>
</Nav>
    );
  }
}

export default Navbar;
