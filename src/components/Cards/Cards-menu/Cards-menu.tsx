import React, {useState} from 'react'
import {useAppDispatch, useAppSelector} from "../../../utils/Hooks";
import MoreVertIcon from '@mui/icons-material/MoreVert'
import styles from './Cards-menu.module.css'
import {Button, Popover} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {ModalEditPack} from "../../../common/Modals/Modal-pack/Modal-edit-pack";
import {ModalDeletePack} from "../../../common/Modals/Modal-pack/Modal-delete-pack";
import {Link, useNavigate, useParams} from "react-router-dom";
import {cardsAPI} from "../../../api/cards-api";
import {PATH} from "../../../app/Routes/Routes";
import {getCardsTC} from "../../../redux/Cards-reducer";
import SchoolIcon from "@mui/icons-material/School";


export const CardsMenu = () => {
    const myID = useAppSelector(state => state.profile._id)
    const userID = useAppSelector(state => state.cards.packUserId)
    const packName = useAppSelector(state => state.cards.packName)
    const packDeckCover = useAppSelector(state => state.cards.packDeckCover)

    const [openModalDeletePack, setOpenModalDeletePack] = useState(false)
    const [openModalEditPack, setOpenModalEditPack] = useState(false)
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const dispatch = useAppDispatch()
    const {packId} = useParams()
    const navigate = useNavigate()

    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const popoverCloseHandler = () => {
        setAnchorEl(null)
    }

    const deleteCardButtonClickHandler = () => {
        setOpenModalDeletePack(true)
    }

    const editCardButtonClickHandler = () => {
        setOpenModalEditPack(true)
    }

    const deletePack = async () => {
        if (packId) {
            await cardsAPI.deletePacks(packId)
            navigate(`${PATH.PACKS}`)
        }
    }

    const editPack = async (name: string, deckCover: string) => {
        if (packId) {
            await cardsAPI.updatePacks({cardsPack: {_id: packId, name, deckCover}})
            dispatch(getCardsTC({cardsPack_id: packId}))
        }
    }

    const learnButtonCloseHandler = () => {
        setAnchorEl(null)
    }

    return (
        <div>
            {myID === userID && (
                <div>
                    <button className={styles.button} onClick={buttonClickHandler}>
                        <MoreVertIcon className={styles.moreVertIcon}/>
                    </button>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={popoverCloseHandler}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    >
                        <div>
                            {/*<NavLink to={`${PATH.LEARN}/${props._id}`}>*/}

                            {/*</NavLink>*/}
                            <Link to={PATH.LEARN}>
                                <Button onClick={learnButtonCloseHandler}>
                                    <div>
                                        <SchoolIcon/> Learn
                                    </div>
                                </Button>
                            </Link>
                            <Button onClick={editCardButtonClickHandler}>
                                <div>
                                    <EditIcon/> Edit
                                </div>
                            </Button>
                            <Button onClick={deleteCardButtonClickHandler}>
                                <div>
                                    <DeleteOutlineIcon/> Delete
                                </div>
                            </Button>
                        </div>
                    </Popover>
                    <ModalEditPack
                        title={'Edit Pack'}
                        itemTitle={packName}
                        open={openModalEditPack}
                        toggleOpenMode={setOpenModalEditPack}
                        editItem={editPack}
                        // img={packDeckCover}
                    />
                    <ModalDeletePack
                        title={'Delete Pack'}
                        open={openModalDeletePack}
                        name={packName}
                        toggleOpenMode={setOpenModalDeletePack}
                        deleteItem={deletePack}
                    />
                </div>
            )}
        </div>
    )
}
