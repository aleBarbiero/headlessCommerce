import React from 'react';
import CartItem from './CartItem';

export default function CartList({value}) {

    const {cart} = value;
    return (
        <div className="container-list">
            {cart.map(item => {
                return <CartItem key={item.element + item.variation} item={item} value={value}></CartItem>
            })}
            
        </div>
    )
}
