import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "./app-reducer";
import {authAPI} from "../api/cards-api";


const initialState = {}


//reducers
export const loginReducer = (state: any = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {...state}
        default:
            return state
    }
}


// actions
export const addLoginAC = (login: any) => ({type: 'SET-LOGIN', login} as const)


//thunks
export function loginTC(values: LoginType) {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("idle"))
        authAPI.login(values)
            .then(res => {
                dispatch(setAppStatus("succeeded"))
            })
            .catch((err) => {
                dispatch(setAppError("Неверный пароль или e-mail"))
                dispatch(setAppStatus("none"))
            })
    }
}


// types
type LoginActionType = ReturnType<typeof addLoginAC>
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}