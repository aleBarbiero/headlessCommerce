import React from 'react';
import Banner from '../Banner';
import BannerContainer from '../BannerContainer';
import {Link} from 'react-router-dom';

export default function EmptyCart() {
    return (
        <Banner>
            <BannerContainer title="Your cart is currently empty" subtitle="start buying now!">
                <Link to="/list" className="btn-primary">
                    Explore products
                </Link>
            </BannerContainer>
        </Banner>
    )
}
