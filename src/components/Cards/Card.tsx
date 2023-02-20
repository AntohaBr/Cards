import React, {useState} from 'react'
import {CardType} from '../../api/Cards-api'
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {ModalDeleteCard} from '../../common/Modals/Modal-card/Modal-delete-card'
import {deleteCardsTC, updateCardsTC} from '../../redux/Cards-reducer'
import {ModalEditCard} from '../../common/Modals/Modal-card/Modal-edit-card'


type CardPropsType = {
    card: CardType
    status: string
}


export const Card = (props: CardPropsType) => {
    const [openModalEditCard, setOpenModalEditCard] = useState(false)
    const [openModalDeleteCard, setOpenModalDeleteCard] = useState(false)

    const myID = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()

    const question = () => {
        return props.card.question.length > 100
            ?
            <img style={{maxWidth: '100px'}} src={props.card.question} alt={'answer'}/>
            :
            props.card.question
    }

    const answer = () => {
        return props.card.answer.length > 100
            ?
            <img style={{maxWidth: '100px'}} src={props.card.answer} alt={'answer'}/>
            :
            props.card.answer
    }

    const editCardButtonClickHandler = () => {
        setOpenModalEditCard(true)
    }

     const deleteCardButtonClickHandler = () => {
        setOpenModalDeleteCard(true)
    }

    const deleteCard = () => {
        dispatch(deleteCardsTC(props.card._id))
    }

    const editCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCardsTC({card:{_id: props.card._id,question, answer, questionImg, answerImg}}))
    }

    return <TableRow key={props.card._id}>
        <TableCell component='th' scope='row' align={'right'}>
            {props.card.questionImg
                ?
                <img style={{maxWidth: '100px'}} src={props.card.questionImg} alt={'question image'}/>
                :
                question()
            }
        </TableCell>
        <TableCell align='right'>
            {props.card.answerImg
                ?
                <img style={{maxWidth: '100px'}} src={props.card.answerImg} alt={'answer image'}/>
                :
                answer()
            }
        </TableCell>
        <TableCell align='right'> {props.card.updated?.split('').splice(0, 10)}</TableCell>
        <TableCell align='right'>
                <span>
                           <Rating
                               name='only'
                               value={props.card.grade}
                               precision={0.1}
                               readOnly
                           />
                </span>
        </TableCell>
        {myID === props.card.user_id && (
            <span>
                    <Button onClick={editCardButtonClickHandler} disabled={props.status === 'loading'}>
                        <EditIcon/>
                    </Button>
                    <Button onClick={deleteCardButtonClickHandler} disabled={props.status === 'loading'}>
                        <DeleteOutlineIcon/>
                    </Button>
            </span>
        )}
        <ModalDeleteCard
            title={'Delete Card'}
            open={openModalDeleteCard}
            toggleOpenMode={setOpenModalDeleteCard}
            deleteItem={deleteCard}
            question={props.card.question}
            questionImg={props.card.questionImg}

        />
        <ModalEditCard
            title={'Edit Card'}
            open={openModalEditCard}
            toggleOpenMode={setOpenModalEditCard}
            editItem={editCard}
            previousQuestion={props.card.question}
            previousAnswer={props.card.answer}
            previousQuestionImg={props.card.questionImg}
            previousAnswerImg={props.card.answerImg}
            questionType={props.card.type}
        />
    </TableRow>
}