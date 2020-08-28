import React, {useContext} from 'react'
import Product from './Product'
import {ProductContext} from '../contextAPI'

export default function ProductsList({sorted, limit}) {

    const context=useContext(ProductContext);
    const {
        setLimit
    } = context;

    if(sorted.length === 0){
        return(
            <div className="empty-search">
                <h3>No products matched your search parameters</h3>
            </div>
        )
    }

    return(
        <section className="productslist">
            <div className="productslist-center">
                {
                    sorted.map( (item,index) => {
                        if(index < limit)
                            return <Product key={item.id} product={item}></Product>
                        return null;
                    })
                }
            </div>
            {limit < sorted.length ? 
                <div>
                    <button className="btn-primary view" onClick={() => setLimit()}>View more...</button>
                </div> : ""
            }
        </section>
    )
}
