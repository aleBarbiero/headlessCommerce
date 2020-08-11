import React, { Component } from 'react'
import {MdLocalShipping} from 'react-icons/md';
import {GrCreditCard} from 'react-icons/gr';
import CheckoutList from './CheckoutList.js';
import Title from '../Title';
import {ProductContext} from '../../contextAPI';
import Error from '../../pages/Error';
import Loading from '../Cart/LoadingCart';

export default class Checkout extends Component {

    constructor(){
        super();
        this.state = {
            name: "",
            nameError: "",
            surname: "",
            surnameError: "",
            address: "",
            addressError:"",
            num: null,
            numError: "",
            city: "",
            cityError: "",
            state: "",
            stateError: "",
            email: "",
            emailError: ""
        }
    }

    static contextType = ProductContext;

    componentDidMount(){
        window.scrollTo(0,0);
    }

    handleChanges = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
    }

    render() {
        const {cart,cartLoading,cartTotal} = this.context;
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = [];
        for(var i=2020;i<2030;i++)
            year.push(i);
        if(cartLoading)
            return <Loading></Loading>
        else if(cart.length === 0)
            return <Error></Error>
        else 
            return (
            <>
            <Title title="checkout"></Title>
            <div className="checkout-container">
                <div className="form-wrapper">
                    <div className="form-container">
                        <form action="">
                            <h1>
                                <MdLocalShipping className="checkout-icon"></MdLocalShipping> Shipping Details
                            </h1>
                            <div className="name">
                                <div>
                                    <label htmlFor="name">name</label>
                                    <input type="text" name="name"/>
                                </div>
                                <div>
                                    <label htmlFor="surname">surname</label>
                                    <input type="text" name="surname"/>
                                </div>
                            </div>
                            <div className="email">
                                <label htmlFor="email">e-mail</label> 
                                <input type="text" name="emai"/>
                                </div>
                            <div className="address-info-street">
                                <div>
                                    <label htmlFor="country">country</label>
                                    <input type="text" name="country"/>
                                </div>
                                <div className="address">
                                    <label htmlFor="name">address</label>
                                    <input type="text" name="address"/>
                                </div>
                                <div className="number">
                                    <label htmlFor="number">n.</label>
                                <input type="text" name="number"/>
                                </div>
                            </div>
                            <div className="address-info">
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city"/>
                                </div>
                                <div>
                                    <label htmlFor="state">State</label>
                                    <input type="text" name="state"/>
                                </div>
                                <div>
                                    <label htmlFor="cap">CAP</label>
                                    <input type="text" name="cap"/>
                                </div>
                            </div>
                            <h1>
                                <GrCreditCard className="checkout-icon"></GrCreditCard> Payment Information
                            </h1>
                            <div className="cc-num">
                                <label htmlFor="card-num">Credit Card Number</label>
                                <input type="text" name="card-num"/>
                            </div>
                            <div className="cc-info">
                                <div className="expires">
                                    <label htmlFor="expires">Expires</label>
                                    <div className="selects">
                                        <select name="month">
                                            {
                                                month.map((item) => {
                                                    return <option value={item} key={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                        <select name="year">
                                            {
                                                year.map((item) => {
                                                    return <option value={item} key={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="security">CVC</label>
                                    <input type="text" name="security"/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>   
                <CheckoutList cart={cart} cartTotal={cartTotal}></CheckoutList>
            </div>
            </>
        )
    }
}
