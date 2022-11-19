import {Dispatch} from "redux";

import {authAPI} from "../api/api";


// const initialState = {
//     isLoggedIn: false
// }
//
//
// //reducers
// export const loginReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType=> {
//     switch (action.type) {
//         case 'SET-LOGIN':
//             return {...state, isLoggedIn: action.value}
//         default:
//             return state
//     }
// }
//
//
// // actions
// export const addLoginAC = (value: boolean) => ({type: 'SET-LOGIN', value} as const)
//
// //thunks
// export function loginTC(values: LoginType) {
//     return (dispatch: Dispatch) => {
//         dispatch(setAppStatus("idle"))
//         authAPI.Login(values)
//             .then(res => {
//                 dispatch(addLoginAC(true))
//                 dispatch(setAppStatus("succeeded"))
//             })
//             .catch((err) => {
//                 dispatch(setAppError("Неверный пароль или e-mail"))
//                 dispatch(setAppStatus("none"))
//             })
//     }
// }
//
//
// // types
// type LoginActionType = ReturnType<typeof addLoginAC>
//
// export type LoginType = {
//     email: string
//     password: string
//     rememberMe: boolean
// }
//
// type InitialStateType = typeof initialState