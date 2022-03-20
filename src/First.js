import React, { Component } from 'react';
import { Outlet, Link } from "react-router-dom";

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

        <Outlet />
      </div>
    );
}

export default First;
