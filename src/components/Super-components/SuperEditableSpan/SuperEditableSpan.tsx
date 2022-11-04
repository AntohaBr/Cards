import React, {DetailedHTMLProps, InputHTMLAttributes, HTMLAttributes, useState} from 'react'
import style from './superEditableSpan.module.css'
import {InputText} from "../SuperInputText/SuperInputText";


const EditableSpan: React.FC<SuperEditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false)

        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)

        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${style.spanClassName} ${className}`

    return (
        <>
            {editMode
                ? (
                    <InputText
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}

                        {...restProps}
                    />
                ) : (
                    <span
                        onDoubleClick={onDoubleClickCallBack}
                        className={spanClassName}
                        {...restSpanProps}
                    >
                        {children || restProps.value}
                    </span>
                )
            }
        </>
    )
}


export const SuperEditableSpan = () => {
    const [value, setValue] = useState<string>('')

    return (
        <div>
            <hr/>
                <EditableSpan
                    value={value}
                    onChangeText={setValue}
                    spanProps={{children: value ? undefined : 'enter text...'}}
                />
            <hr/>
        </div>
    )
}


//types
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
type SuperEditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    spanProps?: DefaultSpanPropsType
}