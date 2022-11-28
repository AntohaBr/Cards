import React from 'react';
import {
    Button, Checkbox,
    Dialog,
    FormControlLabel,
    TextField
} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import style from './ModalEditPack.module.css'


export const ModalEditPack = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div>
        <Button variant='outlined' onClick={handleClickOpen}>Edit pack</Button>
        <Dialog open={open}>
            <div className={style.modalEditContainer}>
                <div className={style.modalEditPack}>
                    <div className={style.modalEditPackTitle}>Edit pack</div>
                    <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={handleClose}/>
                </div>
                <TextField
                    autoFocus
                    id='name'
                    label='Name pack'
                    type='name pack'
                    fullWidth
                    variant='standard'
                    sx={{m: 2, width: '40ch'}}
                />
                <FormControlLabel control={<Checkbox defaultChecked/>} label='Private pack' style={{marginLeft: 10}}/>
                <div className={style.modalEditButton}>
                    <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'inherit'}
                            style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'primary'}
                            style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>
                        Save
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>
}