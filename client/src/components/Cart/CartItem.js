import React from 'react'
import {FaTrashAlt} from 'react-icons/fa'

export default function CartItem({item,value}) {
    
    const {element,name,images,price,total,qty} = item;
    const {increment,decrement,removeItem} = value;

    return (
        <div className="flex-row">
            <div className="flex-col-img">
                <img src={images[0]} alt={name} className="thumb-img"></img>
            </div>
            <div className="flex-col">
                {name}
            </div>
            <div className="flex-col">
                {price}€
            </div>
            <div className="flex-col">
                <button className="small-btn" onClick={() => {decrement(element)}}
                    disabled={qty===1?true:false}>-</button>
                <button className="small-btn" disabled={true}>{qty}</button>
                <button className="small-btn" onClick={() => {increment(element)}}
                    disabled={qty===10?true:false}>+</button>
            </div>
            <div className="flex-col">
                <button className="small-icon-btn" onClick={() => {removeItem(element)}}>
                    <FaTrashAlt className="small-icon"></FaTrashAlt>
                </button>
            </div>
            <div className="flex-col">
                {total}€
            </div>
        </div>
    )
}
