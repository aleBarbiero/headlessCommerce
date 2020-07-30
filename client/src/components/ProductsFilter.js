import React from 'react'
import {useContext} from 'react'
import {ProductContext} from '../context'
import Title from './Title'

//unique filter
const getUniqueType=(item) => {
    return [...new Set(item.map(item => item["type"]))].sort()
}

const getUniqueBrand=(item) => {
    return [...new Set(item.map(item => item["brand"]))].sort()
}

const getUniqueComp=(item) => {
    let toReturn=new Set();
    (item.map(item => {
        item["compatibility"].map(item => toReturn.add(item));
    }));
    return toReturn;
}

export default function ProductsFilter({products}) {
    const context=useContext(ProductContext);
    const {
        handleChanges,
        resetFilters,
        sort,
        type,
        brand,
        price,
        minPrice,
        maxPrice,
        compatibility
    } = context;

    let types=getUniqueType(products);
    types=['all',...types];
    types=types.map((item,index) => {
        return <option value={item} key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
    })

    let brands=getUniqueBrand(products);
    brands=['all',...brands];
    brands=brands.map((item,index) => {
        return <option value={item} key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
    })

    let comp=getUniqueComp(products);
    comp=["all",...comp];
    comp=comp.map((item,index) => {
        return <option value={item} key={index}>{item.charAt(0).toUpperCase() + item.slice(1)}</option>
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
                    {/*brand*/}
                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <select name="brand" id="brand" value={brand} className="form-control" onChange={handleChanges}>
                            {brands}
                        </select>
                    </div>
                    {/*compatibility*/}
                    <div className="form-group">
                        <label htmlFor="compability">Compatibility</label>
                        <select name="compatibility" id="compatibility" value={compatibility} className="form-control" onChange={handleChanges}>
                            {comp}
                        </select>
                    </div>
                    {/*price*/}
                    <div className="form-group">
                        <label htmlFor="price">Max price: ${price}</label>
                        <input type="range" name="price" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChanges} className="form-control" step="50"></input>
                    </div>
                    {/*sort*/}
                    <div className="form-group">
                        <label htmlFor="sort">Sort by:</label>
                        <label>Price
                            <input type="radio" value="price" defaultChecked="true" name="radio" onChange={sort}/>
                        </label>
                        <label>Alphabetically
                            <input type="radio" value="alpha" name="radio" onChange={sort}/>
                        </label>
                    </div>
                    {/*reset*/}
                    <div className="form-group">
                        <button className="btn-primary" onClick={resetFilters}>
                            Reset filters
                        </button>
                    </div>
                </form>
        </section>
    );
}
