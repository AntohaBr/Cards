import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useNavigate, useParams} from 'react-router-dom';
import {CardsTable} from "./CardsTable";
import {addNewCardsTC, getCardsTC, setUtilsAC} from "../../redux/Cards-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";
import {ModalAddNewCard} from "../../common/Modals/Modal-card/Modal-add-new-card";
import {PostCardType} from "../../api/cards-api";
import {getCard} from "../../features/smart-random";
import {PATH} from "../../app/Routes/Routes";
import defaultCover from "../../assets/icon/defaultCover.jpg";
import {Search} from "../../common/Search/Search";
import {CardsMenu} from "./Cards-menu/Cards-menu";
import {BackToPackList} from "../../common/Back-to-pack-list/Back-to-pack-list";


export const Cards = () => {
    const pageCount = useAppSelector(state => state.pagination.cardsPageCount)
    const currentPage = useAppSelector(state => state.pagination.cardsCurrentPage)
    const totalCount = useAppSelector(state => state.pagination.allCards)
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const myID = useAppSelector(state => state.profile._id)
    const userID = useAppSelector(state => state.cards.packUserId)
    const cards = useAppSelector(state => state.cards.cards)
    const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
    const packName = useAppSelector(state => state.cards.packName)
    const [question, setQuestion] = useState<string>('')
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

    const searchValueHandler = (questionValue: string) => {
        setQuestion(questionValue)
    }

    return (
        <div>
            <BackToPackList/>
            <div>
                {packName}
                <CardsMenu/>
            </div>
            <div>
                <img
                    style={{width: '130px', height: '130px'}}
                    src={packDeckCover ? packDeckCover : defaultCover}
                    alt="img"
                />

            </div>
            <div>
                {cards.length >= 1 && <Search
                    onChange={searchValueHandler}
                    searchValue={question}
                />}
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
                                    style={{width: "350px", borderRadius: "90px", margin: "25px"}}
                                    disabled={isDisable}>
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
                                    style={{width: "350px", borderRadius: "90px", margin: "25px"}}
                                    disabled={isDisable}>
                                Add New Card
                            </Button>
                            <ModalAddNewCard
                                title='Add new card'
                                open={openAddCardModal}
                                toggleOpenMode={setOpenAddCardModal}
                                addItem={addCard}
                            />
                            <Button variant={"contained"} color={"primary"} onClick={setUtilsHandler}>Learn to
                                pack</Button>
                        </div>
                        :
                        <div>
                            <Button variant={"contained"} color={"primary"} onClick={setUtilsHandler}>Learn to
                                pack</Button>
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
