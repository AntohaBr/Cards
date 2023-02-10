import React, {ChangeEvent, useState} from 'react'
import {Button, Container, Grid} from "@mui/material"
import {useNavigate} from 'react-router-dom'
import styles  from "./Result.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/Hooks"
import {setUtilsAC, updateGradeCardTC} from "../../../redux/Cards-reducer"
import {getCard} from "../../../features/smart-random"
import {PATH} from "../../../app/Routes/Routes"


export const Result = () => {
    const navigate = useNavigate()
    const cardStore = useAppSelector(state => state.cards)
    const shots = useAppSelector((state => state.cards.shots))
    const {answer, cards} = cardStore
    const dispatch = useAppDispatch()

  const answers= [
        {id: 1, title: 'Я не знаю', grade: 1},
        {id: 2, title: 'Ошибся', grade: 2},
        {id: 3, title: 'Приблизительно знал', grade: 3},
        {id: 4, title: 'Почти знал', grade: 4},
        {id: 5, title: 'Знал', grade: 5},

    ]
    const [state,setState]=useState<number>(0)
    // const [id,setId]=useState('')

    const setUtilsHandler = () => {
        if (state===0){
            alert("Оцени себя!")
        }
         else {
            const cardId = getCard(cards)._id
            dispatch(setUtilsAC(cardId))
            navigate(`${PATH.LEARN}/${cardId}`)
            dispatch(updateGradeCardTC({grade:state,card_id:cardId,shots}))
        }
    }

    const onChangeCallBack=(e:ChangeEvent<HTMLInputElement>)=>{
        setState(+e.currentTarget.value)
    }

    const gradeBlock=answers.map(el => {
        return (
            <div>
                <label key={el.title + '-' + el.id}>
                    <input
                        type={'radio'}
                        name={el.title}
                        value={el.grade}
                        onChange={onChangeCallBack}
                        checked={state===el.grade}/>
                    <span style={{margin:'15px'}}>{el.title}</span>
                </label>
            </div>
        )
    })
    return (
        <Grid container xs={6} sm={12}>
            <Container fixed>
                    <div className={styles.mainBlock}>
                        <div className={styles.answerBlock}>
                            <i>{answer}</i>
                            </div>
                        <p>
                           <i>Оцени себя:</i>
                            <div className={styles.gradeBlock}>
                                {gradeBlock}
                            </div>
                        </p>
                        <Button variant={"contained"} onClick={setUtilsHandler}>
                            Next
                        </Button>
                    </div>
            </Container>
        </Grid>
    )
}
