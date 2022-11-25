import {Dispatch} from "redux";
import {authAPI} from "../api/Api";
import {addLoginAC} from "./Autch-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../utils/Error-utils";


const initialState = {
    status: 'none' as AppStatusType,
    successError: null as null | string,
    isInitialized: false,
    successMessage: null as null | string,
    isDisabled: false
}


//reducers
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-APP-ERROR': {
            return {...state, successError: action.successError}
        }
        case 'APP/SET-APP-SUCCESS-MESSAGE' : {
            return {...state, successMessage: action.successMessage}
        }
        case 'APP/SET-APP-STATUS': {
            return {...state, status: action.status, isDisabled: action.isDisabled}
        }
        case 'APP/IS-INITIALIZED': {
            return {...state, isInitialized: action.isInitialized}
        }
        default : {
            return state
        }
    }
}


//actions
export const isInitializedAC = (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', isInitialized} as const)
export const setAppErrorAC = (successError: null | string) => ({type: 'APP/SET-APP-ERROR', successError} as const)
export const setAppStatusAC = (status: AppStatusType, isDisabled: boolean) =>
    ({type: 'APP/SET-APP-STATUS', status, isDisabled} as const)
export const setAppSuccessMessageAC = (successMessage: null | string) =>
    ({type: 'APP/SET-APP-SUCCESS-MESSAGE', successMessage} as const)


//thunks
export const isInitializedTC = () => async (dispatch: Dispatch<AppActionType>) => {
    try {
        dispatch(setAppStatusAC("loading", true))
        await authAPI.me()
        console.log('^^^^^^^^')

        dispatch(addLoginAC(true))
        dispatch(isInitializedAC(true))
        dispatch(setAppStatusAC("succeeded", false))
    } catch (e) {
        dispatch(isInitializedAC(true))
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}


//types
export type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'

type AppStateType = typeof initialState

export type AppActionType =
    | setAppStatusActionType
    | ReturnType<typeof isInitializedAC>
    | ReturnType<typeof setAppSuccessMessageAC>
    | setAppErrorActionType
    | ReturnType<typeof addLoginAC>

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>