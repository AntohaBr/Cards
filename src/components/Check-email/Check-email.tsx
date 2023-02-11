import React from 'react';
import style from './Check-email.module.css'
import {Button} from '@mui/material';
import envelope from '../../assets/Icon/envelope.jpg'
import {useNavigate} from 'react-router-dom';
import {useAppSelector} from "../../utils/Hooks";
import {PATH} from "../../app/Routes/Routes";


export const CheckEmail = () => {

    const isDisable = useAppSelector(state => state.app.isDisabled)
    const navigate = useNavigate()

    const envelopeIcon = {
        backgroundImage: `url(${envelope})`
    }

    const onClickBackToLoginHandler = () =>{
        navigate(PATH.LOGIN)
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
                        style={{width: '350px', borderRadius: '90px', margin: '25px'}} disabled={isDisable}
                        onClick={onClickBackToLoginHandler}>Back to login
                </Button>
            </div>

        </div>
    )
}