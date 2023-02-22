import React, {useEffect} from 'react'
import './App.css'
import {isInitializedTC} from '../redux/App-reducer'
import {CircularProgress, LinearProgress} from '@mui/material'
import {useAppDispatch, useAppSelector} from '../utils/Hooks'
import {PagesRoutes} from './Routes/Routes'
import {ErrorSnackbar} from '../components/Error-snackbar/Error-snackbar'
import {Header} from '../components/Header/Header'
import {loadState} from '../utils/local-storage'
import {setTypePackCardsAC} from '../redux/Packs-reducer'


export const App = () => {
    const status = useAppSelector(state => state.app.status)
    const isInitialized = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isInitializedTC())
        dispatch(setTypePackCardsAC(loadState() as 'all' | 'my'))
    }, [])

    if (!isInitialized) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }
    return (
        <div>
            {isLoggedIn ? <Header/> : ''}
            <div className='app-wrapper'>
                <ErrorSnackbar/>
                {status === 'loading' ? <LinearProgress color={'primary'}/> : <div style={{height: '5px'}}/>}
               <PagesRoutes/>
            </div>
        </div>
    )
}
