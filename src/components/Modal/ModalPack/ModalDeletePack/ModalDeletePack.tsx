import React from 'react';
import {Button, Dialog} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import style from './ModalDeletePack.module.css'
import {ButtonBlockModal} from "../../../../common/Modals/Button-block-modal/Button-block-modal";


export const ModalDeletePack = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const closeModalHandler = () => {
        setOpen(false)
    }

    const deleteButtonHandler = () => {

    }

    return <div>
        {/*<Button variant='outlined' onClick={handleClickOpen}>Delete Pack</Button>*/}
        {/*<Dialog open={open} onClose={closeModalHandler}>*/}
        {/*    <div className={style.modalDeletePackContainer}>*/}
        {/*        <div className={style.modalDeletePack}>*/}
        {/*            <div className={style.modalDeletePackTitle}>Delete Pack</div>*/}
        {/*            <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={closeModalHandler}/>*/}
        {/*        </div>*/}
        {/*        <div className={style.modalDeletePackText}>*/}
        {/*            <p>Do you really want to remove <b>Pack Name?</b></p>*/}
        {/*            <p>All cards will be deleted.</p>*/}
        {/*        </div>*/}
        {/*            <ButtonBlockModal*/}
        {/*                closeModalHandler={closeModalHandler}*/}
        {/*                actionModalHandler={deleteButtonHandler}*/}
        {/*                isDisable={isDisable}*/}
        {/*                buttonTitleModal={'Delete'}*/}
        {/*            />*/}
        {/*    </div>*/}
        {/*</Dialog>*/}
    </div>
}