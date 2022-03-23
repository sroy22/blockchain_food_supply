import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

//import "tabler-react/dist/Tabler.css";
//import { Card, Button } from "tabler-react";


function First (props) {

    return (
      <div id="content">
        <button ><Link to="/investment">Investment</Link></button>
        <button><Link to = {{
            pathname: "/insurance", 
            state: {
                customers: []
                }
            }}>Insurance</Link>
        </button>

        <button> <Link to="/farmer"> Farmer Account</Link></button>
        <button> <Link to="/processor"> Processor</Link></button>


        <Outlet />
      </div>
    );
}

export default First;
