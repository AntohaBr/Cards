import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const cardsAPI = {
    getCards(params: GetParamsCardsTypeNotNeeded) {
        return instance.get<GetParamsCardsTypeNotNeeded, AxiosResponse<GetCardsResponseType>>(`/cards/card`, {
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
    deleteCards(cardID: string) {
        return instance.delete<string, AxiosResponse<DeleteRespondCardType>>(`/cards/card`, {params: {id: cardID}})
    },

    postCards(postModel: PostCardType) {
        return instance.post <PostCardType, AxiosResponse<PostResponseCardType>>(`/cards/card`, postModel) // TODO исправить типизацию респонса
    },

    updateCards(putModel: UpdateCardType) {
        return instance.put <UpdateCardType, AxiosResponse<PutResponseCardType>>(`/cards/card`, putModel)
    }

}

export type UpdateCardType = {
    card: {
        _id: string
        question?: string
        answer?: string
    }
}

export type PostCardType = {
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

export type GetCardsResponseType = {
    cards: CardsType[]
    "packUserId": string
    "packName": string
    "packPrivate": boolean
    "packDeckCover": null | string
    "packCreated": Date
    "packUpdated": Date
    "page": number
    "pageCount": number
    "cardsTotalCount": number
    "minGrade": number
    "maxGrade": number
    "token": string
    "tokenDeathTime": number
}

export type CardsType = {
    "_id": string
    "cardsPack_id": string
    "user_id": string
    "answer": string
    "question": string
    "grade": number
    "shots": number
    "comments": string
    "type": string
    "rating": number
    "more_id": string
    "created": Date
    "updated": Date
    "__v": number
    "answerImg": string
    "answerVideo": string
    "questionImg": string
    "questionVideo": string
}

type GetParamsCardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: number
    page?: number
    pageCount?: number
}

export type GetParamsCardsTypeNotNeeded = Partial<GetParamsCardsType>

type DeleteRespondCardType = {
    deletedCard: CardsType
    "token": "45bc1750-6e7f-11ed-82c3-715f20fbf94f",
    "tokenDeathTime": 1669583642821
}

type PostResponseCardType = {
    newCard: NewCardPostType
    token: string
    tokenDeathTime: number
}

export type NewCardPostType = {
    "_id": string
    "cardsPack_id": string
    "user_id": string
    "answer": string
    "question": string
    "grade": number
    "shots": number
    "comments": string
    "type": string
    "rating": number
    "more_id": string
    "created": Date
    "updated": Date
    "__v": number
    "answerImg": string
    "answerVideo": string
    "questionImg": string
    "questionVideo": string
}

type PutResponseCardType = {
    updatedCard: CardsType
    "token": string
    "tokenDeathTime": number
}