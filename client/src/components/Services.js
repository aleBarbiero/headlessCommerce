import React, { Component } from 'react'
import {MdMonochromePhotos} from 'react-icons/md'
import {RiCameraLensLine,RiShoppingCartLine} from 'react-icons/ri'
import {GiBackpack} from 'react-icons/gi'
import Title from './Title'

export default class Services extends Component {

    state={
        services:[
            {
                icon:<MdMonochromePhotos></MdMonochromePhotos>,
                title:"Different products",
                info:'Dolor nostrud commodo voluptate sunt ipsum mollit aliqua aliqua, reprehenderit anim culpa in anim anim labore aliqua ullamco ut.'
            },
            {
                icon:<RiCameraLensLine></RiCameraLensLine>,
                title:"Wide choice",
                info:'Dolor nostrud commodo voluptate sunt ipsum mollit aliqua aliqua, reprehenderit anim culpa in anim anim labore aliqua ullamco ut.'
            },
            {
                icon:<GiBackpack></GiBackpack>,
                title:"All you need",
                info:'Dolor nostrud commodo voluptate sunt ipsum mollit aliqua aliqua, reprehenderit anim culpa in anim anim labore aliqua ullamco ut.'
            },
            {
                icon:<RiShoppingCartLine></RiShoppingCartLine>,
                title:"Fast and safe",
                info:'Dolor nostrud commodo voluptate sunt ipsum mollit aliqua aliqua, reprehenderit anim culpa in anim anim labore aliqua ullamco ut.'
            }
        ]
    }

    render() {
        return (
            <section className="services">
                <Title title="About us"></Title>
                <div className="services-center">
                    {this.state.services.map((item,index) => {
                        return <article key={index} className="service">
                            <span>
                                {item.icon}
                            </span>
                            <h6>
                                {item.title}
                            </h6>
                            <p>
                                {item.info}
                            </p>
                        </article>
                    })}
                </div>
            </section>
        )
    }
}
