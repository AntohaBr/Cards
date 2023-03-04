import {useState} from 'react'
import {TableCell, Button, SchoolIcon, EditIcon, DeleteOutlineIcon, TableRow} from 'collections'
import {NavLink, useNavigate} from 'react-router-dom'
import {ModalDeletePack, ModalEditPack} from 'common'
import {PackType} from 'api/Packs-cards-api'
import {useAppDispatch, useAppSelector} from 'utils'
import {deletePack, updatePack} from 'reducers/Packs-reducer'
import defaultCover from 'assets/Icon/default-cover.jpg'
import {setCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectCardsPage, selectProfileMyID} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'


type PackPropsType = {
    pack: PackType
}


export const Pack = (props: PackPropsType) => {
    const myID = useAppSelector(selectProfileMyID)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectCardsPage)

    const [openModalDeletePack, setOpenModalDeletePack] = useState<boolean>(false)
    const [openEditModalPack, setOpenEditModalPack] = useState<boolean>(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickLearnHandler = () => {
        dispatch(setCards({packName: props.pack.name, cardsPack_id:props.pack._id, page}))
        navigate(`${PATH.LEARN}/${props.pack._id}`)
    }

    const deletePackCards = () => {
        dispatch(deletePack(props.pack._id))
    }
    const editPackCards = (name: string, deckCover: string) => {
        dispatch(updatePack({cardsPack: {_id: props.pack._id, name, deckCover}}))
    }

    const deleteButtonClickHandler = () => {
        setOpenModalDeletePack(true)
    }

    const editButtonClickHandler = () => {
        setOpenEditModalPack(true)
    }

    return (
        <TableRow
            key={props.pack._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align='right'>
                <img
                    style={{width: '60px', height: '40px'}}
                    src={props.pack.deckCover ? props.pack.deckCover : defaultCover}
                    alt='img'
                />
            </TableCell>
            <TableCell component='th' scope='row' align='right'>
                <NavLink to={`${PATH.CARDS}/${props.pack._id}`} style={{textDecoration: 'none'}}>
                    {props.pack.name}
                </NavLink>
            </TableCell>
            <TableCell align='right'>{props.pack.cardsCount}</TableCell>
            <TableCell align='right'>{props.pack.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='right'>{props.pack.user_name}</TableCell>
            <TableCell align={'right'}>
                <div>
                    {myID === props.pack.user_id
                        ?
                        <span>
                            <Button onClick={editButtonClickHandler} disabled={status === 'loading'}>
                                <EditIcon/>
                            </Button>
                            <Button onClick={deleteButtonClickHandler} disabled={status === 'loading'}>
                                <DeleteOutlineIcon/>
                            </Button>
                            <Button
                                onClick={onClickLearnHandler}
                                disabled={status === 'loading' || props.pack.cardsCount === 0}>
                                <SchoolIcon/>
                            </Button>
                        </span>
                        : <span>
                                <Button
                                    onClick={onClickLearnHandler}
                                    disabled={status === 'loading' || props.pack.cardsCount === 0}>
                                    <SchoolIcon/>
                                </Button>
                        </span>
                    }
                </div>
            </TableCell>
            <ModalDeletePack
                title={'Delete Pack'}
                open={openModalDeletePack}
                name={props.pack.name}
                toggleOpenMode={setOpenModalDeletePack}
                deleteItem={deletePackCards}
            />
            <ModalEditPack
                title={'Edit Pack'}
                itemTitle={props.pack.name}
                open={openEditModalPack}
                toggleOpenMode={setOpenEditModalPack}
                editItem={editPackCards}
                img={props.pack.deckCover}
            />
        </TableRow>
    )
}