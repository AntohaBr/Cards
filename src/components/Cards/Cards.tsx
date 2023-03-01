import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {CardsTable} from './CardsTable'
import {useAppDispatch, useAppSelector, getCard, useDebounce} from 'utils'
import {PostCardType} from '../../api/Cards-api'
import {PATH} from '../../app/Routes/Routes'
import defaultCover from '../../assets/Icon/defaultCover.jpg'
import {Search, BackToPackList, PaginationBar, ModalAddNewCard} from 'common'
import {CardsMenu} from './Cards-menu/Cards-menu'
import {addNewCards, cardsActions, setCards} from '../../redux/Cards-reducer'
import {
    selectAppStatus,
    selectCards,
    selectCardsCardQuestion,
    selectCardsPackDeckCover,
    selectCardsPackName,
    selectCardsPackUserId,
    selectCardsPage,
    selectCardsPageCount,
    selectCardsTotalCount,
    selectProfileMyID
} from '../../redux/Selectors'



export const Cards = React.memo(() => {
        const page = useAppSelector(selectCardsPage)
        const pageCount = useAppSelector(selectCardsPageCount)
        const cardsTotalCount = useAppSelector(selectCardsTotalCount)
        const status = useAppSelector(selectAppStatus)
        const userId = useAppSelector(selectProfileMyID)
        const packUserId = useAppSelector(selectCardsPackUserId)
        const cards = useAppSelector(selectCards)
        const packDeckCover = useAppSelector(selectCardsPackDeckCover)
        const packName = useAppSelector(selectCardsPackName)
        const cardQuestion = useAppSelector(selectCardsCardQuestion)

        const [openAddCardModal, setOpenAddCardModal] = useState(false)

        const debouncedValue = useDebounce<string>(cardQuestion, 700)

        const navigate = useNavigate()
        const {packId} = useParams<'packId'>()
        const dispatch = useAppDispatch()

        const cardsPaginationPages = Math.ceil(cardsTotalCount / pageCount)

        useEffect(() => {
            dispatch(setCards({cardsPack_id: packId ? packId : '', page, pageCount, cardQuestion}))
        }, [dispatch, packId, page, pageCount, debouncedValue])

        const setUtilsHandler = () => {
            const cardId = getCard(cards)._id
            navigate(`${PATH.LEARN}/${cardId}`)
        }

        const onClickButtonAddCardHandler = () => {
            setOpenAddCardModal(true)
        }

        const addCard = (postModel: PostCardType) => {
            dispatch(addNewCards(postModel))
        }

        const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            dispatch(cardsActions.searchCards(e.currentTarget.value))
        }

        const cardsPageCountHandler = useCallback((value: string) => {
            dispatch(cardsActions.setCardsPageCount(+value))
        }, [])

        const cardsHandleChangePage = useCallback((page: number) => {
            dispatch(cardsActions.setCardsPage(page))
        }, [])

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
                        alt='img'
                    />
                </div>
                <div>
                    <Search
                        onChange={searchValueHandler}
                        valueSearch={cardQuestion}
                    />
                </div>
                {cards.length === 0
                    ?
                    <div>
                        {userId === packUserId
                            ?
                            <div>
                                <div>
                                    {!!cardQuestion
                                        ? <h4 style={{fontSize: '18px', marginTop: '50px', color: 'red'}}>
                                            Sorry, there are no such cards</h4>
                                        : 'This pack is empty. Click add new card to fill this pack'}
                                </div>
                                <Button onClick={onClickButtonAddCardHandler} type={'submit'} variant={'contained'}
                                        color={'primary'}
                                        style={{width: '350px', borderRadius: '90px', margin: '25px'}}
                                        disabled={status === 'loading'}>
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
                        {userId === packUserId
                            ?
                            <div>
                                <Button onClick={onClickButtonAddCardHandler} type={'submit'} variant={'contained'}
                                        color={'primary'}
                                        style={{width: '350px', borderRadius: '90px', margin: '25px'}}
                                        disabled={status === 'loading'}>
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
                                <Button variant={'contained'} color={'primary'}
                                        onClick={setUtilsHandler}
                                        disabled={status === 'loading'}>
                                    Learn to pack
                                </Button>
                            </div>
                        }
                        <CardsTable/>
                        <div>
                            <PaginationBar
                                paginationPages={cardsPaginationPages}
                                pageCount={pageCount}
                                page={page}
                                pageCountHandler={cardsPageCountHandler}
                                handleChangePage={cardsHandleChangePage}
                            />
                        </div>
                    </div>
                }
            </div>
        )
    }
)
