import React from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Input, InputLabel,
} from "@mui/material";
import {useFormik} from "formik";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import style from './Registration.module.css'

interface State {
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    confirmPassword: string
}

export const Registration = () => {

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        confirmPassword: ''
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }
    const handleClickShowConfirmPassword = () => {
        setValues({...values, showConfirmPassword: !values.showPassword});
    }

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Should be more symbols'
            } else if (values.confirmPassword !== values.password) {
                errors.confirmPassword = 'The password is not confirmed'
            }
            return errors
        },

        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
        },
    })

    return <div className={style.registrationBlock}>
        <div className={style.container}>
            <div className={style.title}>Sign Up</div>
            <form onSubmit={formik.handleSubmit} className={style.form}>
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
                                        onClick={handleClickShowPassword}
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
                    <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                        <InputLabel>Confirm password</InputLabel>
                        <Input
                            type={values.showConfirmPassword ? "text" : "password"}
                            {...formik.getFieldProps('confirmPassword')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                            <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                    </FormControl>
                    <Button type={'submit'} variant={'contained'} color={'primary'} className={style.button}>Sing Up</Button>
                    <FormLabel>
                        <p className={style.register}>Already have an account?</p>
                        <a className={style.link} href={'/login'} target={'_self'}>Sign In</a>
                    </FormLabel>
                </FormGroup>
            </form>
        </div>
    </div>
}


//types

type FormikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}