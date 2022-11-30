import {cardsAPI, CardsType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppStatusAC} from "./app-Reducer";
import {AxiosError} from "axios";
import {setCurrentPageAC, setPageCount, totalCountAC} from "./Reducer-pagination";

const initialState={
    cards:[
        {
            answer: "no answer",
            question: "no question",
            cardsPack_id: "5eb6a2f72f849402d46c6ac4",
            grade: 4.987525071790364,
            shots: 1,
            user_id: "142151531535151",
            created: "2020-05-13T11:05:44.867Z",
            updated: "2020-05-13T11:05:44.867Z",
            _id: "5ebbd48876810f1ad0e7ece3"
        }
    ]
}
export const cardsReducer=(state:initStateType=initialState,action:ActionType):initStateType=>{
    switch (action.type) {
        case "SET-CARDS":{
            return {...state,cards:action.cards}
        }
        default:{
            return state
        }
    }

}


const setCardsAC=(cards:CardsType[])=>{
    return {
        type:'SET-CARDS',cards
    } as const
}

//thunks
export const getCardsTC=(cardsPack_id:string,page:number,pageCount:number)=>{
    return async (dispatch:Dispatch)=>{
        try {
            dispatch(setAppStatusAC("loading", true))
            const response=await cardsAPI.getCards(cardsPack_id,page,pageCount)
            dispatch(setPageCount(response.data.pageCount))
            dispatch(totalCountAC(response.data.cardsTotalCount))
            dispatch(setCurrentPageAC(response.data.page))
            dispatch(setCardsAC(response.data.cards))
            dispatch(setAppStatusAC("succeeded",false))

        }
        catch (e) {
          dispatch(setAppStatusAC("failed", false))
        }
    }
}

//types
type initStateType=typeof initialState
type ActionType=ReturnType<typeof setCardsAC>