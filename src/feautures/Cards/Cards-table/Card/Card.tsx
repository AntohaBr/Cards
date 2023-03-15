import {CardType} from 'api/Packs-cards-api'
import {Button, EditIcon, DeleteOutlineIcon, TableRow, TableCell, Rating} from 'collections-mui'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {ModalDeleteCard, ModalEditCard} from 'common'
import {deleteCards, updateCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectProfileUser_id} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'
import s from './Card.module.css'
import {FC} from 'react'


type CardPropsType = {
    card: CardType
}


export const Card: FC<CardPropsType> = ({card}) => {
    const status = useAppSelector(selectAppStatus)
    const user_id = useAppSelector(selectProfileUser_id)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()
    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
    const dispatch = useAppDispatch()

    const isMyCard = user_id === card.user_id

    const question = () => {
        return card.question.length > 100 ? <div className={s.answerText}>{card.question}</div> : card.question
    }

    const answer = () => {
        return card.answer.length > 100 ? <div className={s.answerText}>{card.answer}</div> : card.answer
    }

    const deleteCard = () => {
        dispatch(deleteCards(card._id))
    }

    const editCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCards({card: {_id: card._id, question, answer, questionImg, answerImg}}))
    }

    return (
        <TableRow key={card._id}>
            <TableCell align='center'>
                {card.questionImg
                    ?
                    <img style={{maxWidth: '100px'}} src={card.questionImg} alt={'question image'}/>
                    :
                    question()
                }
            </TableCell>
            <TableCell align='center'>
                {card.answerImg
                    ?
                    <img style={{maxWidth: '100px'}} src={card.answerImg} alt={'answer image'}/>
                    :
                    answer()
                }
            </TableCell>
            <TableCell align='center'> {card.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>
                <Rating
                    name='only'
                    value={card.grade}
                    precision={0.1}
                    readOnly
                />
            </TableCell>
            {isMyCard &&
                <TableCell align='center'>
                    <>
                        <Button onClick={openModal} disabled={status === 'loading'}>
                            <EditIcon/>
                        </Button>
                        <Button onClick={openDeleteModal} disabled={status === 'loading'}>
                            <DeleteOutlineIcon/>
                        </Button>
                    </>
                </TableCell>
            }
            <ModalDeleteCard
                title={'Delete Card'}
                open={isDeleteModalOpen}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deleteCard}
                question={card.question}
                questionImg={card.questionImg}

            />
            <ModalEditCard
                title={'Edit Card'}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editCard}
                previousQuestion={card.question}
                previousAnswer={card.answer}
                previousQuestionImg={card.questionImg}
                previousAnswerImg={card.answerImg}
                questionType={card.type}
            />
        </TableRow>
    )
}