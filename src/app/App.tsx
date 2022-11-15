import React from 'react';
import './App.css';
import {Navbar} from "../components/navbar/Navbar";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../components/login/Login";
import {Registration} from "../components/registration/Registration";
import {Profile} from "../components/profile/Profile";
import {NewPassword} from "../components/new-password/New-password";
import {RecoveryPassword} from "../components/recovery-password/Recovery-password";
import {Error404} from "../components/Error404/Error404";
import {SuperComponents} from "../components/Super-components/Super-components";
import {useSelector} from "react-redux";
import {RootReducerType} from "../redux/Store";
import {StatusType} from "../redux/app-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";

export const App = ()  => {
    const status=useSelector<RootReducerType,StatusType>(state => state.app.status)
    return (
        <BrowserRouter>
            <Navbar/>
            <div className='app-wrapper'>
                {status==='idle' ?
                    <LinearProgress color={"primary"} />
                 : null}

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


        </BrowserRouter>
    );
}

