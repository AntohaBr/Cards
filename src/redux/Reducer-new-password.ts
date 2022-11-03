

const initialState = {}


export const newPasswordReducer = (state:any = initialState, action:NewPasswordActionType) =>{
    switch (action.type) {
        case "SET-NEW-PASSWORD":
            return {...state}
        default:
            return state
    }
}


// actions
const newPasswordAC = (newPassword:any) => ({type:'SET-NEW-PASSWORD',newPassword} as const)


// types
export type NewPasswordActionType = ReturnType<typeof newPasswordAC>


// thunks