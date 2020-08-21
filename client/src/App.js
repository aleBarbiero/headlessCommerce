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
import Thanks from './pages/Thanks';
import User from './pages/User'

class App extends Component {
    render(){
        return <>
        <Navbar></Navbar>
            <div className="main-content">
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/list/" component={List}></Route> 
                <Route exact path="/cart/" component={Cart}></Route>
                <Route exact path="/user/" component={User}></Route>
                <Route exact path="/checkout/" component={Checkout}></Route>
                <Route exact path="/thanks/" component={Thanks}></Route>
                <Route exact path="/:element/" component={Details}></Route>
                <Route path="*" component={Error}></Route>
            </Switch>
            </div>
            <Footer></Footer>
        </>;
    }
}

export default App;