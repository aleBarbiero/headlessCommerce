import React from 'react'
import {Link} from 'react-router-dom';
import Error from '../../pages/Error';
import CheckoutElement from './CheckoutElement';

export default function CheckoutList({cart,cartTotal}) {
    if(cart.length !== 0)
        return (
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
                    <div className="btns">
                        <Link to="/cart">
                            <button className="btn-primary-red">Back to cart</button>
                        </Link>
                        <button className="btn-primary-green">buy now</button>
                    </div>
                </div>
            </div>
        )
    else
        return <Error></Error>
}