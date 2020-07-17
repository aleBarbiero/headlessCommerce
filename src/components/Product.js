import React from 'react';
import {Link} from 'react-router-dom';
import defaultImg from '../images/404.png';
import PropTypes from 'prop-types';

export default function Product({product}) {
    const {name,element,images,price} = product;
    return (
        <article className="room">
            <div className="img-container">
                <img src={images[0] || defaultImg} alt={name}></img>
                <div className="price-top">
                    <h6>{price}€</h6>
                    <p>only online</p>
                </div>
                <Link to={`/rooms/${element}`} className="btn-primary room-link">Buy now</Link>
            </div>
            <p className="room-info">{name}</p>
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