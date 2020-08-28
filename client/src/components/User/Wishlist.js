import React, { Component } from 'react';
import {ProductContext} from '../../contextAPI';
import WishItem from './WishItem';

export default class Wishlist extends Component {

    static contextType = ProductContext;

    render() {
        let {wishlist} = this.context;

        if(wishlist.length === 0)
            return <h2>Your wishlist is empty!</h2>
        return (
            <section className="productslist-wish">
                <div className="productslist-center-wish">
                    {
                        wishlist.map(item => {
                            return <WishItem key={item.product.id.concat(item.variation)} wish={item}></WishItem>
                        })
                    }
                </div>
            </section>
        )
    }
}

