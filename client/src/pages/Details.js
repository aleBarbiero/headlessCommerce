import React, { Component } from 'react'
import defaultBack from '../images/404.png'
import BannerContainter from '../components/BannerContainer'
import {Link} from 'react-router-dom'
import {ProductContext} from '../context'
import StyledBanner from '../components/StyledBanner'
import Error from './Error'

export default class Details extends Component {

    constructor(props){
        super(props);
        this.state = {
            element:this.props.match.params.element,
            defaultBack
        };
    }

    static contextType = ProductContext;

    componentDidMount(){
        window.scrollTo(0,0);
    }

    render() {
        const {getProduct} = this.context;
        const {addToCart} = this.context;
        const product = getProduct(this.state.element);
        if(!product){
            return <Error></Error>
        }
        const {
            name,
            element,
            description,
            brand,
            price,
            compatibility,
            extras,
            images,
            inCart
        } = product;

        return (
            <>
                <StyledBanner img={images[0] || this.state.defaultImg}>
                    <BannerContainter title={`${brand} - ${name}`}>
                        <Link to="/list" className="btn-primary">
                            Back to list
                        </Link>
                    </BannerContainter>
                </StyledBanner>
                <section className="single-product">
                    <div className="single-product-info">
                        <article className="desc">
                            <button className="btn-primary" disabled={inCart?true:false} onClick={() => {addToCart(element)}}>
                                {inCart ? "in cart" : "add to cart"}
                            </button>
                            <h3>Description</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Details</h3>
                            <h6>Price: {price}€</h6>
                            <h6>Brand: {brand}</h6>
                            <h6>Compatibility:</h6>
                            <ul className="compat">
                                {compatibility.map((item, index) => {
                                    return <li key={index}>- {item}</li>
                                })}
                            </ul>
                        </article>
                    </div>
                    <section className="product-extras">
                        <h6>More</h6>
                        <ul className="extras">
                            {extras.map((item, index) => {
                                return <li key={index}>- {item}</li>
                            })}
                        </ul>
                    </section>
                    <div className="single-product-images">
                        {images.map((item,index) => {
                            if(index!==0)
                                return <img key={index} src={item} alt={name}></img>
                        })}
                    </div>
                </section>
                
            </>
        );
    }
}