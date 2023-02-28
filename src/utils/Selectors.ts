import {RootReducerType} from '../redux/Store'


//selectorsPacks
export const selectPacksMin = (state: RootReducerType) => state.packs.params.min
export const selectPacksMax = (state: RootReducerType) => state.packs.params.max
export const selectPacksMinCardsCount = (state: RootReducerType) => state.packs.minCardsCount
export const selectPacksMaxCardsCount = (state: RootReducerType) => state.packs.maxCardsCount
export const selectPacks = (state: RootReducerType) => state.packs.cardPacks
export const selectPacksSort = (state: RootReducerType) => state.packs.params.sortPacks
export const selectPacksPage = (state: RootReducerType) => state.packs.params.page
export const selectPacksPageCount = (state: RootReducerType) => state.packs.params.pageCount
export const selectPacksCardPacksTotalCount = (state: RootReducerType) => state.packs.cardPacksTotalCount
export const selectPacksStatusPackCards = (state: RootReducerType) => state.packs.statusPackCards
export const selectPacksPackName = (state: RootReducerType) => state.packs.params.packName

//selectorsCards
export const selectCardsPage = (state: RootReducerType) => state.cards.page
export const selectCardsPageCount = (state: RootReducerType) => state.cards.pageCount
export const selectCardsPackName = (state: RootReducerType) => state.cards.packName
export const selectCards = (state: RootReducerType) => state.cards.cards
export const selectCardsTotalCount = (state: RootReducerType) => state.cards.cardsTotalCount
export const selectCardsPackUserId = (state: RootReducerType) => state.cards.packUserId
export const selectCardsPackDeckCover = (state: RootReducerType) => state.cards.packDeckCover
export const selectCardsCardQuestion = (state: RootReducerType) => state.cards.cardQuestion



//selectorsApp
export const selectAppStatus = (state: RootReducerType) => state.app.status
export const selectAppError = (state: RootReducerType) => state.app.successError


//selectorsProfile
export const selectProfileEmail = (state: RootReducerType) => state.profile.email
export const selectProfileAvatar = (state: RootReducerType) => state.profile.avatar
export const selectProfileName = (state: RootReducerType) => state.profile.name
export const selectProfileMyID = (state: RootReducerType) => state.profile._id


//selectorsAuth
export const selectAuthIsLoggedIn = (state: RootReducerType) => state.auth.isLoggedIn
export const selectAuthIsRegistered = (state: RootReducerType) => state.auth.isRegistered
export const selectAuthRecoveryPassword = (state: RootReducerType) => state.auth.recoveryPassword


