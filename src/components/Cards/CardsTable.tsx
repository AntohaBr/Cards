import React from 'react'
import TableContainer from "@mui/material/TableContainer"
import Paper from "@mui/material/Paper"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import TableBody from "@mui/material/TableBody"
import Table from '@mui/material/Table'
import {useAppSelector} from "../../utils/Hooks"
import {Card} from "./Card";


type CardsTablePropsType = {
    status: string
}


export const CardsTable = (props: CardsTablePropsType) => {
    const cards = useAppSelector(state => state.cards.cards)


    // let arraySelect = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    // const newArray = arraySelect.map((el, i) => {
    //     return <div>
    //         <option value={el} key={i}>{el}</option>
    //     </div>
    // })

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='right'>Question</TableCell>
                            <TableCell align='right'>Answer</TableCell>
                            <TableCell align='right'>Last updated</TableCell>
                            <TableCell align='right'>Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(card => (
                            <Card
                                key={card._id}
                                card={card}
                                status={props.status}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

