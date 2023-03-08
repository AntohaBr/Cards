import {ChangeEvent, memo, useCallback, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './Packs-table/Packs-table'
import {useDebounce, useAppDispatch, useAppSelector} from 'utils'
import {Search, PaginationBar, RangeSlider, MyAllPanel, ClearFilters, ButtonAddPack} from 'common'
import {addNewPack, getPacks, packsActions} from 'reducers/Packs-reducer'
import {PATH} from 'constants/Routing/Rout-constants'
import {
    selectAppStatus,
    selectAuthIsLoggedIn, selectPacks,
    selectPacksCardPacksTotalCount,
    selectPacksMax,
    selectPacksMin,
    selectPacksPackName,
    selectPacksPage,
    selectPacksPageCount,
    selectPacksStatusPackCards
} from 'store/Selectors'
import f from 'common/Styles/Forms.module.css'
import t from 'common/Styles/Table.module.css'
import {CircularProgress, LinearProgress} from "../../collections-mui";


export const Packs = memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectPacksPage)
    const packs = useAppSelector(selectPacks)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectPacksCardPacksTotalCount)
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const packName = useAppSelector(selectPacksPackName)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)

    const debouncedValue = useDebounce<string>(packName, 700)
    const dispatch = useAppDispatch()

    const PacksPaginationPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, debouncedValue, statusPackCards, min, max, pageCount, page])

    const addNewPackCard = (name: string, deckCover: string) => {
        dispatch(addNewPack({name, deckCover}))
    }

    const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(packsActions.searchPacks(e.currentTarget.value))
    }

    const packsPageCountHandler = useCallback((value: string) => {
        dispatch(packsActions.setCardPacksPageCount(+value))
    }, [])

    const packsHandleChangePage = useCallback((page: number) => {
        dispatch(packsActions.setCardPacksPage(page))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={t.block}>
            <div className={t.container}>
                <div className={t.titleContainer}>
                    <div className={f.title}>Pack list</div>
                    <ButtonAddPack addItem={addNewPackCard}/>
                </div>
                {status === 'loading'
                    ?
                    <LinearProgress color={'primary'}/>
                    :
                    <>
                        <div className={t.filterContainer}>
                            <Search onChange={searchValueHandler}
                                    valueSearch={packName}/>
                            <MyAllPanel/>
                            <RangeSlider/>
                            <ClearFilters/>
                        </div>
                        <div className={t.info}>
                            {packs.length === 0 && 'Sorry, there are no such packages'}
                        </div>
                        {!!packs.length &&
                            <>
                                <PacksTable/>
                                <PaginationBar
                                    paginationPages={PacksPaginationPages}
                                    pageCount={pageCount}
                                    page={page}
                                    pageCountHandler={packsPageCountHandler}
                                    handleChangePage={packsHandleChangePage}/>
                            </>
                        }
                    </>
                }
            </div>
        </div>
    )
})

