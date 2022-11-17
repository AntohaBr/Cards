import {Dispatch} from "redux";
import {authAPI, ResponseType} from "../dal/api";
import {setAppError, setAppStatus} from "./app-reducer";
import {AxiosError} from "axios";


const initialState = {}

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


// types
type LoginActionType = ReturnType<typeof addLoginAC>
export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export function loginTC(values: LoginType) {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatus("idle"))

        authAPI.login(values)
            .then(res => {

                dispatch(setAppStatus("succeeded"))
            })
            .catch((err) => {

               dispatch( setAppError("Неверный пароль или e-mail"))
                dispatch(setAppStatus("none"))
            })
    }
}
