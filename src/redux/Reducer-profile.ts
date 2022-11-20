import {Dispatch} from "redux";
import {authAPI} from "../api/api";
import {setAppStatusAC} from "./app-Reducer";



const initialState = {
    name: "Alex",
    email: "email is empty",
    avatar: "https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg",
}

export const profileReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
    switch (action.type) {
        case "APP/AUTH-NAME":
            return {...state, ...action.model,};
        case "APP/AUTH-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
}


// actions
export const updateNameAC = (model: NewResponseType) => ({type: "APP/AUTH-NAME", model} as const)
export const emailInProfileAC = (email: string) => ({type: "APP/AUTH-EMAIL", email} as const)


// thunks
export function NewNameTC (name: string, avatar: string) {
    return (dispatch: Dispatch) => {
        authAPI.updateName({name, avatar})
            .then(res => {
                dispatch(updateNameAC({name: name, avatar: avatar}))
            })
            .catch(err => {
                //use notification
                // dispatch(updateNameAC())
            })
    }
}

export function emailInProfileTC () {
    return  async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            const response=await authAPI.me()
            dispatch(emailInProfileAC(response.data.email))
            dispatch(setAppStatusAC("succeeded", false))
        }

        catch (e) {
            dispatch(setAppStatusAC("failed", false))
        }


    }
}


//types
type AppActionsType =
    ReturnType<typeof updateNameAC>
    | ReturnType<typeof emailInProfileAC>

type initialStateType = {
    name: string
    avatar: string
    email: string
}

export type NewResponseType = {
    _id?: string;
    email?: string;
    name?: string;
    avatar?: string;
    publicCardPacksCount?: number;
    created?: Date;
    updated?: Date;
    isAdmin?: boolean;
    verified?: boolean; // подтвердил ли почту
    rememberMe?: boolean;
    error?: string;
}