import React from 'react'

export default function CartTotal({value}) {
    
    const {cartTotal,clearCart} = value;
    
    return (
        <>
            <div className="container">
                <div className="flex-row-last">
                    <div className="flex-column">
                        <button className="btn-primary-red" onClick={() => {clearCart()}}>
                            clear cart
                        </button>
                        <button className="btn-primary-green">
                            buy now
                        </button>
                     </div>   
                        <span className="total-title">
                            <strong>Total: {cartTotal}€</strong>
                        </span>
                </div>
            </div>
        </>  
    );
}
