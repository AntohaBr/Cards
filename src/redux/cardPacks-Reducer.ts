import {Dispatch} from "redux";
import {cardsAPI, CardsRequestType} from "../api/api";
import {addLoginAC} from "./login-Reducer";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {AxiosError} from "axios";
import {constants} from "fs/promises";


export type CardsType = {
    _id: string
    user_id: string
    name: string
    cardsCount: number
    created: string
    updated: string,
    user_name: string

}

const initState = {
    cardPacks: [],
    isMyPack: false,
    userId: "",
    pageCount: 9,
    allCardsPack: 0,
    currentPage: 7
}
export const cardPacksReducer = (state: CardPacksInitStateType = initState, action: ActionType): CardPacksInitStateType => {

    switch (action.type) {
        case "CARDS/SET-CARDS-PACK": {

            return {
                ...state,
                cardPacks: action.cardPacks,
                isMyPack: action.isMyPack,
                userId: state.cardPacks.map(el => el.user_id ? el.user_id : '')[0]
            }
        }

        case "CARDS/CREATE-PACK": {
            return {...state, cardPacks: [...state.cardPacks, action.newPack]}
        }
        case "SET-PAGE-COUNT": {
            return {...state, pageCount: action.count}
        }

        case "SET-TOTAL-COUNT": {
            return {...state, allCardsPack: action.totalCount}
        }
        case "SET-CURRENT-PAGE": {
            return {...state, currentPage: action.currentPage}
        }

        default: {
            return state
        }
    }

}
const totalCountAC = (totalCount: number) => {
    return {type: 'SET-TOTAL-COUNT', totalCount} as const
}

const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}

const setCardPacksAC = (cardPacks: CardsType[], isMyPack: boolean) => {
    return {type: 'CARDS/SET-CARDS-PACK', cardPacks, isMyPack} as const
}


const createCardsPack = (newPack: CardsType) => {
    return {type: 'CARDS/CREATE-PACK', newPack} as const
}

const setPageCount = (count: number) => {
    return {type: 'SET-PAGE-COUNT', count} as const
}

export const getCardPackTC = (pageCount: number, page: number, userId?: string,) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            const response = await cardsAPI.getCardsPack(pageCount, page, userId)
            dispatch(setAppStatusAC("succeeded", false))

            dispatch(addLoginAC(true))

            dispatch(setCardPacksAC(response.data.cardPacks, true,))

            dispatch(totalCountAC(response.data.cardPacksTotalCount))

            dispatch(setCurrentPageAC(response.data.page))

            console.log(response.data)

        } catch (e) {
            dispatch(setAppErrorAC('Error'))
            dispatch(setAppStatusAC("failed", false))
        }
    }

}
export const createPackTC = () => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await cardsAPI.createCardsPack("Sa coloda", false)
            dispatch(createCardsPack(response.data.newCardsPack))
        } catch (e) {

        }
    }
}

//types
export type  CardPacksInitStateType = {
    cardPacks: CardsType[]
    isMyPack: boolean
    userId: string
    pageCount: number
    allCardsPack: number
    currentPage: number

}
type ActionType = ReturnType<typeof setCardPacksAC | typeof createCardsPack
    | typeof setPageCount
    | typeof totalCountAC
    | typeof setCurrentPageAC>

