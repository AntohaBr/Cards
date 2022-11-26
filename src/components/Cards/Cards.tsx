import React from 'react';
import {Button, Container, Grid} from "@mui/material";
import InputWithIcon from "./util-components/InputWithIcon";
import MySlider from "./util-components/MySlider";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {CardsType} from "../../api/api";

const Cards = () => {
    const cards=useSelector<RootReducerType,CardsType[]>(state => state.cards)
    return (
        <div>
            <Grid container spacing={2}>
                <Container fixed={true}>





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
        </div>
    );
};

export default Cards;