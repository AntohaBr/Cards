import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useSelector} from "react-redux";
import {cardsReducer} from "./Cards-reducer";
import {paginationReducer} from "./Pagination-reducer";
import {authReducer} from "./Auth-reducer";
import {profileReducer} from "./Profile-reducer";
import {packsReducer} from "./Packs-reducer";
import {appReducer} from "./App-reducer";



const rootReducer = combineReducers({
    auth: authReducer,
    app:appReducer,
    profile: profileReducer,
    packs:packsReducer,
    cards:cardsReducer,
    pagination:paginationReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>

export const useAppSelector=()=> useSelector<RootReducerType>(state => state)



// @ts-ignore
window.store = store