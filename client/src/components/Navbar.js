import React, { Component } from 'react'
import logo from '../images/logo.png';
import {BsChevronBarRight} from 'react-icons/bs';
import {RiShoppingCartLine, RiUser3Line} from 'react-icons/ri';
import {Link} from 'react-router-dom';
import {ProductContext} from '../contextAPI'

export default class Navbar extends Component {
    constructor(props){
        super(props);
        this.state={
            isOpen:false
        }
    }

    static contextType = ProductContext;
    
    mobileMenu = () =>{
        this.setState({isOpen:!this.state.isOpen})
    }
    render() {
        let {cart} = this.context;
        return (
            <nav className="navbar">
                <div className="nav-center">
                    <div className="nav-header">
                        <button type="button" className="nav-btn">
                            <Link to="/cart">
                                <RiShoppingCartLine className="nav-icon"></RiShoppingCartLine>
                            </Link>
                        </button>
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
                            <Link to="/list">Products</Link>
                        </li>
                        <li>
                            <Link to="/user">
                                <RiUser3Line></RiUser3Line>
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                <RiShoppingCartLine></RiShoppingCartLine>
                            </Link>
                        </li>
                        {
                            cart.length > 0 ? <li className="cart">({cart.length})</li> : ""
                        }
                    </ul>
                </div>
            </nav>
        )
    }
}
