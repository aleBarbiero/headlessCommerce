import React from 'react'
import {useContext} from 'react'
import {ProductContext} from '../context'
import Title from './Title'

//unique filter
const getUnique=(item,value) => {
    return [...new Set(item.map(item => item[value]))]
}

export default function ProductsFilter({products}) {
    const context=useContext(ProductContext);
    const {
        handleChanges,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets
    } = context;

    let types=getUnique(products,'type');
    types=['all',...types];
    types=types.map((item,index) => {
        return <option value={item} key={index}>{item}</option>
    })

    let capacities=getUnique(products,'capacity');
    capacities=capacities.map((item,index) => {
        return <option value={item} key={index}>{item}</option>
    })

    return(
        <section className="filter-container">
            <Title title="search products"></Title>
                <form className="filter-form">
                    {/*type*/}
                        <div className="form-group">
                            <label htmlFor="type">Category</label>
                            <select name="type" id="type" value={type} className="form-control" onChange={handleChanges}>
                                {types}
                            </select>
                        </div>
                    {/*type*/}
                    {/*guests*/}
                    <div className="form-group">
                            <label htmlFor="capacity">Guests</label>
                            <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChanges}>
                                {capacities}
                            </select>
                        </div>
                    {/*guests*/}
                    {/*price*/}
                    <div className="form-group">
                        <label htmlFor="price">Max price: ${price}</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChanges} className="form-control" step="50"></input>
                    </div>
                    {/*price*/}
                </form>
        </section>
    );
}
