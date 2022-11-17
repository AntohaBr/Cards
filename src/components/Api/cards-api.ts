import axios from "axios";

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
    error?: string;
}


type NDataType = {
    name: string
    avatar: string
}

export const authAPI = {
    logOut() {
        return instance.delete<{ info: string, error: string }>('auth/me')
    },
    updateName(ndata: NDataType) {
        return instance.put<{ updatedUser: ResponseType, error: string }>('auth/me', ndata)
    },

    me() {
        return instance.post<ResponseType>("auth/me",{});
    },
};