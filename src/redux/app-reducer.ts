
const initialState = {
    status: 'idle' as AppStatusType,
    error: ''
}


export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case "APP/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "APP/SET-STATUS":{
            return {...state,status:action.status}
        }
        default : {
            return state
        }
    }
}


export const setAppStatusAC = (status: AppStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string) => ({type: 'APP/SET-ERROR', error} as const)


//types
export type AppActionType = ReturnType<typeof setAppErrorAC | typeof setAppStatusAC>
export type AppStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type AppStateType = {
    error?: string
    status: AppStatusType
}