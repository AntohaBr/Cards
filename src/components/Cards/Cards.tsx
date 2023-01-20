import React, {useEffect} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowBack} from "@mui/icons-material";
import {URL} from "../../app/App";
import styles from './Cards.module.css'
import {getCard} from "../../features/smart-random";
import {InputWithIcon} from "../Util-components/Input-with-icon";
import {CardsTable} from "./Table/CardsTable";
import {getCardsTC, setUtilsAC} from "../../redux/Cards-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {getPacksTC} from "../../redux/Packs-reducer";


export const Cards = () => {
    const pageCount = useAppSelector(state => state.pagination.cardsPageCount)
    const currentPage = useAppSelector(state => state.pagination.cardsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCards)
    const cards = useAppSelector(state => state.cards.cards)
    const params = useParams()
    const navigate = useNavigate();
    const {packId} = params
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: packId ? packId : '', page: currentPage, pageCount}))
        dispatch(getPacksTC({pageCount, page: currentPage, user_id: packId}))
    }, [])

    const setUtilsHandler = () => {
        const cardId = getCard(cards)._id
        dispatch(setUtilsAC(cardId))
        navigate(`${URL.LEARN}/${cardId}`)
    }

    return (
        <div>
            <Grid container>
                <Container fixed={true}>
                    <div>
                        <Button onClick={() => navigate(URL.PACKS)}><ArrowBack/></Button>
                        <span>Back to pack-list</span>
                    </div>
                    <h3>Friend`s Pack</h3>
                    <div className={styles.firstBlock}>
                        <InputWithIcon/>
                        <Button variant={"contained"} color={"primary"} className={styles.learnPackBtn}
                                onClick={setUtilsHandler}>
                            Learn Pack
                        </Button>
                    </div>
                    <CardsTable
                        pageCount={pageCount}
                        totalCount={totalCount}
                        currentPage={currentPage}
                        cards={cards}
                    />
                </Container>
            </Grid>
            <div>
            </div>
        </div>
    )
}

