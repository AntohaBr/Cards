import {combineReducers, createStore} from "redux";
import {loginReducer} from "./Reducer-login";
import {registrationReducer} from "./Reducer-registration";
import {passwordRecoveryReducer} from "./Reducer-password-recovery";
import {newPasswordReducer} from "./Reducer-new-password";
import {profileReducer} from "./Reducer-profile";


const rootReducer = combineReducers({
    login: loginReducer,
    registration: registrationReducer,
    passwordRecovery: passwordRecoveryReducer,
    newPassword: newPasswordReducer,
    profile: profileReducer
})

export const store = createStore(rootReducer)


//type
export type RootReducerType = ReturnType<typeof rootReducer>


