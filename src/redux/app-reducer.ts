export type StatusType = 'none' | 'idle' | 'succeeded'

type StateType = {
    error: string
    status: StatusType

}

const initialState = {
    status: 'none' as StatusType,
    error: ''
}
type ActionType = ReturnType<typeof setAppError | typeof setAppStatus>

export const appReducer = (state: StateType = initialState, action: ActionType) => {


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

export const setAppError = (error: string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export const setAppStatus = (status: StatusType) => {
    return {
        type: "APP/SET-STATUS",
        status
    } as const
}
