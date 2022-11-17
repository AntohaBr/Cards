import {authAPI} from "../components/Api/cards-api";
import {Dispatch} from "redux";

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

const initialState = {
    name: "Alex",
    email: "j&johnson@gmail.com",
    avatar: "https://catherineasquithgallery.com/uploads/posts/2021-03/1614599142_52-p-foto-cheloveka-na-belom-fone-59.jpg",
}

type AppActionsType =
    ReturnType<typeof updateNameAC>
    | ReturnType<typeof emailInProfileAC>


export const appReducer = (state: initialStateType = initialState, action: AppActionsType): initialStateType => {
    switch (action.type) {
        case "APP/AUTH-NAME":
            return {...state, ...action.model,};
        case "APP/AUTH-EMAIL":
            return {...state, email: action.email}
        default:
            return state;
    }
};


export const updateNameAC = (model: NewResponseType) => {
    return {type: "APP/AUTH-NAME", model} as const
}

export const emailInProfileAC = (email: string) => {
    return {type: "APP/AUTH-EMAIL", email} as const
}

export const checkIsAuth = (logged: boolean) => {
    return {type: "APP/AUTH-ME", logged} as const
}


export function logOutTC() {
    return (dispatch: Dispatch) => {
        authAPI.logOut()
            .then(res => {
                dispatch(checkIsAuth(false))

            })
            .catch(err => {
                dispatch(checkIsAuth(true))
            })
    }
}

export function NewNameTC(name: string, avatar: string) {
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

export function emailInProfileTC() {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                dispatch(emailInProfileAC(res.data.email))

            })
            .catch(err => {
                //use notification
                // dispatch(updateNameAC())
            })
    }
}
