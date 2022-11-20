import {Dispatch} from "redux";

import {authAPI} from "../api/api";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";


const initialState = {
    isLoggedIn: false
}


//reducers
export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}


// actions
export const addLoginAC = (value: boolean) => ({type: 'SET-LOGIN', value} as const)

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
        } catch (e) {
            dispatch(setAppErrorAC("Неверный пароль или e-mail"))
            dispatch(setAppStatusAC("failed",false))
        }
    }
}


// types
type LoginActionType = ReturnType<typeof addLoginAC>

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

type InitialStateType = typeof initialState