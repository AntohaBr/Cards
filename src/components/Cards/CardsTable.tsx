import React, {ChangeEvent} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {NativeSelect, Pagination, Table} from '@mui/material';
import {getCardsTC} from "../../redux/Cards-reducer";
import {useParams} from 'react-router-dom';
import {setCurrentPageAC} from "../../redux/Pagination-reducer";
import {CardType} from "../../api/cards-api";
import {useAppDispatch} from "../../utils/Hooks";
import {Card} from "./Card";
import {setPagination} from "../../features/Pagination";


type CardsTablePropsType = {
    pageCount: number
    totalCount: number
    currentPage: number
    cards: CardType[]
}

export const CardsTable = (props: CardsTablePropsType) => {
    const {cardId} = useParams<'cardId'>()
    const dispatch = useAppDispatch()
    const pagination = Math.ceil(props.totalCount / props.pageCount)
    let arraySelect = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC({cardsPack_id: cardId ? cardId : '', pageCount: +e.currentTarget.value}))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getCardsTC({cardsPack_id: cardId ? cardId : '', page, pageCount: props.pageCount}))
        dispatch(setCurrentPageAC(page))
    }

    const newArray = arraySelect.map((el, i) => {
        return <div>
            <option value={el} key={i}>{el}</option>
        </div>
    })

    return (
        <div>
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
                        {props.cards?.map(card => (
                            <Card
                                key={card._id}
                                _id={card._id}
                                cardsPack_id={card.cardsPack_id}
                                user_id={card.user_id}
                                answer={card.answer}
                                question={card.question}
                                answerImg={card.answerImg}
                                questionImg={card.questionImg}
                                grade={card.grade}
                                shots={card.shots}
                                comments={card.comments}
                                type={card.type}
                                rating={card.rating}
                                more_id={card.more_id}
                                created={card.created}
                                updated={card.updated}
                                __v={card.__v}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <span>
                <Pagination count={setPagination([], pagination).length} variant={"outlined"} shape={"rounded"}
                            color={"primary"}
                            onChange={paginationFunc}/>
                 <NativeSelect variant={"outlined"} defaultValue={props.totalCount} onChange={setPageCount}>
                     {newArray}
                 </NativeSelect>
            </span>
        </div>
    )
}

