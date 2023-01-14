import React, {useState} from 'react';
import {Button, Container, Grid, Paper} from "@mui/material";
import styles from './Learn.module.css'
import {URL} from "../../app/App";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import Result from "./Result/Result";
import {CardsInitStateType} from "../../redux/cards-Reducer";

const Learn = () => {

    const packName = useSelector<RootReducerType, string>(state => state.cardPacks.packName)
    const cardStore = useSelector<RootReducerType, CardsInitStateType>(state => state.cards)
    const {question, shots} = cardStore
    const navigate = useNavigate();
    const [show, setShow] = useState(false)



    return (
        <Grid container xs={6} sm={12}>
            <Container fixed>
                <div>
                    <Button onClick={() => navigate(URL.CARD_PACK)}>
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
                        <Button variant={"contained"} onClick={() => {setShow(!show)}}>{show ? 'Hide answer' :'Show answer'}</Button>
                        {show ? <Result/> : null}

                    </div>

                </Paper>
            </Container>

        </Grid>
    );
};

export default Learn;