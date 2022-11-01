
const initialState = {}


export const passwordRecoveryReducer = (state:any = initialState, action:PasswordRecoveryActionType) =>{
    switch (action.type){
        case "RECOVERY-PASSWORD":
            return {...state}
        default:
            return state
    }
}



// actions
const passwordRecoveryAC = (password:any) =>({type:'RECOVERY-PASSWORD',password})


// types
export type PasswordRecoveryActionType = ReturnType<typeof passwordRecoveryAC>


// thunks