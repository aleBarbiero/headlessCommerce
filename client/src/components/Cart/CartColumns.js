import React from 'react'

export default function CartColumns() {
    return (
        <div className="container">
            <div className="flex-row">
                <div className="flex-col">
                    <p>product</p>
                </div>
                <div className="flex-col">
                    <p>name</p>
                </div>
                <div className="flex-col">
                    <p>price</p>
                </div>
                <div className="flex-col">
                    <p>quantity</p>
                </div>
                <div className="flex-col">
                    <p>remove</p>
                </div>
                <div className="flex-col">
                    <p>subtotal</p>
                </div>
            </div>
        </div>
    )
}
