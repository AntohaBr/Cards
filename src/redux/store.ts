import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import {profileReducer} from "./Reducer-profile";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-Reducer";
import {authReducer} from "./autch-Reducer";
import {useSelector} from "react-redux";
import {loginReducer} from "./login-Reducer";
import {cardPacksReducer} from "./cardPacks-Reducer";
import {cardsReducer} from "./cards-Reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app:appReducer,
    profile: profileReducer,
    login:loginReducer,
    cardPacks:cardPacksReducer,
    cards:cardsReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>

export const useAppSelector=()=> useSelector<RootReducerType>(state => state)

