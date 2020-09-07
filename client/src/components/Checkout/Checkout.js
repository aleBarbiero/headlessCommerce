import React, {Component} from 'react'
import {MdLocalShipping} from 'react-icons/md';
import {GrCreditCard} from 'react-icons/gr';
import CheckoutElement from './CheckoutElement';
import Title from '../Title';
import {ProductContext} from '../../contextAPI';
import Error from '../../pages/Error';
import Loading from '../Cart/LoadingCart';
import {Link} from 'react-router-dom';
import PayPal from './PayPal';
import Thanks from '../../pages/Thanks';

export default class Checkout extends Component {

    render() {
        const {cart,cartTotal,user,logged,buyed} = this.context;
        let {paypalLoading,cartLoading} = this.context;
        if(buyed)
            return <Thanks></Thanks>
        if(cartLoading || this.state.checkoutLoading || paypalLoading)
            return <Loading></Loading>
        else if(cart.length === 0)
            return <Error></Error>
        else return (
            <>
            <Title title="Checkout"></Title>
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
                                    <input type="text" name="name" onChange={this.handleChanges}  value={logged ? user.name : this.state.name}/>
                                    <div className="errorForm">
                                        {this.state.nameError}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="surname">surname</label>
                                    <input type="text" name="surname" onChange={this.handleChanges} value={logged ? user.surname : this.state.surname}/>
                                    <div className="errorForm">
                                        {this.state.surnameError}
                                    </div>
                                </div>
                            </div>
                            <div className="email">
                                <label htmlFor="email">e-mail</label> 
                                <input type="email" name="email" onChange={this.handleChanges} value={logged ? user.email : this.state.email}/>
                                <div className="errorForm">
                                    {this.state.emailError}
                                </div>
                            </div>
                            <div className="address-info-street">
                                <div className="country">
                                    <label htmlFor="country">country</label>
                                    <input type="text" name="country" onChange={this.handleChanges} value={logged ? user.address.country : this.state.country}/>
                                    <div className="errorForm">
                                        {this.state.countryError}
                                    </div>
                                </div>
                                <div className="address">
                                    <label htmlFor="name">address</label>
                                    <input type="text" name="address" onChange={this.handleChanges} value={logged ? user.address.address : this.state.address}/>
                                    <div className="errorForm">
                                        {this.state.addressError}
                                    </div>
                                </div>
                                <div className="number">
                                    <label htmlFor="number">n.</label>
                                    <input type="text" name="number" onChange={this.handleChanges} value={logged ? user.address.number : this.state.number}/>
                                    <div className="errorForm">
                                        {this.state.numberError}
                                    </div>
                                </div>
                            </div>
                            <div className="address-info">
                                <div>
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" onChange={this.handleChanges} value={logged ? user.address.city : this.state.city}/>
                                    <div className="errorForm">
                                        {this.state.cityError}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="state">State</label>
                                    <input type="text" name="state" onChange={this.handleChanges} value={logged ? user.address.state : this.state.state}/>
                                    <div className="errorForm">
                                        {this.state.stateError}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="cap">CAP</label>
                                    <input type="number" name="cap" onChange={this.handleChanges} value={logged ? user.address.cap : this.state.cap}/>
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
                            <button className="btn-primary red">Back to cart</button>
                        </Link>
                        <button className="btn-primary green" onClick={() => this.buy()}>buy now</button>
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
            countryError: ""
        }
    }

    static contextType = ProductContext;

    componentDidMount(){
        window.scrollTo(0,0);
        let {logged,user} =  this.context;
        if(logged){
            this.setState({
                name: user.name,
                surname: user.surname,
                email: user.email,
                address: user.address.address,
                number: user.address.number,
                city: user.address.city,
                country: user.address.country,
                state: user.address.state,
                cap: user.address.cap,
                })
        }
    }

    handleChanges = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        if(name !== "email" && name !== "number")
            this.setState({
                [name] : value.replace(/[^a-z0-9]/gi, '')
            })
        else
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
            cap
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
            errCap
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

        if(country.length <= 1){
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

        return {
            errName,
            errSurname,
            errEmail,
            errAdd,
            errNum,
            errCity,
            errState,
            errCountry,
            errCap
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
            errCap
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
            cap
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
        if(!errName && !errSurname && !errEmail && !errAdd && !errNum && !errState && !errCountry && !errCity && !errCap){   
            this.setState({checkoutLoading: true})
            buyItems(false,client,shipping);
        }//if
    }//buy
}
