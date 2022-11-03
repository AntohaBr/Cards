
const initialState = {}

export const profileReducer = (state: any = initialState, action: ProfileActionType) => {
switch (action.type){
    case "SET-PROFILE":
        return {...state}
    default:
        return state
}
}


// actions
export const setProfileAC = (profile: any) => ({type:'SET-PROFILE', profile} as const)


// types
export type ProfileActionType = ReturnType<typeof setProfileAC>


// thunks