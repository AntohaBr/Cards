import React from 'react';
import {
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    Paper,
    TextField
} from "@mui/material";
import {NavLink} from "react-router-dom";
import {FormikErrors, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../redux/Reducer-login";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = (props: {}) => {

    const dispatch=useDispatch<ThunkDispatchType>()
     const error=useSelector<RootReducerType,string>(state => state.app.error)


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe:false
        },
        onSubmit(values){
            dispatch(loginTC(values))
        },
        validate: (values) => {
            const errors:FormikErrorType  = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Некорректный email'
            }
            if (values.password.length < 5){
                errors.password="Слищком короткий пароль"
            }
            return errors
        },
    })



    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <Paper elevation={3} style={{width: '500px', height: "500px"}}>

                <div style={{textAlign: "center"}}>


                    <h2 style={{textAlign: "center"}}>Sign in</h2>
                    <form action="" onSubmit={formik.handleSubmit}>


                    <FormControl>

                        <FormGroup>
                            <TextField label="Email" margin="normal" variant={"filled"} {...formik.getFieldProps('email')}/>
                            {formik.errors.email ? <span>{formik.errors.email}</span> : null}

                            <TextField type="password" label="Password"
                                       variant={"filled"}
                                       margin={"normal"}
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <span>{formik.errors.password}</span> : null}

                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <FormControlLabel label={'Remember me'} control={<Checkbox checked={formik.values.rememberMe}/>}

                                                  {...formik.getFieldProps("rememberMe")}
                                               />
                                <span>
                            <p>Forgot password?</p>
                    </span>

                            </div>
                            <Button type={'submit'} variant={'contained'} color={'primary'}
                                    style={{width: "350px", borderRadius: "90px", margin: "25px"}}  >
                                Sign in
                            </Button>
                            <div>
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
}