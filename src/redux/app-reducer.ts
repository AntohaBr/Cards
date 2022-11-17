
import {Dispatch} from "redux";
import {authAPI} from "../dal/api";
import {ThunkDispatchType} from "./Store";

export type StatusType = 'none' | 'idle' | 'succeeded'

type StateType = {
    error: string
    status: StatusType
    isLoggedIn:boolean
}

const initialState = {
    status: 'none' as StatusType,
    error: '',
    isLoggedIn:false
}

type ActionType = ReturnType<typeof setAppError | typeof setAppStatus | typeof checkIsAuth>


export const appReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-STATUS":{
            return {...state,status:action.status}
        }
        case "APP/AUTH-ME":{
            return {...state,isLoggedIn:action.logged}
        }
        default : {
            return state
        }
    }
}

export const setAppError = (error: string) => ({ type: 'APP/SET-ERROR', error} as const)
export const checkIsAuth=(logged:boolean)=>({ type:"APP/AUTH-ME", logged} as const)
export const setAppStatus = (status: StatusType) => ({ type: "APP/SET-STATUS",  status} as const)


export function authTC()  {
return (dispatch:Dispatch)=>{
    dispatch(setAppStatus("idle"))
       authAPI.me()
           .then(res=>{
               dispatch(setAppStatus("succeeded"))
               dispatch(checkIsAuth(true))
           })
           .catch(err=>{
               dispatch(checkIsAuth(false))
               dispatch(setAppStatus("none"))

           })
    }

}

export function logOutTC(){
    return (dispatch:Dispatch)=>{
        dispatch(setAppStatus("idle"))
        authAPI.logOut()
            .then(res=>{
                dispatch(checkIsAuth(false))
                dispatch(setAppStatus("succeeded"))
            })
            .catch(err=>{
                dispatch(checkIsAuth(true))
                dispatch(setAppStatus("none"))
            })
    }
}
