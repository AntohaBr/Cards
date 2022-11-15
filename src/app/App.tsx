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

export const App = ()  => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
              <h3>okdofk</h3>
                <Navbar/>
                <Routes>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/recoveryPassword' element={<RecoveryPassword/>}/>
                    {/*<Route path='/newPassword' element={<NewPassword/>}/>*/}
                    {/*<Route path='/404' element={<Error404/>}/>*/}
                    <Route path='*' element={<Navigate to={'/404'}/>}/>
                    {/*<Route path='/superComponents' element={<SuperComponents/>}/>*/}
                </Routes>
            </div>
        </BrowserRouter>
    );
}

