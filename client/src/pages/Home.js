import React, {useEffect} from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import Services from '../components/Services'
import Watch from '../components/Watch'
import {Link} from 'react-router-dom'

export default function Home() {

    useEffect(() => {
        window.scrollTo(0,0);  
    },[])

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

