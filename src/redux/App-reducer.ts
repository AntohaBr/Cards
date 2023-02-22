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
}


//reducers
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-APP-ERROR': {
            return {...state, successError: action.successError}
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
export const isInitializedAC = (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', isInitialized} as const)
export const setAppErrorAC = (successError: null | string) => ({type: 'APP/SET-APP-ERROR', successError} as const)
export const setAppStatusAC = (status: AppStatusType) =>
    ({type: 'APP/SET-APP-STATUS', status} as const)


//thunks
export const isInitializedTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.me()
        dispatch(addLoginAC(true))
        dispatch(isInitializedAC(true))
        dispatch(setInfoUserAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        dispatch(isInitializedAC(true))
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


//types
type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'
type AppStateType = typeof initialState
export type AppActionType = ReturnType<typeof isInitializedAC>
    | ReturnType<typeof addLoginAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
    | SetInfoUserActionType
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>