import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/404.png';

export default function Product({product}) {
    const {name,element,images,price} = product;
    return (
        <article className="product">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt={name}></img>
                <div className="price-top">
                    <h6>{price}€</h6>
                    <p>tax included</p>
                </div>
                <Link to={`/${element}`} className="btn-primary product-link">view more</Link>
            </div>
            <div className="product-info">
                <p>{name}</p>
            </div>
        </article>
    )
}