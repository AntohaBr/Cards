import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "../components/navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes, useNavigate} from "react-router-dom";
import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {Profile} from "../components/profile/Profile";
import {NewPassword} from "../components/new-password/New-password";
import {RecoveryPassword} from "../components/recovery-password/Recovery-password";
import {Error404} from "../components/Error404/Error404";
import {SuperComponents} from "../components/Super-components/Super-components";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../redux/Store";
import {authTC, logOutTC, StatusType} from "../redux/app-reducer";
import {Button, CircularProgress, LinearProgress} from "@mui/material";
import {redirect} from 'react-router-dom';


export const App = () => {
    const status = useSelector<RootReducerType, StatusType>(state => state.app.status)
    const dispatch = useDispatch<ThunkDispatchType>()
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        dispatch(authTC())
    }, [])

    function appOgOut() {
        dispatch(logOutTC())
    }



    return (
        <div>
            <Navbar/>
            <div className='app-wrapper'>
                {status === 'idle' ?
                    <LinearProgress color={"primary"}/>
                    : null}
                {isLoggedIn ? <Button   variant={"outlined"} color={"primary"} onClick={appOgOut} style={{width:'100px',margin:'15px'}}> LOG OUT</Button> : null}

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

