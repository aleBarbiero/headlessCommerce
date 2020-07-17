import React from 'react';
import './App.css';
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import Error from './pages/Error'

import {Route, Switch} from 'react-router-dom';

import Navbar from './components/Navbar';

function App() {
    return < >
    <Navbar></Navbar>
        <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/list/" component={List}></Route>
            <Route exact path="/list/:element" component={Details}></Route>
            <Route component={Error}></Route>
        </Switch>
    </>;
}

export default App;