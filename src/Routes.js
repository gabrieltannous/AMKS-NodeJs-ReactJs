import React, { Component } from 'react';
import Locations from './components/locations';
import Positions from './components/positions';
import {BrowserRouter, Route} from 'react-router-dom';
import App from './App';

const routes = (
    <BrowserRouter>
        <Route path='/' Component={App}/> 
        <Route path='/locations' Component={Locations}/> 
    </BrowserRouter>
);

export default routes;