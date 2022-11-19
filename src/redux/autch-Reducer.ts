import {Dispatch} from "redux";
import {AppActionType, setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {authAPI, RegistrationParamType} from "../api/api";


const initialState = {
    isLoggedIn: false,
    isRegistered: false
}


//reducers
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'auth/DATA-REGISTRATION':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}


// actions
export const addLoginAC = (value: boolean) => ({type: 'auth/SET-LOGIN', value} as const)
export const registrationAC = (value: boolean) => ({type: 'auth/DATA-REGISTRATION', value} as const)


//thunks
export function loginTC(value: LoginType) {
    return (dispatch: Dispatch) => {
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
}

export function registrationTC(value: RegistrationParamType) {
    return (dispatch: Dispatch<AuthActionType>) => {
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
}


// types
type AuthActionType =
    ReturnType<typeof addLoginAC>
    | ReturnType<typeof registrationAC>
    | AppActionType

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

type InitialStateType = typeof initialState