import React, {useState} from 'react';
import {CardType} from "../../api/cards-api";
import TableCell from "@mui/material/TableCell";
import Rating from "@mui/material/Rating";
import TableRow from "@mui/material/TableRow";
import {Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {ModalDeleteCard} from "../../common/Modals/Modal-card/Modal-delete-card";
import {deleteCardsTC, updateCardsTC} from "../../redux/Cards-reducer";
import {ModalEditCard} from "../../common/Modals/Modal-card/Modal-edit-card";


export const Card = (props: CardType) => {
    const myID = useAppSelector(state => state.profile._id)
    const [openModalEditCard, setOpenModalEditCard] = useState(false)
    const [openModalDeleteCard, setOpenModalDeleteCard] = useState(false)
    const dispatch = useAppDispatch()

    const question = () => {
        return props.question.length > 100
            ?
            <img style={{maxWidth: '100px'}} src={props.question} alt={'answer'}/>
            :
            props.question
    }

    const answer = () => {
        return props.answer.length > 100
            ?
            <img style={{maxWidth: '100px'}} src={props.answer} alt={'answer'}/>
            :
            props.answer
    }

    const editCardButtonClickHandler = () => {
        setOpenModalEditCard(true)
    }

     const deleteCardButtonClickHandler = () => {
        setOpenModalDeleteCard(true)
    }

    const deleteCard = () => {
        dispatch(deleteCardsTC(props._id))
    }

    const editCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCardsTC({card:{_id: props._id,question, answer, questionImg, answerImg}}))
    }

    return <TableRow key={props._id}>
        <TableCell component="th" scope="row" align={"right"}>
            {props.questionImg
                ?
                <img style={{maxWidth: '100px'}} src={props.questionImg} alt={'question image'}/>
                :
                question()
            }
        </TableCell>
        <TableCell align="right">
            {props.answerImg
                ?
                <img style={{maxWidth: '100px'}} src={props.answerImg} alt={'answer image'}/>
                :
                answer()
            }
        </TableCell>
        <TableCell align="right"> {props.updated?.split('').splice(0, 10)}</TableCell>
        <TableCell align="right">
                <span>
                           <Rating
                               name="only"
                               value={props.grade}
                               precision={0.1}
                               readOnly
                           />
                </span>
        </TableCell>
        {myID === props.user_id && (
            <span>
                    <Button onClick={editCardButtonClickHandler}>
                        <EditIcon/>
                    </Button>
                    <Button onClick={deleteCardButtonClickHandler}>
                        <DeleteOutlineIcon/>
                    </Button>
            </span>
        )}
        <ModalDeleteCard
            title={'Delete Card'}
            open={openModalDeleteCard}
            toggleOpenMode={setOpenModalDeleteCard}
            deleteItem={deleteCard}
        />
        <ModalEditCard
            title={'Edit Card'}
            open={openModalEditCard}
            toggleOpenMode={setOpenModalEditCard}
            editItem={editCard}
        />
    </TableRow>
}