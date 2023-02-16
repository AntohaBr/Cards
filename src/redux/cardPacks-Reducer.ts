// import {Dispatch} from "redux";
// import {cardsApi} from "../api/api";
// import {addLoginAC} from "./login-Reducer";
// import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";
// import {setCurrentPagePacksAC, setPageCountPacks, totalCountPacksAC} from "./Reducer-pagination";
//
//
// export type CardsType = {
//     _id: string
//     user_id: string
//     name: string
//     cardsCount: number
//     created: string
//     updated: string,
//     user_name: string
//
// }
//
// const initState = {
//     cardPacks: [] as CardsType[],
//     isMyPack: false,
//     userId: "",
//     packName: ''
//
//
// }
// export const cardPacksReducer = (state: CardPacksInitStateType = initState, action: ActionType): CardPacksInitStateType => {
//
//     switch (action.type) {
//         case "CARDS/SET-CARDS-PACK": {
//
//             return {
//                 ...state,
//                 cardPacks: action.cardPacks,
//                 isMyPack: action.isMyPack,
//                 userId: state.cardPacks.map(el => el.user_id ? el.user_id : '')[0]
//             }
//         }
//
//         case "CARDS/CREATE-PACK": {
//             return {...state, cardPacks: [...state.cardPacks, action.newPack]}
//         }
//         case "CARDS/SET-NAME": {
//             const currentPack = state.cardPacks.find(el => el._id === action.id)
//
//             if (currentPack) {
//                 return {...state, packName: currentPack.name}
//             } else {
//                 return state
//             }
//
//         }
//
//         case "CARDS/SEARCH": {
//             let filteredPacks: CardsType[]
//             filteredPacks = state.cardPacks.filter(el => el.name.toLowerCase().includes(action.title.toLowerCase()))
//             return {...state, cardPacks: filteredPacks}
//
//         }
//
//
//         default: {
//             return state
//         }
//     }
//
// }
//
//
// const setCardPacksAC = (cardPacks: CardsType[], isMyPack: boolean) => {
//     return {type: 'CARDS/SET-CARDS-PACK', cardPacks, isMyPack} as const
// }
//
// const setNamePack = (id: string) => {
//     return {
//         type: 'CARDS/SET-NAME',
//         id
//     } as const
// }
//
// const createCardsPack = (newPack: CardsType) => {
//     return {type: 'CARDS/CREATE-PACK', newPack} as const
// }
//
// export const searchFuncAC = (title: string) => {
//     return {type: 'CARDS/SEARCH', title} as const
// }
//
//
// export const getCardPackTC = (optionalParams?: { userId?: string, cardsPackId?: string, search?: string, pageCount?: number, page?: number }) => {
//     console.log('from TC')
//
//     return async (dispatch: Dispatch) => {
//         try {
//             dispatch(setAppStatusAC("loading", true))
//             const response = await cardsApi.getCardsPack(optionalParams?.pageCount, optionalParams?.page, optionalParams?.search, optionalParams?.userId)
//
//             console.log(response)
//
//             dispatch(setAppStatusAC("succeeded", false))
//             dispatch(setNamePack(optionalParams?.cardsPackId ? optionalParams?.cardsPackId : ""))
//             dispatch(addLoginAC(true))
//
//             dispatch(setCardPacksAC(response.data.cardPacks, true))
//             dispatch(searchFuncAC(optionalParams?.search ? optionalParams.search : ''))
//
//
//             dispatch(totalCountPacksAC(response.data.cardPacksTotalCount))
//             dispatch(setPageCountPacks(response.data.pageCount))
//             dispatch(setCurrentPagePacksAC(response.data.page))
//
//
//         } catch (e) {
//
//             dispatch(setAppErrorAC('Error'))
//             dispatch(setAppStatusAC("failed", false))
//         }
//     }
//
// }
// export const createPackTC = () => {
//     return async (dispatch: Dispatch) => {
//         try {
//             const response = await cardsApi.createCardsPack("Sa coloda", false)
//             dispatch(createCardsPack(response.data.newCardsPack))
//         } catch (e) {
//
//         }
//     }
// }

//types
export type  CardPacksInitStateType = {
    // cardPacks: CardsType[]
    isMyPack: boolean
    userId: string
    packName: string

}
// type ActionType = ReturnType<typeof setCardPacksAC | typeof createCardsPack | typeof setNamePack | typeof searchFuncAC>
