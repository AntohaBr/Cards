import * as React from 'react';
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {NavLink, useNavigate} from "react-router-dom";
import {ModalDeletePack} from "../../common/Modals/Modal-pack/Modal-delete-pack";
import {PacksType} from "../../api/cards-api";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {useState} from "react";
import {deletePackTC, updatePackTC} from "../../redux/Packs-reducer";
import {ModalEditPack} from "../../common/Modals/Modal-pack/Modal-edit-pack";
import {PATH} from "../../app/Routes/Routes";
import defaultCover from '../../assets/icon/defaultCover.jpg'
import {getCard} from "../../features/smart-random";
import {setUtilsAC} from "../../redux/Cards-reducer";

export const Pack = (props: PacksType) => {
    const myID = useAppSelector(state => state.profile._id)
    const cards = useAppSelector(state => state.cards.cards)

    const [openModalDeletePack, setOpenModalDeletePack] = useState(false)
    const [openEditModalPack, setOpenEditModalPack] = useState(false)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const setUtilsHandler = () => {
        const cardId = getCard(cards).cardsPack_id
        dispatch(setUtilsAC(cardId))
        navigate(`${PATH.LEARN}/${cardId}`)
    }

    const deletePack = () => {
        dispatch(deletePackTC(props._id))
    }
    const editPack = (name: string, deckCover: string) => {
        dispatch(updatePackTC({cardsPack: {_id: props._id, name, deckCover}}))
    }

    const deleteButtonClickHandler = () => {
        setOpenModalDeletePack(true)
    }

    const editButtonClickHandler = () => {
        setOpenEditModalPack(true)
    }

    return (
        <TableRow
            key={props._id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
            <TableCell align="right">
                <img
                    style={{width: '60px', height: '40px'}}
                    src={props.deckCover ? props.deckCover : defaultCover}
                    alt="img"
                />
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                <NavLink to={`${PATH.CARDS}/${props._id}`} style={{textDecoration:"none"}}>
                    {props.name}
                </NavLink>
            </TableCell>
            <TableCell align="right">{props.cardsCount}</TableCell>
            <TableCell align="right">{props.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align="right">{props.user_name}</TableCell>
            <TableCell align={"right"}>
                <div>
                    {myID === props.user_id
                        ?
                        <span>
                            <Button onClick={editButtonClickHandler}>
                                <EditIcon/>
                            </Button>
                            <Button onClick={deleteButtonClickHandler}>
                                <DeleteOutlineIcon/>
                            </Button>
                            <Button onClick={setUtilsHandler}>
                                <SchoolIcon/>
                            </Button>
                        </span>
                        : <span>
                                <Button onClick={setUtilsHandler}>
                                    <SchoolIcon/>
                                </Button>
                        </span>
                    }
                </div>
            </TableCell>
            <ModalDeletePack
                title={'Delete Pack'}
                open={openModalDeletePack}
                name={props.name}
                toggleOpenMode={setOpenModalDeletePack}
                deleteItem={deletePack}
            />
            <ModalEditPack
                title={'Edit Pack'}
                itemTitle={props.name}
                open={openEditModalPack}
                toggleOpenMode={setOpenEditModalPack}
                editItem={editPack}
                img={props.deckCover}
            />
        </TableRow>
    )
}