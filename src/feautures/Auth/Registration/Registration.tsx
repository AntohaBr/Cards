import {useState, MouseEvent} from 'react'
import {FormControl, FormGroup, FormLabel, Input, InputLabel, InputAdornment, IconButton, Visibility,
    VisibilityOff} from 'collections'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import {registration} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import styleForms from 'common/Styles/Forms.module.css'
import {RegistrationType} from 'api/Auth-api'
import {selectAuthIsRegistered} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import {ButtonMui} from 'components'


interface State {
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    confirmPassword: string
}


export const Registration = () => {
    const isRegistered = useAppSelector(selectAuthIsRegistered)

    const dispatch = useAppDispatch()

    const [values, setValues] = useState<State>({
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
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: validate,
        onSubmit: (values: RegistrationType) => {
            dispatch(registration(values))
            formik.resetForm()
        },
    })

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <div className={styleForms.form}>
                    <h2 className={styleForms.title}>Sign Up</h2>
                    <form onSubmit={formik.handleSubmit}>
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
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Confirm password</InputLabel>
                                <Input
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    {...formik.getFieldProps('confirmPassword')}
                                    endAdornment={
                                        <InputAdornment position='end'>
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
                            <ButtonMui buttonTitle={'Sing Up'}/>
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
        </div>
    )
}
