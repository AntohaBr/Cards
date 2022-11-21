import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "../components/Navbar/Navbar";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";
import {Registration} from "../components/Registration/Registration";
import {Profile} from "../components/Profile/Profile";
import {CheckEmail} from "../components/Check-email/Check-email";
import {RecoveryPassword} from "../components/Recovery-password/Recovery-password";
import {Error404} from "../components/Error-404/Error-404";
import {SuperComponents} from "../components/Super-components/Super-components";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../redux/store";
import {logOutTC, AppStatusType, isInitializedTC} from "../redux/app-Reducer";
import {Button, LinearProgress} from "@mui/material";
import {NewPassword} from "../components/New-password/New-password";


export enum URL{
    HOME='/',
    LOGIN='/login',
    REGISTRATION='/registration',
    PROFILE='/profile',
    RECOVERY_PASSWORD='/recovery-password',
    NEW_PASSWORD='/new-password/:token',
    CHECK_EMAIL='/checkEmail',
    ERROR_404='/404',
    SUPER_COMPONENTS='/super-components',
    CARDS='/cards',
    OTHER_PATH='*',

}
export const App = () => {

    const status = useSelector<RootReducerType, AppStatusType>(state => state.app.status)
    const dispatch = useDispatch<ThunkDispatchType>()
    // const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    // function applogOut() {
    //     dispatch(logOutTC())
    // }

    return (
        <div>
            <Navbar/>
            <div className='app-wrapper'>
                {/*<ErrorSnackbar/>*/}
                {status === "loading"  ?
                    <LinearProgress color={"primary"}/>
                    : null}
                {/*{isLoggedIn ? <Button   variant={"outlined"} color={"primary"} onClick={applogOut} style={{width:'100px',margin:'15px'}}> LOG OUT</Button> : null}*/}
                <Routes>
                    <Route path={URL.HOME} element={<Navigate to={URL.LOGIN}/>}/>
                    <Route path={URL.LOGIN} element={<Login/>}/>
                    <Route path={URL.REGISTRATION} element={<Registration/>}/>
                    <Route path={URL.PROFILE} element={<Profile/>}/>
                    <Route path={URL.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={URL.CHECK_EMAIL} element={<CheckEmail/>}/>
                    <Route path={URL.NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={URL.ERROR_404} element={<Error404/>}/>
                    <Route path={URL.OTHER_PATH} element={<Navigate to={URL.ERROR_404}/>}/>
                    <Route path={URL.SUPER_COMPONENTS} element={<SuperComponents/>}/>
                </Routes>
            </div>
        </div>
    );
}
