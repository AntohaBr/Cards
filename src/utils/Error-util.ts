import axios, {AxiosError} from 'axios'
import {Dispatch} from 'redux'
import {appActions, SetAppErrorActionType, SetAppStatusActionType} from '../redux/App-reducer'


export const errorUtil = (err: Error | AxiosError<{ successError: null | string }>, dispatch: Dispatch<SetAppErrorActionType |
    SetAppStatusActionType>) => {

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(appActions.setAppErrorAC(error))
    } else {
        dispatch(appActions.setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(appActions.setAppStatusAC('failed'))
}

