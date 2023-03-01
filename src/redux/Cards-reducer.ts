import {appActions} from './App-reducer'
import {AppThunkType, InferActionsTypes} from './Store/Store'
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
import {errorUtil} from 'utils'


export const initialState = {
    cards: [] as CardType[],
    packUserId: '',
    packName: '',
    packDeckCover: '',
    page: 1,
    pageCount: 7,
    cardsTotalCount: 0,
    cardsPack_id: '',
    cardQuestion: '',
    cardAnswer: '',
    shots: 0,
    grade: 0,
}


export const cardsReducer = (state: CardsReducerStateType = initialState, action: CardsActionType):
    CardsReducerStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                cards: action.data.cards,
                packName: action.data.packName,
                page: action.data.page,
                packDeckCover: action.data.packDeckCover,
                packUserId: action.data.packUserId
            }
        case 'CARDS/UPDATE-GRADE-CARD':
            return {
                ...state,
                cards: state.cards.map(el =>
                    el._id === action.data.card_id
                        ? {...el, grade: action.data.grade, shots: action.data.shots}
                        : el
                ),
            }
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


//actions
export const cardsActions = {
    setCards: (data: GetCardsResponseType) => ({type: 'CARDS/SET-CARDS', data} as const),
    updateGradeCard: (data: UpdatedGradeCartType) => ({type: 'CARDS/UPDATE-GRADE-CARD', data} as const),
    searchCards: (cardQuestion: string) => ({type: 'CARDS/SEARCH-BY-CARD-QUESTION', cardQuestion} as const),
    setCardsPage: (page: number) => ({type: 'CARDS/SET-CARDS-PAGE', page} as const),
    setCardsPageCount: (pageCount: number) => ({type: 'CARDS/SET-CARDS-PAGE-COUNT', pageCount} as const),
    setCardsTotalCount: (cardsTotalCount: number) => ({type: 'CARDS/SET-CARDS-TOTAL-COUNT', cardsTotalCount} as const)
}


//thunks
export const setCards = (params: GetCardsParamsType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsApi.getCards(params)
        dispatch(cardsActions.setCardsPageCount(res.data.pageCount))
        dispatch(cardsActions.setCardsTotalCount(res.data.cardsTotalCount))
        dispatch(cardsActions.setCardsPage(res.data.page))
        dispatch(cardsActions.setCards(res.data))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}

export const deleteCards = (_id: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsApi.deleteCards(_id)
        dispatch(setCards({cardsPack_id: res.data.deletedCard.cardsPack_id}))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}

export const addNewCards = (postModel: PostCardType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsApi.addNewCards(postModel)
        dispatch(setCards({cardsPack_id: res.data.newCard.cardsPack_id}))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}

export const updateCards = (putModel: UpdateCardType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsApi.updateCards({...putModel})
        dispatch(setCards({cardsPack_id: res.data.updatedCard.cardsPack_id}))
        dispatch(appActions.setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}

export const updateGradeCard = (putModelGrade: CardLearnType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await cardsApi.updateGradeCard(putModelGrade)
        dispatch(cardsActions.updateGradeCard(res.data.updatedGrade))
        dispatch(appActions.setAppStatusAC("succeeded"))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}


//types
type CardsReducerStateType = typeof initialState
export type CardsActionType = InferActionsTypes<typeof cardsActions>

