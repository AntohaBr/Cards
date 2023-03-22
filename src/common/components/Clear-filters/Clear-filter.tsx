import {Button, FilterAltOffIcon} from 'collections-mui'
import {packsActions} from 'reducers/Packs-reducer'
import {useAppDispatch, useAppSelector} from 'utils'
import {selectAppStatus, selectPacksMaxCardsCount} from 'store/Selectors'
import {memo} from 'react'


export const ClearFilters = memo (() => {
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
)