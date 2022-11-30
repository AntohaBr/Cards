import React from 'react';
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, FormLabel,
    Input, InputLabel,
} from "@mui/material";
import {Navigate} from "react-router-dom";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {URL} from "../../app/App";
import {loginTC} from "../../redux/Auth-reducer";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import style from './Login.module.css'


interface State {
    password: string;
    showPassword: boolean;
}

export const Login = () => {

    const dispatch = useDispatch<ThunkDispatchType>()
    const isLoggedIn = useSelector<RootReducerType, boolean>((state) => state.auth.isLoggedIn)
    const error = useSelector<RootReducerType, null | string>(state => state.app.successError)
    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
    })

    const handleClickShowConfirmPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false
        },
        onSubmit(values) {
            dispatch(loginTC(values))
            console.log(error)
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 8) {
                errors.password = "invalid password"
            }
            return errors
        },
    })

    if (isLoggedIn) {
        return <Navigate to={URL.PROFILE}/>
    }

    return <div className={style.loginBlock}>
        <div className={style.loginContainer}>
            <h2 className={style.loginTitle}>Sign in</h2>
            <form onSubmit={formik.handleSubmit} className={style.loginForm}>
                <FormGroup>
                    <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                        <InputLabel>Email</InputLabel>
                        <Input
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </FormControl>
                    <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <Input
                            type={values.showPassword ? "text" : "password"}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position="end">
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
                        label={'Remember me'}
                        control={<Checkbox
                            {...formik.getFieldProps("rememberMe")}
                            checked={formik.values.rememberMe}
                        />}
                    />
                    <div className={style.forgotBlock}>
                        <a className={style.textForgot} href={URL.RECOVERY_PASSWORD} target={'_self'}>Forgot
                            Password?</a>
                    </div>
                    <Button type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: "350px", borderRadius: "90px", margin: "25px"}} disabled={isDisable}>
                        Sing Up
                    </Button>
                    <FormLabel>
                        <p className={style.loginRegister}>Already have an account?</p>
                        <a className={style.loginLink} href={URL.REGISTRATION} target={'_self'}>Sign up</a>
                    </FormLabel>
                </FormGroup>
            </form>
        </div>
    </div>
}


//types
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}