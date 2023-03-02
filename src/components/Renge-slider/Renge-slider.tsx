import React, {useEffect} from 'react'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import {useAppDispatch, useAppSelector} from 'utils/Hooks'
import {packsActions} from 'redux/Packs-reducer'
import {
    selectAppStatus,
    selectPacksMax,
    selectPacksMaxCardsCount,
    selectPacksMin,
    selectPacksMinCardsCount
} from '../../Store/Selectors'


export const RangeSlider =  () => {
    const minCardsCount = useAppSelector(selectPacksMinCardsCount)
    const maxCardsCount = useAppSelector(selectPacksMaxCardsCount)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)
    const status = useAppSelector(selectAppStatus)

    const [value, setValue] = React.useState<number[]>([min, max])

    const dispatch = useAppDispatch()

    useEffect(() => {
        setValue([min, max])
    },[min,max])

    const minDistance = 1

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
            dispatch(packsActions.setMinMaxSearchCardAC(Math.min(newValue[0], value[1] - minDistance), value[1]))
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
            dispatch(packsActions.setMinMaxSearchCardAC(value[0], Math.max(newValue[1], value[0] + minDistance)))
        }
    }

    const setMinMaxHandler = () => {
        // dispatch(setMinMaxSearchCardAC(value[0], value[1]))
    }

    return (
        <Box sx={{width: 130}}>
            <Slider
                color={'primary'}
                value={value}
                valueLabelDisplay='on'
                disabled={status === 'loading'}
                disableSwap
                min={minCardsCount}
                max={maxCardsCount}
                onChange={handleChange}
                onMouseUp={setMinMaxHandler}
            />
        </Box>
    )
}