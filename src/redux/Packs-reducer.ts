import {AxiosError} from 'axios'
import {errorUtil} from '../utils/Error-util'
import {setAppStatusAC} from './App-reducer'
import {AppThunkType} from './Store'
import {
    cardsApi,
    PackType,
    PostPacksType,
    UpdatePacksType
} from '../api/Cards-api'


const initialState = {
    cardPacks: [] as PackType[],
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
    }
}


//reducers
export const packsReducer = (state: PackReducerStateType = initialState, action: PacksActionType): PackReducerStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
            return {...state, cardPacks: [...action.packs]}
        case 'PACKS/DELETE-PACK':
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
        case 'PACKS/SET-MIN-MAX-SEARCH-CARD':
            console.log(action)
            return {...state, params: {...state.params, min: action.min, max: action.max}}
        case 'PACKS/FETCH-MIN-MAX-CARDS-COUNT':
            return {...state, minCardsCount: action.minCardsCount, maxCardsCount: action.maxCardsCount}
        case 'PACKS/SORT-PACKS':
            return {...state, params: {...state.params, sortPacks: action.sortPacks}}
        case 'PACKS/SEARCH-BY-PACK-NAME':
            return {...state, params: {...state.params, packName: action.packName}}
        case 'PACKS/SET-TYPE-PACK-CARDS':
            return {...state, statusPackCards: action.statusPackCards}
        case 'PACKS/SET-CARD-PACKS-PAGE':
            return {...state, params: {...state.params, page: action.page}}
        case 'PACKS/SET-CARD-PACKS-PAGE-COUNT':
            return {...state, params: {...state.params, pageCount: action.pageCount}}
        case 'PACKS/CLEAR-FILTERS':
            return {...state, minCardsCount: 0, maxCardsCount: 110, statusPackCards: 'all',
                params:{...state.params,packName: '', sortPacks: '',page: 1, pageCount: 7}}
        default:
            return state
    }
}


//actions
export const setPacksAC = (packs: PackType[]) => ({type: 'PACKS/SET-PACKS', packs}) as const
export const addNewPackAC = (newPack: PackType) => ({type: 'PACKS/ADD-NEW-PACK', newPack}) as const
export const updatePackAC = (updatedPack: PackType) => ({type: 'PACKS/UPDATE-PACK', updatedPack}) as const
export const deletePackAC = (packID: string) => ({type: 'PACKS/DELETE-PACK', packID}) as const
export const setCardPacksTotalCountAC = (value: number) => ({type: 'PACKS/SET-CARD-PACKS-TOTAL-COUNT', value}) as const
export const setMinMaxSearchCardAC = (min: number, max: number) => ({type: 'PACKS/SET-MIN-MAX-SEARCH-CARD', min, max} as const)
export const fetchMinMaxCardCountAC = (minCardsCount: number, maxCardsCount: number) =>
    ({type: 'PACKS/FETCH-MIN-MAX-CARDS-COUNT', minCardsCount, maxCardsCount} as const)
export const setCardPacksPageAC = (page: number) => ({type: 'PACKS/SET-CARD-PACKS-PAGE', page} as const)
export const setCardPacksPageCountAC = (pageCount: number) => ({
    type: 'PACKS/SET-CARD-PACKS-PAGE-COUNT', pageCount} as const)
export const sortPacksAC = (sortPacks: string) => ({type: 'PACKS/SORT-PACKS', sortPacks} as const)
export const searchPacksAC = (packName: string) => ({type: 'PACKS/SEARCH-BY-PACK-NAME', packName} as const)
export const setTypePackCardsAC = (statusPackCards: 'my' | 'all') => ({
    type: 'PACKS/SET-TYPE-PACK-CARDS', statusPackCards} as const)
export const clearFiltersAC = () => ({type: 'PACKS/CLEAR-FILTERS'} as const)


//thunks
export const getPacksTC = (): AppThunkType => async (dispatch, getState) => {
    const {statusPackCards, params} = getState().packs
    const userId = getState().profile._id
    const user_id = statusPackCards === 'my' ? userId : ''
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await cardsApi.getCardsPack({user_id, ...params})
        dispatch(setPacksAC(res.data.cardPacks))
        dispatch(setCardPacksTotalCountAC(res.data.cardPacksTotalCount))
        dispatch(fetchMinMaxCardCountAC(res.data.minCardsCount, res.data.maxCardsCount))
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const deletePackTC = (packID: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.deletePacks(packID)
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const addNewPackTC = (data: PostPacksType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.addNewPacks({...data})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const updatePackTC = (params: UpdatePacksType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsApi.updatePacks({...params})
        dispatch(getPacksTC())
        dispatch(setAppStatusAC('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}

export const setParamsSortPack = (sortParams: string): AppThunkType => dispatch => {
    dispatch(sortPacksAC(sortParams))
    dispatch(getPacksTC())
}


//types
type PackReducerStateType = typeof initialState
export type PacksActionType = ReturnType<typeof setPacksAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof addNewPackAC>
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof setCardPacksTotalCountAC>
    | ReturnType<typeof clearFiltersAC>
    | ReturnType<typeof setMinMaxSearchCardAC>
    | ReturnType<typeof fetchMinMaxCardCountAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof searchPacksAC>
    | ReturnType<typeof setTypePackCardsAC>
    | ReturnType<typeof setCardPacksPageAC>
    | ReturnType<typeof setCardPacksPageCountAC>
