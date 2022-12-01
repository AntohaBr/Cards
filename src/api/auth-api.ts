import axios, {AxiosResponse} from "axios";


const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL:'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


//api
export const authAPI = {
    me() {
        return instance.post<ResponseType>('auth/me', {})
    },
    registration(data: RegistrationType) {
        return instance.post<RegistrationType, AxiosResponse<ResponseRegistrationType>>('auth/register', data)
    },
    login(values: LoginType) {
        return instance.post<ResponseType>('auth/login', values)
    },
    logOut() {
        return instance.delete<{ info: string, error: string }>('auth/me')
    },
    updateProfile(newData: NewDataType) {
        return instance.put<{ updatedUser: ResponseType, error: string }>('auth/me', newData)
    },
    recoveryPassword(data:ForgotType){
        return instance.post<ForgotType,AxiosResponse<ResponseForgotType>>('auth/forgot',data)
    },
    setNewPassword(token:NewPasswordType){
        return instance.post<NewPasswordType,AxiosResponse<ResponseNewPasswordType>>('auth/set-new-password',token)
    }
}


// export const cardsAPI = {
//     getCardsPack(pageCount:number,page:number,userId?:string){
//         return instance.get<CardPacksRequestType>(`cards/pack`,{
//             params:{
//                 pageCount:pageCount,
//                 page,
//                 user_id:userId
//             }
//         })
//     },
//     createCardsPack(name:string,privated:boolean){
//         return instance.post('cards/pack',{cardsPack :{name,privated}})
//     },
//     getCards(cardsPack_id:string,page:number,pageCount:number){
//         return instance.get<CardsRequestType>('cards/card',{
//             params:{
//                 cardsPack_id,
//                 page,
//                 pageCount
//             }
//         })
//     }
// }


//types
export type RegistrationType = {
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
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type NewDataType = {
    name: string
    avatar: string
}

export type ForgotType={
    email: string
    message: string
}

type ResponseForgotType ={
    info:string
    error: string
}

export type NewPasswordType ={
    password: string
    resetPasswordToken: string
}

type ResponseNewPasswordType ={
    info: string
    error: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}
// export type CardPacksRequestType={
//     cardPacks: {
//         _id: string
//         user_id: string
//         name: string
//         cardsCount: number
//         created: string
//         updated: string
//         user_name:string
//     }[],
//     cardPacksTotalCount: number
//     maxCardsCount: number
//     minCardsCount: number
//     page: number
//     pageCount: number
// }
// export type CardsType={
//     answer: string
//     question: string
//     cardsPack_id: string
//     grade: number
//     shots: number
//     user_id: string
//     created: string
//     updated: string
//     _id: string
// }

// export type CardsRequestType={
//     cards:CardsType[]
//     cardsTotalCount: number
//     maxGrade:number
//     minGrade: number
//     page: number
//     pageCount: number
//     packUserId: string
// }
