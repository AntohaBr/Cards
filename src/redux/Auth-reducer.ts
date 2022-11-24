import {Dispatch} from "redux";
import {
    setAppErrorActionType,
    setAppStatusAC,
    setAppStatusActionType
} from "./App-reducer";
import {authAPI, ForgotType, LoginType, NewPasswordType, RegistrationParamType} from "../api/auth-api";
import {errorUtils} from "../utils/Error-utils";
import {AxiosError} from "axios";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '',
    newPassport: ''
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
export const loginTC = (values: LoginType) => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        dispatch(setAppStatusAC("loading", true))
        console.log('*****')
        await authAPI.login(values)
        console.log('>>>>')
        dispatch(addLoginAC(true))
        dispatch(setAppStatusAC("succeeded", true))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}

export const registrationTC = (value: RegistrationParamType) => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        dispatch(setAppStatusAC('loading', true))
        console.log('*****')
        await authAPI.registration(value)
        console.log('>>>>')
        dispatch(registrationAC(true))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}

export const recoveryPasswordTC = (email: string) => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        const data: ForgotType = {
            email: email,
            message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/new-password/$token$'>link</a>
</div>`
        }
        dispatch(setAppStatusAC('loading', true))
        await authAPI.recoveryPassword(data)
        dispatch(recoveryPasswordAC(email))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}

export const setNewPasswordTC = (password: string, token: string) => async (dispatch: Dispatch<AuthActionType>) => {
    try {
        const data: NewPasswordType = {
            password: password,
            resetPasswordToken: token
        }
        dispatch(setAppStatusAC('loading', true))
        await authAPI.setNewPassword(data)
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}


// types
type AuthActionType =
    ReturnType<typeof addLoginAC>
    | ReturnType<typeof registrationAC>
    | ReturnType<typeof recoveryPasswordAC>
    | ReturnType<typeof setNewPasswordAC>
    | setAppErrorActionType
    | setAppStatusActionType

type InitialStateType = typeof initialState

