
const initialState = {}


export const profileReducer = (state: any = initialState, action: ProfileActiontype) => {
switch (action.type){
    case "SET-PROFILE":
        return {...state}
    default:
        return state
}
}





// actions
const profileAC = (profile: any) => ({type:'SET-PROFILE', profile} as const)


// types
export type ProfileActiontype = ReturnType<typeof profileAC>


// thunks