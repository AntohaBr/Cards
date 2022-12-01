import {combineReducers, legacy_createStore, applyMiddleware} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useSelector} from "react-redux";
import {AuthActionType, authReducer} from "./Auth-reducer";
import {PaginationActionType, paginationReducer} from "./Pagination-reducer";
import {ProfileActionType, profileReducer} from "./Profile-reducer";
import {PacksActionTypes, packsReducer} from "./Packs-reducer";
import {AppActionType, appReducer} from "./App-reducer";
import {CardActionType, cardsReducer} from "./Cards-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
    pagination: paginationReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();


//types
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType, any, AnyActionType>

export const useAppSelector = () => useSelector<RootReducerType>(state => state)

type AnyActionType = AppActionType
    | AuthActionType
    | ProfileActionType
    | CardActionType
    | PacksActionTypes
    | PaginationActionType


