import {packsActions} from 'reducers/Packs-reducer'
import {saveState, useAppDispatch, useAppSelector} from 'utils'
import {Button} from 'collections'
import {selectAppStatus, selectPacksStatusPackCards} from 'store/Selectors'
import styleForms from 'common/Styles/Forms.module.css'


export const MyAllPanel = () => {
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const allPackCardsHandler = () => {
        dispatch(packsActions.setTypePackCards('all'))
        saveState('all')
    }

    const myPackCardsHandler = () => {
        dispatch(packsActions.setTypePackCards('my'))
        saveState('my')
    }

    return (
        <div>
            <div className={styleForms.filterTitle}>Show packs cards</div>
            <Button
                style={{width: '30%'}}
                variant={statusPackCards === 'my' ? 'contained' : 'outlined'}
                disabled={statusPackCards === 'my' || status === 'loading'}
                onClick={myPackCardsHandler}>
                My
            </Button>
            <Button
                style={{width: '30%'}}
                variant={statusPackCards === 'all' ? 'contained' : 'outlined'}
                disabled={statusPackCards === 'all' || status === 'loading'}
                onClick={allPackCardsHandler}>
                All
            </Button>
        </div>

    )
}