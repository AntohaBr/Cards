import React from 'react'
import {useFormik} from 'formik'
import {Button, FormControl, Input, InputLabel} from '@mui/material'
import style from './New-password.module.css'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {useNavigate, useParams} from 'react-router-dom'
import {setNewPasswordTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'


interface State {
    password: string;
    showPassword: boolean
}

export const NewPassword = () => {
    const isDisable = useAppSelector(state => state.app.isDisabled)

    const {token} = useParams<{ token: string }>()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false
    })

    const handleClickShowNewPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'Password must contain at least 8 characters'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setNewPasswordTC(values.password, token || ''))
            navigate(PATH.LOGIN)
        },
    })

    return (
        <div className={style.newPasswordBlock}>
            <div className={style.newPasswordContainer}>
                <h2 className={style.title}>Create new password</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <FormControl sx={{m: 2, width: '40ch'}} variant='outlined'>
                        <InputLabel>Password</InputLabel>
                        <Input
                            type={values.showPassword ? 'text' : 'password'}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowNewPassword}
                                        onMouseDown={handleMouseDownNewPassword}
                                    >
                                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password && formik.errors.password ?
                            <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                    </FormControl>
                    <div className={style.infoText}>Create new password and we will
                        send you further instructions to email
                    </div>
                    <Button type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: '350px', borderRadius: '90px', margin: '25px'}} disabled={isDisable}>
                        Create new password
                    </Button>
                </form>
            </div>
        </div>
    )
}


//types
export type FormikErrorType = {
    password?: string,
}