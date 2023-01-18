import React from 'react';
import style from './ModalAddNewPack.module.css'
import {
    Button, Checkbox,
    Dialog,
    FormControlLabel,
    TextField
} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import {ButtonBlockModal} from "../../../../common/Modals/Button-block-modal/Button-block-modal";


export const ModalAddNewPack = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const closeModalHandler = () => {
        setOpen(false)
    }

    const saveButtonAddNewPackHandler = () => {

    }

    return <div>
        {/*<Button variant='outlined' onClick={handleClickOpen}>Add new pack</Button>*/}
        {/*<Dialog open={open} onClose={closeModalHandler}>*/}
        {/*    <div className={style.modalAddContainer}>*/}
        {/*        <div className={style.modalAddPack}>*/}
        {/*            <div className={style.modalAddPackTitle}>Add new pack</div>*/}
        {/*            <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={closeModalHandler}/>*/}
        {/*        </div>*/}
        {/*        <TextField*/}
        {/*            autoFocus*/}
        {/*            id='name'*/}
        {/*            label='Name pack'*/}
        {/*            type='name pack'*/}
        {/*            fullWidth*/}
        {/*            variant='standard'*/}
        {/*            sx={{m: 2, width: '40ch'}}*/}
        {/*        />*/}
        {/*        <FormControlLabel control={<Checkbox defaultChecked/>} label='Private pack' style={{marginLeft: 10}}/>*/}
        {/*        <ButtonBlockModal*/}
        {/*            closeModalHandler={closeModalHandler}*/}
        {/*            isDisable={isDisable}*/}
        {/*            actionModalHandler={saveButtonAddNewPackHandler}*/}
        {/*            buttonTitleModal={'Save'}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</Dialog>*/}
    </div>
}