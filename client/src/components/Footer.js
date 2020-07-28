import React from 'react';
import {Link} from 'react-router-dom';
import {TiSocialFacebook,TiSocialInstagram, TiSocialTwitter,TiSocialPinterest} from 'react-icons/ti'

function Footer() {
    return (
        <>
        <div className="footer">
        <div id="socialContainer">
            <div className="socialButton">
                <Link to="https://www.facebook.com">
                    <TiSocialFacebook className="fa"></TiSocialFacebook>
                </Link>
            </div>
            <div className="socialButton">
                <Link to="https://www.twitter.com">
                    <TiSocialTwitter  className="fa"></TiSocialTwitter>
                </Link>
            </div>
            <div className="socialButton">
                <Link to="https://www.instagram.com">
                    <TiSocialInstagram  className="fa"></TiSocialInstagram>
                </Link>
            </div>
            <div className="socialButton">
                <Link to="https://www.pinterest.it">
                    <TiSocialPinterest  className="fa"></TiSocialPinterest>
                </Link>
            </div>
        </div>
            <p>&copy; Alessio Barbiero | #thisIsDiana</p>
        </div>
        </>
    )
}

export default Footer;