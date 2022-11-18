import axios, {AxiosResponse} from "axios";
import {LoginType} from "../redux/Reducer-login";


const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


//api
export const authAPI = {
    me(){
        return instance.post<ResponseType>('auth/me',{})
    },
    registration(data:RegistrationParamType){
        return instance.post<RegistrationParamType, AxiosResponse<ResponseRegistrationType>>('auth/register', data)
    },
    login(values:LoginType){
        return instance.post<ResponseType>('auth/login',values)
    },
    logOut(){
        return instance.delete<{info:string,error:string}>('auth/me')
    }
}



//types
export type RegistrationParamType = {
    email: string
    password: string
}

export type ResponseRegistrationType = {
    addedUser: any
    error?: string
}

export type ResponseType={
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
// количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}