import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import style from './SuperInputText.module.css'


export const InputText: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange
        && onChange(e)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter
        && e.key === 'Enter'
        && onEnter()
    }

    const finalSpanClassName = `${style.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${style.input} ${error ? style.errorInput : style.superInput} ${className}`

    return (
        <>
            <input
                type={'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps}
            />
            <span className={finalSpanClassName}>{error}</span>
        </>
    )
}



export const SuperInputText = () => {
    const [text, setText] = useState<string>('')
    const error = text ? '' : 'error'

    const showAlert = () => {
        if (error) {
            alert('введите текст...')
        } else {
            alert(text)
        }
    }

    return (
        <div>
            <hr/>
                <InputText
                    value={text}
                    onChangeText={setText}
                    onEnter={showAlert}
                    error={error}
                />
        </div>
    )
}



//types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type SuperInputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
}