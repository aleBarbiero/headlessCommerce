import React, { Component } from 'react'

import logo from '../images/logo.png';
import {BsChevronBarRight} from 'react-icons/bs';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
    state={
        isOpen:false
    }
    mobileMenu = () =>{
        this.setState({isOpen:!this.state.isOpen})
    }
    render() {
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <Link to="/">
                            <img src={logo} alt="PhotoStudio" className="logo-img"/>
                        </Link>
                        <button type="button" className="nav-btn" onClick={this.mobileMenu}>
                            <BsChevronBarRight className="nav-icon"></BsChevronBarRight>
                        </button>
                    </div>
                    <ul className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/list">Prodotti</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
