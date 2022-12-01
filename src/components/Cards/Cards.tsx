import React, {ChangeEvent, useEffect} from 'react';
import {Button, Container, Grid, NativeSelect, Pagination} from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';
import {ArrowBack} from "@mui/icons-material";
import {URL} from "../../app/App";
import InputWithIcon from "../util-components/InputWithIcon";
import styles from './Cards.module.css'
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {getCardsTC} from "../../redux/Cards-reducer";
import {CardsType} from "../../api/cards-api";


type PropsType = {}

export const Cards = (props: PropsType) => {
    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.cardsPageCount)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.cardsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCards)

    const params = useParams()

    const navigate = useNavigate();
    const id = params.cardId

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(getCardsTC(id ? id : "", currentPage, pageCount))
    }, [])

    const pagination = Math.ceil(totalCount / pageCount)
    console.log(totalCount)
    console.log(pageCount)

    const array = []

    for (let i = 1; i <= 4; i++) {
        array.push(i)
    }

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC(id ? id : "", currentPage, +e.currentTarget.value))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {

        dispatch(getCardsTC(id ? id : '', page, pageCount))
    }

    const arr = []
    for (let i = 0; i < pagination; i++) {
        arr.push(i)
        console.log(arr)
        console.log(pagination)
    }

    return <>
            <Grid container>
                <Container fixed={true}>
                    <div>
                        <Button onClick={() => navigate(URL.CARD_PACK)}>
                            <ArrowBack/>
                        </Button>
                        <span>Back to pack-list</span>
                    </div>
                    <h3>Friend`s Pack</h3>
                    <div className={styles.firstBlock}>
                        <InputWithIcon/>
                        <Button variant={"contained"} color={"primary"} className={styles.learnPackBtn}>Learn
                            Pack</Button>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Question</TableCell>
                                    <TableCell align="right">Answer</TableCell>
                                    <TableCell align="right">Last updated</TableCell>
                                    <TableCell align="right">Grade</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cards.map((row) => (
                                    <TableRow
                                        key={row._id}
                                        sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                    >
                                        <TableCell component="th" scope="row" align={"right"}>
                                            {row.question}
                                        </TableCell>
                                        <TableCell align="right">{row.answer}</TableCell>
                                        <TableCell align="right">{row.updated}</TableCell>
                                        <TableCell align="right">
                                            <span>
                                                       <GradeIcon fontSize={"small"} color={"warning"}/>
                                                       <GradeIcon fontSize={"small"} color={"warning"}/>
                                                       <GradeIcon fontSize={"small"} color={"warning"}/>
                                                       <GradeIcon fontSize={"small"}/>
                                                       <GradeIcon fontSize={"small"}/>
                                            </span>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Grid>
            <div>
            <span>
                <Pagination count={arr.length} variant={"outlined"} shape={"rounded"} color={"primary"}
                            onChange={paginationFunc}/>
                Show <NativeSelect variant={"outlined"} defaultValue={pageCount} onChange={setPageCount}>
                {array.map(n => {
                    return <>
                            <option value={n}>{n}</option>
                        </>
                })}
            </NativeSelect>
            </span>
            </div>
        </>
}

