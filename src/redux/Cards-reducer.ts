import {ThunkDispatchType} from "./Store";
import {
    cardsAPI,
    CardsType,
    GetCardsResponseType,
    GetParamsCardsTypeNotNeeded,
    NewCardPostType,
    PostCardType,
    UpdateCardType
} from "../api/cards-api";
import {AddPackACType, DeletePackACType, SetPackACType} from "./Packs-reducer";

const initialState: GetCardsResponseType = {
    cards: [] as CardsType[],
    packUserId: "",
    packName: "",
    packPrivate: false,
    packDeckCover: null,
    packCreated: new Date,
    packUpdated: new Date,
    page: 1,
    pageCount: 4,
    cardsTotalCount: 4,
    minGrade: 0,
    maxGrade: 6,
    token: "",
    tokenDeathTime: 0
}

export const cardsReducer = (state = initialState, action: CardsActionTypes): GetCardsResponseType => {
    switch (action.type) {
        case 'CARDS/SET_CARDS':
            return {...state, cards: [...action.cards]}
        case 'CARDS/DELETE_CARD':
            return {...state, cards: state.cards.filter((el) => el._id !== action.cardID)}
        case 'CARDS/ADD_CARD':
            return {...state, cards: [action.addCard, ...state.cards]}
        case 'CARDS/UPDATE_CARD':
            return {
                ...state,
                cards: [
                    ...state.cards.map(el =>
                        el._id === action.updateCard._id ? {...action.updateCard} : el
                    ),
                ],
            }
        case 'CARDS/CHANGE-PRIVATE-CARDS':
            return {...state, packPrivate: action.value}

        case 'CARDS/CHANGE-CARDS-TOTAL-COUNT':
            return {...state, cardsTotalCount: action.value}
        default:
            return state
    }
}

//AC
export const setCardAC = (cards: CardsType[]) => ({type: 'CARDS/SET_CARDS', cards} as const)
export const deleteCardAC = (cardID: string) => ({type: 'CARDS/DELETE_CARD' as const, cardID})
export const addCardAC = (addCard: NewCardPostType) => ({type: 'CARDS/ADD_CARD' as const, addCard})
export const updateCardAC = (updateCard: CardsType) => ({type: 'CARDS/UPDATE_CARD' as const, updateCard})
export const changePrivateCardsAC = (value: boolean) => ({type: 'CARDS/CHANGE-PRIVATE-CARDS' as const, value})
export const cardsTotalCountAC = (value:number) => ({type: 'CARDS/CHANGE-CARDS-TOTAL-COUNT' as const, value})


//TC
export const getCardsTC = (params: GetParamsCardsTypeNotNeeded) => (dispatch: ThunkDispatchType) => {
    cardsAPI.getCards({...params})
        .then((res) => {
            dispatch(setCardAC(res.data.cards))
        })
        .catch((e) => {
        })
}

export const deleteCardTC = (cardID: string) => (dispatch: ThunkDispatchType) => {
    cardsAPI.deleteCards(cardID)
        .then((res) => {
            dispatch(deleteCardAC(res.data.deletedCard._id))
        })
        .catch((e) => {
        })
}

export const addCardTC = (params: PostCardType) => (dispatch: ThunkDispatchType) => {
    cardsAPI.postCards({...params})
        .then((res) => {
            dispatch(addCardAC(res.data.newCard))
        })
        .catch((e) => {
        })
}

export const updateCardTC = (params: UpdateCardType) => (dispatch: ThunkDispatchType) => {
    cardsAPI.updateCards({...params})
        .then((res) => {
            dispatch(updateCardAC(res.data.updatedCard))
        })
        .catch((e) => {
        })
}


export type CardsActionTypes = ReturnType<typeof setCardAC>
    | ReturnType<typeof deleteCardAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof changePrivateCardsAC>
    | ReturnType<typeof cardsTotalCountAC>
    | AddPackACType
    | SetPackACType
    | DeletePackACType
