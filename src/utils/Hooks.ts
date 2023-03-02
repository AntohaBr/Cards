import {AppDispatchType, RootReducerType} from '../Store/Store'
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'


export const useAppDispatch: () => AppDispatchType = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector