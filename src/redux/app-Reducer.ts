import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {addLoginAC} from "./autch-Reducer";


const initialState = {
    status: 'none' as AppStatusType,
    successError: null as null | string,
    isInitialized: false,
    successMessage: null as null | string,
    isDisabled:false
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
            return {...state, status: action.status,isDisabled: action.isDisabled}
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
export const setAppStatusAC = (status: AppStatusType,isDisabled:boolean) => ({type: 'APP/SET-APP-STATUS', status,isDisabled} as const)
export const setAppSuccessMessageAC = (successMessage: null | string) =>
    ({type: 'APP/SET-APP-SUCCESS-MESSAGE', successMessage} as const)


//thunks
export function isInitializedTC() {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading",true))
             const response= authAPI.me()
            await response
            console.log('^^^^^^^^')

            dispatch(setAppStatusAC("succeeded",false))
            dispatch(isInitializedAC(true))
        } catch (e) {
            dispatch(isInitializedAC(true))
            dispatch(setAppStatusAC("failed",false))


        }
    }

}

export function
logOutTC() {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading",true))
            await authAPI.logOut()
            dispatch(addLoginAC(false))
            dispatch(setAppStatusAC("succeeded",false))

        } catch (e) {
            dispatch(addLoginAC(true))
            dispatch(setAppStatusAC("failed",false))
        }
    }
}


//types
export type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'

type AppStateType = typeof initialState

export type AppActionType =
    ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof isInitializedAC>
    | ReturnType<typeof setAppSuccessMessageAC>


