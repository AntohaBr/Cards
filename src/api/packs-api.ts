import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const packsAPI = {
    getPacks(params: PacksGetParamsTypeNotNeeded) {
        return instance.get<PacksGetResponseType>(`/cards/pack`,
            {
                params: {
                    packName: params.packName,
                    min: params.min,
                    max: params.max,
                    sortPacks: params.sortPacks,
                    pageCount: params.pageCount,
                    user_id: params.user_id,
                    block: params.block,
                }
            }
        )
    },

    deletePacks(packID: string) {
        return instance.delete<{}, AxiosResponse<{}>>(`/cards/pack`, {params: {id: packID}})
    },

    postPacks(postModel: PostPacksType) {
        return instance.post<{}, AxiosResponse<{}>>(`/cards/pack`, postModel)
    },

    updatePacks(putModel: UpdatePacksType) {
        return instance.put<{}, AxiosResponse<{}>>(`/cards/pack`, putModel)
    }
}


type PacksGetResponseType = {
    cardPacks: PacksType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
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
type PacksGetParamsTypeNotNeeded = Partial<PacksGetParamsType>

type PacksType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: Date
    updated: Date
}

type PostPacksType = {
    cardsPack: {
        name?: string
        deckCover?: "url" | "base64"
        private?: boolean
    }
}

type UpdatePacksType = {
    cardsPack: {
        _id: string
        name?: string
    }
}
