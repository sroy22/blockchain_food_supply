import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import First from './First';
import Weather from './Weather';
import reportWebVitals from './reportWebVitals';
import FarmerAccount from './FarmerAccount';
import Processor from './Processor';
import Customer from './Customer';
import InsuranceCompany from './InsuranceCompany';
import FarmerInsurance from './FarmerInsurance';
import InsuranceManagement from './InsuranceManagement';

ReactDOM.render(

  <BrowserRouter>
    <Routes>  
        <Route path="/investment/" element={<App />} />
        <Route path="/insurance/" element={<Weather />} />
        <Route path="/farmer" element = {<FarmerAccount />} />
        <Route path="/processor" element = {<Processor />} />
        <Route path="/customer" element = {<Customer />} />
        <Route path="/insuranceCompany" element = {<InsuranceCompany />} />
        <Route path="/buyinsurance" element = {<FarmerInsurance />} />
        <Route path="/insuranceManagement" element={<InsuranceManagement/>}/>
        <Route path="/" element={<First />}>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
