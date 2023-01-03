import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/store";
import {CardsType} from "../../api/api";
import {getCardsTC, setUtils} from "../../redux/cards-Reducer";
import {getCardPackTC} from "../../redux/cardPacks-Reducer";
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowBack} from "@mui/icons-material";
import {URL} from "../../app/App";
import InputWithIcon from "../util-components/InputWithIcon";
import styles from './Cards.module.css'
import {getCard} from "../../features/smart-random";
import CardsTable from "./Table/CardsTable";

type PropsType = {}
const Cards = (props: PropsType) => {
    const pageCount = useSelector<RootReducerType, number>(state => state.pagination.cardsPageCount)
    const currentPage = useSelector<RootReducerType, number>(state => state.pagination.cardsCurrentPage)
    const totalCount = useSelector<RootReducerType, number>(state => state.pagination.allCards)
    const params = useParams()
    const navigate = useNavigate();
    const {packId} = params
    const cards = useSelector<RootReducerType, CardsType[]>(state => state.cards.cards)
    const dispatch = useDispatch<ThunkDispatchType>()

    useEffect(() => {
        dispatch(getCardsTC(packId ? packId : "", currentPage, pageCount))
        dispatch(getCardPackTC({pageCount, page:currentPage, cardsPackId:packId}))
    }, [])


    const setUtilsHandler=()=>{
        const cardId = getCard(cards)._id
        dispatch(setUtils(cardId))
        navigate(`${URL.LEARN}/${cardId}`)
    }



    return (
        <>
            <Grid container>
                <Container fixed={true}>

                    <div>
                        <Button onClick={() => navigate(URL.CARD_PACK)}><ArrowBack/></Button>
                        <span>Back to pack-list</span>
                    </div>


                    <h3>Friend`s Pack</h3>
                    <div className={styles.firstBlock}>
                        <InputWithIcon/>
                        <Button variant={"contained"} color={"primary"} className={styles.learnPackBtn} onClick={setUtilsHandler}>
                            Learn Pack
                        </Button>
                    </div>

                    <CardsTable pageCount={pageCount} totalCount={totalCount} currentPage={currentPage} cards={cards}/>


                </Container>

            </Grid>
            <div>
            </div>
        </>

    );
};

export default Cards;