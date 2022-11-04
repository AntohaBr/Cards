import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent, useState} from 'react'


export const Select: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = [options?.map((o, i) => {
        return <option key={i} value={o}>{o}</option>
    })];
    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}



const arr = ['x', 'y', 'z']

export const SuperSelect = () => {
    const [value, onChangeOption] = useState(arr[1])

    return (
            <div>
                <Select
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>
    )
}

//types
type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}