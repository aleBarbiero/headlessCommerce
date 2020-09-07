import React, { Component } from 'react';
import {RiUser3Line} from 'react-icons/ri';
import {ProductContext} from '../../contextAPI';

export default class UserSignin extends Component {

    constructor(){
        super();
        this.state = {
            loading: false,
            errorName: "",
            errorPsw: "",
            newName: "",
            errorNewName: "",
            newSurname: "",
            errorNewSurname: "",
            newUsername: "",
            errorNewUsername: "",
            newPsw: "",
            errorNewPsw: "",
            newEmail: "",
            errorNewEmail: "",
            address: "",
            addressError:"",
            number: "",
            numberError: "",
            city: "",
            cityError: "",
            state: "",
            stateError: "",
            cap: "",
            capError: "",
            email: "",
            emailError: "",
            country: "",
            countryError: ""
        }
    }

    static contextType = ProductContext;

    handleChanges = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name !== "newEmail")
            this.setState({
                [name] : value.replace(/[^a-z0-9]/gi, '')
            })
        else
            this.setState({
                [name] : value
            })
    }//handleChanges

    validate = () => {
        let {signin} = this.context;
        let error = false;
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if(this.state.newName.length < 2){
            this.setState({errorNewName: "Invalid name"})
            error=true;
        }else 
            this.setState({errorNewName: ""})

        if(this.state.newSurname.length < 2){
            this.setState({errorNewSurname: "Invalid surname"});
            error=true;
        }else
            this.setState({errorNewSurname: ""});

        if(this.state.newUsername.length < 2){
            this.setState({errorNewUsername: "Invalid username"});
            error=true;
        }else
            this.setState({errorNewUsername: ""});
        
        if(!(mailFormat.test(this.state.newEmail))){
            this.setState({errorNewEmail: "Invalid e-mail"});
            error=true;
        }else
            this.setState({errorNewEmail: ""});

        if(this.state.address.length < 5){
            this.setState({addressError: "Invalid address"});
            error=true;
        }else
            this.setState({addressError: ""});

        if(this.state.number.length === 0){
            this.setState({numberError: "Invalid number"});
            error=true;
        }else
            this.setState({numberError: ""});

        if(this.state.city.length < 2){
            this.setState({cityError: "Invalid city"});
            error=true;
        }else
            this.setState({cityError:""});

        if(this.state.state.length < 2){
            this.setState({stateError: "Invalid state"});
            error=true;
        }else
            this.setState({stateError: ""});

        if(this.state.cap.toString().length !== 5){
            this.setState({capError: "Invalid code"});
            error=true;
        }else
            this.setState({capError: ""});

        if(this.state.newPsw.length < 5){
            this.setState({errorNewPsw: "Must be at least 5 characters long"})
            error=true;
        }else if(!(/\d/.test(this.state.newPsw))){
            this.setState({errorNewPsw: "Must contain at least a number"})
            error=true;
        }else if (!(/[a-z]/.test(this.state.newPsw))){
            this.setState({errorNewPsw: "Must cointain at least a letter"})
            error=true;
        }else
            this.setState({errorNewPsw: ""})

        if(!error){
            let user = {
                name: this.state.newName,
                surname: this.state.newSurname,
                email: this.state.newEmail,
                username: this.state.newUsername,
                psw: this.state.newPsw
            }
            let address = {
                address: this.state.address,
                number: this.state.number,
                city: this.state.city,
                country: this.state.country,
                cap: this.state.cap,
                state: this.state.state
            }
            signin(user,address);
        }
    }//validate

    
    render() {
        let {loading,loginLoading,logged,signinError,signinLoading} = this.context;
        if(loading || loginLoading || signinLoading)
            return null;
        if(!logged)
            return (
                <div className="checkout-container">
                    <div className="form-wrapper">
                        <div className="form-container">
                            <form action="">
                                <h1>
                                    <RiUser3Line className="checkout-icon"></RiUser3Line> Register
                                </h1>
                                <div className="login">
                                    <div className="name">
                                        <div>
                                            <label htmlFor="newName">Name</label>
                                            <input type="text" name="newName" onChange={this.handleChanges}></input>
                                            <div className="errorForm">
                                                {this.state.errorNewName}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="newSurname">Surname</label>
                                            <input type="text" name="newSurname" onChange={this.handleChanges}></input>
                                            <div className="errorForm">
                                                {this.state.errorNewSurname}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="newEmail">E-mail</label>
                                        <input type="text" name="newEmail" onChange={this.handleChanges}></input>
                                        <div className="errorForm">
                                            {this.state.errorNewEmail}
                                        </div>
                                    </div>
                                    <div className="name">
                                        <div>
                                            <label htmlFor="newUsername">Username</label>
                                            <input type="text" name="newUsername" onChange={this.handleChanges}></input>
                                            <div className="errorForm">
                                                {this.state.errorNewUsername}{signinError}
                                            </div>
                                        </div>    
                                        <div>
                                            <label htmlFor="newPsw">Password</label>
                                            <input type="password" name="newPsw" onChange={this.handleChanges}></input>
                                            <div className="errorForm">
                                                {this.state.errorNewPsw}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="address-info-street">
                                        <div className="country">
                                            <label htmlFor="country">country</label>
                                            <select name="country">
                                                <option value="US" key="US">US (United States)</option>
                                                <option value="IT" key="IT">IT (Italy)</option>
                                                <option value="FR" key="FR">FR (France)</option>
                                                <option value="GB" key="GB">GB (United Kingdom)</option>
                                                <option value="JP" key="JP">JP (Japan)</option>
                                                <option value="CN" key="CN">CN (China)</option>
                                            </select>
                                        </div>
                                        <div className="address">
                                            <label htmlFor="name">address</label>
                                            <input type="text" name="address" onChange={this.handleChanges}/>
                                            <div className="errorForm">
                                                {this.state.addressError}
                                            </div>
                                        </div>
                                        <div className="number">
                                            <label htmlFor="number">n.</label>
                                            <input type="text" name="number" onChange={this.handleChanges}/>
                                            <div className="errorForm">
                                                {this.state.numberError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="address-info">
                                        <div>
                                            <label htmlFor="city">City</label>
                                            <input type="text" name="city" onChange={this.handleChanges}/>
                                            <div className="errorForm">
                                                {this.state.cityError}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="state">State</label>
                                            <input type="text" name="state" onChange={this.handleChanges}/>
                                            <div className="errorForm">
                                                {this.state.stateError}
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="cap">CAP</label>
                                            <input type="number" name="cap" onChange={this.handleChanges}/>
                                            <div className="errorForm">
                                                {this.state.capError}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="login-button">
                                    <button className="btn-primary" onClick={e => {
                                        e.preventDefault();
                                        this.validate();}
                                    }>Sign in</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )
        else
            return null;
    }
}
