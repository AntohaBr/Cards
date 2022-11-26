import * as React from 'react';
import {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Button, Container, Grid} from "@mui/material";
import InputWithIcon from "../util-components/InputWithIcon";
import MySlider from '../util-components/MySlider';
import {useDispatch, useSelector} from "react-redux";
import SchoolIcon from '@mui/icons-material/School';

import {RootReducerType, ThunkDispatchType} from "../../../redux/store";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import {CardPacksInitStateType, createPackTC, getCardPackTC} from "../../../redux/cardPacks-Reducer";

export default function PacksTable() {


    const cardPacksStore = useSelector<RootReducerType, CardPacksInitStateType>(state => state.cardPacks)
    const dispatch = useDispatch<ThunkDispatchType>()
    const userId = useSelector<RootReducerType, string>(state => state.profile.userId)

    console.log('userId', userId)



    const createPackHandler = () => {
        dispatch(createPackTC())
    }

    const myPacks = (status: 'my' | 'all') => {
        if (status === "my") {
            dispatch(getCardPackTC(cardPacksStore.pageCount, cardPacksStore.currentPage, userId))
        }

        if (status === "all") {
            console.log(cardPacksStore.cardPacks)
            dispatch(getCardPackTC(cardPacksStore.pageCount, cardPacksStore.currentPage))
        }
    }



    return (

        <Grid container spacing={2}>
            <Container fixed={true}>

                <div>
                    <h2>Pack list</h2>
                    <Button variant={"contained"} onClick={createPackHandler}>Add new pack</Button>
                </div>

                <div>

                    <InputWithIcon/>
                    <Button variant={"contained"} onClick={() => myPacks("my")}>My</Button>
                    <Button variant={"contained"} onClick={() => myPacks("all")}> All</Button>

                    <MySlider/>

                </div>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>

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
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>

                                    <TableCell align="left">{row.cardsCount}</TableCell>
                                    <TableCell align="right">{row.updated}</TableCell>
                                    <TableCell align="right">{row.user_name}</TableCell>
                                    <TableCell align={"right"}>
                                        <div>
                                            {row.user_id === userId ? <span><SchoolIcon/>
                                            <EditIcon/>
                                            <DeleteOutlineIcon/>

                                            </span> : <span><SchoolIcon/></span>}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

        </Grid>

    );
}
