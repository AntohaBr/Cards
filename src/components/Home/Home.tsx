import React from 'react'
import {useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {Navigate} from 'react-router-dom'


export const Home = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return  <Navigate to={PATH.PACKS}/>
}