import {Button, FilterAltOffIcon} from 'collections'
import {packsActions} from 'reducers/Packs-reducer'
import {useAppDispatch, useAppSelector} from 'utils'
import {selectAppStatus, selectPacksMaxCardsCount} from 'store/Selectors'


export const ClearFilters = () => {
    const maxCardsCount = useAppSelector(selectPacksMaxCardsCount)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const resetFilterHandler = () => {
        dispatch(packsActions.clearFilters())
        dispatch(packsActions.setMinMaxSearchCard(0, maxCardsCount))
    }

    return (
        <Button color={'inherit'}
                onClick={resetFilterHandler}
                disabled={status === 'loading'}>
            <FilterAltOffIcon/>
        </Button>
    )
}