import React from 'react'
import Slider, {SliderProps} from '@mui/material/Slider'
import Box from '@mui/material/Box'


export const RangeSlider: React.FC<SliderProps> =  React.memo(({...restProps}) => {
    return (
        <Box sx={{width: 130}}>
            <Slider
                color={'primary'}
                valueLabelDisplay='on'
                disableSwap
                {...restProps}
            />
        </Box>
    )
})