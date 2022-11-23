import {Dispatch} from "redux";
import {authAPI, NewDataType} from "../api/Api";
import {setAppStatusAC} from "./App-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../utils/Error-utils";


const initialState = {
    name: "" as string,
    email: "" as string,
    avatar: ""as string,
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "PROFILE/AUTH-NAME":
            return {...state, ...action.newData};
        case "PROFILE/AUTH-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
}


// actions
export const updateNameAC = (newData: NewDataType) => ({type: "PROFILE/AUTH-NAME", newData}as const)
export const emailInProfileAC = (email: string) => ({type: "PROFILE/AUTH-EMAIL", email} as const)


// thunks
export const NewNameTC = (name: string, avatar: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        await authAPI.updateName({name, avatar})
        dispatch(updateNameAC({name, avatar}))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}

export const emailInProfileTC = () => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        dispatch(setAppStatusAC("loading", true))
        const response = await authAPI.me()
        dispatch(emailInProfileAC(response.data.email))
        dispatch(setAppStatusAC("succeeded", false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}


//types
type ProfileActionType =
    ReturnType<typeof updateNameAC>
    | ReturnType<typeof emailInProfileAC>
    | ReturnType<typeof setAppStatusAC>

type initialStateType = typeof initialState

