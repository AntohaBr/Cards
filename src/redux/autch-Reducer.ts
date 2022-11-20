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
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading",true))
            await authAPI.login(value)
            dispatch(addLoginAC(true))
            dispatch(setAppStatusAC("succeeded",false))
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
            dispatch(setAppStatusAC('loading',true))
            await authAPI.registration(value)
            dispatch(registrationAC(true))
            dispatch(setAppStatusAC('succeeded',false))
        }

        catch (e) {
            dispatch(setAppErrorAC('the username or email already exists'))
            dispatch(setAppStatusAC('failed',false))
        }
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