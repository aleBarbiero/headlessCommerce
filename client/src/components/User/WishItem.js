import React from 'react';
import defaultImg from '../../images/404.png';
import {Link} from "react-router-dom"

export default function WishItem({wish}) {
    const {variation,product} = wish;
    return (
        <article className="product">
            <div className="img-container">
                <img src={product.images[0] || defaultImg} alt={product.name}></img>
                <div className="price-top">
                    <h6>{product.price}€</h6>
                    <p>tax included</p>
                </div>
                <Link to={`/${product.element}`} className="btn-primary product-link">view more</Link>
                {/*}<button className="btn-primary btn-cart-wish" onClick={() => addToCart(product.element,variation)}>Add to cart</button>{*/}
            </div>
            <div className="product-info">
                <p>{product.name} - {product.compatibility[variation].value}</p>
            </div>
        </article>
    )
}
