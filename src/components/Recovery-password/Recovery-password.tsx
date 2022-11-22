import React from 'react';
import style from './Recovery-password.module.css'
import {Button, FormControl, FormLabel, Input, InputLabel} from "@mui/material";
import {useFormik} from "formik";
import {FormikErrorType} from "../Registration/Registration";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {Navigate} from "react-router-dom";
import {URL} from "../../app/App";
import {recoveryPasswordTC} from "../../redux/Autch-reducer";


export const RecoveryPassword = () => {

    const recoveryPassword = useSelector<RootReducerType, string>((state)=> state.auth.recoveryPassword)
    const dispatch = useDispatch<ThunkDispatchType>()
    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(recoveryPasswordTC(values.email))
        },
    })

    if (recoveryPassword) {
        return <Navigate to={URL.CHECK_EMAIL}/>
    }

    return (
        <div className={style.recoveryPasswordBlock}>
            <div className={style.recoveryPasswordContainer}>
                <h2 className={style.title}>Forgot your password?</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <Input
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </FormControl>
                    <FormLabel>
                        <p className={style.infoText}>Enter your email address and we will send
                            you further instructions </p>
                    </FormLabel>
                    <Button type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: "350px", borderRadius: "90px", margin: "25px"}} disabled={isDisable} >
                        Send Instructions
                    </Button>
                    <FormLabel>
                        <p className={style.remember}>Did you remember your password?</p>
                        <a className={style.link} href={'/Login'} target={'_self'}>Try logging in</a>
                    </FormLabel>
                </form>
            </div>
        </div>
    )
}

