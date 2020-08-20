import React from 'react';
import {TiSocialFacebook,TiSocialInstagram, TiSocialTwitter,TiSocialPinterest} from 'react-icons/ti'

function Footer() {
    return (
        <>
        <div className="footer">
            <div id="socialContainer">
                <div className="socialButton">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <TiSocialFacebook className="fa"></TiSocialFacebook>
                    </a>
                </div>
                <div className="socialButton">
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <TiSocialTwitter  className="fa"></TiSocialTwitter>
                    </a>
                </div>
                <div className="socialButton">
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <TiSocialInstagram  className="fa"></TiSocialInstagram>
                    </a>
                </div>
                <div className="socialButton">
                    <a href="https://www.pinterest.it" target="_blank" rel="noopener noreferrer">
                        <TiSocialPinterest  className="fa"></TiSocialPinterest>
                    </a>
                </div>
            </div>
                <p>&copy; Alessio Barbiero | #thisIsDiana</p>
            </div>
        </>
    )
}

export default Footer;