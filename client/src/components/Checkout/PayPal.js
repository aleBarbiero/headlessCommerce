import React, { Component } from 'react'
import PaypalBtn from 'react-paypal-checkout';
import {ProductContext} from '../../contextAPI'

export default class PayPal extends Component {
    
    static contextType = ProductContext;

    render() {

        let {cartTotal} = this.context;
        
        const onSuccess = (payment) => {
            console.log("paid")
        }

        const onCancel = (data) => {
            console.log("cancelled")
        }

        const onError = (err) => {
            console.log("error")
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
        )
    }

}//PayPal

