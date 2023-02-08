import React, {useEffect} from 'react'
import {Navigate, useNavigate, useParams} from "react-router-dom"
import {PacksTable} from "./PacksTable"
import {useAppDispatch, useAppSelector} from "../../utils/Hooks"
import {PATH} from "../../app/Routes/Routes"
import {Button, Container, Grid} from "@mui/material"
import {ModalAddPack} from "../../common/Modals/Modal-pack/Modal-add-pack"
import {Search} from "../../common/Search/Search"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import {addNewPackTC, getPacksTC, setMinMaxAC, setParamsSortPack} from "../../redux/Packs-reducer"
import {useDebounce} from "../../utils/Use-debounce"
import {RangeSlider} from "../Super-components/SuperDoubleRange/SuperDoubleRange"


export const Packs =  React.memo(() => {
    const pageCount = useAppSelector(state => state.pagination.packsPageCount)
    const currentPage = useAppSelector(state => state.pagination.packsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCardsPack)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user_id = useAppSelector(state => state.profile._id)
    const paginationStore = useAppSelector(state => state.pagination)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const [openModalAddPack, setOpenModalAddPack] = React.useState(false)
    const [value, setValue] = React.useState<number | number[]>([min, max])
    const [packName, setPackName] = React.useState<string>('')

    const debouncedValue = useDebounce<string>(packName, 500)
    const dispatch = useAppDispatch()
    const {packURL} = useParams<'packURL'>()
    const navigate = useNavigate()

    useEffect(() => {
        if (packURL === 'my') dispatch(getPacksTC({search: packName, user_id, min, max}))
        else dispatch(getPacksTC({search: packName, min, max }))
    }, [dispatch, debouncedValue, packURL, min, max])


    const myPacks = (status: 'my' | 'all') => {
        if (status === "my") {
            dispatch(getPacksTC({
                pageCount: paginationStore.packsPageCount,
                page: paginationStore.packsCurrentPage,
                user_id
            }))
        }
        if (status === "all") {
            dispatch(getPacksTC({pageCount: paginationStore.packsPageCount, page: paginationStore.packsCurrentPage}))
        }
        navigate(`${PATH.PACKS}/${status}`)
    }

    const addNewPack = (name: string, deckCover: string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }

    const searchValueHandler = (searchValue: string) => {
        setPackName(searchValue)
    }
    const addButtonClickHandler = () => {
        setOpenModalAddPack(true)
    }

    const onChangeRangeHandler = (event: Event, newValue: number | number[]) => {
        setValue(newValue as [number, number])
    }

    const handleChangeMinMaxPacks = (event: React.SyntheticEvent | Event, value: number | Array<number>) => {
        if (Array.isArray(value)) {
            dispatch(setMinMaxAC(value[0], value[1]))
            setValue([value[0], value[1]])
        }
    }

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`))
            : dispatch(setParamsSortPack(`1${sortParams}`))
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
                        <Button variant={"contained"} onClick={addButtonClickHandler}>Add new pack</Button>
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
                            searchValue={packName}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '150px'
                        }}>
                            <Button variant={"contained"} onClick={() => myPacks("my")}>My</Button>
                            <Button variant={"contained"} onClick={() => myPacks("all")}> All</Button>
                        </div>
                        <div>
                            <h4>Number of cards</h4>
                            <div>
                                <RangeSlider
                                    min={minCardsCount}
                                    max={maxCardsCount}
                                    value={value}
                                    onChange={onChangeRangeHandler}
                                    onChangeCommitted={handleChangeMinMaxPacks}
                                />
                            </div>
                        </div>
                        <Button color={"inherit"}>
                            <FilterAltOffIcon/>
                        </Button>
                    </div>
                    <PacksTable
                        pageCount={pageCount}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        packs={packs}
                        sortUpdate={sortUpdate}
                        sort={sort}
                    />
                </Container>
            </Grid>
        </div>
    )
})

