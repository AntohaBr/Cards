import React from 'react'
import {Button, FormControl, FormLabel, Input, InputLabel} from '@mui/material'
import {useFormik} from 'formik'
import {Navigate, NavLink, useNavigate} from 'react-router-dom'
import {recoveryPasswordTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {validateUtil} from '../../utils/Validate-util/Validate-util'
import style from '../../assets/Styles/Style-forms.module.css'


export const RecoveryPassword = () => {
    const recoveryPassword = useAppSelector((state)=> state.auth.recoveryPassword)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const status = useAppSelector((state) => state.app.status)

    const dispatch = useAppDispatch()

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

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE} />
    }

    return (
        <div className={style.block}>
            <div className={style.container}>
                <h2 className={style.title}>Forgot your password?</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <FormControl sx={{padding: '0% 5% 5% 5%'}} variant="outlined">
                        <InputLabel style={{paddingLeft:'6px'}}>Email</InputLabel>
                        <Input
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </FormControl>
                    <FormLabel>
                        <p className={style.text}>Enter your email address and we will send
                            you further instructions </p>
                    </FormLabel>
                    <div className={style.buttonBlock}>
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                style={{width: '100%', borderRadius: '90px'}}
                                disabled={status === 'loading'}>
                            Send Instructions
                        </Button>
                    </div>
                    <FormLabel>
                        <p className={style.text}>Did you remember your password?</p>
                        <div className={style.navLinkBlock}>
                            <NavLink className={style.navLink} to={PATH.LOGIN} >Try logging in</NavLink>
                        </div>
                    </FormLabel>
                </form>
            </div>
        </div>
    )
}

