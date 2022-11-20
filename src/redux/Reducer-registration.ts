import {authAPI, RegistrationParamType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";


const initialState = {
    isRegistered: false
}

// reducers
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType):
    InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/ADD-DATA':
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}


// actions
const registrationAC = (value: boolean) => ({type: 'REGISTRATION/ADD-DATA', value} as const)


//thunks
export function registrationTC(data: RegistrationParamType) {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC('loading',true))
            await authAPI.registration(data)
            dispatch(registrationAC(true))
            dispatch(setAppStatusAC('succeeded',false))
        } catch (e) {
            dispatch(setAppErrorAC('the username or email already exists'))
            dispatch(setAppStatusAC('failed',false))
        }
    }
}


// types
type RegistrationActionType = ReturnType<typeof registrationAC>
type InitialStateType = typeof initialState