import React from 'react'
import loadGif from '../../images/gif/loading-circle.gif'

export default function Loading() {
    return (
        <div className="loading-cart">
            <h4>Wait while loading...</h4>
            <img src={loadGif} alt="loading"></img>
        </div>
    )
}
