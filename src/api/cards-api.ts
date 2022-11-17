import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


//api

export const authAPI = {
    registration(data:RegistrationParamType){
        return instance.post<RegistrationParamType, AxiosResponse<ResponseRegistrationType>>('auth/register', data)
    }
}



//type

export type RegistrationParamType = {
    email: string
    password: string
}

export type ResponseRegistrationType = {
    addedUser: any
    error?: string
}