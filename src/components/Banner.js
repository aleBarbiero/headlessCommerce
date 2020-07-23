import React from 'react'

export default function Banner({children,hero}) {
    return (
        <header className={hero}>
            {children}
        </header>
    )
}

Banner.defaultProps={
    hero:"defaultBanner"
};