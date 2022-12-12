import {Dispatch} from 'redux';
import {AxiosError} from 'axios';
import {errorUtils} from '../utils/Error-utils';
import {authAPI, ResponseType} from '../api/auth-api';
import {setAppStatusAC} from './App-reducer';


const initialState = {
    _id: '' as string,
    name: '' as string,
    email: '' as string,
    avatar: '' as string,
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-PROFILE':
            return {...state, ...action.newData};
        case 'PROFILE/SET-INFO-USER':
            return {...state, ...action.profile}
        default:
            return state;
    }
}


//actions
export const updateProfileAC = (newData: ResponseType) => ({type: 'PROFILE/UPDATE-PROFILE', newData} as const)
export const setInfoUserAC = (profile: ProfileType) => ({type: 'PROFILE/SET-INFO-USER', profile} as const)


//thunks
export const updateProfileTC = (name: string, avatar?: string) => async (dispatch: Dispatch<ProfileActionType>) => {
    dispatch(setAppStatusAC('loading', true))
    try {
        const res = await authAPI.updateProfile(name, avatar)
        dispatch(setAppStatusAC('succeeded', false))
        dispatch(updateProfileAC(res.data.updatedProfile))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        errorUtils(err, dispatch)
    }
}


//types
export type ProfileActionType =
    UpdateProfileActionType
    | SetInfoUserActionType
    | ReturnType<typeof setAppStatusAC>

export type SetInfoUserActionType = ReturnType<typeof setInfoUserAC>
export type UpdateProfileActionType = ReturnType<typeof updateProfileAC>

type initialStateType = typeof initialState

type ProfileType = initialStateType

