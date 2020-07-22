import React from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import Services from '../components/Services'
import Watch from '../components/Watch'
import {Link} from 'react-router-dom'
import Search from '../components/Search'

export default function Home() {
    return (
        <>
            <Banner>
                <BannerContainer title="Everything you need" subtitle="Take a look at our products!">            
                    <Link to="/list" className="btn-primary">Explore</Link>
                </BannerContainer>
            </Banner>
            <Services></Services>
            <Watch></Watch>
        </>
    )
}

