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
import MySlider from '../../util-components/MySlider';
import {useDispatch, useSelector} from "react-redux";
import SchoolIcon from '@mui/icons-material/School';
import {RootReducerType, ThunkDispatchType} from "../../../redux/store";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {CardPacksInitStateType, createPackTC, getCardPackTC, searchFuncAC} from "../../../redux/cardPacks-Reducer";
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import {URL} from "../../../app/App";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {initStateType, setCurrentPageAC, setCurrentPagePacksAC} from "../../../redux/Reducer-pagination";
import {useEffect} from "react";
import {setPagination} from "../../../features/pagination";
import { useDebounce } from 'usehooks-ts'


type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
}

export default function PacksTable(props: PropsType) {


    const cardPacksStore = useSelector<RootReducerType, CardPacksInitStateType>(state => state.cardPacks)
    const navigate = useNavigate()
    const dispatch = useDispatch<ThunkDispatchType>()
    const userId = useSelector<RootReducerType, string>(state => state.profile.userId)
    const paginationStore = useSelector<RootReducerType, initStateType>(state => state.pagination)

    const [value,setValue] = useState('')
    const debouncedValue = useDebounce<string>(value, 500)
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]



    useEffect(() => {
        dispatch(getCardPackTC({search:value}))
    }, [debouncedValue])


    const redirectToCards = () => {
        return <Navigate to={URL.CARDS}/>
    }

    const createPackHandler = () => {
        dispatch(createPackTC())
    }

    const myPacks = (status: 'my' | 'all') => {
        if (status === "my") {
            console.log('MY')
            dispatch(getCardPackTC({pageCount:paginationStore.packsPageCount, page:paginationStore.packsCurrentPage, userId}))
            console.log(userId)
        }

        if (status === "all") {
            dispatch(getCardPackTC({pageCount:paginationStore.packsPageCount, page:paginationStore.packsCurrentPage}))
        }
    }


    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardPackTC({pageCount:+e.currentTarget.value, page:props.currentPage}))


    }


    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getCardPackTC({pageCount:props.pageCount, page}))
        dispatch(setCurrentPagePacksAC(page))
    }

    const pagination = Math.ceil(props.totalCount / props.pageCount)


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Container fixed={true}>

                    <div>
                        <h2>Pack list</h2>
                        <Button variant={"contained"} onClick={createPackHandler}>Add new pack</Button>
                    </div>

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


                        <MySlider/>
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
                                {cardPacksStore.cardPacks.map((row) => (


                                    <TableRow
                                        key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                        onClick={redirectToCards}
                                    >
                                        <TableCell component="th" scope="row" align="right">
                                            {row.name}
                                        </TableCell>

                                        <TableCell align="right">{row.cardsCount}</TableCell>
                                        <TableCell align="right">{row.updated.split('').splice(0,10)}</TableCell>
                                        <TableCell align="right">{row.user_name}</TableCell>
                                        <TableCell align={"right"}>
                                            <div>
                                                {row.user_id === userId ? <span>


                                                    <Button disabled={row.cardsCount === 0}
                                                            onClick={() => navigate(`${URL.CARDS}/${row._id}`)}>
                                                         <SchoolIcon/>
                                                    </Button>

                                           <span>
                                                <Button>
                                                    <EditIcon/>
                                                </Button>
                                                <Button>
                                                       <DeleteOutlineIcon/>
                                                </Button>
                                           </span>



                                            </span> : <span>
                                                <NavLink to={`${URL.CARDS}/${row._id}`}>
                                                <Button disabled={row.cardsCount === 0}>
                                                       <SchoolIcon/>
                                                </Button>

                                                </NavLink></span>}
                                            </div>
                                        </TableCell>
                                    </TableRow>


                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>


                    <span>
                <Pagination count={setPagination([], pagination).length} variant={"outlined"} shape={"rounded"}
                            color={"primary"}
                            onChange={paginationFunc}/>




                Show <NativeSelect variant={"outlined"} defaultValue={props.pageCount} onChange={setPageCount}>

                {array.map(n => {
                    return (
                        <>
                            <option value={n}>{n}</option>

                        </>


                    )
                })}

            </NativeSelect>
                  </span>


                </Container>
            </Grid>
        </>
    );
}


