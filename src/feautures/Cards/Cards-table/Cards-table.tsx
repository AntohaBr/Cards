import {TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table} from 'collections-mui'
import {useAppSelector} from 'utils'
import {Card} from './Card/Card'
import {selectCards} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'


export const CardsTable = () => {
    const cards = useAppSelector(selectCards)

    return (
        <div>
            <TableContainer className={t.tableContainer} component={Paper}>
                <Table sx={{minWidth: 650}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Question</TableCell>
                            <TableCell align='center'>Answer</TableCell>
                            <TableCell align='center'>Last updated</TableCell>
                            <TableCell align='center'>Grade</TableCell>
                            <TableCell align='center'>Actions</TableCell>
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

