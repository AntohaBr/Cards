import React from 'react';
import style from './Check-email.module.css'
import {Button} from '@mui/material';
import envelope from '../../assets/icon/envelope.jpg'
import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";


export const CheckEmail = () => {

    const newPassport = useSelector<RootReducerType, string>(state => state.auth.newPassport)

    const envelopeIcon = {
        backgroundImage: `url(${envelope})`
    }

    if (newPassport) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.newPassword}>
            <div className={style.newPasswordContainer}>
                <h2 className={style.title}>Check Email</h2>
                <div className={style.icon} style={envelopeIcon}></div>
                <div className={style.remember}>
                    <p>We’ve sent an Email with instructions to </p>
                    <p>example@mail.com</p>
                </div>
                <Button type={'submit'} variant={'contained'} color={'primary'}
                        style={{width: "350px", borderRadius: "90px", margin: "25px"}}>
                    Back to login
                </Button>
            </div>

        </div>
    )
}