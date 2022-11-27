import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setAppStatusAC} from "./App-reducer";
import {AxiosError} from "axios";
import {errorUtils} from "../utils/Error-utils";


const initialState = {
    name: "Alex",
    email: "email is empty",
    avatar: "https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg",
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case "PROFILE/AUTH-NAME":
            return {...state, ...action.model};
        case "PROFILE/AUTH-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
}


// actions
export const updateNameAC = (model: NewResponseType) => ({type: "PROFILE/AUTH-NAME", model} as const)
export const emailInProfileAC = (email: string) => ({type: "PROFILE/AUTH-EMAIL", email} as const)


// thunks
export const NewNameTC = (name: string, avatar: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    try {
        await authAPI.updateName({name, avatar})
        dispatch(updateNameAC({name: name, avatar: avatar}))
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
export type ProfileActionType =
    ReturnType<typeof updateNameAC>
    | ReturnType<typeof emailInProfileAC>
    | ReturnType<typeof setAppStatusAC>

type initialStateType = typeof initialState

export type NewResponseType = {
    _id?: string;
    email?: string;
    name?: string;
    avatar?: string;
    publicCardPacksCount?: number;
    created?: Date;
    updated?: Date;
    isAdmin?: boolean;
    verified?: boolean;
    rememberMe?: boolean;
    error?: string;
}