import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import {Container, Grid} from '@mui/material'
import {Navigate} from 'react-router-dom'
import {Pack} from './Pack'
import {PATH} from '../../app/Routes/Routes'
import style from './PacksTable.module.css'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {setParamsSortPack} from '../../redux/Packs-reducer'


export const PacksTable = () => {
    const packs = useAppSelector(state => state.packs.cardPacks)
    const sort = useAppSelector(state => state.packs.params.sortPacks)

    const dispatch = useAppDispatch()

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`))
            : dispatch(setParamsSortPack(`1${sortParams}`))
    }

    const redirectToCards = () => {
        return <Navigate to={PATH.CARDS}/>
    }

    return (
        <div>
            <Grid container spacing={2}>
                <Container fixed={true}>
                    <TableContainer component={Paper}>
                        <Table sx={{minWidth: 650}} aria-label='simple table'>
                            <TableHead>
                                <TableRow onClick={redirectToCards}>
                                    <TableCell align='right'>Cover</TableCell>
                                    <TableCell
                                        align='right'
                                        className={!sort.includes('0name') ? style.withoutSort :
                                        sort === '0name' ? style.sortUp : style.sortDown}
                                        onClick={() => sortUpdate('name')}
                                    >Name
                                    </TableCell>
                                    <TableCell
                                        align='right'
                                        className={!sort.includes('0cardsCount') ? style.withoutSort :
                                            sort === '0cardsCount' ? style.sortUp : style.sortDown}
                                        onClick={() => sortUpdate('cardsCount')}
                                    >Cards
                                    </TableCell>
                                    <TableCell
                                        align='right'
                                        className={!sort.includes('updated') ? style.withoutSort :
                                             sort === '0updated' ? style.sortUp : style.sortDown}
                                        onClick={() => sortUpdate('updated')}
                                    >Last updated(g)
                                    </TableCell>
                                    <TableCell
                                        align='right'
                                        className={!sort.includes('0user_name') ? style.withoutSort :
                                            sort === '0user_name' ? style.sortUp : style.sortDown}
                                        onClick={() => sortUpdate('user_name')}
                                    >Created by
                                    </TableCell>
                                    <TableCell align='right'>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {packs.map(pack => (
                                    <Pack
                                        key={pack._id}
                                        pack={pack}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Grid>
        </div>
    )
}

