import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import {profileReducer} from "./Reducer-profile";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "./app-Reducer";
import {authReducer} from "./autch-Reducer";


const rootReducer = combineReducers({
    auth: authReducer,
    app:appReducer,
    profile: profileReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>


