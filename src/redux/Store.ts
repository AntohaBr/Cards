import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {loginReducer} from "./Reducer-login";
import {registrationReducer} from "./Reducer-registration";
import {passwordRecoveryReducer} from "./Reducer-password-recovery";
import {newPasswordReducer} from "./Reducer-new-password";
import {profileReducer} from "./Reducer-profile";
import thunkMiddleware, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {appReducer} from "../app/app-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    appReducerProfile:appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export type TypedDispatch = ThunkDispatch<RootReducerType,any, AnyAction>

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

//type
export type RootReducerType = ReturnType<typeof rootReducer>


