import React from 'react'

export default function CheckoutElement({item}) {

    let {
        name,
        variation,
        qty,
        price,
        total,
        brand
    } = item;

    return (
        <ul className="checkout-element">
            <li><p className="checkout-element-name"><strong>{brand} {name}</strong> - {variation}</p>
            <p className="checkout-element-price">{qty} x {price}€ = {total}€</p></li>
        </ul>
    )
}
