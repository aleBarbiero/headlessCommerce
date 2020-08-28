import React, { Component } from 'react';
import {MdLocalShipping} from 'react-icons/md';
import {RiUser3Line} from 'react-icons/ri';
import {BsListCheck} from 'react-icons/bs';
import {ProductContext} from '../../contextAPI';
import Title from '../Title';
import Wishlist from './Wishlist';

export default class UserDetails extends Component {
    
    static contextType = ProductContext;

    render() {
        let {user,logout,logged} = this.context;
        if(logged)
            return (
                <>
                    <Title title={user.username}></Title>
                    <div className="checkout-container">
                        <div className="form-wrapper">
                            <div className="form-container">
                                <form action="">
                                    <h1>
                                        <RiUser3Line className="checkout-icon"></RiUser3Line> User Details
                                    </h1>
                                    <div className="login">
                                        <div className="name">
                                            <div>
                                                <label htmlFor="name">Name</label>
                                                <input type="text" name="name" value={user.name} disabled={true}></input>
                                            </div>
                                            <div>
                                                <label htmlFor="surname">Surname</label>
                                                <input type="text" name="surname" value={user.surname} disabled={true}></input>
                                            </div>
                                        </div>
                                        <div className="name">
                                            <div>
                                                <label htmlFor="email">Email</label>
                                                <input type="text" name="email" value={user.email} disabled={true}></input>
                                            </div>
                                            <div>
                                                <label htmlFor="username">Username</label>
                                                <input type="text" name="username" value={user.username} disabled={true}></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="login">
                                        <h1>
                                            <MdLocalShipping className="checkout-icon"></MdLocalShipping> Shipping Details
                                        </h1>
                                        <div className="address-info-street">
                                            <div className="country">
                                                <label htmlFor="country">Country</label>
                                                <input type="text" name="country" value={user.address.country} disabled={true}></input>
                                            </div>
                                            <div className="address">
                                                <label htmlFor="address">Address</label>
                                                <input type="text" name="address" value={user.address.address} disabled={true}></input>
                                            </div>
                                            <div className="number">
                                                <label htmlFor="number">Number</label>
                                                <input type="text" name="number" value={user.address.number} disabled={true}></input>
                                            </div>
                                        </div>
                                        <div className="address-info">
                                            <div className="city">
                                                <label htmlFor="city">City</label>
                                                <input type="text" name="city" value={user.address.city} disabled={true}></input>
                                            </div>
                                            <div className="state">
                                                <label htmlFor="state">State</label>
                                                <input type="text" name="state" value={user.address.state} disabled={true}></input>
                                            </div>
                                            <div className="cap">
                                                <label htmlFor="cap">CAP</label>
                                                <input type="text" name="cap" value={user.address.cap} disabled={true}></input>
                                            </div>
                                        </div> 
                                    </div>
                                </form>
                                <button className="btn-primary red logout" onClick={logout}>Log out</button>
                            </div>
                        </div>
                    </div>
                    <div className="checkout-container">
                        <div className="form-wrapper">
                            <div className="form-container">
                                <h1>
                                    <BsListCheck className="checkout-icon"></BsListCheck> Your Wishlist
                                </h1>
                                <Wishlist></Wishlist>
                            </div>
                        </div>
                    </div>
                </>
            )
        else
            return null;
    }
}
