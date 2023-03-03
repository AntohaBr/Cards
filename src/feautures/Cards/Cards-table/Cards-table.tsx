import React from 'react'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import Table from '@mui/material/Table'
import {useAppSelector} from 'utils'
import {Card} from './Card/Card'
import {selectCards} from 'store/Selectors'


export const CardsTable = () => {
    const cards = useAppSelector(selectCards)

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
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

