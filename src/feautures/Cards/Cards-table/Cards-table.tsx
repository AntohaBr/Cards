import {TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table} from 'collections'
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

