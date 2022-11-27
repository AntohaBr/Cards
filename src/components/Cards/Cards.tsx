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
import {RootReducerType, ThunkDispatchType} from "../../redux/store";
import {CardPacksRequestType, CardsType} from "../../api/api";
import {getCardsTC} from "../../redux/cards-Reducer";
import {CardPacksInitStateType, getCardPackTC} from "../../redux/cardPacks-Reducer";
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import GradeIcon from '@mui/icons-material/Grade';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {ArrowBack} from "@mui/icons-material";
import {URL} from "../../app/App";

type PropsType = {}
const Cards = (props: PropsType) => {
    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.cardsPageCount)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.cardsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCards)


    const params = useParams()

    const navigate = useNavigate();
    const id = params.cardId

    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const dispatch = useDispatch<ThunkDispatchType>()
    const cardsPack = useSelector<RootReducerType, CardPacksInitStateType>(state => state.cardPacks)

    const pagination = Math.ceil(totalCount / pageCount)

    const arr = []
    for (let i = 0; i < pagination; i++) {
        arr.push(i)
    }

    const array = []

    for (let i = 1; i <= 4; i++) {
        array.push(i)
    }


    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC( id ? id: "",currentPage,+e.currentTarget.value ))
    }





    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {

        dispatch(getCardsTC( id ? id : '',currentPage,pageCount))
    }
    useEffect(() => {
        dispatch(getCardsTC(id ? id : "",currentPage,pageCount))
    }, [])
    return (
<>




            <Grid container>
                <Container fixed={true}>

           <div>
               <Button onClick={()=> navigate(URL.CARD_PACK)}>
                   <ArrowBack/>
               </Button>

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
                                        <TableCell component="th" scope="row">
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
                    return (
                        <>
                            <option value={n}>{n}</option>

                        </>


                    )
                })}

            </NativeSelect>

            </span>
            </div>


        </>

    );
};

export default Cards;