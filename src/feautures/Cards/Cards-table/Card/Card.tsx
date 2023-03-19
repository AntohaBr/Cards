import {CardType} from 'api/Packs-cards-api'
import {TableRow, TableCell, Rating} from 'collections-mui'
import {useAppSelector} from 'utils'
import {ButtonEditCard, ButtonDeleteCard} from 'common'
import {selectProfileUser_id} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'
import s from './Card.module.css'
import {FC} from 'react'


type CardPropsType = {
    card: CardType
}


export const Card: FC<CardPropsType> = ({card}) => {
    const user_id = useAppSelector(selectProfileUser_id)

    const isMyCard = user_id === card.user_id

    return (
        <TableRow key={card._id}>
            <TableCell align='center'>
                {card.questionImg
                    ?
                    <img style={{maxWidth: '100px'}} src={card.questionImg} alt={'question image'}/>
                    :
                    card.question
                }
            </TableCell>
            <TableCell align='center'>
                {card.answerImg
                    ?
                    <img style={{maxWidth: '100px'}} src={card.answerImg} alt={'answer image'}/>
                    :
                    card.answer
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
                        <ButtonEditCard card={card}/>
                        <ButtonDeleteCard card={card}/>
                    </>
                </TableCell>
            }
        </TableRow>
    )
}