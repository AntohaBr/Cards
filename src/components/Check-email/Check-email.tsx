import React from 'react';
import style from './Check-email.module.css'
import {Button} from '@mui/material';
import envelope from '../../assets/icon/envelope.jpg'
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../redux/Store';
import {URL} from '../../app/App';


export const CheckEmail = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    // const envelopeIcon = {
    //     backgroundImage: `url(${envelope})`
    // }

    const onClickHandler = () =>{
        (<Navigate to={URL.LOGIN}/>)
    }

    return (
        <div className={style.newPassword}>
            <div className={style.newPasswordContainer}>
                <h2 className={style.title}>Check Email</h2>
                {/*<div className={style.icon} style={envelopeIcon}></div>*/}
                <div className={style.remember}>
                    <p>We’ve sent an Email with instructions to </p>
                    <p>example@mail.com</p>
                </div>
                <Button type={'submit'} variant={'contained'} color={'primary'}
                        style={{width: '350px', borderRadius: '90px', margin: '25px'}} disabled={isDisable} onClick={onClickHandler}>
                    Back to login
                </Button>
            </div>

        </div>
    )
}