import React, {ChangeEvent, useCallback, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './Packs-table/Packs-table'
import {Button, Container, Grid} from '@mui/material'
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff'
import {useDebounce, saveState, useAppDispatch, useAppSelector} from 'utils'
import {Search, PaginationBar, ModalAddPack} from 'common'
import {RangeSlider} from '../../components/Renge-slider/Renge-slider'
import {addNewPackTC, getPacksTC, packsActions} from '../../reducers/Packs-reducer'
import {
    selectAppStatus,
    selectAuthIsLoggedIn,
    selectPacksCardPacksTotalCount, selectPacksMax, selectPacksMaxCardsCount, selectPacksMin, selectPacksPackName,
    selectPacksPage,
    selectPacksPageCount, selectPacksStatusPackCards
} from '../../Store/Selectors'
import {PATH} from '../../constants/Routing/Rout-constants'
// import * as selectors from '../../utils/Selectors'


export const Packs = React.memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const page = useAppSelector(selectPacksPage)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectPacksCardPacksTotalCount)
    const status = useAppSelector(selectAppStatus)
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const maxCardsCount = useAppSelector(selectPacksMaxCardsCount)
    const packName = useAppSelector(selectPacksPackName)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)

    const [openModalAddPack, setOpenModalAddPack] = React.useState(false)

    const debouncedValue = useDebounce<string>(packName, 700)

    const dispatch = useAppDispatch()

    const PacksPaginationPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacksTC())
    }, [dispatch, debouncedValue, statusPackCards, min, max, pageCount, page])

    const allPackCardsHandler = () => {
        dispatch(packsActions.setTypePackCardsAC('all'))
        saveState('all')
    }

    const myPackCardsHandler = () => {
        dispatch(packsActions.setTypePackCardsAC('my'))
        saveState('my')
    }

    const addNewPack = (name: string, deckCover: string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }

    const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(packsActions.searchPacksAC(e.currentTarget.value))
    }

    const addButtonClickHandler = () => {
        setOpenModalAddPack(true)
    }

    const packsPageCountHandler = useCallback((value: string) => {
        dispatch(packsActions.setCardPacksPageCountAC(+value))
    }, [])

    const packsHandleChangePage = useCallback((page: number) => {
        dispatch(packsActions.setCardPacksPageAC(page))
    }, [])

    const resetFilterHandler = () => {
        dispatch(packsActions.clearFiltersAC())
        dispatch(packsActions.setMinMaxSearchCardAC(0, maxCardsCount))
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
            {cardPacksTotalCount === 0 && !!packName
                ?
                <h4 style={{fontSize: '18px', marginTop: '50px', color: 'red'}}>Sorry, there are no such packages</h4>
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
    )
})

