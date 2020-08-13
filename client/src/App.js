import React, { Component } from 'react';
import './style/style.css';
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import Cart from './components/Cart'
import Error from './pages/Error'
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Checkout from './components/Checkout/Checkout';
import Thanks from './pages/Thanks'

class App extends Component {
    render(){
        return <>
        <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/list/" component={List}></Route>
                <Route exact path="/list/:element" component={Details}></Route>
                <Route exact path="/cart" component={Cart}></Route>
                <Route exact path="/cart/checkout" component={Checkout}></Route>
                <Route exact path="/cart/checkout/thanks" component={Thanks}></Route>
                <Route component={Error}></Route>
            </Switch>
            <Footer></Footer>
        </>;
    }
}

export default App;