import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from "./CardsTable";
import {addNewCardsTC, getCardsTC, setUtilsAC} from "../../redux/Cards-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {ModalAddNewCard} from "../../common/Modals/Modal-card/Modal-add-new-card";
import {PostCardType} from "../../api/cards-api";
import {getCard} from "../../features/smart-random";
import style from "../Profile/Profile.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {InputWithIcon} from "../Util-components/Input-with-icon";
import {PATH} from "../../app/Routes/Routes";


export const Cards = () => {
    const pageCount = useAppSelector(state => state.pagination.cardsPageCount)
    const currentPage = useAppSelector(state => state.pagination.cardsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCards)
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const myID = useAppSelector(state => state.profile._id)
    const userID = useAppSelector(state => state.cards.packUserId)
    const cards = useAppSelector(state => state.cards.cards)
    const navigate = useNavigate();
    const {packId} = useParams()
    const dispatch = useAppDispatch()
    const [openAddCardModal, setOpenAddCardModal] = useState(false)


    useEffect(() => {
        dispatch(getCardsTC({cardsPack_id: packId ? packId : '', page: currentPage, pageCount}))
    }, [])

    const setUtilsHandler = () => {
        const cardId = getCard(cards)._id
        dispatch(setUtilsAC(cardId))
        navigate(`${PATH.LEARN}/${cardId}`)
    }

    const onClickButtonAddCardHandler = () => {
        setOpenAddCardModal(true)
    }

    const addCard = (postModel: PostCardType) => {
        dispatch(addNewCardsTC(postModel))
    }

    const onClickBackToPacksHandler = () => {
        navigate(PATH.PACKS)
    }

    return (
        <div>
            <div className={style.profileBackToPacks}>
                <ArrowBackIcon color={'primary'}/>
                <span className={style.profileBackToPacksText} onClick={onClickBackToPacksHandler}>Back to Packs List</span>
            </div>
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
                <div>
                    {myID === userID
                        ?
                        <div>
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
                        :
                        <div>
                            <Button variant={"contained"} color={"primary"} onClick={setUtilsHandler}>Learn to pack</Button>
                            <InputWithIcon/>
                        </div>
                    }
                <CardsTable
                    pageCount={pageCount}
                    totalCount={totalCount}
                    currentPage={currentPage}
                    cards={cards}
                />
                </div>
            }
        </div>
    )
}
