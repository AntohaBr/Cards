import {AxiosError} from 'axios'
import {error} from 'utils'
import {authApi, ResponseType} from 'api/Auth-api'
import {AppThunkType, InferActionsTypes} from 'store/Store'
import {appActions} from './App-reducer'


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
export const profileActions = {
    updateProfile : (newData: ResponseType) => ({type: 'PROFILE/UPDATE-PROFILE', newData} as const),
    setInfoUser : (profile: ProfileType) => ({type: 'PROFILE/SET-INFO-USER', profile} as const)
}


//thunks
export const updateProfileTC = (name: string, avatar?: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatusAC('loading'))
    try {
        const res = await authApi.updateProfile(name, avatar)
        dispatch(appActions.setAppStatusAC('succeeded'))
        dispatch(profileActions.updateProfile(res.data.updatedProfile))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatusAC('idle'))
    }
}


//types
type initialStateType = typeof initialState
type ProfileType = initialStateType
export type ProfileActionType = InferActionsTypes<typeof profileActions>

