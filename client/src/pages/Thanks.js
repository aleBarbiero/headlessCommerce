import React,{useEffect} from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import {Link} from'react-router-dom'

export default function Thanks() {

    useEffect(() => {
        window.scrollTo(0,0);  
    },[])

    return (
        <Banner>
            <BannerContainer title="Thank you for your order!" subtitle={"Continue exploring our products"}>
                <Link to="/" className="btn-primary">
                    Return home
                </Link>
            </BannerContainer>
        </Banner>
    )
}