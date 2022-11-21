import {Dispatch} from "redux";
import {AppActionType, setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {authAPI, ForgotType, LoginType, NewPasswordType, RegistrationParamType} from "../api/api";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '',
    newPassport: ''
}


//reducers
export const authReducer = (state: InitialStateType = initialState, action:AuthActionType):InitialStateType  => {
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
export function loginTC(values: LoginType) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            console.log('*****')
            await authAPI.login(values)
            console.log('>>>>')
            dispatch(addLoginAC(true))
            dispatch(setAppStatusAC("succeeded",true))
        }
        catch (e) {
            dispatch(setAppErrorAC("Неверный пароль или e-mail"))
            dispatch(setAppStatusAC("failed",false))
        }
    }
}

export function registrationTC(value: RegistrationParamType) {
    return async (dispatch: Dispatch<AuthActionType>) => {
        try {
            dispatch(setAppStatusAC('loading', true))
            console.log('*****')
            await authAPI.registration(value)
            console.log('>>>>')
            dispatch(registrationAC(true))
            dispatch(setAppStatusAC('succeeded', false))
        } catch (e) {
            dispatch(setAppErrorAC('the username or email already exists'))
            dispatch(setAppStatusAC('failed', false))
        }
    }
}

export const recoveryPasswordTC = (email: string) => (dispatch: Dispatch<AuthActionType>) => {
    const data: ForgotType = {
        email: email,
        message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/newPassword/$token$'>
link</a>
</div>`
    }
    dispatch(setAppStatusAC('loading',true))
    authAPI.recoveryPassword(data)
        .then(res => {
            dispatch(recoveryPasswordAC(email))
            dispatch(setAppStatusAC('succeeded',false))
        })
}

export const setNewPasswordTC = (password: string,token: string) =>  (dispatch: Dispatch<AuthActionType>) => {
    const data: NewPasswordType = {
        password: password,
        resetPasswordToken: token
    }
    dispatch(setAppStatusAC('loading',false))
    authAPI.setNewPassword(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded',true))
        })
}


// types
type AuthActionType =
    ReturnType<typeof addLoginAC>
    | ReturnType<typeof registrationAC>
    | AppActionType
    | ReturnType<typeof recoveryPasswordAC>
    | ReturnType<typeof setNewPasswordAC>

type InitialStateType = typeof initialState