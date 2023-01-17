import axios, {AxiosError} from 'axios';
import {Dispatch} from 'redux';
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../redux/App-reducer";


export const errorUtils = (err: Error | AxiosError<{ successError: null | string }>, dispatch: Dispatch<SetAppErrorActionType |
    SetAppStatusActionType>) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppStatusAC('failed',false))
}

