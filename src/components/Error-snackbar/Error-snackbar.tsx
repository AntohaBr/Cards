import React  from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType, ThunkDispatchType} from "../../redux/Store";
import {setAppErrorAC} from "../../redux/App-reducer";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export const ErrorSnackbar = () => {
    const error = useSelector<RootReducerType, null | string>(state => state.app.successError);
    const dispatch = useDispatch<ThunkDispatchType>()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }
        dispatch(setAppErrorAC(null));
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}