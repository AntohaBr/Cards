import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsAPI = {
    getCards(params: GetParamsCardsTypeNotNeeded): Promise<AxiosResponse<GetCardsResponseType>>  {
        return instance.get<GetCardsResponseType, AxiosResponse<GetCardsResponseType>>(`/cards/card`, {
            params: {
                cardAnswer: params.cardAnswer,
                cardQuestion: params.cardQuestion,
                cardsPack_id: params.cardsPack_id,
                min: params.min,
                max: params.max,
                sortCards: params.sortCards,
                page: params.page,
                pageCount: params.pageCount,
            }
        })
    },
    deleteCards(cardID: string): Promise<AxiosResponse<{}>> {
        return instance.delete<{}, AxiosResponse<{}>>(`/cards/card`, )
    },

    postCards(postModel: PostCardType) {
        return instance.post<{}, AxiosResponse<{...}>>(`/cards/card`, postModel)
    },

    updateCards(putModel: UpdateCardType) {
        return instance.put<{}, AxiosResponse<{...}>>(`/cards/card`, putModel)
    }

}

type UpdateCardType = {
    card: {
        _id: string
        question?: string
        answer?: string
    }
}

type PostCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: "url" | "base 64"
        questionImg?: "url" | "base 64"
        questionVideo?: "url" | "base 64"
        answerVideo?: "url" | "base 64"
    }
}

type GetCardsResponseType = {
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

type CardsType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: Date
    updated: Date
    _id: string
}

type GetParamsCardsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string
    min: number
    max: number
    sortCards: number
    page: number
    pageCount: number
}
type GetParamsCardsTypeNotNeeded = Partial<GetParamsCardsType>