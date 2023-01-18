import {AxiosError} from 'axios';
import {errorUtils} from '../utils/Error-utils';
import {setAppStatusAC} from './App-reducer';
import {AppThunkType} from "./Store";
import {
    cardsAPI,
    PacksGetParamsType,
    PacksGetParamsTypeNotNeeded,
    PacksType,
    PostPacksType,
    UpdatePacksType
} from "../api/cards-api";


const initialState = {
    cardPacks: [] as PacksType[],
    cardPacksTotalCount: 0 as number,
    page: 0 as number,
    pageCount: 5 as number,
    showPackCards: 'all' as 'all' | 'my',
    minCardsCount: 0 as number,
    maxCardsCount: 110 as number,
    params: {
        page: 1,
        pageCount: 5,
        min: 0,
        max: 0,
        user_id: '',
        packName: '',
        search: ''
    } as PacksGetParamsType,
}

export type PackReducerStateType = typeof initialState


//reducers
export const packsReducer = (state:PackReducerStateType = initialState, action: PacksActionType): PackReducerStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, cardPacks: [...action.packs]}
        case "PACKS/DELETE-PACK":
            return {...state, cardPacks: state.cardPacks.filter((el) => el._id !== action.packID)}
        case 'PACKS/ADD-NEW-PACK':
            return {...state, cardPacks: [action.newPack, ...state.cardPacks]}
        case 'PACKS/UPDATE-PACK':
            return {
                ...state,
                cardPacks: [
                    ...state.cardPacks.map(pack =>
                        pack._id === action.updatedPack._id ? {...action.updatedPack} : pack
                    ),
                ],
            }
        case 'PACKS/CHANGE-CARD-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.value}

        case 'PACKS/CHANGE-MAX-CARDS-COUNT':
            return {...state, maxCardsCount: action.value}

        case 'PACKS/CHANGE-MIN-CARDS-COUNT':
            return {...state, minCardsCount: action.value}

        case 'PACKS/REBOOT-FILTER-PACKS-CARDS':
            return {...state, minCardsCount: 0, cardPacksTotalCount: 5, maxCardsCount: 10}
        default:
            return state
    }
}


//actions
export const setPacksAC = (packs: PacksType[]) => ({type: 'PACKS/SET-PACKS', packs}) as const
export const addNewPackAC = (newPack: PacksType) => ({type: 'PACKS/ADD-NEW-PACK', newPack}) as const
export const updatePackAC = (updatedPack: PacksType) => ({type: 'PACKS/UPDATE-PACK', updatedPack}) as const
export const deletePackAC = (packID: string) => ({type: 'PACKS/DELETE-PACK', packID}) as const
export const setTotalPacksCountAC = (value: number) => ({type: 'PACKS/CHANGE-CARD-PACKS-TOTAL-COUNT', value}) as const
export const setMaxCardsCountAC = (value: number) => ({type: 'PACKS/CHANGE-MAX-CARDS-COUNT', value}) as const
export const setMinCardsCountAC = (value: number) => ({type: 'PACKS/CHANGE-MIN-CARDS-COUNT', value}) as const
export const clearFiltersAC = () => ({type: 'PACKS/REBOOT-FILTER-PACKS-CARDS'}) as const


//thunks
export const getPacksTC = (params: PacksGetParamsTypeNotNeeded):AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsAPI.getPacks({...params})
        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(setTotalPacksCountAC(res.data.cardPacksTotalCount))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const deletePackTC = (packID: string):AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    const res = await cardsAPI.deletePacks(packID)
    try {
        dispatch(getPacksTC(res.data.deletedCardsPack))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const addNewPackTC = (data: PostPacksType):AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsAPI.addNewPacks(data)
        dispatch(getPacksTC(res.data.newCardsPack))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const updatePackTC = (params: UpdatePacksType):AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsAPI.updatePacks({...params})
        dispatch(getPacksTC(res.data.updatedCardsPack))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}


//types
export type PacksActionType = SetPackACType
    | DeletePackACType
    | AddNewPackACType
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setTotalPacksCountAC>
    | ReturnType<typeof setMaxCardsCountAC>
    | ReturnType<typeof setMinCardsCountAC>
    | ReturnType<typeof clearFiltersAC>
export type SetPackACType = ReturnType<typeof setPacksAC>
export type AddNewPackACType = ReturnType<typeof addNewPackAC>
export type DeletePackACType = ReturnType<typeof deletePackAC>