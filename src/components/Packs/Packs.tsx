import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {PacksTable} from "./PacksTable";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {PATH} from "../../app/Routes/Routes";
import {Button, Container, Grid} from "@mui/material";
import {ModalAddPack} from "../../common/Modals/Modal-pack/Modal-add-pack";
import {Search} from "../../common/Search/Search";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import {addNewPackTC, getPacksTC} from "../../redux/Packs-reducer";
import {useDebounce} from "../../utils/Use-debounce";
import {RangeSlider} from "../Super-components/SuperDoubleRange/SuperDoubleRange";


export const Packs = () => {
    const pageCount = useAppSelector(state => state.pagination.packsPageCount)
    const currentPage = useAppSelector(state => state.pagination.packsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCardsPack)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const user_id = useAppSelector(state => state.profile._id)
    const paginationStore = useAppSelector(state => state.pagination)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const dispatch = useAppDispatch()

    const [openModalAddPack, setOpenModalAddPack] = useState(false)
    const [minRange, setMinRange] = useState<number>(minCardsCount)
    const [maxRange, setMaxRange] = useState<number>(maxCardsCount)
    const [packName, setPackName] = useState<string>('')
    const debouncedValue = useDebounce<string>(packName, 500)

    useEffect(() => {
        dispatch(getPacksTC({search: packName}))
    }, [debouncedValue])


    const myPacks = (status: 'my' | 'all') => {
        if (status === "my") {
            console.log('MY')
            dispatch(getPacksTC({
                pageCount: paginationStore.packsPageCount,
                page: paginationStore.packsCurrentPage,
                user_id
            }))
            console.log(user_id)
        }
        if (status === "all") {
            dispatch(getPacksTC({pageCount: paginationStore.packsPageCount, page: paginationStore.packsCurrentPage}))
        }
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

    const onChangeRangeHandler = (value: [number, number]) => {
        setMinRange(value[0])
        setMaxRange(value[1])
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
                                <div>{minRange}</div>
                                <RangeSlider
                                    value={[minRange, maxRange]}
                                    min={minCardsCount}
                                    max={maxCardsCount}
                                    onChangeRange={onChangeRangeHandler}
                                />
                                <div>{maxRange}</div>
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
                    />
                </Container>
            </Grid>
        </div>
    )
}

