import React, {ChangeEvent, useCallback, useEffect, useState} from 'react'
import Button from '@mui/material/Button'
import {useNavigate, useParams} from 'react-router-dom'
import {CardsTable} from './CardsTable'
import {
    addNewCardsTC,
    getCardsTC,
    searchCardsAC, setCardsPageAC, setCardsPageCountAC,
    setUtilsAC
} from '../../redux/Cards-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {ModalAddNewCard} from '../../common/Modals/Modal-card/Modal-add-new-card'
import {PostCardType} from '../../api/Cards-api'
import {getCard} from '../../features/Smart-random'
import {PATH} from '../../app/Routes/Routes'
import defaultCover from '../../assets/Icon/defaultCover.jpg'
import {Search} from '../../common/Search/Search'
import {CardsMenu} from './Cards-menu/Cards-menu'
import {BackToPackList} from '../../common/Back-to-pack-list/Back-to-pack-list'
import {useDebounce} from '../../utils/Use-debounce'
import {PaginationBar} from '../../common/Pagination-bar/Pagination-bar'


export const Cards = React.memo(() => {
        const page = useAppSelector(state => state.cards.page)
        const pageCount = useAppSelector(state => state.cards.pageCount)
        const cardsTotalCount = useAppSelector(state => state.cards.cardsTotalCount)
        const status = useAppSelector(state => state.app.status)
        const userId = useAppSelector(state => state.profile._id)
        const packUserId = useAppSelector(state => state.cards.packUserId)
        const cards = useAppSelector(state => state.cards.cards)
        const packDeckCover = useAppSelector(state => state.cards.packDeckCover)
        const packName = useAppSelector(state => state.cards.packName)
        const cardQuestion = useAppSelector(state => state.cards.cardQuestion)

        const [openAddCardModal, setOpenAddCardModal] = useState(false)

        const debouncedValue = useDebounce<string>(cardQuestion, 700)

        const navigate = useNavigate()
        const {packId} = useParams<'packId'>()
        const dispatch = useAppDispatch()

        const cardsPaginationPages = Math.ceil(cardsTotalCount / pageCount)

        useEffect(() => {
            dispatch(getCardsTC({cardsPack_id: packId ? packId : '', page, pageCount, cardQuestion}))
        }, [dispatch, packId, page, pageCount, debouncedValue])

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

        const searchValueHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            dispatch(searchCardsAC(e.currentTarget.value))
        }

        const cardsPageCountHandler = useCallback((value: string) => {
            dispatch(setCardsPageCountAC(+value))
        }, [])

        const cardsHandleChangePage = useCallback((page: number) => {
            dispatch(setCardsPageAC(page))
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
                                <Button
                                    variant={'contained'}
                                    color={'primary'}
                                    onClick={setUtilsHandler}
                                    disabled={status === 'loading'}>
                                    Learn to pack
                                </Button>
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
