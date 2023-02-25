import React from 'react'
import error404 from '../../assets/Icon/error404.png'
import style from './Error-404.module.css'


export const Error404 = () =>{
    return (
        <div className={style.error404}>
            <h1 className={style.title}>404: PAGE NOT FOUND</h1>
            <img src={error404} alt={'Page not found'}/>
        </div>
    )
}