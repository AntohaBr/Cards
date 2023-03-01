import React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {appActions} from '../../redux/App-reducer'
import {useAppDispatch, useAppSelector} from 'utils'
import {selectAppError} from '../../redux/Selectors'


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})


export const ErrorSnackbar = () => {
    const error = useAppSelector(selectAppError)

    const dispatch = useAppDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(appActions.setAppErrorAC(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}