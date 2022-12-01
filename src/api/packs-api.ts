import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packsAPI = {
    getPacks(params: PacksGetParamsTypeNotNeeded) {
        return instance.get<PacksGetResponseType>(`cards/pack`,
            {
                params: {
                    packName: params.packName,
                    min: params.min,
                    max: params.max,
                    pageCount: params.pageCount,
                    user_id: params.user_id,
                }
            }
        )
    },

    deletePacks(packID: string) {
        return instance.delete<DeletePackResponseType>(`cards/pack`, {params: {id: packID}})
    },

    postPacks(postModel: PostPacksType) {
        return instance.post<PostPacksType, AxiosResponse<AddNewPackType>>(`cards/pack`, postModel)
    },

    updatePacks(putModel: UpdatePacksType) {
        return instance.put<UpdatePacksType, AxiosResponse<UpdatePackType>>(`cards/pack`, putModel)
    }
}

export type UpdatePackType = {
    updatedCardsPack: PacksType
    token: string
    tokenDeathTime: number
}

export type AddNewPackType = {
    newCardsPack: PacksType
    token: string
    tokenDeathTime: number
}

export type PacksGetResponseType = {
    cardPacks: PacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

type PacksGetParamsType = {
    packName: string
    min: number
    max: number
    sortPacks: number
    pageCount: number
    user_id: number
    block: boolean
}

export type PacksGetParamsTypeNotNeeded = Partial<PacksGetParamsType>

export type PacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
    grade: number
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    user_name: string
    __v: number
    deckCover: null | string
}

type PacksTypeForDelete = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
    grade: number
    more_id: string
    path: string
    private: boolean
    rating: number
    shots: number
    type: string
    user_name: string
    __v: number
}

export type PostPacksType = {
    cardsPack: {
        name?: string
        deckCover?: "url" | "base64"
        private?: boolean
    }
}

export type UpdatePacksType = {
    cardsPack: {
        _id: string
        name?: string
    }
}

export type DeletePackResponseType = {
    deletedCardsPack: PacksTypeForDelete
    token: string
    tokenDeathTime: number
}
