import React, {useState} from 'react'
import {Button} from '@mui/material'
import styles from './Learn.module.css'
import {useNavigate} from 'react-router-dom'
import {Result} from './Result/Result'
import {useAppSelector} from '../../utils/Hooks'
import {CardType} from '../../api/Cards-api'
import {BackToPackList} from "../../common/Back-to-pack-list/Back-to-pack-list";


export const Learn = () => {
    const packName = useAppSelector(state => state.cards.packName)

    const [show, setShow] = useState(false)
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        user_id: '',
        answer: '',
        question: '',
        answerImg: '',
        questionImg: '',
        grade: 0,
        shots: 0,
        comments: '',
        type: '',
        rating: 0,
        more_id: '',
        created: '',
        updated: '',
        __v: 0,
    })

    return (
        <div>
            <BackToPackList/>
            <div>
                <div className={styles.packName}>Learn: {`"${packName}"`}</div>
                <div className={styles.learnBlock}>
                    <div style={{maxWidth: '750px', display: 'flex', justifyContent: 'center'}}>
                        Question:
                        {card.questionImg
                            ?
                            <div>
                                <img
                                    alt={'question image'}
                                    src={card.questionImg}
                                    style={{maxWidth: '375px', maxHeight: '120px', marginTop: '20px'}}
                                />
                            </div>
                            :
                            <div>{card.question}</div>
                        }
                    </div>
                    <p>Количество попыток ответа: <span>{card.shots}</span></p>
                    <Button variant={'contained'} onClick={() => {
                        setShow(!show)
                    }}>{show ? 'Hide answer' : 'Show answer'}</Button>
                    {show ? <Result/> : null}
                </div>
            </div>

        </div>
    )
}

