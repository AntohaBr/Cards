import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../../components/Login/Login";
import {Registration} from "../../components/Registration/Registration";
import {Profile} from "../../components/Profile/Profile";
import {CheckEmail} from "../../components/Check-email/Check-email";
import {RecoveryPassword} from "../../components/Recovery-password/Recovery-password";
import {NewPassword} from "../../components/New-password/New-password";
import {Error404} from "../../components/Error-404/Error-404";
import {Packs} from "../../components/Packs/Packs";
import {Cards} from "../../components/Cards/Cards";
import {Learn} from "../../components/Learn/Learn";
import {Result} from "../../components/Learn/Result/Result";
import React from "react";


export enum PATH {
    HOME = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    RECOVERY_PASSWORD = '/recovery-password',
    CHECK_EMAIL = '/check-email',
    NEW_PASSWORD = '/new-password/:token',
    PACKS = '/packs',
    CARDS = '/card',
    ERROR404 = '/error404',
    LEARN = '/learn',
    RESULT = '/result'

}


export const PagesRoutes = () => {
    return <div>
            <Routes>
                <Route path={PATH.HOME} element={<Navigate to={PATH.PACKS}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<NewPassword/>}/>
                <Route path={PATH.ERROR404} element={<Error404/>}/>
                {/*<Route path={'/*'} element={<Navigate to={PATH.ERROR404} />} />*/}
                <Route path={PATH.PACKS} element={<Packs/>}/>
                <Route path={`${PATH.PACKS}/:packURL`} element={<Packs/>}/>
                <Route path={`${PATH.CARDS}/:packId`} element={<Cards/>}/>
                <Route path={`${PATH.LEARN}/:cardId`} element={<Learn/>}/>
                <Route path={PATH.RESULT} element={<Result/>}/>
            </Routes>
        </div>
}