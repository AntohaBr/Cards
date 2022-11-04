import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps, useState} from 'react'


export const Radio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: any[] = options ? options.map((o, i) => (
        <label key={name + '-' + i}>
            <input
                type={'radio'}
                name={name}
                checked={value === o}
                value={o}
                onChange={onChangeCallback} {...restProps}
            />
            {o}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}



const arr = ['x', 'y', 'z']

export const SuperRadio = () => {
    const [value, onChangeOption] = useState(arr[1])

    return (
            <div>
                <hr/>
                <Radio
                    name={'radio'}
                    options={arr}
                    value={value}
                    onChangeOption={onChangeOption}
                />
            </div>

    )
}



//types
type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}