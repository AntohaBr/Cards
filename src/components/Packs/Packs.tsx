import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './PacksTable'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {Button, Container, Grid} from '@mui/material'
import {ModalAddPack} from '../../common/Modals/Modal-pack/Modal-add-pack'
import {Search} from '../../common/Search/Search'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import {
    addNewPackTC, clearFiltersAC,
    getPacksTC,
    searchPacksAC, setCardPacksPageAC, setCardPacksPageCountAC, setMinMaxSearchCardAC,
    setTypePackCardsAC, sortPacksAC
} from '../../redux/Packs-reducer'
import {useDebounce} from '../../utils/Use-debounce'
import {RangeSlider} from '../Renge-slider/Renge-slider'
import {PaginationBar} from '../../common/Pagination-bar/Pagination-bar'
import {saveState} from '../../utils/local-storage'


export const Packs = React.memo(() => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const page = useAppSelector(state => state.packs.params.page)
    const pageCount = useAppSelector(state => state.packs.params.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const status = useAppSelector(state => state.app.status)
    const statusPackCards = useAppSelector(state => state.packs.statusPackCards)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const packName = useAppSelector(state => state.packs.params.packName)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)

    const [openModalAddPack, setOpenModalAddPack] = React.useState(false)

    const debouncedValue = useDebounce<string>(packName, 700)

    const dispatch = useAppDispatch()

    const PacksPaginationPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, debouncedValue, statusPackCards, min, max, pageCount, page])

    const allPackCardsHandler = () => {
        dispatch(setTypePackCardsAC('all'))
        saveState('all')
    }

    const myPackCardsHandler = () => {
        dispatch(setTypePackCardsAC('my'))
        saveState('my')
    }

    const addNewPack = (name: string, deckCover: string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }

    const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(searchPacksAC(e.currentTarget.value))
    }

    const addButtonClickHandler = () => {
        setOpenModalAddPack(true)
    }

    const packsPageCountHandler = useCallback((value: string) => {
        dispatch(setCardPacksPageCountAC(+value))
    }, [])

    const packsHandleChangePage = useCallback((page: number) => {
        dispatch(setCardPacksPageAC(page))
    }, [])

    const resetFilterHandler = () => {
        dispatch(clearFiltersAC(true))
        dispatch(searchPacksAC(''))
        dispatch(setCardPacksPageAC(1))
        dispatch(setCardPacksPageCountAC(7))
        dispatch(setTypePackCardsAC('all'))
        dispatch(sortPacksAC(''))
        dispatch(setMinMaxSearchCardAC(0,maxCardsCount))
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Container fixed={true}>
                    <div>
                        <h2>Pack list</h2>
                        <Button
                            variant={'contained'}
                            onClick={addButtonClickHandler}
                            disabled={status === 'loading'}>
                            Add new pack
                        </Button>
                    </div>
                    <ModalAddPack
                        title={'Add new pack'}
                        open={openModalAddPack}
                        toggleOpenMode={setOpenModalAddPack}
                        addItem={addNewPack}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Search
                            onChange={searchValueHandler}
                            valueSearch={packName}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '150px'
                        }}>
                            <Button
                                variant={statusPackCards === 'my' ? 'contained' : 'outlined'}
                                disabled={statusPackCards === 'my' || status === 'loading'}
                                onClick={myPackCardsHandler}>
                                My
                            </Button>
                            <Button
                                variant={statusPackCards === 'all' ? 'contained' : 'outlined'}
                                disabled={statusPackCards === 'all' || status === 'loading'}
                                onClick={allPackCardsHandler}>
                                All
                            </Button>
                        </div>
                        <div>
                            <h4>Number of cards</h4>
                            <div>
                                <RangeSlider/>
                            </div>
                        </div>
                        <Button color={'inherit'} onClick={resetFilterHandler} disabled={status === 'loading'}>
                            <FilterAltOffIcon/>
                        </Button>
                    </div>
                    <PacksTable/>
                </Container>
            </Grid>
            <PaginationBar
                paginationPages={PacksPaginationPages}
                pageCount={pageCount}
                page={page}
                pageCountHandler={packsPageCountHandler}
                handleChangePage={packsHandleChangePage}
            />
        </div>
    )
})

