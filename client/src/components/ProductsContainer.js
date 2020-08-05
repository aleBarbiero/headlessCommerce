import React from 'react'
import ProductFilter from './ProductsFilter'
import ProductList from './ProductsList'
import {withProductConsumer} from '../contextAPI'
import Loading from './Loading'

function ProductContainer({context}){
    const {loading,sortedProducts,products} = context;
    if(loading){
        return <Loading></Loading>
    }

    return (
        <>
            <ProductFilter products={products}></ProductFilter>
            <ProductList products={sortedProducts}></ProductList>
        </>
    )
}

export default withProductConsumer(ProductContainer)