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
        case "PACKS/CHANGE-CARD-PACKS-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.value}

        case "PACKS/CHANGE-MAX-CARDS-COUNT":
            return {...state, maxCardsCount: action.value}

        case "PACKS/CHANGE-MIN-CARDS-COUNT":
            return {...state, minCardsCount: action.value}

        case "PACKS/REBOOT-FILTER-PACKS-CARDS":
            return {...state, minCardsCount: 0,cardPacksTotalCount: 5, maxCardsCount: 10}

        default:
            return state
    }
}

//AC
export const setPacksAC = (allPacks: PacksType[]) => ({type: 'PACKS/SET-ALL-PACKS', allPacks}) as const
export const deletePackAC = (packID: string) => ({type: 'PACKS/DELETE-PACK', packID}) as const
export const addPackAC = (newPack: PacksType) => ({type: 'PACKS/ADD-NEW-PACK', newPack}) as const
export const updatePackAC = (updatedPack: PacksType) => ({type: 'PACKS/UPDATE-PACK', updatedPack}) as const
export const cardPacksTotalCountAC = (value: number) => ({type: 'PACKS/CHANGE-CARD-PACKS-TOTAL-COUNT', value}) as const
export const maxCardsCountAC = (value: number) => ({type: 'PACKS/CHANGE-MAX-CARDS-COUNT', value}) as const
export const minCardsCountAC = (value: number) => ({type: 'PACKS/CHANGE-MIN-CARDS-COUNT', value}) as const
export const rebootFilterCardsCartsAC = () => ({type: 'PACKS/REBOOT-FILTER-PACKS-CARDS'}) as const



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

export type PacksActionTypes = SetPackACType
    | DeletePackACType
    | AddPackACType
    | ReturnType<typeof updatePackAC>
    | ReturnType<typeof cardPacksTotalCountAC>
    | ReturnType<typeof maxCardsCountAC>
    | ReturnType<typeof minCardsCountAC>
    | ReturnType<typeof rebootFilterCardsCartsAC>

export type SetPackACType = ReturnType<typeof setPacksAC>

export type AddPackACType = ReturnType<typeof addPackAC>

export type DeletePackACType = ReturnType<typeof deletePackAC>