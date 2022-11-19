import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {addLoginAC} from "./autch-Reducer";


const initialState = {
    status: 'idle' as AppStatusType,
    successError: null as null | string,
    isInitialized: false,
    successMessage: null as null | string
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
            return {...state, status: action.status}
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
export const setAppErrorAC = (successError: null | string) => ({type: 'APP/SET-APP-ERROR', successError} as const)
export const isInitializedAC = (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', isInitialized} as const)
export const setAppStatusAC = (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS', status} as const)
export const setAppSuccessMessageAC = (successMessage: null | string) =>
    ({type: 'APP/SET-APP-SUCCESS-MESSAGE', successMessage} as const)


//thunks
export function isInitializedTC() {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.me()
            .then(res => {
                dispatch(setAppStatusAC("succeeded"))
                dispatch(isInitializedAC(true))
            })
            .catch(err => {
                dispatch(isInitializedAC(true))
                dispatch(setAppStatusAC("failed"))

            })
    }

}

export function logOutTC() {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        authAPI.logOut()
            .then(res => {
                dispatch(addLoginAC(false))
                dispatch(setAppStatusAC("succeeded"))
            })
            .catch(err => {
                //dispatch(addLoginAC(true))
                dispatch(setAppStatusAC("failed"))
            })
    }
}


//types
export type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed'

type AppStateType = typeof initialState

export type AppActionType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof isInitializedAC>
    | ReturnType<typeof setAppSuccessMessageAC>


