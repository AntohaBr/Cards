import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel, Input, InputLabel,
} from '@mui/material'
import {Navigate, NavLink} from 'react-router-dom'
import {useFormik} from 'formik'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import {VisibilityOff} from '@mui/icons-material'
import {loginTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {validateUtil} from '../../utils/Validate-util/Validate-util'
import styleForms from '../../assets/Styles/Style-forms.module.css'
import style from './Login.module.css'
import {LoginType} from '../../api/Auth-api'


interface State {
    password: string;
    showPassword: boolean;
}


export const Login = () => {
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const status = useAppSelector((state) => state.app.status)
    const error = useAppSelector(state => state.app.successError)

    const dispatch = useAppDispatch()

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    })

    const handleClickShowConfirmPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        validate: validateUtil,
        onSubmit: (values: LoginType) => {
            dispatch(loginTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <h2 className={styleForms.title}>Sign in</h2>
                <form onSubmit={formik.handleSubmit} className={styleForms.form}>
                    <FormGroup>
                        <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                            <InputLabel style={{paddingLeft: '6px'}}>Email</InputLabel>
                            <Input
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                        </FormControl>
                        <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                            <InputLabel style={{paddingLeft: '6px'}}>Password</InputLabel>
                            <Input
                                type={values.showPassword ? 'text' : 'password'}
                                {...formik.getFieldProps('password')}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                            onClick={handleClickShowConfirmPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                        </FormControl>
                        <FormControlLabel
                            className={style.formControlLabel}
                            label={'Remember me'}
                            control={<Checkbox
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <div className={style.forgotBlock}>
                            <NavLink className={style.textForgot} to={PATH.RECOVERY_PASSWORD}>Forgot Password?</NavLink>
                        </div>
                        <div className={styleForms.buttonBlock}>
                            <Button type={'submit'} variant={'contained'} color={'primary'}
                                    style={{width: '100%', borderRadius: '90px'}}
                                    disabled={status === 'loading'}>
                                Sing In
                            </Button>
                        </div>
                        <FormLabel>
                            {error === '' ? '' : <div style={{
                                color: 'red',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>{error}</div>}
                            <p className={styleForms.text}>Already have an account?</p>
                            <div className={styleForms.navLinkBlock}>
                                <NavLink className={styleForms.navLink} to={PATH.REGISTRATION}>Sign up</NavLink>
                            </div>
                        </FormLabel>
                    </FormGroup>
                </form>
            </div>
        </div>
    )
}
