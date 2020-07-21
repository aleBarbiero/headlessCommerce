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
                    {/*guests*/}
                    <div className="form-group">
                            <label htmlFor="capacity">Guests</label>
                            <select name="capacity" id="capacity" value={capacity} className="form-control" onChange={handleChanges}>
                                {capacities}
                            </select>
                        </div>
                    {/*price*/}
                    <div className="form-group">
                        <label htmlFor="price">Max price: ${price}</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChanges} className="form-control" step="50"></input>
                    </div>
                    {/*size*/}
                    <div className="form-group">
                        <label htmlFor="size">Size:</label>
                        <input type="number" name="minSize" id="size" className="size-input" value={minSize} onChange={handleChanges}></input>
                        <input type="number" name="maxSize" id="size" className="size-input" value={maxSize} onChange={handleChanges}></input>
                    </div>
                    {/*extra*/}
                    <div className="form-group">
                        <div className="single-extra">
                            <input type="checkbox" name="breakfast" checked={breakfast} onChange={handleChanges}></input>
                            <label htmlFor="breakfast">breakfast</label>
                        </div>
                        <div className="single-extra">
                            <input type="checkbox" name="pets" checked={pets} onChange={handleChanges}></input>
                            <label htmlFor="pets">pets</label>
                        </div>
                    </div>
                </form>
        </section>
    );
}
