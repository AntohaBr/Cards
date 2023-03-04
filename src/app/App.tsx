import {useEffect} from 'react'
import './App.css'
import {isInitialized} from 'reducers/App-reducer'
import {CircularProgress, LinearProgress} from 'collections'
import {useAppDispatch, useAppSelector, loadState} from 'utils'
import {PagesRoutes} from './Routes/Routes'
import {ErrorSnackbar} from 'components'
import {Header} from 'feautures/Header/Header'
import {packsActions} from 'reducers/Packs-reducer'


export const App = () => {
    const status = useAppSelector(state => state.app.status)
    const isInitializedApp = useAppSelector(state => state.app.isInitialized)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isInitialized())
        dispatch(packsActions.setTypePackCards(loadState() as 'all' | 'my'))
    }, [])

    if (!isInitializedApp) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }
    return (
            <div className='app-wrapper'>
                {isLoggedIn ? <Header/> : ''}
                <ErrorSnackbar/>
                {status === 'loading' ? <LinearProgress color={'primary'}/> : <div style={{height: '5px'}}/>}
               <PagesRoutes/>
            </div>
    )
}
