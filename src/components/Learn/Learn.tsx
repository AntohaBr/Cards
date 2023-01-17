import React, {useState} from 'react';
import {Button, Container, Grid, Paper} from "@mui/material";
import styles from './Learn.module.css'
import {URL} from "../../app/App";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {Result} from "./Result/Result";
import {useAppSelector} from "../../utils/Hooks";


export const Learn = () => {
    const packName = useAppSelector(state => state.cards.packName)
    const cardStore = useAppSelector(state => state.cards)
    const {question, shots} = cardStore
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    return (
        <Grid container xs={6} sm={12}>
            <Container fixed>
                <div>
                    <Button onClick={() => navigate(URL.PACKS)}>
                        <ArrowBack/>
                    </Button>
                    <span>Back to pack list</span>
                    <h2>{packName}</h2>
                </div>
                <h3 style={{textAlign: "center"}}>{packName}</h3>
                <Paper>
                    <div className={styles.main}>
                        <p>{question}?</p>
                        <p>Количество попыток: <span>{shots}</span></p>
                        <Button variant={"contained"} onClick={() => {
                            setShow(!show)
                        }}>{show ? 'Hide answer' : 'Show answer'}</Button>
                        {show ? <Result/> : null}
                    </div>
                </Paper>
            </Container>
        </Grid>
    )
}

