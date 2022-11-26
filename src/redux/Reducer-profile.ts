import {Dispatch} from "redux";
import {authAPI, ResponseType, UserResponseType} from "../api/api";
import {setAppStatusAC} from "./app-Reducer";
import {addLoginAC} from "./login-Reducer";
import {RootReducerType} from "./store";



const initialState = {
    name: "",
    email: "email is empty",
    avatar: "https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg",
    userId: "",
}

export const profileReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
    switch (action.type) {
        case "APP/AUTH-NAME":
            return {...state,   ...action.model};
        case "APP/AUTH-EMAIL":
            return {...state, email: action.email, name: action.name, userId: action.userId}
        default:
            return state;
    }
}


// actions
export const updateNameAC = (model:Partial<UserResponseType>) => ({type: "APP/AUTH-NAME", model} as const)
export const emailInProfileAC = (email: string,name:string, userId: string) => ({type: "APP/AUTH-EMAIL", email, name, userId} as const)


// thunks
export function NewNameTC (model:Partial<UserResponseType>) {
    return (dispatch: Dispatch,getState:()=>RootReducerType) => {
        const user=getState().profile
        const apiModel:UserResponseType={
            avatar:user.avatar,
            name:user.name,
            email:user.name,
            ...model
        }

        dispatch(setAppStatusAC("loading",true ))
        authAPI.updateName(apiModel)
            .then(res => {
                dispatch(updateNameAC(apiModel))
                dispatch(setAppStatusAC("succeeded", false))
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
            dispatch(addLoginAC(true))
            dispatch(emailInProfileAC(response.data.email,response.data.name, response.data._id))


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
    userId: string
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