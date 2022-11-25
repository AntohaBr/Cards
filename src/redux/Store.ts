import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import {profileReducer} from './Profile-reducer';
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from './App-reducer';
import {authReducer} from './Autch-reducer';
import {useSelector} from 'react-redux';


const rootReducer = combineReducers({
    auth: authReducer,
    app:appReducer,
    profile: profileReducer,
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export const useAppSelector=()=> useSelector<RootReducerType>(state => state)


//types
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>




