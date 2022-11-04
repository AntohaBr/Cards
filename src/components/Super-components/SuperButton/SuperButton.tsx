import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import style from './SuperButton.module.css'


export const Button: React.FC<SuperButtonPropsType> = (
    {
        red, className,
        ...restProps
    }
) => {
    const finalClassName = `${red ? style.red : style.default} ${className}`

    return (
        <button
            className={finalClassName}
            {...restProps}
        />
    )
}


export const SuperButton = () => {
    const text = ''
    const showAlert = () => {
        alert(text)
    }
    return (
        <div className={style.column}>
            <hr/>
            <Button>default</Button>
            <Button red onClick={showAlert}>delete</Button>
            <Button disabled>disabled</Button>
        </div>
    )
}


//types
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type SuperButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
}