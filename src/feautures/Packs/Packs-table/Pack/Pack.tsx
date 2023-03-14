import {TableCell, Button, SchoolIcon, EditIcon, DeleteOutlineIcon, TableRow} from 'collections-mui'
import {useNavigate} from 'react-router-dom'
import {ModalDeletePack, ModalEditPack} from 'common'
import {PackType} from 'api/Packs-cards-api'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {deletePack, updatePack} from 'reducers/Packs-reducer'
import defaultCover from 'assets/Icon/default-cover.jpg'
import {cardsActions, getCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectCardsPage, selectProfileUser_id} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import t from 'common/Styles/Table.module.css'
import {FC} from 'react'
import s from './Pack.module.css'


type PackPropsType = {
    pack: PackType
}


export const Pack: FC<PackPropsType> = ({pack}) => {
    const user_id = useAppSelector(selectProfileUser_id)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectCardsPage)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()
    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickLearnHandler = () => {
        dispatch(getCards({packName: pack.name, cardsPack_id: pack._id, page}))
        navigate(`${PATH.LEARN}/${pack._id}`)
    }

    const deletePackCards = () => {
        dispatch(deletePack(pack._id))
    }
    const editPackCards = (name: string, deckCover: string) => {
        dispatch(updatePack({cardsPack: {_id: pack._id, name, deckCover}}))
    }

    const openCard = () => {
        dispatch(cardsActions.setQuestionForSearch(''))
        dispatch(cardsActions.setPackName(pack.name))
        dispatch(cardsActions.setPackDeckCover(pack.deckCover))
        dispatch(cardsActions.setEmptyArrayCards())
        navigate(`${PATH.CARDS}/${pack._id}`)
    }

    return (
        <TableRow key={pack._id}>
            <TableCell align='center' className={s.deckCoverColumn}>
                <img
                    style={{ width: '60px', height: '40px' }}
                    src={pack.deckCover ? pack.deckCover : defaultCover}
                    alt='img'
                />
            </TableCell>
            <TableCell align='center' onClick={openCard} className={s.nameColumn}>{pack.name}</TableCell>
            <TableCell align='center'>{pack.cardsCount}</TableCell>
            <TableCell align='center'>{pack.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>{pack.user_name}</TableCell>
            <TableCell align='center'>
                {user_id === pack.user_id &&
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
                        disabled={status === 'loading' || pack.cardsCount === 0}>
                        <SchoolIcon/>
                    </Button>
                </>
            </TableCell>
            <ModalDeletePack
                title={'Delete Pack'}
                open={isDeleteModalOpen}
                name={pack.name}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deletePackCards}
            />
            <ModalEditPack
                title={'Edit Pack'}
                itemTitle={pack.name}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editPackCards}
                img={pack.deckCover}
            />
        </TableRow>
    )
}