import React from 'react';
import {Button, Dialog} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import style from './ModalDeletePack.module.css'


export const ModalDeletePack = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div>
        <Button variant='outlined' onClick={handleClickOpen}>Delete Pack</Button>
        <Dialog open={open} onClose={handleClose}>
            <div className={style.modalDeletePackContainer}>
                <div className={style.modalDeletePack}>
                    <div className={style.modalDeletePackTitle}>Delete Pack</div>
                    <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={handleClose}/>
                </div>
                <div className={style.modalDeletePackText}>
                    <p>Do you really want to remove <b>Pack Name?</b></p>
                    <p>All cards will be deleted.</p>
                </div>
                <div className={style.modalDeletePackButton}>
                    <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'inherit'}
                            style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'error'}
                            style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>
                        Delete
                    </Button>
                </div>
            </div>
        </Dialog>
    </div>
}