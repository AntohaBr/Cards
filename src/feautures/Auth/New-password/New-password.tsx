import {useState, MouseEvent} from 'react'
import {useFormik} from 'formik'
import {Button, FormControl, FormGroup, Input, InputLabel, InputAdornment, IconButton, Visibility, VisibilityOff}
    from 'collections'
import {useNavigate, useParams} from 'react-router-dom'
import {setNewPassword} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import styleForms from 'common/Styles/Forms.module.css'
import {NewPasswordType} from 'api/Auth-api'
import {selectAppStatus} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'


interface State {
    password: string;
    showPassword: boolean
}


export const NewPassword = () => {
    const status = useAppSelector(selectAppStatus)

    const {token} = useParams<{ token: string }>()

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    const handleClickShowNewPassword = () => {
        setValues({...values, showPassword: !values.showPassword})
    }

    const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const formik = useFormik({
        initialValues: {
            password: '',
            resetPasswordToken: ''
        },
        validate: validate,
        onSubmit: (values: NewPasswordType) => {
            dispatch(setNewPassword(values.password, token || ''))
            navigate(PATH.LOGIN)
        },
    })

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <div className={styleForms.form}>
                    <h2 className={styleForms.title}>Create new password</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
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
                        </FormGroup>
                    </form>
                </div>
            </div>
        </div>
    )
}
