import React, { Component } from 'react';
import {ProductContext} from '../contextAPI';
import {RiUser3Line} from 'react-icons/ri';
import {MdLocalShipping} from 'react-icons/md'
import Title from '../components/Title'

export default class User extends Component {

    constructor(){
        super();
        this.state = {
            username: "",
            psw: "",
            loading: false,
            errorName: "",
            errorPsw: ""
        }
    }

    static contextType = ProductContext;

    handleChanges = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }

    validate = () => {
        let {login} = this.context;
        if(this.state.username.length === 0)
            this.setState({errorName: "Insert your username"})
        else
            this.setState({errorName: ""})
        
        if(this.state.psw.length === 0)
            this.setState({errorPsw: "Insert your password"})
        else
            this.setState({errorPsw: ""})

        if(this.state.errorPsw === "" && this.state.errorName === "")
            login(this.state.username,this.state.psw)
    }//validate

    render() {
        let {logged,loginError,user,logout} = this.context;
        if(!logged)
            return(
                <>
                    <Title title="Login"></Title>
                    <div className="checkout-container">
                        <div className="form-wrapper">
                            <div className="form-container">
                                <form action="">
                                    <h1>
                                        <RiUser3Line className="checkout-icon"></RiUser3Line> Login
                                    </h1>
                                    <div className="login">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" onChange={this.handleChanges}></input>
                                        <div className="errorForm">
                                            {this.state.errorName}
                                        </div>
                                        <label htmlFor="psw">Password</label>
                                        <input type="password" name="psw" onChange={this.handleChanges}></input>
                                        <div className="errorForm">
                                            {this.state.errorPsw}
                                        </div>
                                    </div>
                                    <div className="login-button">
                                        <button className="btn-primary" onClick={e => {
                                            e.preventDefault();
                                            this.validate();}
                                        }>Login</button>
                                    </div>
                                    <div className="errorForm">
                                        {loginError}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        else
            return (
                <>
                    <Title title={user.username}></Title>
                    <div className="checkout-container">
                        <div className="form-wrapper">
                            <div className="form-container">
                                <form action="">
                                    <h1>
                                        <RiUser3Line className="checkout-icon"></RiUser3Line> User details
                                    </h1>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" name="name" value={user.name} disabled={true}></input>
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" name="surname" value={user.surname} disabled={true}></input>
                                        <label htmlFor="email">Email</label>
                                        <input type="text" name="email" value={user.email} disabled={true}></input>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name="username" value={user.username} disabled={true}></input>
                                    <h1>
                                        <MdLocalShipping className="checkout-icon"></MdLocalShipping> Shipping Details
                                    </h1>
                                        <label htmlFor="address">Address</label>
                                        <input type="text" name="address" value={user.address.address} disabled={true}></input>
                                        <label htmlFor="number">Number</label>
                                        <input type="text" name="number" value={user.address.number} disabled={true}></input>
                                        <label htmlFor="city">City</label>
                                        <input type="text" name="city" value={user.address.city} disabled={true}></input>
                                        <label htmlFor="cap">CAP</label>
                                        <input type="text" name="cap" value={user.address.cap} disabled={true}></input>
                                        <label htmlFor="country">Country</label>
                                        <input type="text" name="country" value={user.address.country} disabled={true}></input>
                                        <label htmlFor="state">State</label>
                                        <input type="text" name="state" value={user.address.state} disabled={true}></input>
                                </form>
                                <button className="btn-primary-red" onClick={logout}>Log out</button>
                            </div>
                        </div>
                    </div>
                </>
            )
    }
}
