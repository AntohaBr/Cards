import React from 'react';
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux/Store";



export const Profile = (props:{}) =>{
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.app.isLoggedIn)
    if (!isLoggedIn){
        return <Navigate to={'/login'}/>
    }
    return (
        <div>
            <h1>Profile</h1>
        </div>
    )
}