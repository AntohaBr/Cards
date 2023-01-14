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
import PacksTable from '../components/Cards/Table/PacksTable';
import {emailInProfileTC} from "../redux/Reducer-profile";
import Packs from "../components/Cards/Packs";
import Cards from "../components/Cards/Cards";
import Learn from "../components/Learn/Learn";
import Result from "../components/Learn/Result/Result";


export enum URL {
    DEFAULT = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    CARD_PACK = '/cardpacks',
    RECOVERY_PASSWORD = '/recovery-password',
    NEW_PASSWORD = '/new-password',
    ERROR_404 = '/404',
    SUPER_COMPONENTS = '/super-components',
    CARDS = '/card',
    OTHER_PATH = '*',
    LEARN = '/learn'
RESULT = '/result'
MODAL_NEW_PACK = '/modal-new-pack',
    MODAL_EDIT_PACK = '/modal-edit-pack',
    MODAL_DELETE_PACK = '/modal-delete-pack',
    MODAL_DELETE_CARD = '/modal-delete-card',
    MODAL_NEW_CARD = '/modal-new-card'

}
export const App = () => {


    const status = useSelector<RootReducerType, AppStatusType>(state => state.app.status)
    const dispatch = useDispatch<ThunkDispatchType>()
    const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.login.isLoggedIn)

    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])
    useEffect(() => {
        dispatch(emailInProfileTC())
    }, [])

    function applogOut() {
        dispatch(logOutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    // if (isLoggedIn){
    //     return <Navigate to={URL.CARD_PACK}/>
    // }

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
                    <Route path={URL.DEFAULT} element={<Navigate to={URL.LOGIN}/>}/>
                    <Route path={URL.CARD_PACK} element={<Packs/>}/>
                    <Route path={URL.LOGIN} element={<Login/>}/>
                    <Route path={URL.REGISTRATION} element={<Registration/>}/>
                    <Route path={URL.PROFILE} element={<Profile/>}/>
                    <Route path={URL.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
                    <Route path={URL.NEW_PASSWORD} element={<NewPassword/>}/>
                    <Route path={URL.ERROR_404} element={<Error404/>}/>
                    <Route path={URL.OTHER_PATH} element={<Navigate to={URL.ERROR_404}/>}/>
                    <Route path={`${URL.CARDS}/:packId`} element={<Cards/>}/>
                    <Route path={URL.SUPER_COMPONENTS} element={<SuperComponents/>}/>
                    <Route path={`${URL.LEARN}/:cardId`} element={<Learn/>}/>
                    <Route path={URL.RESULT} element={<Result/>}/>
                    <Route path={URL.MODAL_NEW_PACK} element={<ModalAddNewPack/>}/>
                    <Route path={URL.MODAL_EDIT_PACK} element={<ModalEditPack/>}/>
                    <Route path={URL.MODAL_EDIT_PACK} element={<ModalEditPack/>}/>
                    <Route path={URL.MODAL_DELETE_PACK} element={<ModalDeletePack/>}/>
                    <Route path={URL.MODAL_DELETE_CARD} element={<ModalDeleteCard/>}/>
                    <Route path={URL.MODAL_NEW_CARD} element={<ModalAddNewCard/>}/>
                </Routes>

            </div>
        </div>
    );
}
