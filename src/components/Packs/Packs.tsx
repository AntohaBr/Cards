import React, {ChangeEvent, useEffect} from 'react'
import {Navigate, useNavigate, useParams} from "react-router-dom"
import {PacksTable} from "./PacksTable"
import {useAppDispatch, useAppSelector} from "../../utils/Hooks"
import {PATH} from "../../app/Routes/Routes"
import {Button, Container, Grid} from "@mui/material"
import {ModalAddPack} from "../../common/Modals/Modal-pack/Modal-add-pack"
import {Search} from "../../common/Search/Search"
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff"
import {addNewPackTC, getPacksTC, searchPackAC, setMinMaxAC, setParamsSortPack} from "../../redux/Packs-reducer"
import {useDebounce} from "../../utils/Use-debounce"
import {RangeSlider} from "../Renge-slider/Renge-slider";
import {Paginator} from "../../common/Paginator/Paginator";



export const Packs =  React.memo(() => {
    const pageCount = useAppSelector(state => state.packs.pageCount)
    const currentPage = useAppSelector(state => state.pagination.packsCurrentPage)
    const totalCount = useAppSelector(state => state.packs.cardPacksTotalCount)
    const page = useAppSelector(state => state.packs.page)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user_id = useAppSelector(state => state.profile._id)
    const paginationStore = useAppSelector(state => state.pagination)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const packName = useAppSelector(state => state.packs.params.packName)
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const [openModalAddPack, setOpenModalAddPack] = React.useState(false)
    const [value, setValue] = React.useState<number | number[]>([min, max])
    // const [packName, setPackName] = React.useState<string>('')

    const debouncedValue = useDebounce<string>(packName, 700)
    const dispatch = useAppDispatch()
    const {packURL} = useParams<'packURL'>()
    const navigate = useNavigate()

    const paginationPages = Math.ceil(totalCount / pageCount)

    useEffect(() => {
        if (packURL === 'my') dispatch(getPacksTC({search: packName, user_id, min, max}))
        else dispatch(getPacksTC({search: packName, min, max}))
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

    const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        dispatch(searchPackAC(e.currentTarget.value))
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

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        // dispatch(setPageAC(newPage + 1))
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        // dispatch(setPageCountAC(Number(event.target.value)))
        // dispatch(setPageAC(1))
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
                            valueSearch={packName}
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
                    <Paginator
                        paginationPages={paginationPages}
                        page={page - 1}
                        // onPageChange={handleChangePage}
                    />
                </Container>
            </Grid>
        </div>
    )
})

