import {Dispatch} from "redux";
import {AxiosError} from "axios";
import {errorUtils} from "../utils/Error-utils";
import {authAPI, NewDataType} from "../api/auth-api";
import {setAppStatusAC} from "./App-reducer";


const initialState = {
    _id:''as string,
    name: '' as string,
    email: '' as string,
    avatar: '' as string,
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE-PROFILE":
            return {...state, ...action.newData};
        case "PROFILE/AUTH-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
}


//actions
export const updateProfileAC = (newData: NewDataType) => ({type: "PROFILE/UPDATE-PROFILE", newData}as const)
export const emailInfoAC = (email: string) => ({type: "PROFILE/AUTH-EMAIL", email} as const)


//thunks
export const updateProfileTC = (name: string, avatar: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        await authAPI.updateProfile({name, avatar})
        dispatch(updateProfileAC({name, avatar}))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}

export const emailInfoTC = () => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        dispatch(setAppStatusAC("loading", true))
        const response = await authAPI.me()
        dispatch(emailInfoAC(response.data.email))
        dispatch(setAppStatusAC("succeeded", false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}


//types
export type ProfileActionType =
    ReturnType<typeof updateProfileAC>
    | ReturnType<typeof emailInfoAC>
    | ReturnType<typeof setAppStatusAC>

type initialStateType = typeof initialState

