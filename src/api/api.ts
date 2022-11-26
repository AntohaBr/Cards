import axios, {AxiosResponse} from "axios";
import {LoginType} from "../redux/autch-Reducer";




const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? '-' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


//api
export const authAPI = {
    me() {
        return instance.post<ResponseType>('auth/me', {})
    },
    registration(data: RegistrationParamType) {
        return instance.post<RegistrationParamType, AxiosResponse<ResponseRegistrationType>>('auth/register', data)
    },
    login(values: LoginType) {
        return instance.post<ResponseType>('auth/login', values)
    },
    logOut() {
        return instance.delete<{ info: string, error: string }>('auth/me')
    },
    updateName(model:UserResponseType) {
        return instance.put<{ updatedUser: ResponseType, error: string }>('auth/me', model)
    },
}

export const cardsAPI={
    getCardsPack(pageCount:number,page:number,userId?:string){
        return instance.get<CardPacksRequestType>(`/cards/pack`,{
            params:{

                pageCount:pageCount,
                page,
                user_id:userId
            }
        })
    },
    createCardsPack(name:string,privated:boolean){
        return instance.post('cards/pack',{cardsPack :{name,privated}})
    },
    getCards(){
        return instance.get<CardsRequestType>('/cards/card')
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
export type UserResponseType={
    email: string;
    name: string;
    avatar?: string;
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




export type CardPacksRequestType={
    cardPacks: {
            _id: string
            user_id: string
            name: string
            cardsCount: number
            created: string
            updated: string
        user_name:string
        }[],
    cardPacksTotalCount: number
    // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number
}
export type CardsType={
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CardsRequestType={
    cards:CardsType[]
    cardsTotalCount: number
    maxGrade:number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}
