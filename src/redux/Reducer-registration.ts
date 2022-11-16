import {authAPI, RegistrationParamType} from "../api/cards-api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-reducer";

const initialState = {
    value: {}
}

// reducers
export const registrationReducer = (state: InitialStateType = initialState, action: RegistrationActionType): InitialStateType => {
    switch (action.type) {
        case "registration/ADD-DATA":
            return {...state, value: action.value}
        default:
            return state
    }
}


// actions
const registrationAC = (value: {}) => ({type: 'registration/ADD-DATA', value} as const)


// types
type RegistrationActionType = ReturnType<typeof registrationAC>
type InitialStateType = typeof initialState


//thunks
export const registrationTC = (data: RegistrationParamType) => (dispatch: Dispatch<RegistrationActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(setAppErrorAC())

    authAPI.registration(data)
        .then(res => {
            dispatch(registrationAC(re.)
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch((err) => {
            setAppError(err)
            dispatch(setAppStatusAC("none"))
        })
}

