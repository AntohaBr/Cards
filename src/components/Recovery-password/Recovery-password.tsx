import React from 'react'
import style from './Recovery-password.module.css'
import {Button, FormControl, FormLabel, Input, InputLabel} from '@mui/material'
import {useFormik} from 'formik'
import {Navigate, useNavigate} from 'react-router-dom'
import {recoveryPasswordTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {validateUtil} from '../../utils/Validate-util/Validate-util'


export const RecoveryPassword = () => {
    const recoveryPassword = useAppSelector((state)=> state.auth.recoveryPassword)
    const isDisable = useAppSelector(state => state.app.isDisabled)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onClickBackToLoginHandler = () => {
        navigate(PATH.LOGIN)
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            confirmPassword: ''
        },
        validate: validateUtil,
        onSubmit: values => {
            dispatch(recoveryPasswordTC(values.email))
        },
    })

    if (recoveryPassword) {
        return <Navigate to={PATH.CHECK_EMAIL}/>
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
                        <a className={style.link} onClick={onClickBackToLoginHandler}>Try logging in</a>
                    </FormLabel>
                </form>
            </div>
        </div>
    )
}

