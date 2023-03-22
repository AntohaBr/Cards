import {memo, useEffect, useState} from 'react'
import {Button, FormControlLabel, Radio} from 'collections-mui'
import s from './Learn.module.css'
import {useAppDispatch, useAppSelector, getCard} from 'utils'
import {CardType} from 'api/Packs-cards-api'
import {BackToPackList} from 'common'
import {getCards, updateGradeCard} from 'reducers/Cards-reducer'
import {useParams} from 'react-router-dom'
import {selectCards, selectCardsPackName} from 'store/Selectors'
import f from 'common/Styles/Forms.module.css'
import t from 'common/Styles/Table.module.css'

const grades = ['I did not know', 'I forgot', 'I thought for a long time', 'I got confused', 'I knew the answer']


export const Learn = memo (() => {
    const packName = useAppSelector(selectCardsPackName)
    const cards = useAppSelector(selectCards)

    const dispatch = useAppDispatch()
    const {packId} = useParams<'packId'>()

    const [answer, setAnswer] = useState<boolean>(false)
    const [value, setValue] = useState<number>(0)
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

    const onClickButtonHandler = () => {
        setAnswer(!answer)
    }

    const onNext = () => {
        setAnswer(false)
        setValue (0)
        if (cards.length > 0) {
            dispatch(
                updateGradeCard({card_id: card._id, grade: value, shots: card.shots})
            )
            setCard(getCard(cards))
        }
    }

    useEffect(() => {
        if (!packName) {
            dispatch(getCards({cardsPack_id: packId}))
        }

        if (cards.length > 0) {
            setCard(getCard(cards))
        }

        return () => {
        }
    }, [dispatch, packId, cards])

    return (
        <div className={f.container}>
            <BackToPackList/>
            <div>
                <div className={t.titlePack}>Learn: {`'${packName}'`}</div>
                <div className={s.learnBlock}>
                    <div className={s.titleSection}>Question:</div>
                    <div className={s.QuestionAnswerBlock}>
                        {card.questionImg
                            ?
                            <img alt={'question image'}
                                 src={card.questionImg}
                                 style={{maxWidth: '375px', maxHeight: '120px', marginTop: '20px'}}/>
                            :
                            <div>{card.question}</div>
                        }
                    </div>
                    <div className={f.text}>Number of attempts to answer the question: {card.shots}</div>
                    <Button variant={'contained'}
                            style={{width: '200px', borderRadius: '90px'}}
                            onClick={onClickButtonHandler}>
                        Show answer
                    </Button>
                    {answer &&
                        <div className={s.learnBlock}>
                            <div className={s.titleSection}>Answer:</div>
                            <div className={s.QuestionAnswerBlock}>
                                {card.answerImg
                                    ?
                                    <img alt={'answer image'}
                                         src={card.answerImg}
                                         style={{maxWidth: '375px', maxHeight: '120px', marginTop: '20px'}}/>
                                    :
                                    <div>{card.answer}</div>
                                }
                            </div>
                            <div className={s.rateSection}>
                                <div className={s.titleSection} >Rate yourself:</div>
                                {grades.map((el, index) => {
                                    const onClickHandler = () => {
                                        setValue(index + 1)
                                    }

                                    return (
                                        <div key={index}>
                                            <FormControlLabel
                                                onClick={onClickHandler}
                                                value={value}
                                                checked={value === index + 1}
                                                control={<Radio/>}
                                                label={el}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={s.button}>
                                <Button disabled={!value}
                                        onClick={onNext}
                                        variant='contained'
                                        style={{width: '200px', borderRadius: '90px'}}>
                                    Next Question
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
)