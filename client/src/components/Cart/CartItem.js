import React from 'react';
import {Link} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';

export default function CartItem({item,value}) {
    
    const {element,name,images,price,total,qty, variation, variationId} = item;
    const {increment,decrement,removeItem} = value;

    return (
        <div className="flex-row">
            <div className="flex-col-img">
                <Link to={`/${element}`}>
                    <img src={images[0]} alt={name} className="thumb-img"></img>
                </Link>
            </div>
            <div className="flex-col">
                {name} - {variation}
            </div>
            <div className="flex-col">
                {price}€
            </div>
            <div className="flex-col">
                <button className="btn-primary-small" onClick={() => {decrement(element,variationId)}}
                    disabled={qty===1?true:false}>-</button>
                <button className="btn-primary-small" disabled={true}>{qty}</button>
                <button className="btn-primary-small" onClick={() => {increment(element,variationId)}}
                    disabled={qty===10?true:false}>+</button>
            </div>
            <div className="flex-col">
                <button className="small-icon-btn" onClick={() => {removeItem(element,variationId)}}>
                    <FaTrashAlt className="small-icon"></FaTrashAlt>
                </button>
            </div>
            <div className="flex-col">
                {total}€
            </div>
        </div>
    )
}
