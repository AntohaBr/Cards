import {authAPI, RegistrationParamType} from "../api/cards-api";
import {Dispatch} from "redux";
import {ActionType, setAppStatus} from "./app-reducer";



const initialState = {
    isRegistered: false
}

// reducers
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case "registration/ADD-DATA":
            return {...state, isRegistered: action.value}
        default:
            return state
    }
}


// actions
const registrationAC = (value: boolean) => ({type: 'registration/ADD-DATA', value} as const)


// types
type RegistrationActionType = ReturnType<typeof registrationAC> | ActionType
type InitialStateType = typeof initialState


//thunks
export function registrationTC(data: RegistrationParamType) {
    return (dispatch: Dispatch<RegistrationActionType>) => {
        dispatch(setAppStatus('idle'))
        authAPI.registration(data)
            .then(res => {
                dispatch(registrationAC(true))
                dispatch(setAppStatus('succeeded'))
            })
    }
}
