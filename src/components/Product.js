import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/404.png';
import PropTypes from 'prop-types';

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
                <Link to={`/list/${element}`} className="btn-primary product-link">view more</Link>
            </div>
            <div className="product-info">
                <p>{name}</p>
            </div>
        </article>
    )
}

Product.propTypes={
    product:PropTypes.shape({
        name: PropTypes.string.isRequired,
        element:PropTypes.string.isRequired,
        images:PropTypes.arrayOf(PropTypes.string).isRequired,
        price:PropTypes.number.isRequired,
    })
}