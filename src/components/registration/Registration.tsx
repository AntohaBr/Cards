import React from 'react';
import {
    Button,
    FormControl,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@mui/material";
import {useFormik} from "formik";


export const Registration = () => {

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

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label='email'
                                variant='standard'
                                margin='normal'
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ?
                                <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            <TextField
                                type='password'
                                label="password"
                                variant="standard"
                                margin='normal'
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            <TextField
                                type='password'
                                label='confirm password'
                                variant='standard'
                                margin='normal'
                                {...formik.getFieldProps('confirmPassword')}
                            />
                            {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Sing Up</Button>
                        </FormGroup>
                        <FormLabel>
                            <p>Already have an account?
                                <a href={'/login'} target={'_self'}>Sign In</a>
                            </p>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}


//type

type FormikErrorType = {
    email?: string,
    password?: string,
    confirmPassword?: string
}