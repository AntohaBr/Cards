import {Dispatch} from "redux";
import {cardsAPI} from "../api/api";
import {addLoginAC} from "./login-Reducer";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {
    setCurrentPageAC,
    setCurrentPagePacksAC,
    setPageCount, setPageCountPacks,
    totalCountAC,
    totalCountPacksAC
} from "./Reducer-pagination";


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




        default: {
            return state
        }
    }

}



const setCardPacksAC = (cardPacks: CardsType[], isMyPack: boolean) => {
    return {type: 'CARDS/SET-CARDS-PACK', cardPacks, isMyPack} as const
}


const createCardsPack = (newPack: CardsType) => {
    return {type: 'CARDS/CREATE-PACK', newPack} as const
}


export const getCardPackTC = (pageCount: number, page: number, userId?: string,) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            const response = await cardsAPI.getCardsPack(pageCount, page, userId)
            dispatch(setAppStatusAC("succeeded", false))

            dispatch(addLoginAC(true))

            dispatch(setCardPacksAC(response.data.cardPacks, true,))

            dispatch(totalCountPacksAC(response.data.cardPacksTotalCount))
             dispatch(setPageCountPacks(response.data.pageCount))
            dispatch(setCurrentPagePacksAC(response.data.page))




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




}
type ActionType = ReturnType<typeof setCardPacksAC | typeof createCardsPack >

