import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from 'react'
import style from './SuperCheckbox.module.css'


export const Checkbox: React.FC<SuperCheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
    }

    const finalInputClassName = `${style.checkbox} ${className ? className : ''}`

    return (
        <label>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
            {children && <span className={style.spanClassName}>{children}</span>}
        </label>
    )
}


export const SuperCheckbox = () => {

    const [checked, setChecked] = useState<boolean>(false)
    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div>
            <hr/>
            <Checkbox
                checked={checked}
                onChangeChecked={setChecked}
            >
                some text
            </Checkbox>
            <Checkbox checked={checked} onChange={testOnChange}/>
        </div>
    )
}


//types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}