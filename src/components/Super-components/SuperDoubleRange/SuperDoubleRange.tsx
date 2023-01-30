import React from 'react'
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";


type RangeSliderPropsType = {
    value: [number, number]
    min: number
    max: number
    onChangeRange: (value: [number, number]) => void
}

export const RangeSlider = (props:RangeSliderPropsType) => {

    const handleChange = (event: Event, newValue: number | number[]) => {
        props.onChangeRange(newValue as [number, number]);
    }

    return (
        <Box sx={{width: 130}}>
            <Slider
                getAriaLabel={() => 'Packs range'}
                value={props.value}
                min={props.min}
                max={props.max}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    )
}


