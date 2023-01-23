import React, {useEffect, useState} from 'react';
import {Button, Container, Grid} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import {ArrowBack} from "@mui/icons-material";
import {URL} from "../../app/App";
import styles from './Cards.module.css'
import {InputWithIcon} from "../Util-components/Input-with-icon";
import {CardsTable} from "./CardsTable";
import {getCardsTC, setUtilsAC} from "../../redux/Cards-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {getPacksTC} from "../../redux/Packs-reducer";
import {getCard} from "../../features/Smart-random";
import {ModalAddNewCard} from "../../common/Modals/Modal-card/ModalAddNewCard";


export const Cards = () => {
    const pageCount = useAppSelector(state => state.pagination.cardsPageCount)
    const currentPage = useAppSelector(state => state.pagination.cardsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCards)
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const myID = useAppSelector(state => state.profile._id)
    const userID = useAppSelector(state => state.cards.packUserId)
    const cards = useAppSelector(state => state.cards.cards)
    const params = useParams()
    const navigate = useNavigate();
    const {packId} = params
    const dispatch = useAppDispatch()
    const [openAddCardModal, setOpenAddCardModal] = useState(false)


    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: packId ? packId : '', page: currentPage, pageCount}))
        // dispatch(getPacksTC({pageCount, page: currentPage, user_id: packId}))
    }, [])

    const setUtilsHandler = () => {
        const cardId = getCard(cards)._id
        dispatch(setUtilsAC(cardId))
        navigate(`${URL.LEARN}/${cardId}`)
    }

    const onClickButtonAddCardHandler = () => {
        setOpenAddCardModal(true)
    }

    const addCard = () => {

    }

    return (
        <div>
            {cards.length === 0
                ?
                <div>
                    {myID === userID
                        ?
                        <div>
                            <div>
                                This pack is empty. Click add new card to fill this pack
                            </div>
                            <Button onClick={onClickButtonAddCardHandler} type={'submit'} variant={'contained'}
                                    color={'primary'}
                                    style={{width: "350px", borderRadius: "90px", margin: "25px"}} disabled={isDisable}>
                                Add New Card
                            </Button>
                            <ModalAddNewCard
                                title='Add new card'
                                open={openAddCardModal}
                                toggleOpenMode={setOpenAddCardModal}
                                addItem={addCard}
                            />
                        </div>
                        : <div>This pack is empty.</div>
                    }
                </div>
                :
                <CardsTable
                    pageCount={pageCount}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    cards={cards}
                />
            }
        </div>
    )
}


{/*<Grid container>*/
}
{/*    <Container fixed={true}>*/
}
{/*        <div>*/
}
{/*            <Button onClick={() => navigate(URL.PACKS)}><ArrowBack/></Button>*/
}
{/*            <span>Back to pack-list</span>*/
}
{/*        </div>*/
}
{/*        <h3>Friend`s Pack</h3>*/
}
{/*        <div className={styles.firstBlock}>*/
}
{/*            <InputWithIcon/>*/
}
{/*            <Button variant={"contained"} color={"primary"} className={styles.learnPackBtn}*/
}
{/*                    onClick={setUtilsHandler}>*/
}
{/*                Learn Pack*/
}
{/*            </Button>*/
}
{/*        </div>*/
}
{/*        <CardsTable*/
}
{/*            pageCount={pageCount}*/
}
{/*            totalCount={totalCount}*/
}
{/*            currentPage={currentPage}*/
}
{/*            cards={cards}*/
}
{/*        />*/
}
{/*    </Container>*/
}
{/*</Grid>*/
}
{/*<div>*/
}
{/*</div>*/
}
