import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from '../../components/Login/Login'
import {Registration} from '../../components/Registration/Registration'
import {Profile} from '../../components/Profile/Profile'
import {CheckEmail} from '../../components/Check-email/Check-email'
import {RecoveryPassword} from '../../components/Recovery-password/Recovery-password'
import {NewPassword} from '../../components/New-password/New-password'
import {Error404} from '../../components/Error-404/Error-404'
import {Packs} from '../../components/Packs/Packs'
import {Cards} from '../../components/Cards/Cards'
import {Learn} from '../../components/Learn/Learn'
import React from 'react'
import {Home} from '../../components/Home/Home'


export const PATH = {
    HOME: '/',
    LOGIN: '/login',
    REGISTRATION: '/registration',
    PROFILE: '/profile',
    RECOVERY_PASSWORD: '/recovery-password',
    CHECK_EMAIL: '/check-email',
    NEW_PASSWORD: '/new-password',
    PACKS: '/packs',
    CARDS: '/card',
    ERROR404: '/error404',
    LEARN: '/learn',
}


export const PagesRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.HOME} element={<Home/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
            <Route path={`${PATH.NEW_PASSWORD}/:token`} element={<NewPassword/>}/>
            <Route path={PATH.ERROR404} element={<Error404/>}/>
            <Route path={PATH.PACKS} element={<Packs/>}/>
            <Route path={`${PATH.CARDS}/:packId`} element={<Cards/>}/>
            <Route path={`${PATH.LEARN}/:cardId`} element={<Learn/>}/>
            <Route path={'*'} element={<Navigate to={PATH.ERROR404}/>}/>
        </Routes>
    )
}