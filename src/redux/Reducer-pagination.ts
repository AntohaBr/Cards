const initState = {
    packsPageCount: 9,
    allCardsPack: 0,
    packsCurrentPage: 7,
    allCards:8,
    cardsPageCount:4,
    cardsCurrentPage:1
}
export const paginationReducer = (state: initStateType = initState, action: any) => {
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

export const totalCountPacksAC = (totalCount: number) => {
    return {type: 'PACKS/SET-TOTAL-COUNT', totalCount} as const
}
export const totalCountAC = (totalCount: number) => {
    return {type: 'SET-TOTAL-COUNT', totalCount} as const
}

export const setCurrentPagePacksAC = (currentPage: number) => {
    return {

        type: 'PACKS/SET-CURRENT-PAGE',
        currentPage
    } as const
}
export const setCurrentPageAC = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        currentPage
    } as const
}


export const setPageCount = (count: number) => {
    return {type: 'SET-PAGE-COUNT', count} as const
}

export const setPageCountPacks = (count: number) => {
    return {type: 'PACKS/SET-PAGE-COUNT', count} as const
}

export type initStateType = typeof initState
type ActionType = ReturnType<typeof setPageCount | typeof setCurrentPageAC | typeof totalCountAC
    | typeof setCurrentPagePacksAC | typeof setPageCountPacks | typeof totalCountPacksAC>