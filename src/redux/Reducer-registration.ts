
const initialState = {}

export const registrationReducer = (state:any = initialState, action:RegistrationActionType) => {
    switch (action.type){
        case "ADD-DATA":
            return {...state}
        default:
            return state
    }
}


// actions
const registrationAC = (data:any) =>({type:'ADD-DATA',data} as const )


// types
type RegistrationActionType = ReturnType<typeof registrationAC>


// thunks