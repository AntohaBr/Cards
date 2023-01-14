import React, {ChangeEvent} from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import GradeIcon from "@mui/icons-material/Grade";
import {NativeSelect, Pagination, Table} from '@mui/material';
import {getCardsTC} from "../../../redux/cards-Reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../../redux/store";
import {CardsType} from "../../../api/api";
import {useParams} from 'react-router-dom';
import {setPagination} from "../../../features/pagination";
import {setCurrentPageAC} from "../../../redux/Reducer-pagination";
import Rating from "@mui/material/Rating";


type PropsType = {
    pageCount: number
    totalCount: number
    currentPage: number
    cards: CardsType[]
}

const CardsTable = (props: PropsType) => {
    const params = useParams<'packId'>()
    const {packId} = params
    const dispatch = useDispatch<ThunkDispatchType>()
    const pagination = Math.ceil(props.totalCount / props.pageCount)
    let arraySelect = [1, 2, 3, 4, 5, 6, 7, 8, 9]


    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getCardsTC(packId ? packId : "", props.totalCount, +e.currentTarget.value))
        console.log(props.pageCount)

    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getCardsTC(packId ? packId : "", page, props.pageCount))
        dispatch(setCurrentPageAC(page))
    }


    const newArray = arraySelect.map((el,i) => {
        return <>
            <option value={el} key={i}>{el}</option>
        </>
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
                        {props.cards?.map((row) => {

                            return (<TableRow key={row._id}>
                                    <TableCell component="th" scope="row" align={"right"}>
                                        {row.question}
                                    </TableCell>
                                    <TableCell align="right">{row.answer}</TableCell>
                                    <TableCell align="right">{row.updated}</TableCell>
                                    <TableCell align="right">
                                            <span>
                                                <Rating name="disabled" value={row.grade} disabled/>
                                            </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
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
    );
};

export default CardsTable;