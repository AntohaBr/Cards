import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import SchoolIcon from '@mui/icons-material/School';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {Navigate, NavLink, useNavigate} from 'react-router-dom';
import {URL} from "../../../app/App";
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import {initStateType} from "../../../redux/Pagination-reducer";
import {RootReducerType, ThunkDispatchType} from "../../../redux/Store";
import {InputWithIcon} from "../../Util-components/Input-with-icon";
import {PacksGetResponseType} from "../../../api/packs-api";
import {RangeSlider} from "../../Util-components/Slider";
import {addPackTC} from "../../../redux/Packs-reducer";


export default function PacksTable() {

    const packsStore = useSelector<RootReducerType, PacksGetResponseType>(state => state.packs)
    const userId = useSelector<RootReducerType, string>(state => state.profile._id)
    const paginationStore = useSelector<RootReducerType, initStateType>(state => state.pagination)
    const dispatch = useDispatch<ThunkDispatchType>()
    const navigate = useNavigate()

    const redirectToCards = () => {
        return <Navigate to={URL.CARDS}/>
    }

    const createPackHandler = (name: string, deckCover: string) => {
        dispatch(addPackTC({name, deckCover}))
    }

    const myPacks = (status: 'my' | 'all') => {
        if (status === "my") {
            // dispatch(getPacksTC(paginationStore.packsPageCount, paginationStore.packsCurrentPage, userId))
        }

        if (status === "all") {
            // dispatch(getPacksTC(paginationStore.packsPageCount, paginationStore.packsCurrentPage))
        }
    }

    return (
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
                    <InputWithIcon/>
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
                            {packsStore.cardPacks.map((row) => (
                                <TableRow
                                    key={row._id}
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    onClick={redirectToCards}
                                >
                                    <TableCell component="th" scope="row" align="right">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.cardsCount}</TableCell>
                                    <TableCell align="right">{row.updated}</TableCell>
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
                                            </span> : <span><NavLink to={`${URL.CARDS}/${row._id}`}>
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
            </Container>
        </Grid>

    )
}
