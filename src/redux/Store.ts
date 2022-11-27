import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import {ProfileActionType, profileReducer} from "./Profile-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {AppActionType, appReducer} from "./App-reducer";
import {AuthActionType, authReducer} from "./Auth-reducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {PacksActionTypes, packsReducer} from "./Packs-reducer";
import {CardsActionTypes, cardsReducer} from "./Cards-reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


export const useTypedDispatch = () => useDispatch<ThunkDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType, any, AllReducersType>

type AllReducersType = AppActionType
    | AuthActionType
    | ProfileActionType
    | CardsActionTypes
    | PacksActionTypes




