import {AxiosError} from 'axios';
import {errorUtil} from '../utils/Error-util';
import {setAppStatusAC} from './App-reducer';
import {AppThunkType} from "./Store";
import {
    cardsApi,
    PacksType,
    PostPacksType,
    UpdatePacksType
} from "../api/Cards-api";


const initialState = {
    cardPacks: [] as PacksType[],
    cardPacksTotalCount: 0,
    statusPackCards: 'all' as 'all' | 'my',
    minCardsCount: 0,
    maxCardsCount: 110,
    params: {
        page: 1,
        pageCount: 7,
        min: 0,
        max: 110,
        packName: '',
        sortPacks: ''
    },
}


//reducers
export const packsReducer = (state: PackReducerStateType = initialState, action: PacksActionType): PackReducerStateType => {
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
        case 'PACKS/SET-CARD-PACKS-TOTAL-COUNT':
            return {...state, cardPacksTotalCount: action.value}
        case 'PACKS/SET-MIN-MAX':
            return {...state, params: {...state.params, min: action.min, max: action.max}}
        case 'PACKS/SET-MIN-MAX-COUNT':
            return {...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
        case 'PACKS/SORT-PACKS':
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case 'PACKS/SEARCH-BY-PACK-NAME':
            return {...state, params: {...state.params, packName: action.packName}}
        case 'PACKS/SET-TYPE-PACK-CARDS':
            return {...state, statusPackCards: action.statusPackCards}
        // case 'PACKS/CLEAR_FILTERS':
        //     return {...state, minCardsCount: 0, maxCardsCount: 110, showPackCards: 'all'}

        default:
            return state
    }
}


//actions
export const setPacksAC = (packs: PacksType[]) => ({type: 'PACKS/SET-PACKS', packs}) as const
export const addNewPackAC = (newPack: PacksType) => ({type: 'PACKS/ADD-NEW-PACK', newPack}) as const
export const updatePackAC = (updatedPack: PacksType) => ({type: 'PACKS/UPDATE-PACK', updatedPack}) as const
export const deletePackAC = (packID: string) => ({type: 'PACKS/DELETE-PACK', packID}) as const
export const setCardPacksTotalCountAC = (value: number) => ({type: 'PACKS/SET-CARD-PACKS-TOTAL-COUNT', value}) as const
export const setMinMaxAC = (min: number, max: number) => ({type: 'PACKS/SET-MIN-MAX', min, max} as const)
export const setMinMaxCountAC = (minCardsCount: number, maxCardsCount: number) =>
    ({type: 'PACKS/SET-MIN-MAX-COUNT', minCardsCount, maxCardsCount} as const)
export const sortPacksAC = (sortPacks: string) => ({type: 'PACKS/SORT-PACKS', sortPacks} as const)
export const searchPackAC = (packName: string) => ({type: 'PACKS/SEARCH-BY-PACK-NAME', packName} as const)
export const setTypePackCardsAC = (statusPackCards: 'my' | 'all') => ({type: 'PACKS/SET-TYPE-PACK-CARDS', statusPackCards} as const)
export const clearFiltersAC = () => ({type: 'PACKS/CLEAR_FILTERS'} as const)


//thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
    const {statusPackCards, params} = getState().packs
    const userId = getState().profile._id
    const user_id = statusPackCards === 'my' ? userId : ''
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await cardsApi.getCardsPack({user_id, ...params})
        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
        dispatch(setMinMaxCountAC(res.data.minCardsCount, res.data.maxCardsCount))
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const deletePackTC = (packID: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        await cardsApi.deletePacks(packID)
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const addNewPackTC = (data: PostPacksType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        await cardsApi.addNewPacks({...data})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const updatePackTC = (params: UpdatePacksType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        await cardsApi.updatePacks({...params})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded', false))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle', false))
    }
}

export const setParamsSortPack = (sortParams: string): AppThunkType => dispatch => {
    dispatch(sortPacksAC(sortParams))
    dispatch(getPacksTC())
}


//types
export type PackReducerStateType = typeof initialState
export type PacksActionType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof addNewPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof clearFiltersAC>
    | ReturnType<typeof setMinMaxAC>
    | ReturnType<typeof setMinMaxCountAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof searchPackAC>
    | ReturnType<typeof setTypePackCardsAC>
