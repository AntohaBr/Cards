import {authApi} from '../api/Auth-api'
import {addLoginAC} from './Auth-reducer'
import {AxiosError} from 'axios'
import {errorUtil} from '../utils/Error-util'
import {setInfoUserAC, SetInfoUserActionType} from './Profile-reducer'
import {AppThunkType} from './Store'


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


//thunks
export const isInitializedTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await authApi.me()
        dispatch(addLoginAC(true))
        dispatch(isInitializedAC(true))
        dispatch(setInfoUserAC(res.data))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        dispatch(isInitializedAC(true))
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}


//types
export type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'
type AppStateType = typeof initialState
export type AppActionType =
    | SetAppStatusActionType
    | ReturnType<typeof isInitializedAC>
    | SetAppErrorActionType
    | ReturnType<typeof addLoginAC>
    | SetInfoUserActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>