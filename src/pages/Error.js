import React from 'react'
import Banner from '../components/Banner'
import BannerContainer from '../components/BannerContainer'
import {Link} from'react-router-dom'

export default function Error() {
    return (
        <Banner>
            <BannerContainer title="404" subtitle="someting went wrong!">
                <Link to="/" className="btn-primary">
                    Return home
                </Link>
            </BannerContainer>
        </Banner>
    )
}
