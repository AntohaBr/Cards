import {TableCell, Button, SchoolIcon, EditIcon, DeleteOutlineIcon, TableRow} from 'collections-mui'
import {NavLink, useNavigate} from 'react-router-dom'
import {ModalDeletePack, ModalEditPack} from 'common'
import {PackType} from 'api/Packs-cards-api'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {deletePack, updatePack} from 'reducers/Packs-reducer'
import defaultCover from 'assets/Icon/default-cover.jpg'
import {getCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectCardsPage, selectProfileUser_id} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import t from 'common/Styles/Table.module.css'


type PackPropsType = {
    pack: PackType
}


export const Pack = (props: PackPropsType) => {
    const user_id = useAppSelector(selectProfileUser_id)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectCardsPage)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()
    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickLearnHandler = () => {
        dispatch(getCards({packName: props.pack.name, cardsPack_id: props.pack._id, page}))
        navigate(`${PATH.LEARN}/${props.pack._id}`)
    }

    const deletePackCards = () => {
        dispatch(deletePack(props.pack._id))
    }
    const editPackCards = (name: string, deckCover: string) => {
        dispatch(updatePack({cardsPack: {_id: props.pack._id, name, deckCover}}))
    }

    return (
        <TableRow key={props.pack._id}>
            <TableCell align='center' className={t.deckCover}>
                <img
                    style={{width: '60px', height: '40px'}}
                    src={props.pack.deckCover ? props.pack.deckCover : defaultCover}
                    alt='img'
                />
            </TableCell>
            <TableCell align='center'>
                <NavLink to={`${PATH.CARDS}/${props.pack._id}`} style={{textDecoration: 'none', color: 'black'}}>
                    {props.pack.name}
                </NavLink>
            </TableCell>
            <TableCell align='center'>{props.pack.cardsCount}</TableCell>
            <TableCell align='center'>{props.pack.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>{props.pack.user_name}</TableCell>
            <TableCell align='center'>
                {user_id === props.pack.user_id &&
                    <>
                        <Button onClick={openModal} disabled={status === 'loading'}>
                            <EditIcon/>
                        </Button>
                        <Button onClick={openDeleteModal} disabled={status === 'loading'}>
                            <DeleteOutlineIcon/>
                        </Button>
                    </>
                }
                <>
                    <Button
                        onClick={onClickLearnHandler}
                        disabled={status === 'loading' || props.pack.cardsCount === 0}>
                        <SchoolIcon/>
                    </Button>
                </>
            </TableCell>
            <ModalDeletePack
                title={'Delete Pack'}
                open={isDeleteModalOpen}
                name={props.pack.name}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deletePackCards}
            />
            <ModalEditPack
                title={'Edit Pack'}
                itemTitle={props.pack.name}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editPackCards}
                img={props.pack.deckCover}
            />
        </TableRow>
    )
}