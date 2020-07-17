import React from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import {Link} from 'react-router-dom'

export default function List() {
    return (
        <Banner hero="roomsHero">
            <BannerContainer title="Products">
                <Link to="/" className="btn-primary">
                    Return home
                </Link>
            </BannerContainer>
        </Banner>
    )
}
