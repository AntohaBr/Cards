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
import {SuperComponents} from "../components/Super-components/Super-components";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../redux/store";
import {logOutTC, AppStatusType, isInitializedTC} from "../redux/app-Reducer";
import {Button, LinearProgress} from "@mui/material";
import {ErrorSnackbar} from "../components/Error-Snackbar/Error-Snackbar";


export const App = () => {

    const status = useSelector<RootReducerType, AppStatusType>(state => state.app.status)
    const dispatch = useDispatch<ThunkDispatchType>()
    // const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    function applogOut() {
        dispatch(logOutTC())
    }

    return (
        <div>
            <Navbar/>
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                {status === 'idle' ?
                    <LinearProgress color={"primary"}/>
                    : null}
                {/*{isLoggedIn ? <Button   variant={"outlined"} color={"primary"} onClick={applogOut} style={{width:'100px',margin:'15px'}}> LOG OUT</Button> : null}*/}
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/recoveryPassword' element={<RecoveryPassword/>}/>
                    <Route path='/newPassword' element={<NewPassword/>}/>
                    <Route path='/404' element={<Error404/>}/>
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                    <Route path='/superComponents' element={<SuperComponents/>}/>
                </Routes>
            </div>
        </div>
    );
}
