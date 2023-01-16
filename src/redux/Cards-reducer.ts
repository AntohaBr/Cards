import {Dispatch} from "redux";
import {setAppStatusAC} from "./App-reducer";
import {RootReducerType, ThunkDispatchType} from "./Store";
import {setCurrentPageAC, setPageCount, totalCountAC} from "./Pagination-reducer";
import {cardsAPI, CardType, GetCardsParamsType, GetCardsResponseType} from "../api/cards-api";
import {AxiosError} from "axios";
import {errorUtils} from "../utils/Error-utils";


export const initialState = {
    cards: [] as CardType[],
    packUserId: '',
    packName: '',
    packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    page: 0,
    pageCount: 0,
    cardsTotalCount: 0 as number,
    minGrade: 0,
    maxGrade: 0,
    cardsPack_id: '' as string,
}

export type CardsReducerStateType = typeof initialState

export const cardsReducer = (state: CardsReducerStateType = initialState, action: CardsActionType): CardsReducerStateType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {
                ...state,
                cards: action.data.cards,
                packName: action.data.packName,
                page: action.data.page,
                packDeckCover: action.data.packDeckCover,
                packUserId: action.data.packUserId
            }


        // case "SET-UTILS": {
        //     const currentCard = state.cards.find(el => el._id === action.id)
        //     console.log(`currentCard ${currentCard}`)
        //
        //     if (currentCard) {
        //         return {...state, answer: currentCard.answer, question: currentCard.question}
        //     }
        //     return state
        // }
        //
        // case "CARDS/SET-GRADE-AND-SHOTS": {
        //     return {...state, grade: action.grade, shots: action.shots}
        // }


        default: {
            return state
        }
    }

}


export const setCardsAC = (data: GetCardsResponseType) => ({type: 'CARDS/SET_CARDS', data} as const)
// export const setCardsLearnDataAC = (data: UpdatedGradeCartType) => ({type: 'CARDS/SET_CARDS_LEARN_DATA', data} as const)
// export const setPackIdAC = (cardsPack_id: string) => ({type: 'CARDS/SET_PACK_ID', cardsPack_id} as const)
// export const setTotalCardsCountAC = (cardsTotalCount: number) =>
//     ({
//         type: 'CARDS/SET_TOTAL_CARDS_COUNT',
//         cardsTotalCount,
//     } as const)


//thunks
export const getCardsTC = (params: GetCardsParamsType) => async (dispatch: ThunkDispatchType) => {
    dispatch(setAppStatusAC("loading", true))
    try {
        const res = await cardsAPI.getCards(params)
        dispatch(setPageCount(res.data.pageCount))
        dispatch(totalCountAC(res.data.cardsTotalCount))
        dispatch(setCurrentPageAC(res.data.page))
        dispatch(setCardsAC(res.data))
        dispatch(setAppStatusAC("succeeded", false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

//
// export const updateGradeTC = (model: Partial<GradeModelType>) => {
//     return async (dispatch: Dispatch, getState: () => RootReducerType) => {
//
//         const card = getState().cards
//         const apiModel: GradeModelType = {
//
//             grade: card.grade,
//             card_id: card.card_id,
//             ...model
//         }
//
//
//         try {
//             const response = await cardsAPI.grade(apiModel)
//             console.log(response.data, 'RESPONSE---')
//             dispatch(setGradeAndShots(response.data.updatedGrade._id, response.data.updatedGrade.grade, response.data.updatedGrade.shots))
//
//         } catch (e) {
//             const err = e as Error | AxiosError<{ successError: null | string }>
//             errorUtils(err, dispatch)
//         }
//     }
// }

//types
export type CardsActionType = ReturnType<typeof setCardsAC>

