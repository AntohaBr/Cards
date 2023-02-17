import {setAppStatusAC} from './App-reducer'
import {AppThunkType} from './Store'
import {setCurrentPageAC, setPageCount, totalCountAC} from './Pagination-reducer'
import {
    CardLearnType,
    cardsApi,
    CardType,
    GetCardsParamsType,
    GetCardsResponseType,
    PostCardType,
    UpdateCardType, UpdatedGradeCartType
} from '../api/Cards-api'
import {AxiosError} from 'axios'
import {errorUtil} from '../utils/Error-util'


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
    question: '',
    answer: '',
    shots: 0,
    grade: 0,
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
        case 'CARDS/UPDATE_GRADE_CARD':
            return {
                ...state,
                cards: state.cards.map(el =>
                    el._id === action.data.card_id
                        ? {...el, grade: action.data.grade, shots: action.data.shots}
                        : el
                ),
            }
        case "CARDS/SET_UTILS": {
            const currentCard = state.cards.find(el => el._id === action._id)
            // console.log(currentCard ${currentCard})

            if (currentCard) {
                return {...state, answer: currentCard.answer, question: currentCard.question}
            }
            return state
        }
        default: {
            return state
        }
    }
}

export const setCardsAC = (data: GetCardsResponseType) => ({type: 'CARDS/SET_CARDS', data} as const)
export const updateGradeCardAC = (data: UpdatedGradeCartType) => ({type: 'CARDS/UPDATE_GRADE_CARD', data} as const)
export const setUtilsAC = (_id: string) => ({type: 'CARDS/SET_UTILS', _id} as const)

// export const setPackIdAC = (cardsPack_id: string) => ({type: 'CARDS/SET_PACK_ID', cardsPack_id} as const)
// export const setTotalCardsCountAC = (cardsTotalCount: number) =>
//     ({
//         type: 'CARDS/SET_TOTAL_CARDS_COUNT',
//         cardsTotalCount,
//     } as const)


//thunks
export const getCardsTC = (params: GetCardsParamsType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.getCards(params)
        dispatch(setPageCount(res.data.pageCount))
        dispatch(totalCountAC(res.data.cardsTotalCount))
        dispatch(setCurrentPageAC(res.data.page))
        dispatch(setCardsAC(res.data))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const deleteCardsTC = (_id: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.deleteCards(_id)
        dispatch(getCardsTC({cardsPack_id: res.data.deletedCard.cardsPack_id}))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const addNewCardsTC = (postModel: PostCardType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.addNewCards(postModel)
        dispatch(getCardsTC({cardsPack_id: res.data.newCard.cardsPack_id}))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const updateCardsTC = (putModel: UpdateCardType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.updateCards({...putModel})
        dispatch(getCardsTC({cardsPack_id: res.data.updatedCard.cardsPack_id}))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const updateGradeCardTC = (putModelGrade: CardLearnType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.updateGradeCard(putModelGrade)
        dispatch(updateGradeCardAC(res.data.updatedGrade))
        dispatch(setAppStatusAC("succeeded", false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}


//types
export type CardsActionType =
    ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateGradeCardAC>
    | ReturnType<typeof setUtilsAC>

