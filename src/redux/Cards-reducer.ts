import {setAppStatusAC} from './App-reducer'
import {AppThunkType} from './Store'
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
    // packPrivate: false,
    packDeckCover: '',
    packCreated: '',
    packUpdated: '',
    page: 1,
    pageCount: 7,
    cardsTotalCount: 0 as number,
    minGrade: 0,
    maxGrade: 0,
    cardsPack_id: '' as string,
    cardQuestion: '',
    cardAnswer: '',
    shots: 0,
    grade: 0,
}


export const cardsReducer = (state: CardsReducerStateType = initialState, action: CardsActionType): CardsReducerStateType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
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
        case 'CARDS/SET_UTILS':
            const currentCard = state.cards.find(el => el._id === action._id)
            if (currentCard) {
                return {...state, cardAnswer: currentCard.answer, cardQuestion: currentCard.question}
            }
            return state
        case 'CARDS/SEARCH-BY-CARD-QUESTION':
            return {...state, cardQuestion: action.cardQuestion}
        case 'CARDS/SET-CARDS-PAGE':
            return {...state, page: action.page}
        case 'CARDS/SET-CARDS-PAGE-COUNT':
            return {...state, pageCount: action.pageCount}
        case 'CARDS/SET-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.cardsTotalCount}
        default: {
            return state
        }
    }
}

export const setCardsAC = (data: GetCardsResponseType) => ({type: 'CARDS/SET_CARDS', data} as const)
export const updateGradeCardAC = (data: UpdatedGradeCartType) => ({type: 'CARDS/UPDATE_GRADE_CARD', data} as const)
export const setUtilsAC = (_id: string) => ({type: 'CARDS/SET_UTILS', _id} as const)
export const searchCardsAC = (cardQuestion: string) => ({type: 'CARDS/SEARCH-BY-CARD-QUESTION', cardQuestion} as const)
export const setCardsPageAC = (page: number) => ({type: 'CARDS/SET-CARDS-PAGE', page} as const)
export const setCardsPageCountAC = (pageCount: number) => ({type: 'CARDS/SET-CARDS-PAGE-COUNT', pageCount} as const)
export const setCardsTotalCountAC = (cardsTotalCount: number) => ({
    type: 'CARDS/SET-CARDS-TOTAL-COUNT', cardsTotalCount
} as const)


//thunks
export const getCardsTC = (params: GetCardsParamsType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.getCards(params)
        dispatch(setCardsPageCountAC(res.data.pageCount))
        dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
        dispatch(setCardsPageAC(res.data.page))
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
export type CardsReducerStateType = typeof initialState
export type CardsActionType = ReturnType<typeof setCardsAC>
    | ReturnType<typeof updateGradeCardAC>
    | ReturnType<typeof setUtilsAC>
    | ReturnType<typeof searchCardsAC>
    | ReturnType<typeof setCardsPageAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardsTotalCountAC>

