import React from 'react';
import {Button, Dialog} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import style from './ModalDeleteCard.module.css'


export const ModalDeleteCard = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return <div>
        <Button variant='outlined' onClick={handleClickOpen}>Delete Card</Button>
        <Dialog open={open}>
            <div className={style.modalDeleteCardContainer}>
                <div className={style.modalDeleteCard}>
                    <div className={style.modalDeleteCardTitle}>Delete Card</div>
                    <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={handleClose}/>
                </div>
                <div className={style.modalDeleteCardText}>
                    <p>Do you really want to remove <b>Card Name?</b></p>
                    <p>All cards will be deleted.</p>
                </div>
                <div className={style.modalDeleteCardButton}>
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