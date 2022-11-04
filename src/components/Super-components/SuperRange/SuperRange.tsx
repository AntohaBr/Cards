import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'
import style from './SuperRange.module.css'


export const Range: React.FC<SuperRangePropsType> = (
    {
        type,
        onChange, onChangeRange,
        className,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)

        onChangeRange && onChangeRange(+e.currentTarget.value)
    }

    const finalRangeClassName = `${style.range} ${className ? className : ''}`

    return (
        <>
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}
                {...restProps}
            />
        </>
    )
}


export const SuperRange = () => {
    const [value1, setValue1] = useState<number>(0)
    const [value2, setValue2] = useState<number>(100)

    return (
        <div className={style.wrapper}>
            <hr/>

            <div >
                <div className={style.values}>
                    <span>{value1}</span>-
                    <span>{value2}</span>
                </div>

                <Range
                    value={value1}
                    onChangeRange={(value) => setValue1(value)}
                />
            </div>
        </div>
    )
}



//types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperRangePropsType = DefaultInputPropsType & {
    onChangeRange?: (value: number) => void
}