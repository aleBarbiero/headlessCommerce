import React, {Component} from 'react'
import {MdLocalShipping} from 'react-icons/md';
import {GrCreditCard} from 'react-icons/gr';
import CheckoutElement from './CheckoutElement';
import Title from '../Title';
import {ProductContext} from '../../contextAPI';
import Error from '../../pages/Error';
import Loading from '../Cart/LoadingCart';
import {Link} from 'react-router-dom';
import PayPal from './PayPal'

export default class Checkout extends Component {

    render() {
        const {cart,cartLoading,cartTotal} = this.context;
        /*const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
        var year = [];
        for(var i=2020;i<=2030;i++)
            year.push(i);*/
        if(cartLoading || this.state.checkoutLoading)
            return <Loading></Loading>
        else if(cart.length === 0)
            return <Error></Error>
        else return (
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
                                    <input type="text" name="name" onChange={this.handleChanges}/>
                                    <div className="errorForm">
                                        {this.state.nameError}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="surname">surname</label>
                                    <input type="text" name="surname" onChange={this.handleChanges}/>
                                    <div className="errorForm">
                                        {this.state.surnameError}
                                    </div>
                                </div>
                            </div>
                            <div className="email">
                                <label htmlFor="email">e-mail</label> 
                                <input type="email" name="email" onChange={this.handleChanges}/>
                                <div className="errorForm">
                                    {this.state.emailError}
                                </div>
                            </div>
                            <div className="address-info-street">
                                <div className="country">
                                    <label htmlFor="country">country</label>
                                    <input type="text" name="country" onChange={this.handleChanges}/>
                                    <div className="errorForm">
                                        {this.state.countryError}
                                    </div>
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
                            <h1>
                                <GrCreditCard className="checkout-icon"></GrCreditCard> Payment Information
                            </h1>
                            <div className="pay-methods">
                                <p>Please fill the form above only if you want to pay cash on delivery.<br/><br/>
                                    To pay with paypal press the dedicated button.</p>
                            </div>
                            {/*}
                            <div className="cc-num">
                                <label htmlFor="card">Credit Card Number</label>
                                <input type="number" name="card" onChange={this.handleChanges}/>
                                <div className="errorForm">
                                        {this.state.cardError}
                                    </div>
                            </div>
                            <div className="cc-info">
                                <div className="expires">
                                    <label htmlFor="expires">Expires</label>
                                    <div className="selects">
                                        <select name="month" onChange={this.handleChanges}>
                                            <option value="0" key="month">Month</option>
                                            {
                                                month.map((item,index) => {
                                                    return <option value={index+1} key={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                        <select name="year" onChange={this.handleChanges}>
                                            <option value="0" key="year">Year</option>
                                            {
                                                year.map((item) => {
                                                    return <option value={item} key={item}>{item}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="errorForm">
                                        {this.state.expireError}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cvc">CVC</label>
                                    <input type="number" name="cvc" onChange={this.handleChanges}/>
                                    <div className="errorForm">
                                        {this.state.cvcError}
                                    </div>
                                </div>
                            </div>
                            {*/}
                        </form>
                    </div>
                </div>   
                <div className="form-wrapper-cart">
                    <div className="form-container">
                        {
                            cart.map((item) => {
                                return <CheckoutElement item={item} key={item.id}></CheckoutElement>;
                            })
                        }
                        <div className="cart-checkout-total">
                            <p><strong>Total: </strong>{cartTotal}€</p>
                        </div>
                        <Link to="/cart">
                            <button className="btn-primary-red">Back to cart</button>
                        </Link>
                        <button className="btn-primary-green" onClick={() => this.buy()}>buy now</button>
                        <PayPal></PayPal>
                    </div>
                </div>
            </div>
            </>
        )
    }

    constructor(){
        super();
        this.state = {
            checkoutLoading: false,
            name: "",
            nameError: "",
            surname: "",
            surnameError: "",
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
            countryError: "",
            /*card: "",
            cardError: "",
            month: "",
            year: "",
            expireError: "",
            cvc: "",
            cvcError: ""*/
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

    checkErrors = () => {
        let {
            name,
            surname,
            email,
            address,
            number,
            city,
            state,
            country,
            cap,
            //month,
            //year,
            //cvc,
            //card
        } = this.state;

        let {
            errName,
            errSurname,
            errEmail,
            errAdd,
            errNum,
            errCity,
            errState,
            errCountry,
            errCap,
            //errCVC
            //errExpire,
            //errCard
        } = false;

        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

        if(name.length < 2){
            this.setState({nameError: "Invalid name"});
            errName=true;
        }else{
            this.setState({nameError: ""});
            errName=false;
        }
        
        if(surname.length < 2){
            this.setState({surnameError: "Invalid surname"});
            errSurname=true;
        }else{
            this.setState({surnameError: ""});
            errSurname=false;
        }
        
        if(!(mailFormat.test(email))){
            this.setState({emailError: "Invalid e-mail"});
            errEmail=true;
        }else{
            this.setState({emailError: ""});
            errEmail=false;
        }

        if(address.length < 5){
            this.setState({addressError: "Invalid address"});
            errAdd=true;
        }else{
            this.setState({addressError: ""});
            errAdd=false;
        }

        if(number.length === 0){
            this.setState({numberError: "Invalid number"});
            errNum=true;
        }else{
            this.setState({numberError: ""});
            errNum=false;
        }

        if(city.length < 2){
            this.setState({cityError: "Invalid city"});
            errCity=true;
        }else{
            this.setState({cityError:""});
            errCity=false;
        }

        if(state.length < 2){
            this.setState({stateError: "Invalid state"});
            errState=true;
        }else{
            this.setState({stateError: ""});
            errState=false;
        }

        if(country.length < 4){
            this.setState({countryError: "Invalid country"});
            errCountry=true;
        }else{
            this.setState({countryError: ""});
            errCountry=false;
        } 

        if(cap.toString().length !== 5){
            this.setState({capError: "Invalid code"});
            errCap=true;
        }else{
            this.setState({capError: ""});
            errCap=false;
        }

        /*if(cvc.toString().length !== 3){
            this.setState({cvcError: "Invalid code"});
            errCVC=true;
        }else{
            this.setState({cvcError: ""});
            errCVC=false;
        }

        var date = new Date(year,month);
        var today = new Date();

        if(date < today){
            this.setState({expireError: "Invalid date"})
            errExpire=true
        }else{
            this.setState({expireError: ""});
            errExpire=false;
        }

        if(card.length !== 16){
            this.setState({cardError:"Invalid card number"});
            errCard=true
        }else{
            this.setState({cardError: ""})
            errCard=false;
        }*/

        return {
            errName,
            errSurname,
            errEmail,
            errAdd,
            errNum,
            errCity,
            errState,
            errCountry,
            errCap,
            //errCVC,
            //errExpire,
            //errCard
        }
    }//checkErrors

    buy = () => {
        let {
            errName,
            errSurname,
            errEmail,
            errAdd,
            errNum,
            errCity,
            errState,
            errCountry,
            errCap,
            //errCVC,
            //errExpire,
            //errCard
        } = this.checkErrors();
        let {
            name,
            surname,
            email,
            address,
            number,
            city,
            state,
            country,
            cap,
            //month,
            //year,
            //cvc,
            //card
        } = this.state;
        const {buyItems} = this.context;
        let client = {
            name,
            surname,
            email
        }
        let shipping = {
            address,
            number,
            city,
            state,
            country,
            cap
        }
        /*let payment = {
            card,
            cvc,
            month,
            year,
        }*/
        if(!errName && !errSurname && !errEmail && !errAdd && !errNum && !errState && !errCountry && !errCity && !errCap /*&& !errCVC && !errCard && !errExpire*/){   
            this.setState({checkoutLoading: true})
            buyItems(false,client,shipping/*,payment*/);
        }//if
    }//buy
}
