import React from 'react';
import CartItem from './CartItem';

export default function CartList({value}) {

    const {cart} = value;
    return (
        <div className="container">
            {cart.map(item => {
                return <CartItem key={item.element} item={item} value={value}></CartItem>
            })}
            
        </div>
    )
}
