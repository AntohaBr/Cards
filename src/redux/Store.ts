import {combineReducers, legacy_createStore, applyMiddleware, AnyAction} from "redux";
import {loginReducer} from "./Reducer-login";
import {registrationReducer} from "./Reducer-registration";
import {passwordRecoveryReducer} from "./Reducer-password-recovery";
import {newPasswordReducer} from "./Reducer-new-password";
import {profileReducer} from "./Reducer-profile";
import thunk, {ThunkDispatch} from "redux-thunk";
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
// export const useTypedDispatch = () => useDispatch<TypedDispatch>();

//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type ThunkDispatchType = ThunkDispatch<RootReducerType,any, AnyAction>


