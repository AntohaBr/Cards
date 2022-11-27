import {
    packsAPI,
    PacksGetParamsTypeNotNeeded,
    PacksGetResponseType,
    PacksType,
    PostPacksType,
    UpdatePacksType
} from "../api/packs-api";
import {ThunkDispatchType} from "./Store";

const initialState: PacksGetResponseType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
    token: "",
    tokenDeathTime: 0,
}

export const packsReducer = (state = initialState, action: PacksActionTypes): PacksGetResponseType => {
    switch (action.type) {
        case 'PACKS/SET-ALL-PACKS':
            return {...state, cardPacks: [...action.allPacks]}
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
        default:
            return state
    }
}

//AC
export const setPacksAC = (allPacks: PacksType[]) => ({type: 'PACKS/SET-ALL-PACKS', allPacks}) as const
export const deletePackAC = (packID: string) => ({type: 'PACKS/DELETE-PACK', packID}) as const
export const addPackAC = (newPack: PacksType) => ({type: 'PACKS/ADD-NEW-PACK', newPack}) as const
export const updatePackAC = (updatedPack: PacksType) => ({type: 'PACKS/UPDATE-PACK', updatedPack}) as const


//TC
export const getPacksTC = (params: PacksGetParamsTypeNotNeeded) => (dispatch: ThunkDispatchType) => {
    packsAPI.getPacks({...params})
        .then((res) => {
            dispatch(setPacksAC(res.data.cardPacks))
        })
        .catch((e) => {
        })
}

export const deletePackTC = (packID: string) => (dispatch: ThunkDispatchType) => {
    packsAPI.deletePacks(packID)
        .then((res) => {
            dispatch(deletePackAC(res.data.deletedCardsPack._id))
        })
        .catch((e) => {
        })
}

export const addPackTC = (params: PostPacksType) => (dispatch: ThunkDispatchType) => {
    packsAPI.postPacks({...params})
        .then((res) => {
            dispatch(addPackAC(res.data.newCardsPack))
        })
        .catch((e) => {
        })
}

export const updatePackTC = (params: UpdatePacksType) => (dispatch: ThunkDispatchType) => {
    packsAPI.updatePacks({...params})
        .then((res) => {
            dispatch(updatePackAC(res.data.updatedCardsPack))
        })
        .catch((e) => {
        })
}

export type PacksActionTypes = ReturnType<typeof setPacksAC>
    | ReturnType<typeof deletePackAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof updatePackAC>