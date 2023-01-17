import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "../components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {Registration} from "../components/Registration/Registration";
import {Profile} from "../components/Profile/Profile";
import {NewPassword} from "../components/New-password/New-password";
import {RecoveryPassword} from "../components/Recovery-password/Recovery-password";
import {Error404} from "../components/Error-404/Error-404";
import {isInitializedTC} from "../redux/App-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {Packs} from "../components/Cards/Packs";
import {Cards} from "../components/Cards/Cards";
import {ErrorSnackbar} from "../components/Error-snackbar/Error-snackbar";
import {Learn} from "../components/Learn/Learn";
import {CheckEmail} from "../components/Check-email/Check-email";
import {Result} from "../components/Learn/Result/Result";
import {useAppDispatch, useAppSelector} from "../utils/Hooks";


export enum URL {
    HOME = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    RECOVERY_PASSWORD = '/recovery-password',
    CHECK_EMAIL = '/check-email',
    NEW_PASSWORD = '/new-password',
    PACKS = '/packs',
    CARDS = '/card',
    OTHER_PATH = '*',
    LEARN = '/learn',
    RESULT = '/result'
}

export const App = () => {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    if (!isInitialized) {
        return (
            <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                {status === "loading" ?
                    <LinearProgress color={"primary"}/>
                    : null}
                {/*{isLoggedIn ? <Button   variant={"outlined"} color={"primary"} onClick={applogOut} style={{width:'100px',margin:'15px'}}> LOG OUT</Button> : null}*/}
                <Routes>
                    <Route path={URL.HOME} element={<Navigate to={URL.LOGIN}/>}/>
                    <Route path={URL.LOGIN} element={<Login/>}/>
                    <Route path={URL.REGISTRATION} element={<Registration/>}/>
                    <Route path={URL.PROFILE} element={<Profile/>}/>
                    <Route path={URL.CHECK_EMAIL} element={<CheckEmail/>}/>
                    <Route path={URL.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={URL.NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={URL.OTHER_PATH} element={<Error404/>}/>
                    <Route path={URL.PACKS} element={<Packs/>}/>
                    <Route path={`${URL.CARDS}/:packId`} element={<Cards/>}/>
                    <Route path={`${URL.LEARN}/:cardId`} element={<Learn/>}/>
                    <Route path={URL.RESULT} element={<Result/>}/>
                </Routes>
            </div>
        </div>
    )
}
