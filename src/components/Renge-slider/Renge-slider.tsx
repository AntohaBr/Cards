import React, {useEffect, useState} from 'react'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {setMinMaxSearchCardAC} from '../../redux/Packs-reducer'



export const RangeSlider =  () => {
    const min = useAppSelector(state => state.packs.params.min)
    const max = useAppSelector(state => state.packs.params.max)
    const minCardsCount = useAppSelector(state => state.packs.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packs.maxCardsCount)
    const status = useAppSelector(state => state.app.status)

    const [value, setValue] = React.useState<number[]>([min, max])

    useEffect(() => {
        setValue([min, max])
    },[min,max])

    const minDistance = 1

    const dispatch = useAppDispatch()

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
        }
    }

    const setMinMaxHandler = () => {
        dispatch(setMinMaxSearchCardAC(value[0], value[1]))
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