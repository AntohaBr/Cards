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
import {RootReducerType, ThunkDispatchType} from "../redux/Store";
import {CircularProgress, LinearProgress} from "@mui/material";
import {NewPassword} from "../components/New-password/New-password";
import {ErrorSnackbar} from "../components/Error-snackbar/Error-snackbar";
import {getPacksTC} from "../redux/Packs-reducer";
import Packs from "../components/Cards/Packs";
import Cards from "../components/Cards/Cards";
import {ModalAddNewCard} from "../components/Modal/ModalCards/ModalAddNewCard/ModalAddNewCard";
import {ModalDeleteCard} from "../components/Modal/ModalCards/ModalDeleteCard/ModalDeleteCard";
import {ModalDeletePack} from "../components/Modal/ModalPack/ModalDeletePack/ModalDeletePack";
import {ModalEditPack} from "../components/Modal/ModalPack/ModalEditPack/ModalEditPack";
import {ModalAddNewPack} from "../components/Modal/ModalPack/ModalAddNewPack/ModalAddNewPack";
import {AppStatusType, isInitializedTC} from "../redux/App-reducer";


export enum URL {
    HOME = '/',
    LOGIN = '/login',
    REGISTRATION = '/registration',
    PROFILE = '/profile',
    RECOVERY_PASSWORD = '/recovery-password',
    NEW_PASSWORD = '/new-password/:token',
    CHECK_EMAIL = '/checkEmail',
    ERROR_404 = '/404',
    SUPER_COMPONENTS = '/super-components',
    CARDS = '/cards',
    CARD_PACK = '/packs',
    OTHER_PATH = '*',
    LEARN = '/learn',
    MODAL_NEW_PACK = '/modal-new-pack',
    MODAL_EDIT_PACK = '/modal-edit-pack',
    MODAL_DELETE_PACK = '/modal-delete-pack',
    MODAL_DELETE_CARD = '/modal-delete-card',
    MODAL_NEW_CARD = '/modal-new-card'
}

export const App = () => {

    const status = useSelector<RootReducerType, AppStatusType>(state => state.app.status)
    const isInitialized = useSelector<RootReducerType, boolean>((state) => state.app.isInitialized)
    const dispatch = useDispatch<ThunkDispatchType>()
    // const isLoggedIn = useSelector<RootReducerType, boolean>(state => state.app.isLoggedIn)

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [])

    useEffect(() => {
        dispatch(getPacksTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div>
            <Navbar/>
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                {status === "loading" ? <LinearProgress color={"primary"}/> : null}
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
                    <Route path={URL.CARD_PACK} element={<Packs/>}/>
                    <Route path={`${URL.CARDS}/:cardId`} element={<Cards/>}/>
                    <Route path={URL.MODAL_NEW_PACK} element={<ModalAddNewPack/>}/>
                    <Route path={URL.MODAL_EDIT_PACK} element={<ModalEditPack/>}/>
                    <Route path={URL.MODAL_DELETE_PACK} element={<ModalDeletePack/>}/>
                    <Route path={URL.MODAL_DELETE_CARD} element={<ModalDeleteCard/>}/>
                    <Route path={URL.MODAL_NEW_CARD} element={<ModalAddNewCard/>}/>
                </Routes>
            </div>
        </div>
    );
}
