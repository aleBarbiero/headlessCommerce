import React, { Component } from 'react';
import './style/style.css';
import Home from './pages/Home'
import List from './pages/List'
import Details from './pages/Details'
import Error from './pages/Error'
import {Route, Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

class App extends Component {
    render(){
        return <>
        <Navbar></Navbar>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/list/" component={List}></Route>
                <Route exact path="/list/:element" component={Details}></Route>
                <Route component={Error}></Route>
            </Switch>
            <Footer></Footer>
        </>;
    }
}

export default App;