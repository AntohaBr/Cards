import React from 'react';
import {useFormik} from "formik";
import {Button, FormControl, FormLabel, Input, InputLabel} from "@mui/material";
import style from './New-password.module.css'
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {Navigate, useParams} from "react-router-dom";
import {setNewPasswordTC} from "../../redux/Auth-reducer";
import {URL} from "../../app/App";


interface State {
    password: string;
    showPassword: boolean
}

export const NewPassword = () => {
    const {token} = useParams<{token: string}>()
    const newPassport = useSelector<RootReducerType, string>((state)=> state.auth.newPassport)
    const dispatch = useDispatch<ThunkDispatchType>()
    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [values, setValues] = React.useState<State>({
        password: '',
        showPassword: false
    })

    const handleClickShowNewPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }

    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
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
        },
    })

    if (newPassport) {
        return <Navigate to={URL.LOGIN}/>
    }

    return(
        <div className={style.newPasswordBlock}>
            <div className={style.newPasswordContainer}>
                <h2 className={style.title}>Create new password</h2>
                <form onSubmit={formik.handleSubmit} className={style.form}>
                    <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                        <InputLabel>Password</InputLabel>
                        <Input
                            type={values.showPassword ? "text" : "password"}
                            {...formik.getFieldProps('password')}
                            endAdornment={
                                <InputAdornment position="end">
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
                    <FormLabel>
                        <p className={style.infoText}>Create new password and we will
                            send you further instructions to email </p>
                    </FormLabel>
                    <Button type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: "350px", borderRadius: "90px", margin: "25px"}} disabled={isDisable}>
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