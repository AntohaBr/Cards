import {ChangeEvent, memo, useCallback, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './Packs-table/Packs-table'
import {useDebounce, useAppDispatch, useAppSelector} from 'utils'
import {Search, PaginationBar, ModalAddPack} from 'common'
import {RangeSlider, MyAllPanel, ClearFilters} from 'components'
import {addNewPack, getPacks, packsActions} from 'reducers/Packs-reducer'
import {PATH} from 'constants/Routing/Rout-constants'
import {
    selectAppStatus,
    selectAuthIsLoggedIn,
    selectPacksCardPacksTotalCount,
    selectPacksMax,
    selectPacksMin,
    selectPacksPackName,
    selectPacksPage,
    selectPacksPageCount,
    selectPacksStatusPackCards
} from 'store/Selectors'
import styleForms from 'common/Styles/Forms.module.css'
import s from './Packs.module.css'
import {Button} from 'collections'


export const Packs = memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectPacksCardPacksTotalCount)
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const packName = useAppSelector(selectPacksPackName)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)

    const [openModalAddPack, setOpenModalAddPack] = useState(false)

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

    const addButtonClickHandler = () => {
        setOpenModalAddPack(true)
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
        <div className={styleForms.block}>
            <div className={`${styleForms.container} ${s.container}`}>
                <div className={s.titleContainer}>
                    <div className={styleForms.title}>Pack list</div>
                    <Button
                        variant={'contained'}
                        style={{width: '15%', borderRadius: '90px'}}
                        disabled={status === 'loading'}
                        onClick={addButtonClickHandler}>
                        Add new pack
                    </Button>
                </div>
                <ModalAddPack
                    title={'Add new pack'}
                    open={openModalAddPack}
                    toggleOpenMode={setOpenModalAddPack}
                    addItem={addNewPackCard}
                />
                <div className={s.filterContainer}>
                    <Search onChange={searchValueHandler}
                            valueSearch={packName}/>
                    <MyAllPanel/>
                    <RangeSlider/>
                    <ClearFilters/>
                </div>
                <PacksTable/>
                {cardPacksTotalCount === 0 && !!packName
                    ?
                    <h4 style={{fontSize: '18px', marginTop: '50px', color: 'red'}}>Sorry, there are no such
                        packages</h4>
                    :
                    <PaginationBar
                        paginationPages={PacksPaginationPages}
                        pageCount={pageCount}
                        page={page}
                        pageCountHandler={packsPageCountHandler}
                        handleChangePage={packsHandleChangePage}
                    />
                }
            </div>
        </div>
    )
})

