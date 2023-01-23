import * as React from 'react';
import {ChangeEvent, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, Grid, NativeSelect, Pagination} from "@mui/material";
import {Navigate} from 'react-router-dom';
import {URL} from "../../app/App";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {useEffect} from "react";
import {setCurrentPagePacksAC} from "../../redux/Pagination-reducer";
import {addNewPackTC, getPacksTC} from "../../redux/Packs-reducer";
import {RangeSlider} from "../Util-components/Slider";
import {useDebounce} from "../../utils/Use-debounce";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {ModalAddPack} from "../../common/Modals/Modal-pack/Modal-add-pack";
import {Pack} from "./Pack";
import {PacksType} from "../../api/cards-api";
import {setPagination} from "../../features/Pagination";


type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    packs: PacksType[]
}

export const PacksTable = (props: PropsType) => {
    const user_id = useAppSelector(state => state.profile._id)
    const paginationStore = useAppSelector(state => state.pagination)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const [openModalAddPack, setOpenModalAddPack] = useState(false)
    const debouncedValue = useDebounce<string>(value, 500)
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    useEffect(() => {
        dispatch(getPacksTC({search: value}))
    }, [debouncedValue])

    const redirectToCards = () => {
        return <Navigate to={URL.CARDS}/>
    }

    const addNewPack = (name: string, deckCover: string) => {
        dispatch(addNewPackTC({name, deckCover}))
    }

    const addButtonClickHandler = () => {
        setOpenModalAddPack(true)
    }

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

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacksTC({pageCount: +e.currentTarget.value, page: props.currentPage}))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getPacksTC({pageCount: props.pageCount, page}))
        dispatch(setCurrentPagePacksAC(page))
    }

    const pagination = Math.ceil(props.totalCount / props.pageCount)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
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
                        <input onChange={onChangeHandler} value={value}/>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '150px'
                        }}>
                            <Button variant={"contained"} onClick={() => myPacks("my")}>My</Button>
                            <Button variant={"contained"} onClick={() => myPacks("all")}> All</Button>
                        </div>
                        <RangeSlider/>
                        <Button color={"inherit"}>
                            <FilterAltOffIcon/>
                        </Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow onClick={redirectToCards}>
                                    <TableCell align="right">Name</TableCell>
                                    <TableCell align="right">Cards</TableCell>
                                    <TableCell align="right">Last updated(g)</TableCell>
                                    <TableCell align="right">Created by</TableCell>
                                    <TableCell align="right">Actions </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.packs.map(pack => (
                                    <Pack
                                        key={pack._id}
                                        _id={pack._id}
                                        user_id={pack.user_id}
                                        name={pack.name}
                                        user_name={pack.user_name}
                                        updated={pack.updated}
                                        deckCover={pack.deckCover}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <span>
                <Pagination count={setPagination([], pagination).length} variant={"outlined"} shape={"rounded"}
                            color={"primary"}
                            onChange={paginationFunc}/>
                Show <NativeSelect variant={"outlined"} defaultValue={props.pageCount} onChange={setPageCount}>
                {array.map(n => (
                    <div>
                        <option value={n}>{n}</option>
                    </div>
                ))}
            </NativeSelect>
                  </span>
                </Container>
            </Grid>
        </div>
    )
}

