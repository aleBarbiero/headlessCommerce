import React, { Component } from 'react'
import defaultBack from '../images/404.png'
import BannerContainter from '../components/BannerContainer'
import {Link} from 'react-router-dom'
import {ProductContext} from '../context'
import StyledBanner from '../components/StyledBanner'

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
        const product = getProduct(this.state.element);
        if(!product){
            return <div className="error">
                <h3>404 product not found!</h3>
                <Link to="/list" className="btn-primary">back to list</Link>
            </div>
        }
        const {
            name,
            description,
            capacity,
            size,
            price,
            extras,
            breakfast,
            pets,
            images} = product;

        return (
            <>
                <StyledBanner img={images[0] || this.state.defaultImg}>
                    <BannerContainter title={`${name}`}>
                        <Link to="/list" className="btn-primary">
                            Back to list
                        </Link>
                    </BannerContainter>
                </StyledBanner>
                <section className="single-room">
                    <div className="single-room-info">
                        <article className="desc">
                            <h3>Description</h3>
                            <p>{description}</p>
                        </article>
                        <article className="info">
                            <h3>Details</h3>
                            <h6>Price: {price}€</h6>
                            <h6>Size: {size}m<sup>2</sup></h6>
                            <h6>Max capacity: {capacity}
                                { capacity > 1 ? ` people` : ` person` }
                            </h6>
                            <h6>{pets ? "Pets allowed" : "No pets allowed"}</h6>
                            <h6>{breakfast && "Breakfast included"}</h6>
                        </article>
                    </div>
                    <section className="room-extras">
                        <h6>More</h6>
                        <ul className="extras">
                            {extras.map((item, index) => {
                                return <li key={index}>- {item}</li>
                            })}
                        </ul>
                    </section>
                    <div className="single-room-images">
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