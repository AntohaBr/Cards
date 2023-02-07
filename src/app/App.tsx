import React, {useEffect} from 'react';
import './App.css';
import {Navbar} from "../components/Navbar/Navbar";
import {isInitializedTC} from "../redux/App-reducer";
import {CircularProgress, LinearProgress} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../utils/Hooks";
import {PagesRoutes} from "./Routes/Routes";
import {ErrorSnackbar} from "../components/Error-snackbar/Error-snackbar";


export const App = () => {
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.app.isInitialized)

    useEffect(() => {
        dispatch(isInitializedTC())
    }, [dispatch])

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
               <PagesRoutes/>
            </div>
        </div>
    )
}
