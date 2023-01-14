import {cardsAPI, CardsType, GradeModelType} from "../api/api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "./app-Reducer";
import {setCurrentPageAC, setPageCount, totalCountAC} from "./Reducer-pagination";
import {RootReducerType} from "./store";


export const initialState = {
    cards: [] as CardsType[],
    question: '',
    answer: '',
    shots: 0,
    grade: 0,
    card_id: ''
}

export const cardsReducer = (state:typeof initialState=initialState,action: ActionType): typeof initialState=> {
    switch (action.type) {
        case "SET-CARDS": {
            return {...state, cards: action.cards}
        }

        case "SET-UTILS": {
            const currentCard = state.cards.find(el => el._id === action.id)
            console.log(`currentCard ${currentCard}`)

            if (currentCard) {
                return {...state, answer: currentCard.answer, question: currentCard.question}
            }
            return state
        }

        case "CARDS/SET-GRADE-AND-SHOTS": {
            return {...state, grade: action.grade, shots: action.shots}
        }


        default: {
            return state
        }
    }

}


export const setCardsAC = (cards: CardsType[]) => {
    return {
        type: 'SET-CARDS', cards
    } as const
}

export const setUtils = (id: string) => {

    return {
        type: 'SET-UTILS',
        id
    } as const
}


export const setGradeAndShots = (card_id: string, grade: number, shots: number) => {
    return {
        type: 'CARDS/SET-GRADE-AND-SHOTS',
        card_id,
        grade,
        shots
    } as const
}

export const testFunc=(example:number)=>{
    return example*2
}


//thunks
export const getCardsTC = (cardsPack_id: string, page: number, pageCount: number) => {
    return async (dispatch: Dispatch) => {
        try {
            dispatch(setAppStatusAC("loading", true))
            const response = await cardsAPI.getCards(cardsPack_id, page, pageCount)
            dispatch(setPageCount(response.data.pageCount))
            dispatch(totalCountAC(response.data.cardsTotalCount))
            dispatch(setCurrentPageAC(response.data.page))
            dispatch(setCardsAC(response.data.cards))
            dispatch(setAppStatusAC("succeeded", false))


        } catch (e) {
            dispatch(setAppStatusAC("failed", false))
        }
    }
}

export const updateGradeTC = (model: Partial<GradeModelType>) => {
    return async (dispatch: Dispatch, getState: () => RootReducerType) => {

        const card = getState().cards
        const apiModel: GradeModelType = {

            grade: card.grade,
            card_id: card.card_id,
            ...model
        }


        try {
            const response = await cardsAPI.grade(apiModel)
            console.log(response.data, 'RESPONSE---')
            dispatch(setGradeAndShots(response.data.updatedGrade._id, response.data.updatedGrade.grade, response.data.updatedGrade.shots))

        } catch (e) {

        }
    }
}

//types
export type CardsInitStateType = typeof initialState

