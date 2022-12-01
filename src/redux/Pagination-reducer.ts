const initState = {
    packsPageCount: 9,
    allCardsPack: 0,
    packsCurrentPage: 7,
    allCards:8,
    cardsPageCount:4,
    cardsCurrentPage:1
}


//reducers
export const paginationReducer = (state: initStateType = initState, action: PaginationActionType): initStateType => {
    switch (action.type) {
        case "SET-PAGE-COUNT": {
            return {...state, cardsPageCount: action.count}
        }
        case "SET-TOTAL-COUNT": {
            return {...state, allCards: action.totalCount}
        }
        case "SET-CURRENT-PAGE": {
            return {...state, cardsCurrentPage: action.currentPage}
        }
        case "PACKS/SET-PAGE-COUNT": {

            return {...state, packsPageCount: action.count}
        }
        case "PACKS/SET-TOTAL-COUNT": {
            return {...state, allCardsPack: action.totalCount}
        }
        case "PACKS/SET-CURRENT-PAGE": {
            return {...state, packsCurrentPage: action.currentPage}
        }
        default : {
            return state
        }
    }
}


// actions
export const totalCountPacksAC = (totalCount: number) => ({type: 'PACKS/SET-TOTAL-COUNT', totalCount} as const)
export const totalCountAC = (totalCount: number) => ({type: 'SET-TOTAL-COUNT', totalCount} as const)
export const setCurrentPagePacksAC = (currentPage: number) => ({type: 'PACKS/SET-CURRENT-PAGE', currentPage} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setPageCount = (count: number) => ({type: 'SET-PAGE-COUNT', count} as const)
export const setPageCountPacks = (count: number) => ({type: 'PACKS/SET-PAGE-COUNT', count} as const)


//types
export type initStateType = typeof initState

export type PaginationActionType = ReturnType<typeof setPageCount | typeof setCurrentPageAC | typeof totalCountAC
    | typeof setCurrentPagePacksAC | typeof setPageCountPacks | typeof totalCountPacksAC>