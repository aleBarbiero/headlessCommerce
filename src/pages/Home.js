import React from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import Services from '../components/Services'
import Watch from '../components/Watch'
import {Link} from 'react-router-dom'

export default function Home() {
    return (
        <>
            <Banner>
                <BannerContainer title="New arrivals" subtitle="Check our new products!">            
                <Link to="/list" className="btn-primary">Discover</Link>
                </BannerContainer>
            </Banner>
            <Services></Services>
            <Watch></Watch>
        </>
    )
}

