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


export const Registration = (props: {}) => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },

        // validate: (values) => {
        //     const errors: FormikErrorType = {}
        //     if (!values.email) {
        //         errors.email = 'Required'
        //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        //         errors.email = 'Invalid email address'
        //     }
        //     if (!values.password) {
        //         errors.password = 'Required'
        //     } else if (values.password.length < 6) {
        //         errors.password = 'Should be more symbols'
        //     } else if (values.confirmPassword !== values.password) {
        //         errors.confirmPassword = 'The password is not confirmed. Check that the password and its confirmation match'
        //     }
        //     return errors
        // },

        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    })

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormGroup>
                            <TextField
                                label='Email'
                                variant='standard'
                                margin='normal'
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <TextField
                                type='Password'
                                label="Password"
                                variant="standard"
                                margin='normal'
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <TextField
                                type='Password'
                                label='Confirm password'
                                variant='standard'
                                margin='normal'
                                name='confirmPassword'
                                onChange={formik.handleChange}
                                value={formik.values.confirmPassword}
                            />
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