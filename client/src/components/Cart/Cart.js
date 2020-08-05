import React, { Component } from 'react'
import Title from '../Title';
import CartColumns from "./CartColumns";
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';
import {ProductConsumer} from '../../contextAPI';

export default class Cart extends Component {
    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart} = value;
                        if(cart.length>0)
                            return(
                                <>
                                    <Title title="your cart"></Title>
                                    <CartColumns></CartColumns>
                                    <CartList value={value}></CartList>
                                    <CartTotal value={value}></CartTotal>
                                </>
                            )
                        else
                            return <EmptyCart></EmptyCart>
                    }}
                </ProductConsumer>
            </section>
        )
    }
}
