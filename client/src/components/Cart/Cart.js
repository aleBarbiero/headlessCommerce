import React, {Component} from 'react'
import Title from '../Title';
import CartColumns from "./CartColumns";
import EmptyCart from './EmptyCart';
import CartList from './CartList';
import CartTotal from './CartTotal';
import Loading from './LoadingCart'
import {ProductConsumer} from '../../contextAPI';

export default class Cart extends Component {

    componentDidMount(){
        window.scrollTo(0,0)
    }

    render() {
        return (
            <section>
                <ProductConsumer>
                    {value => {
                        const {cart,cartLoading} = value;
                        if(cartLoading)
                            return <Loading></Loading>
                        else if(cart.length>0)
                            return(
                                <>
                                    <Title title="Your cart"></Title>
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
