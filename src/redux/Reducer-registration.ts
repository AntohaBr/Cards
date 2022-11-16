import {authAPI, RegistrationParamType} from "../api/cards-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-reducer";

const initialState = {
    isARegistered : false
}

// redusers
export const registrationReducer = (state:InitialStateType = initialState, action:RegistrationActionType):InitialStateType => {
    switch (action.type){
        case "registration/ADD-DATA":
            return {...state,  isARegistered: action.value}
        default:
            return state
    }
}


// actions
const registrationAC = (value: boolean) =>({type:'registration/ADD-DATA',value} as const )


// types
type RegistrationActionType = ReturnType<typeof registrationAC>
type InitialStateType = typeof initialState


// thunks
export const registrationTC = (data: RegistrationParamType) => (dispatch: Dispatch<RegistrationActionType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.registration(data)
        .then(res => {
            if (res.data.resultCode === StatusCode.Ok) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })

}
