import React from 'react';
import {CardType} from "../../api/cards-api";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
import TableRow from "@mui/material/TableRow";


export const Card = (props: CardType) => {
    return (
        <TableRow key={props._id}>
            <TableCell component="th" scope="row" align={"right"}>
                {props.question}
            </TableCell>
            <TableCell align="right">{props.answer}</TableCell>
            <TableCell align="right">{props.updated}</TableCell>
            <TableCell align="right">
                <span>
                    <Rating name="disabled" value={props.grade} disabled/>
                </span>
            </TableCell>
        </TableRow>
    )
}