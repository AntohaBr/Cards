import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {loginReducer} from "./Reducer-login";
import {registrationReducer} from "./Reducer-registration";
import {passwordRecoveryReducer} from "./Reducer-password-recovery";
import {newPasswordReducer} from "./Reducer-new-password";
import {profileReducer} from "./Reducer-profile";
import thunk from "redux-thunk";
import {ThunkDispatch} from "redux-thunk/es/types";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer,
    app:appReducer
})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk))


//types
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>


