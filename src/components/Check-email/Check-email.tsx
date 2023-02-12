import React from 'react'
import style from './Check-email.module.css'
import {Button} from '@mui/material'
import envelope from '../../assets/Icon/envelope.jpg'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import styleForms from '../../assets/Styles/Style-forms.module.css'


export const CheckEmail = () => {
    const recoveryPassword = useAppSelector(store => store.auth.recoveryPassword)

    const navigate = useNavigate()

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <h2 className={styleForms.title}>Check Email</h2>
                <div className={style.icon}>
                    <img src={envelope} alt="envelope" className={style.img}/>
                </div>
                <div className={styleForms.text}>
                    <p>We’ve sent an Email with instructions to </p>
                    <p style={{color: 'red'}}>{recoveryPassword}</p>
                </div>
                <div className={styleForms.buttonBlock}>
                    <Button type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: '320px', borderRadius: '90px'}}
                            onClick={() => {navigate(PATH.LOGIN)}}>
                        Back to login
                    </Button>
                </div>
            </div>
        </div>
    )
}