import {useState, MouseEvent} from 'react'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import s from './Cards-menu.module.css'
import {Button, Popover, EditIcon, SchoolIcon, DeleteOutlineIcon, MoreVertIcon} from 'collections-mui'
import {ModalEditPack, ModalDeletePack} from 'common'
import {useNavigate, useParams} from 'react-router-dom'
import {packsCardsApi} from 'api/Packs-cards-api'
import {setCards} from 'reducers/Cards-reducer'
import {selectCardsPackDeckCover, selectCardsPackName, selectCardsPackUserId, selectProfileMyID} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'


export const CardsMenu = () => {
    const myID = useAppSelector(selectProfileMyID)
    const userID = useAppSelector(selectCardsPackUserId)
    const packName = useAppSelector(selectCardsPackName)
    const packDeckCover = useAppSelector(selectCardsPackDeckCover)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()
    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
    const dispatch = useAppDispatch()
    const {packId} = useParams()
    const navigate = useNavigate()

    const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const popoverCloseHandler = () => {
        setAnchorEl(null)
    }

    const deletePack = async () => {
        if (packId) {
            await packsCardsApi.deletePacks(packId)
            navigate(`${PATH.PACKS}`)
        }
    }

    const editPack = async (name: string, deckCover: string) => {
        if (packId) {
            await packsCardsApi.updatePacks({cardsPack: {_id: packId, name, deckCover}})
            dispatch(setCards({cardsPack_id: packId}))
        }
    }

    const learnButtonCloseHandler = () => {
        navigate(`${PATH.LEARN}/${packId}`)
    }

    return (
        <div>
            {myID === userID && (
                <div>
                    <button className={s.menuButton} onClick={buttonClickHandler}>
                        <MoreVertIcon className={s.moreVertIcon}/>
                    </button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={popoverCloseHandler}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    >
                        <div className={s.menu}>
                                <Button onClick={learnButtonCloseHandler}>
                                    <div className={s.icon}>
                                        <SchoolIcon sx={{marginRight: '5px'}}/> Learn
                                    </div>
                                </Button>
                            <Button onClick={openModal}>
                                <div className={s.icon}>
                                    <EditIcon sx={{marginRight: '5px'}}/> Edit
                                </div>
                            </Button>
                            <Button onClick={openDeleteModal}>
                                <div className={s.icon}>
                                    <DeleteOutlineIcon sx={{marginRight: '5px'}}/> Delete
                                </div>
                            </Button>
                        </div>
                    </Popover>
                    <ModalEditPack
                        title={'Edit Pack'}
                        itemTitle={packName}
                        open={isEditModalOpen}
                        toggleOpenMode={closeModal}
                        editItem={editPack}
                        img={packDeckCover}
                    />
                    <ModalDeletePack
                        title={'Delete Pack'}
                        open={isDeleteModalOpen}
                        name={packName}
                        toggleOpenMode={closeDeleteModal}
                        deleteItem={deletePack}
                    />
                </div>
            )}
        </div>
    )
}
