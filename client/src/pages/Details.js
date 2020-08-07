import React, { Component } from 'react'
import defaultBack from '../images/404.png'
import BannerContainter from '../components/BannerContainer'
import {Link} from 'react-router-dom'
import {ProductContext} from '../contextAPI'
import StyledBanner from '../components/StyledBanner'
import Error from './Error'

export default class Details extends Component {

    constructor(props){
        super(props);
        this.state = {
            element:this.props.match.params.element,
            defaultBack,
            details: "",
            current: null,
            error: ""
        };
    }

    static contextType = ProductContext;

    componentDidMount(){
        window.scrollTo(0,0);

    }
    
    disableOthers = (index,max) => {
        for(let i=0;i<max;i++){
            if(i!==index && this.refs['comp' + i])
                this.refs['comp' + i].removeAttribute("disabled")
            else if(this.refs['comp' + i])
                this.refs['comp' + i].setAttribute("disabled","disabled")
        }
        this.setState({current:index})
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
            desc,
            brand,
            price,
            compatibility,
            extra,
            images,
            inCartStatus
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
                    <div className="error">
                        <h2>{this.state.error}</h2>
                    </div>
                    
                    <div className="single-product-info">
                        <article className="desc">
                            <button className="btn-primary" disabled={this.state.current===null?true:inCartStatus[this.state.current].inCart?true:false}
                                onClick={() => {addToCart(element,this.state.current)}}>
                            {this.state.current===null ? "add to cart" : inCartStatus[this.state.current].inCart?"in cart":"add to cart"}
                            </button>
                            <h3>Description</h3>
                            <p>{desc}</p>
                        </article>
                        <article className="info">
                            <h3>Details</h3>
                            <h6>Price: {price}€</h6>
                            <h6>Brand: {brand}</h6>
                            <h6>Compatibility:</h6>
                            <ul className="compatibility">
                                {  
                                    compatibility.map((item,index) => {
                                        return <button ref={"comp".concat(index)} className="btn-primary-choice"
                                                    onClick={() => this.disableOthers(index,compatibility.length)} key={item.id}>{item.value}</button>
                                    })  
                                }
                            </ul>
                        </article>
                    </div>
                    <section className="product-extras">
                        <h6>More</h6>
                        <ul className="extras">
                            {extra.map((item, index) => {
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