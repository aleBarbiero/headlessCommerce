import React, { useEffect } from 'react';
import UserDetails from '../components/User/UserDetails';
import UserLogin from '../components/User/UserLogin';
import UserSignin from '../components/User/UserSignin';

export default function User() {

    useEffect(() => {
        window.scrollTo(0,0);  
    },[])

    return(
        <>
            <UserLogin></UserLogin>
            <UserSignin></UserSignin>
            <UserDetails></UserDetails>
        </>
    )
}
