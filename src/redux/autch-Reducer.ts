import {Dispatch} from "redux";
import {AppActionType, setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {authAPI, ForgotType, NewPasswordType, RegistrationParamType} from "../api/api";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '',
    newPassport: ''
}


//reducers
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'auth/DATA-REGISTRATION':
            return {...state, isRegistered: action.value}
        case 'auth/RECOVERY-PASSWORD':
            return {...state, recoveryPassword: action.email}
        case 'auth/SET-NEW-PASSWORD':
            return {...state, newPassport: action.newPassport}
        default:
            return state
    }
}


// actions
export const addLoginAC = (value: boolean) => ({type: 'auth/SET-LOGIN', value} as const)
export const registrationAC = (value: boolean) => ({type: 'auth/DATA-REGISTRATION', value} as const)
export const recoveryPasswordAC = (email: string) => ({type: 'auth/RECOVERY-PASSWORD', email} as const)
export const setNewPasswordAC = (newPassport: string) => ({type: 'auth/SET-NEW-PASSWORD', newPassport} as const)

//thunks
export const loginTC = (value: LoginType) => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.login(value)
        .then(res => {
            dispatch(addLoginAC(true))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((err) => {
            dispatch(setAppErrorAC("Неверный пароль или e-mail"))
            dispatch(setAppStatusAC("failed"))
        })
}

export const registrationTC = (value: RegistrationParamType) => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.registration(value)
        .then(res => {
            dispatch(registrationAC(true))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((err) => {
            dispatch(setAppErrorAC('the username or email already exists'))
            dispatch(setAppStatusAC('failed'))
        })
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
    dispatch(setAppStatusAC('loading'))
    authAPI.recoweryPassword(data)
        .then(res => {
            dispatch(recoveryPasswordAC(email))
            dispatch(setAppStatusAC('succeeded'))
        })
}

export const setNewPasswordTC = (password: string,token: string) => (dispatch: Dispatch<AuthActionType>) => {
    const data: NewPasswordType = {
        password: password,
        resetPasswordToken: token
    }
    dispatch(setAppStatusAC('loading'))
    authAPI.setNewPassword(data)
        .then(res => {
            dispatch(setAppStatusAC('succeeded'))
        })
}

// types
type AuthActionType =
    ReturnType<typeof addLoginAC>
    | ReturnType<typeof registrationAC>
    | AppActionType
    | ReturnType<typeof recoveryPasswordAC>
    | ReturnType<typeof setNewPasswordAC>

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

type InitialStateType = typeof initialState