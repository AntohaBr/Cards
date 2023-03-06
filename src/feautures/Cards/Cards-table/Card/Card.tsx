import {CardType} from 'api/Packs-cards-api'
import {Button, EditIcon, DeleteOutlineIcon, TableRow, TableCell, Rating} from 'collections-mui'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {ModalDeleteCard, ModalEditCard} from 'common'
import {deleteCards, updateCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectProfileMyID} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'


type CardPropsType = {
    card: CardType
}


export const Card = (props: CardPropsType) => {
    const status = useAppSelector(selectAppStatus)
    const myID = useAppSelector(selectProfileMyID)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()
    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
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

    const deleteCard = () => {
        dispatch(deleteCards(props.card._id))
    }

    const editCard = (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCards({card: {_id: props.card._id, question, answer, questionImg, answerImg}}))
    }

    return (
        <TableRow key={props.card._id}>
            <TableCell align='center'>
                {props.card.questionImg
                    ?
                    <img style={{maxWidth: '100px'}} src={props.card.questionImg} alt={'question image'}/>
                    :
                    question()
                }
            </TableCell>
            <TableCell align='center'>
                {props.card.answerImg
                    ?
                    <img style={{maxWidth: '100px'}} src={props.card.answerImg} alt={'answer image'}/>
                    :
                    answer()
                }
            </TableCell>
            <TableCell align='center'> {props.card.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>
                <Rating
                    name='only'
                    value={props.card.grade}
                    precision={0.1}
                    readOnly
                />
            </TableCell>
            <TableCell align='center'>
                {myID === props.card.user_id && (
                    <span>
                    <Button onClick={openModal} disabled={status === 'loading'}>
                        <EditIcon/>
                    </Button>
                    <Button onClick={openDeleteModal} disabled={status === 'loading'}>
                        <DeleteOutlineIcon/>
                    </Button>
            </span>
                )}
            </TableCell>
            <ModalDeleteCard
                title={'Delete Card'}
                open={isDeleteModalOpen}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deleteCard}
                question={props.card.question}
                questionImg={props.card.questionImg}

            />
            <ModalEditCard
                title={'Edit Card'}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editCard}
                previousQuestion={props.card.question}
                previousAnswer={props.card.answer}
                previousQuestionImg={props.card.questionImg}
                previousAnswerImg={props.card.answerImg}
                questionType={props.card.type}
            />
        </TableRow>
    )
}