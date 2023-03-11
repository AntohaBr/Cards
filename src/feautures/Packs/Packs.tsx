import {memo, useCallback, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './Packs-table/Packs-table'
import {useAppDispatch, useAppSelector} from 'utils'
import {Search, PaginationBar, RangeSlider, MyAllPanel, ClearFilters, ButtonAddPack} from 'common'
import {addNewPack, getPacks, packsActions} from 'reducers/Packs-reducer'
import {PATH} from 'constants/Routing/Rout-constants'
import {
    selectAppStatus,
    selectAuthIsLoggedIn, selectPackNameForSearch, selectPacks,
    selectPacksCardPacksTotalCount,
    selectPacksMax,
    selectPacksMin,
    selectPacksPage,
    selectPacksPageCount,
    selectPacksStatusPackCards
} from 'store/Selectors'
import f from 'common/Styles/Forms.module.css'
import t from 'common/Styles/Table.module.css'


export const Packs = memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectPacksPage)
    const packs = useAppSelector(selectPacks)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectPacksCardPacksTotalCount)
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const packName = useAppSelector(selectPackNameForSearch)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)

    const dispatch = useAppDispatch()

    const PacksPaginationPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, statusPackCards, min, max, pageCount, page, packName])

    const addNewPackCard = (name: string, deckCover: string) => {
        dispatch(addNewPack({name, deckCover}))
    }

    const packsPageCountHandler = useCallback((value: string) => {
        dispatch(packsActions.setCardPacksPageCount(+value))
    }, [dispatch])

    const packsHandleChangePage = useCallback((page: number) => {
        dispatch(packsActions.setCardPacksPage(page))
    }, [dispatch])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={t.block}>
            <div className={t.container}>
                <div className={t.backToPackList}>
                    <div className={f.title}>Pack list</div>
                    <ButtonAddPack addItem={addNewPackCard}/>
                </div>
                <>
                    <div className={t.filterContainer}>
                        <Search valueSearch={packName}/>
                        <MyAllPanel/>
                        <RangeSlider/>
                        <ClearFilters/>
                    </div>
                    <PacksTable/>
                    {packs.length === 0 && status !== 'loading' &&
                        <div className={t.infoText}>Sorry, there are no such packages</div>
                    }
                    {!!packs.length &&
                        <>
                            <PaginationBar
                                paginationPages={PacksPaginationPages}
                                pageCount={pageCount}
                                page={page}
                                pageCountHandler={packsPageCountHandler}
                                handleChangePage={packsHandleChangePage}/>
                        </>
                    }
                </>
            </div>
        </div>
    )
})

