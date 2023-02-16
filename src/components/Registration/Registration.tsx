import React from 'react'
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Input, InputLabel,
} from '@mui/material'
import {useFormik} from 'formik'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import Visibility from '@mui/icons-material/Visibility'
import {Navigate, NavLink} from 'react-router-dom'
import {registrationTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {validateUtil} from '../../utils/Validate-util/Validate-util'
import styleForms from '../../assets/Styles/Style-forms.module.css'
import {RegistrationType} from '../../api/Auth-api'


interface State {
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    confirmPassword: string
}


export const Registration = () => {
    const status = useAppSelector((state) => state.app.status)
    const isRegistered = useAppSelector((state) => state.auth.isRegistered)

    const dispatch = useAppDispatch()

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
        setValues({...values, showConfirmPassword: !values.showConfirmPassword});
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
        validate: validateUtil,
        onSubmit: (values:RegistrationType) => {
            dispatch(registrationTC(values))
            formik.resetForm()
        },
    })

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <div className={styleForms.block}>
        <div className={styleForms.container}>
            <h2 className={styleForms.title}>Sign Up</h2>
            <form onSubmit={formik.handleSubmit} className={styleForms.form}>
                <FormGroup>
                    <FormControl style={{padding: '0% 5% 5% 5%'}} variant="outlined">
                        <InputLabel style={{paddingLeft: '6px'}}>Email</InputLabel>
                        <Input
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ?
                            <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                    </FormControl>
                    <FormControl style={{padding: '0% 5% 5% 5%'}} variant="outlined">
                        <InputLabel style={{paddingLeft: '6px'}}>Password</InputLabel>
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
                    <FormControl style={{padding: '0% 5% 5% 5%'}} variant="outlined">
                        <InputLabel style={{paddingLeft: '6px'}}>Confirm password</InputLabel>
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
                    <div className={styleForms.buttonBlock}>
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                style={{width: '100%', borderRadius: '90px'}}
                                disabled={status === 'loading'}>
                            Sing Up
                        </Button>
                    </div>
                    <FormLabel>
                        <p className={styleForms.text}>Already have an account?</p>
                        <div className={styleForms.navLinkBlock}>
                            <NavLink className={styleForms.navLink} to={PATH.LOGIN}>Sign In</NavLink>
                        </div>
                    </FormLabel>
                </FormGroup>
            </form>
        </div>
    </div>
}
