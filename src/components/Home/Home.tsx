import React from 'react'
import {useAppSelector} from 'utils'
import {PATH} from '../../app/Routes/Routes'
import {Navigate} from 'react-router-dom'
import {selectAuthIsLoggedIn} from '../../redux/Selectors'


export const Home = () => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return  <Navigate to={PATH.PACKS}/>
}