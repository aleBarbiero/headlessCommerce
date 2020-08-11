import React from 'react'
import {Link} from 'react-router-dom'

export default function CartTotal({value}) {
    
    const {cartTotal,clearCart} = value;
    
    return (
        <>
            <div className="container-total">
                <div className="flex-row-last">
                    <div className="flex-column">
                        <button className="btn-primary-red" onClick={() => {clearCart()}}>
                            clear cart
                        </button><Link to="/cart/checkout" >
                        <button className="btn-primary-green">
                            buy now
                        </button></Link>
                     </div>   
                        <span className="total-title">
                            <strong>Total: {cartTotal}€</strong>
                        </span>
                </div>
            </div>
        </>  
    );
}
