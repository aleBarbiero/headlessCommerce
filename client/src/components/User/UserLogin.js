import React, { Component } from 'react';
import {RiLoginCircleLine} from 'react-icons/ri';
import {ProductContext} from '../../contextAPI';
import Loading from '../Cart/LoadingCart';
import Title from '../../components/Title'

export default class UserLogin extends Component {

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

    validateLog = () => {
        let {login} = this.context;
        let error = false;
        if(this.state.username.length === 0){
            this.setState({errorName: "Insert your username"})
            error=true;
        }else
            this.setState({errorName: ""})
        
        if(this.state.psw.length === 0){
            this.setState({errorPsw: "Insert your password"})
            error=true;
        }else
            this.setState({errorPsw: ""})

        if(!error)
            login(this.state.username,this.state.psw)
    }//validateLog

    render() {
        let {loginError,loading,loginLoading,logged,signinLoading} = this.context;
        if(loading || loginLoading || signinLoading)
            return <Loading></Loading>
        if(!logged)
            return (
                <>
                    <Title title="User page"></Title>
                    <div className="checkout-container">
                        <div className="form-wrapper">
                            <div className="form-container">
                                <form action="">
                                    <h1>
                                        <RiLoginCircleLine className="checkout-icon"></RiLoginCircleLine> Log In
                                    </h1>
                                    <div className="login">
                                        <div className="name">
                                            <div>
                                                <label htmlFor="username">Username</label>
                                                <input type="text" name="username" onChange={this.handleChanges}></input>
                                                <div className="errorForm">
                                                    {this.state.errorName}
                                                </div>
                                            </div>
                                            <div>
                                                <label htmlFor="psw">Password</label>
                                                <input type="password" name="psw" onChange={this.handleChanges}></input>
                                                <div className="errorForm">
                                                    {this.state.errorPsw}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="login-button">
                                        <button className="btn-primary" onClick={e => {
                                            e.preventDefault();
                                            this.validateLog();}
                                        }>Log in</button>
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
            return null;
    }
}
