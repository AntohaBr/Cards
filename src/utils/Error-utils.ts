import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../redux/App-reducer";


export const errorUtils = (err: Error | AxiosError<{ successError: null | string }>, dispatch: Dispatch<setAppErrorActionType |
    setAppStatusActionType>) => {
    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(setAppErrorAC(error))
    } else {
        dispatch(setAppErrorAC(`Native error ${err.message}`))
    }
    dispatch(setAppStatusAC('failed',false))
}

