import React from 'react'
import Slider, {SliderProps} from '@mui/material/Slider'
import Box from '@mui/material/Box'
import {useAppSelector} from '../../utils/Hooks'


export const RangeSlider: React.FC<SliderProps> =  React.memo(({...restProps}) => {
    const status = useAppSelector(state => state.app.status)

    return (
        <Box sx={{width: 130}}>
            <Slider
                color={'primary'}
                valueLabelDisplay='on'
                disabled={status === 'loading'}
                {...restProps}
            />
        </Box>
    )
})