import React from 'react'
import Product from './Product'

export default function ProductsList({products}) {

    if(products.length === 0){
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
                    products.map( item => {
                        return <Product key={item.id} product={item}></Product>
                    })
                }
            </div>
        </section>
    )
}
