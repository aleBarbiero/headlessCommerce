import React, { Component } from 'react'
import PaypalBtn from 'react-paypal-checkout';
import {ProductContext} from '../../contextAPI'

export default class PayPal extends Component {
    
    constructor(){
        super();
        this.state = {
            error: ""
        }
    }

    static contextType = ProductContext;
    

    render() {

        let {cartTotal,buyItems} = this.context;
        
        const onSuccess = (payment) => {
            this.setState({error:""})
            console.log(payment);
            let client = {
                name: payment.address.recipient_name,
                surname: payment.address.recipient_name,
                email: payment.email
            }

            let shipping = {
                address: payment.address.line1,
                number: payment.address.line2,
                city: payment.address.city,
                state: payment.address.state,
                country: payment.address.country_code,
                cap: payment.address.postal_code
            }

            let pay = {
                clientId: payment.payerID,
                id: payment.paymentID,
                token: payment.paymentToken,

            }

            buyItems(true,client,shipping,pay)
        }

        const onCancel = (data) => {
            this.setState({error: "Your transaction has been cancelled"})
        }

        const onError = (err) => {
            this.setState({error : err})
        }

        let env = "sandbox";
        let currency = "EUR";
        let total = cartTotal;
        let locale = "en_US";
        let style = {
            color: "black",
            shape: "rect",
            size: "responsive",
            label: "paypal",
            tagline: false
        };
        const client = {
            sandbox: "AZomyARDJtUt5dby3EAZvr6HilW6jxOvciE7y5xxjL81rYBAesFSvnLLePRFfAEbBg6bM1nZhjXlAtqA"
        }

        return (
            <>
                <PaypalBtn 
                    env={env} 
                    client={client} 
                    currency={currency} 
                    total={total} 
                    locale={locale} 
                    style={style}
                    onError={onError} 
                    onSuccess={onSuccess} 
                    onCancel={onCancel}/>
                <div className="errorForm">
                    {this.state.error}
                </div>
            </>
        )
    }

}//PayPal

