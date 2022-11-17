import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {setAppError, setAppStatus} from "./app-reducer";


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
                dispatch(addLoginAC("sass"))
                dispatch(setAppStatus("succeeded"))
            })
            .catch((err) => {
                setAppError(err)
                dispatch(setAppStatus("none"))
            })
    }
}
