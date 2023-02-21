import {
    SetAppErrorActionType,
    setAppStatusAC, SetAppStatusActionType,
} from './App-reducer'
import {errorUtil} from '../utils/Error-util'
import {AxiosError} from 'axios'
import {authApi, ForgotType, LoginType, NewPasswordType, RegistrationType} from '../api/Auth-api'
import {setInfoUserAC, SetInfoUserActionType} from './Profile-reducer'
import {AppThunkType} from './Store'


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '' as string,
    newPassport: '' as string
}


//reducers
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'AUTH/DATA-REGISTRATION':
            return {...state, isRegistered: action.value}
        case 'AUTH/RECOVERY-PASSWORD':
            return {...state, recoveryPassword: action.email}
        case 'AUTH/SET-NEW-PASSWORD':
            return {...state, newPassport: action.newPassport}
        default:
            return state
    }
}


// actions
export const addLoginAC = (value: boolean) => ({type: 'AUTH/SET-LOGIN', value} as const)
export const registrationAC = (value: boolean) => ({type: 'AUTH/DATA-REGISTRATION', value} as const)
export const recoveryPasswordAC = (email: string) => ({type: 'AUTH/RECOVERY-PASSWORD', email} as const)
export const setNewPasswordAC = (newPassport: string) => ({type: 'AUTH/SET-NEW-PASSWORD', newPassport} as const)


//thunks
export const loginTC = (data: LoginType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await authApi.login(data)
        dispatch(addLoginAC(true))
        dispatch(setInfoUserAC(res.data))
        dispatch(setAppStatusAC('succeeded', true))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    }
}

export const logOutTC = (): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        await authApi.logOut()
        dispatch(addLoginAC(false))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    }
}

export const registrationTC = (value: RegistrationType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        await authApi.registration(value)
        dispatch(registrationAC(true))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    }
}

export const recoveryPasswordTC = (email: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const data: ForgotType = {
            email: email, message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/new-password/$token$'>link</a>
</div>`
        }
        await authApi.recoveryPassword(data)
        dispatch(recoveryPasswordAC(email))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    }
}

export const setNewPasswordTC = (password: string, token: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const data: NewPasswordType = {password: password, resetPasswordToken: token}
        await authApi.setNewPassword(data)
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    }
}


//types
type InitialStateType = typeof initialState
export type AuthActionType = ReturnType<typeof addLoginAC>
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof recoveryPasswordAC>
    | ReturnType<typeof setNewPasswordAC>
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetInfoUserActionType


