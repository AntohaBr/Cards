import React from 'react'
import {useFormik} from 'formik'
import {Button, FormControl, Input, InputLabel} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {useNavigate, useParams} from 'react-router-dom'
import {setNewPasswordTC} from '../../redux/Auth-reducer'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import styleForms from '../../assets/Styles/Style-forms.module.css'
import {validateUtil} from '../../utils/Validate-util/Validate-util'
import {NewPasswordType} from '../../api/Auth-api'


interface State {
    password: string;
    showPassword: boolean
}


export const NewPassword = () => {
    const status = useAppSelector((state) => state.app.status)

    const {token} = useParams<{token: string}>()
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
            password: '' ,
            resetPasswordToken: ''
        },
        validate:validateUtil,
        onSubmit: (values: NewPasswordType) => {
            dispatch(setNewPasswordTC(values.password, token || ''))
            navigate(PATH.LOGIN)
        },
    })

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <h2 className={styleForms.title}>Create new password</h2>
                <form onSubmit={formik.handleSubmit} className={styleForms.form}>
                    <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                        <InputLabel style={{paddingLeft: '6px'}}>Password</InputLabel>
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
                    <div className={styleForms.text}>Create new password and we will
                        send you further instructions to email
                    </div>
                    <div className={styleForms.buttonBlock}>
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                style={{width: '100%', borderRadius: '90px'}}
                                disabled={status === 'loading'}>
                            Create new password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
