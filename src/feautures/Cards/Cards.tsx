import {memo, useCallback, useEffect} from 'react'
import {Button} from 'collections-mui'
import {useNavigate, useParams} from 'react-router-dom'
import {CardsTable} from './Cards-table/Cards-table'
import {useAppDispatch, useAppSelector, getCard} from 'utils'
import {PostCardType} from 'api/Packs-cards-api'
import defaultCover from 'assets/Icon/default-cover.jpg'
import {Search, BackToPackList, PaginationBar, ButtonAddCard, CardsMenu} from 'common'
import {addNewCards, cardsActions, getCards} from 'reducers/Cards-reducer'
import {
    selectAppStatus,
    selectCards,
    selectCardsCardQuestion,
    selectCardsPackDeckCover,
    selectCardsPackName,
    selectCardsPackUserId,
    selectCardsPage,
    selectCardsPageCount,
    selectCardsTotalCount, selectProfileUser_id,
} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import t from 'common/Styles/Table.module.css'
import s from './Cards.module.css'


export const Cards = memo(() => {
        const page = useAppSelector(selectCardsPage)
        const pageCount = useAppSelector(selectCardsPageCount)
        const cardsTotalCount = useAppSelector(selectCardsTotalCount)
        const status = useAppSelector(selectAppStatus)
        const user_id = useAppSelector(selectProfileUser_id)
        const cardsPackUserId = useAppSelector(selectCardsPackUserId)
        const cards = useAppSelector(selectCards)
        const packDeckCover = useAppSelector(selectCardsPackDeckCover)
        const packName = useAppSelector(selectCardsPackName)
        const cardQuestion = useAppSelector(selectCardsCardQuestion)


        const navigate = useNavigate()
        const {packId} = useParams<'packId'>()
        const dispatch = useAppDispatch()

        const isMyPack = user_id === cardsPackUserId
        const extraText = isMyPack ? ' Click add new card to fill this pack.' : ''
        const textForEmptyPack = `This pack is empty.${extraText}`

        const cardsPaginationPages = Math.ceil(cardsTotalCount / pageCount)

        useEffect(() => {
            dispatch(getCards({cardsPack_id: packId ? packId : '', page, pageCount, cardQuestion}))
        }, [dispatch, packId, page, pageCount, cardQuestion])

        const setUtilsHandler = () => {
            const cardId = getCard(cards)._id
            navigate(`${PATH.LEARN}/${cardId}`)
        }

        const addCard = (postModel: PostCardType) => {
            dispatch(addNewCards(postModel))
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
                    <div className={t.backToPackList}>
                        <BackToPackList/>
                        {isMyPack && cards.length !== 0 && <ButtonAddCard addItem={addCard}/>}
                    </div>
                    <div className={t.titlePack}>Pack name: '{packName}'</div>
                    <div className={t.packDeckCover}>
                        <img
                            style={{width: '130px', height: '130px'}}
                            src={packDeckCover ? packDeckCover : defaultCover}
                            alt='img'
                        />
                        {isMyPack && <CardsMenu/>}
                    </div>
                    <>
                        <div className={s.filterContainer}>
                            <>
                                {(!!cardsTotalCount || cardQuestion) && <Search valueSearch={cardQuestion}/>}
                                {!!cards.length &&
                                    <Button variant={'contained'} color={'primary'}
                                            style={{width: '200px', borderRadius: '90px'}}
                                            onClick={setUtilsHandler}>
                                        Learn to pack
                                    </Button>
                                }
                            </>
                        </div>
                        <CardsTable/>
                        <div className={s.info}>
                            <div className={t.infoText}>
                                {/*{cardQuestion  &&  'Sorry, there are no such cards.'}*/}
                                {!cardsTotalCount && textForEmptyPack}
                            </div>
                            {isMyPack && !cards.length && <ButtonAddCard addItem={addCard}/>}
                        </div>
                        {!!cards.length &&
                            <PaginationBar
                                paginationPages={cardsPaginationPages}
                                pageCount={pageCount}
                                page={page}
                                pageCountHandler={cardsPageCountHandler}
                                handleChangePage={cardsHandleChangePage}/>
                        }
                    </>

                </div>
            </div>
        )
    }
)
