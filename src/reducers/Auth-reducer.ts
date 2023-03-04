import {appActions} from './App-reducer'
import {error} from 'utils'
import {AxiosError} from 'axios'
import {authApi, ForgotType, LoginType, NewPasswordType, RegistrationType} from 'api/Auth-api'
import {profileActions} from './Profile-reducer'
import {AppThunkType, InferActionsTypes} from 'store/Store'


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '',
    newPassport: ''
}


//reducers
export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-LOGIN':
            return {...state, isLoggedIn: action.value}
        case 'AUTH/DATA-REGISTRATION':
            return {...state, isRegistered: action.value}
        case 'AUTH/RECOVERY-PASSWORD':
            return {...state, recoveryPassword: action.email}
        case 'AUTH/SET-NEW-PASSWORD':
            return {...state, newPassport: action.newPassport}
        default:
            return state
    }
}


// actions
export const authActions = {
    addLogin: (value: boolean) => ({type: 'AUTH/SET-LOGIN', value} as const),
    registration: (value: boolean) => ({type: 'AUTH/DATA-REGISTRATION', value} as const),
    recoveryPassword: (email: string) => ({type: 'AUTH/RECOVERY-PASSWORD', email} as const),
    setNewPassword: (newPassport: string) => ({type: 'AUTH/SET-NEW-PASSWORD', newPassport} as const)
}


//thunks
export const login = (data: LoginType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authApi.login(data)
        dispatch(authActions.addLogin(true))
        dispatch(profileActions.setInfoUser(res.data))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    }
}

export const logOut = (): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        await authApi.logOut()
        dispatch(authActions.addLogin(false))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    }
}

export const registration = (value: RegistrationType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        await authApi.registration(value)
        dispatch(authActions.registration(true))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    }
}

export const recoveryPassword = (email: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const data: ForgotType = {
            email: email, message: `<div style="background-color: lime; padding: 15px">
password recovery link:
<a href='http://localhost:3000/Cards#/new-password/$token$'>link</a>
</div>`
        }
        await authApi.recoveryPassword(data)
        dispatch(authActions.recoveryPassword(email))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    }
}

export const setNewPassword = (password: string, token: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const data: NewPasswordType = {password: password, resetPasswordToken: token}
        await authApi.setNewPassword(data)
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    }
}


//types
type InitialStateType = typeof initialState
export type AuthActionType = InferActionsTypes<typeof authActions>
