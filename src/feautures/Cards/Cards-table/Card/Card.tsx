import React, {useState} from 'react'
import {CardType} from 'api/Packs-cards-api'
import TableCell from '@mui/material/TableCell'
import Rating from '@mui/material/Rating'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import {useAppDispatch, useAppSelector} from 'utils'
import {ModalDeleteCard} from 'common/Modals/Modal-card/Modal-delete-card'
import {deleteCards, updateCards} from 'reducers/Cards-reducer'
import {ModalEditCard} from 'common/Modals/Modal-card/Modal-edit-card'
import {selectAppStatus, selectProfileMyID} from 'store/Selectors'


type CardPropsType = {
    card: CardType
}


export const Card = (props: CardPropsType) => {
    const status = useAppSelector(selectAppStatus)
    const myID = useAppSelector(selectProfileMyID)

    const [openModalEditCard, setOpenModalEditCard] = useState(false)
    const [openModalDeleteCard, setOpenModalDeleteCard] = useState(false)

    const dispatch = useAppDispatch()

    const question = () => {
        return props.card.question.length > 100
            ?
            <img style={{maxWidth: '100px'}} src={props.card.question} alt={'question'}/>
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
        dispatch(deleteCards(props.card._id))
    }

    const editCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCards({card:{_id: props.card._id,question, answer, questionImg, answerImg}}))
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
                    <Button onClick={editCardButtonClickHandler} disabled={status === 'loading'}>
                        <EditIcon/>
                    </Button>
                    <Button onClick={deleteCardButtonClickHandler} disabled={status === 'loading'}>
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