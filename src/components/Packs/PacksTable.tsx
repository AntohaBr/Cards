import * as React from 'react';
import {ChangeEvent} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Container, Grid, NativeSelect, Pagination} from "@mui/material";
import {Navigate} from 'react-router-dom';
import {setCurrentPagePacksAC} from "../../redux/Pagination-reducer";
import {getPacksTC} from "../../redux/Packs-reducer";
import {useAppDispatch} from "../../utils/Hooks";
import {Pack} from "./Pack";
import {PacksType} from "../../api/Cards-api";
import {setPagination} from "../../features/Pagination";
import {PATH} from "../../app/Routes/Routes";
import styles from './PacksTable.module.css'


type PropsType = {
    totalCount: number
    pageCount: number
    currentPage: number
    packs: PacksType[]
    sortUpdate: (sortParams: string) => void
    sort: string
}


export const PacksTable = (props: PropsType) => {
    const dispatch = useAppDispatch()
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const redirectToCards = () => {
        return <Navigate to={PATH.CARDS}/>
    }

    const setPageCount = (e: ChangeEvent<HTMLSelectElement>) => {
        dispatch(getPacksTC({pageCount: +e.currentTarget.value, page: props.currentPage}))
    }

    const paginationFunc = (event: React.ChangeEvent<unknown>, page: number) => {
        dispatch(getPacksTC({pageCount: props.pageCount, page}))
        dispatch(setCurrentPagePacksAC(page))
    }

    const pagination = Math.ceil(props.totalCount / props.pageCount)

    return (
        <div>
            <Grid container spacing={2}>
                <Container fixed={true}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label="simple table">
                            <TableHead>
                                <TableRow onClick={redirectToCards}>
                                    <TableCell align="right">Cover</TableCell>
                                    <TableCell
                                        align="right"
                                        className={props.sort === '0name' ? styles.sortUp : styles.sortDown}
                                        onClick={() => props.sortUpdate('name')}
                                    >Name
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={props.sort === '0cardsCount' ? styles.sortUp : styles.sortDown}
                                        onClick={() => props.sortUpdate('cardsCount')}
                                    >Cards
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={props.sort === '0updated' ? styles.sortUp : styles.sortDown}
                                        onClick={() => props.sortUpdate('updated')}
                                    >Last updated(g)
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        className={props.sort === '0user_name' ? styles.sortUp : styles.sortDown}
                                        onClick={() => props.sortUpdate('user_name')}
                                    >Created by
                                    </TableCell>
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
                                        cardsCount={pack.cardsCount}
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

