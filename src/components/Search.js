import React from 'react'
import {BsSearch} from 'react-icons/bs'

export default function Search() {
    return (
            <form action="/search/" role="search" method="GET">
                <input required className="search" id="search" type="search" placeholder="Search for our products..." autofocus required />
                <button className="search-btn" type="submit">
                    <BsSearch></BsSearch>
                </button>    
            </form>
    )
}