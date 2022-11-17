import React, {useState} from 'react';
import {
    Alert,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper, Snackbar,
    TextField
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {FormikErrors, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/Reducer-login";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {RemoveRedEye} from "@mui/icons-material";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = (props: {}) => {

    const dispatch = useDispatch<ThunkDispatchType>()
    const error = useSelector<RootReducerType, string>(state => state.app.error)
    const [show, setShow] = useState(false)
    const showPassword = () => {
        setShow(!show)
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
                errors.email = 'Некорректный email'
            }
            if (values.password.length < 5) {
                errors.password = "Слишком короткий пароль"
            }
            return errors
        },
    })


    return (
        <>
        <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Paper elevation={3} style={{width: '500px', height: "550px"}}>

                <div style={{textAlign: "center"}}>


                    <h2 style={{textAlign: "center"}}>Sign in</h2>
                    <form action="" onSubmit={formik.handleSubmit}>


                        <FormControl>

                            <FormGroup>

                                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                                    <TextField label="Email" margin="normal" variant={"filled"}

                                               {...formik.getFieldProps('email')}/>
                                    {formik.touched.email && formik.errors.email ?
                                        <div>{formik.errors.email}</div> : null}


                                    <TextField type={show ? "text" : "password"} label="Password"
                                               variant={"filled"}
                                               margin={"normal"}
                                               {...formik.getFieldProps('password')}

                                    />
                                    {formik.touched.password && formik.errors.password ?
                                        <div>{formik.errors.password}</div> : null}
                                    <span>


                                    {!show ? <div>
                                            <RemoveRedEye style={{margin: '15px'}} onClick={showPassword}/>
                                        </div>
                                        :
                                        <div>
                                            <VisibilityOffIcon onClick={showPassword} style={{margin: '15px'}}/>
                                        </div>}
</span>

                                </div>


                                <div style={{display: "flex", justifyContent: "space-between"}}>
                                    <FormControlLabel label={'Remember me'}
                                                      control={<Checkbox checked={formik.values.rememberMe}/>}

                                                      {...formik.getFieldProps("rememberMe")}
                                    />
                                    <span>
                            <p>Forgot password?</p>
                    </span>

                                </div>
                                <Button type={'submit'} variant={'contained'} color={'primary'}
                                        style={{width: "350px", borderRadius: "90px", margin: "25px"}}>
                                    Sign in
                                </Button>
                                <div>
                                    {error===""? "" : <div style={{color:"red",display:"flex",justifyContent:"center"}}>{error}</div>}
                                    <p>Already have on account?</p>
                                    <NavLink to={"/registration"}>Sign up</NavLink>
                                </div>


                            </FormGroup>
                        </FormControl>
                    </form>
                </div>


            </Paper>
        </Grid>
    </Grid>
            {/*<Snackbar autoHideDuration={6000}>*/}
            {/*    <Alert  severity="success" sx={{ width: '100%' }}>*/}
            {/*        {error}*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
            {/*<Alert severity="error">{error}</Alert>*/}
        </>
    )
}