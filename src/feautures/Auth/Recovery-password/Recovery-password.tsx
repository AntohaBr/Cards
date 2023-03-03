import {Button, FormControl, FormGroup, FormLabel, Input, InputLabel} from 'collections'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import {recoveryPasswordTC} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import styleForms from 'common/Styles/Forms.module.css'
import {selectAppStatus, selectAuthIsLoggedIn, selectAuthRecoveryPassword} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'


export const RecoveryPassword = () => {
    const recoveryPassword = useAppSelector(selectAuthRecoveryPassword)
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: validate,
        onSubmit: values => {
            if (values.email) {
                dispatch(recoveryPasswordTC(values.email))
            }
        },
    })

    if (recoveryPassword) {
        return <Navigate to={PATH.CHECK_EMAIL}/>
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <div className={styleForms.form}>
                    <h2 className={styleForms.title}>Forgot your password?</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FormControl sx={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Email</InputLabel>
                                <Input
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            </FormControl>
                            <FormLabel>
                                <p className={styleForms.text}>Enter your email address and we will send
                                    you further instructions </p>
                            </FormLabel>
                            <div className={styleForms.buttonBlock}>
                                <Button type={'submit'} variant={'contained'} color={'primary'}
                                        style={{width: '100%', borderRadius: '90px'}}
                                        disabled={status === 'loading'}>
                                    Send Instructions
                                </Button>
                            </div>
                            <FormLabel>
                                <p className={styleForms.text}>Did you remember your password?</p>
                                <div className={styleForms.navLinkBlock}>
                                    <NavLink className={styleForms.navLink} to={PATH.LOGIN}>Try logging in</NavLink>
                                </div>
                            </FormLabel>
                        </FormGroup>
                    </form>
                </div>
            </div>
        </div>
    )
}

