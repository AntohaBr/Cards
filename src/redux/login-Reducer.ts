import {Dispatch} from "redux";

import {authAPI} from "../api/api";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";


const initialState = {
    isLoggedIn: false,
    name:""
}


//reducers
export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'GET-NAME':{
                return {...state,name:action.name}
        }
        default:
            return state
    }
}


// actions
export const addLoginAC = (value: boolean) => ({type: 'SET-LOGIN', value} as const)
export const getName=(name:string)=>({type:'GET-NAME',name}) as const

//thunks
export function loginTC(values: LoginType) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            console.log('*****')

            const response=await authAPI.login(values)
            console.log('>>>>')
            dispatch(addLoginAC(true))
            dispatch(setAppStatusAC("succeeded",true))
            dispatch(getName(response.data.name))
            console.log(response.data.name)
        } catch (e) {
            dispatch(setAppErrorAC("Неверный пароль или e-mail"))
            dispatch(setAppStatusAC("failed",false))
        }
    }
}


// types
type LoginActionType = ReturnType<typeof addLoginAC | typeof getName>

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

type InitialStateType = typeof initialState