const initialState = {}

export const loginReducer = (state: any = initialState, action: LoginActionType) => {
    switch (action.type) {
        case 'SET-LOGIN':
            return {...state}
        default:
            return state
    }
}


// actions
export const addLoginAC = (login: any) => ({type: 'SET-LOGIN', login} as const)


// types
type LoginActionType = ReturnType<typeof addLoginAC>


// thunks
