import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useSelector} from "react-redux";
import {CardsActionType, cardsReducer} from "./Cards-reducer";
import {PaginationActionType, paginationReducer} from "./Pagination-reducer";
import {AuthActionType, authReducer} from "./Auth-reducer";
import {ProfileActionType, profileReducer} from "./Profile-reducer";
import {PacksActionType, packsReducer} from "./Packs-reducer";
import {AppActionType, appReducer} from "./App-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
    pagination: paginationReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType =
    AppActionType
    | AuthActionType
    | CardsActionType
    | PacksActionType
    | PaginationActionType
    | ProfileActionType
export type AppDispatchType = ThunkDispatch<RootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AppActionsType>


// @ts-ignore
window.store = store