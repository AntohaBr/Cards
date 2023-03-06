import {ChangeEvent, memo, useCallback, useEffect} from 'react'
import {Button} from 'collections-mui'
import {useNavigate, useParams} from 'react-router-dom'
import {CardsTable} from './Cards-table/Cards-table'
import {useAppDispatch, useAppSelector, getCard, useDebounce} from 'utils'
import {PostCardType} from 'api/Packs-cards-api'
import defaultCover from 'assets/Icon/default-cover.jpg'
import {Search, BackToPackList, PaginationBar, ButtonAddCard, CardsMenu} from 'common'
import {addNewCards, cardsActions, setCards} from 'reducers/Cards-reducer'
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
} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import t from 'common/Styles/Table.module.css'
import s from './Cards.module.css'


export const Cards = memo(() => {
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
            <div className={t.tableBlock}>
                <div className={t.container}>
                    <BackToPackList/>
                    <div>
                        {packName}
                        <CardsMenu/>
                    </div>
                    <img
                        style={{width: '130px', height: '130px'}}
                        src={packDeckCover ? packDeckCover : defaultCover}
                        alt='img'
                    />
                    <div className={s.filterContainer}>
                        {cards.length >= 1 &&
                            <>
                                {userId === packUserId
                                    ?
                                    <>
                                        <Search
                                            onChange={searchValueHandler}
                                            valueSearch={cardQuestion}
                                        />
                                        <ButtonAddCard addItem={addCard}/>
                                    </>
                                    :
                                    <Button variant={'contained'} color={'primary'}
                                            onClick={setUtilsHandler}
                                            disabled={status === 'loading'}>
                                        Learn to pack
                                    </Button>
                                }
                            </>
                        }
                    </div>

                    {cards.length === 0
                        ?
                        <div className={s.div}>
                            {userId === packUserId
                                ?
                                <>
                                    <div className={s.info}>
                                        {!!cardQuestion
                                            ? <h4 style={{fontSize: '18px', marginTop: '50px', color: 'red'}}>
                                                Sorry, there are no such cards</h4>
                                            : 'This pack is empty. Click add new card to fill this pack'}
                                    </div>
                                    <ButtonAddCard addItem={addCard}/>
                                </>
                                : <div className={s.info}>This pack is empty.</div>
                            }
                        </div>
                        :
                        <>
                            <CardsTable/>
                            <PaginationBar
                                paginationPages={cardsPaginationPages}
                                pageCount={pageCount}
                                page={page}
                                pageCountHandler={cardsPageCountHandler}
                                handleChangePage={cardsHandleChangePage}
                            />
                        </>
                    }
                </div>
            </div>
        )
    }
)
