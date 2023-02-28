import {AxiosError} from 'axios'
import {errorUtil} from 'utils'
import {authApi, ResponseType} from '../api/Auth-api'
import {setAppStatusAC} from './App-reducer'
import {AppThunkType} from './Store/Store'


const initialState = {
    _id: '',
    name: '',
    email: '',
    avatar: '',
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-PROFILE':
            return {...state, ...action.newData}
        case 'PROFILE/SET-INFO-USER':
            return {...state, ...action.profile}
        default:
            return state
    }
}


//actions
export const updateProfileAC = (newData: ResponseType) => ({type: 'PROFILE/UPDATE-PROFILE', newData} as const)
export const setInfoUserAC = (profile: ProfileType) => ({type: 'PROFILE/SET-INFO-USER', profile} as const)


//thunks
export const updateProfileTC = (name: string, avatar?: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authApi.updateProfile(name, avatar)
        dispatch(setAppStatusAC('succeeded'))
        dispatch(updateProfileAC(res.data.updatedProfile))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtil(err, dispatch)
    } finally {
        dispatch(setAppStatusAC('idle'))
    }
}


//types
type initialStateType = typeof initialState
type ProfileType = initialStateType
export type SetInfoUserActionType = ReturnType<typeof setInfoUserAC>
export type ProfileActionType = ReturnType<typeof updateProfileAC>
    | SetInfoUserActionType
    | ReturnType<typeof setAppStatusAC>


