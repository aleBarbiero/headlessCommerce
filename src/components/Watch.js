import React, { Component } from 'react';
import {ProductContext} from '../context';
import Title from './Title';
import Loading from './Loading';
import Product from './Product';

export default class Watch extends Component {

    static contextType=ProductContext;

    render() {
        let {loading, onesToWatch : toWatch} = this.context;
        
        toWatch=toWatch.map(product => {
            return <Product key={product.id} product={product}></Product>
        })

        return (
            <section className="featured-rooms">
                <Title title="Ones to watch"></Title>
                <div className="featured-rooms-center">
                    {loading ? <Loading></Loading> : toWatch}
                </div>
            </section>
        );
    }
}
