import React, {DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";


export const DoubleRange: React.FC<SuperDoubleRangePropsType> = (
    {
        onChangeRange,
        commonValue,
        ...restProps
    }
) => {
    const handleChange = (event: Event, newValue: number | number[]) => {
        onChangeRange(newValue as number[]);
    };
    return (
        <Box sx={{width: 110}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={commonValue}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </Box>
    );
}


export const SuperDoubleRange = () => {
    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(100)

    const onChangeRangeHandler = ([value1, value2]: [number, number] | number[]) => {
        setValue1(value1)
        setValue2(value2)
    }

    return (
        <div>
            <hr/>
                <div>
                    <span>{value1}</span>-
                    <span>{value2}</span>
                </div>
                <DoubleRange
                    commonValue={[value1, value2]}
                    onChangeRange={onChangeRangeHandler}
                />
            <hr/>
        </div>
    )
}



//types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperDoubleRangePropsType = DefaultInputPropsType & {
    onChangeRange: (value: [number, number] | number[]) => void
    commonValue?: [number, number]
}