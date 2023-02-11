type validateUtilsType = {
    email?: string
    password?: string
    rememberMe?: boolean
    confirmPassword?: string
}

export const validateUtil = (values:validateUtilsType) => {
    const errors: validateUtilsType = {}

    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length < 8) {
        errors.password = 'Password Must be 8 characters or more'
    }

    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'The password is not confirmed'
    }

    return errors
}