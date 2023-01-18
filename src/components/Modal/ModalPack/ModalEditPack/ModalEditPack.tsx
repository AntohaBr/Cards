import React, {FunctionComponent, ReactNode} from 'react';
import {
    Button, Checkbox,
    Dialog,
    FormControlLabel,
    TextField
} from '@mui/material';
import {useSelector} from 'react-redux';
import {RootReducerType} from '../../../../redux/Store';
import CloseIcon from '@mui/icons-material/Close';
import style from './ModalEditPack.module.css'
import {ButtonBlockModal} from "../../../../common/Modals/Button-block-modal/Button-block-modal";


export const ModalEditPack = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const closeModalHandler = () => {
        setOpen(false)
    }

    const saveButtonHandler = () =>{

    }

    return <div>
        {/*<Button variant='outlined' onClick={handleClickOpen}>Edit pack</Button>*/}
        {/*<Dialog open={open}  onClose={closeModalHandler}>*/}
        {/*    <div className={style.modalEditContainer}>*/}
        {/*        <div className={style.modalEditPack}>*/}
        {/*            <div className={style.modalEditPackTitle}>Edit pack</div>*/}
        {/*            <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={closeModalHandler}/>*/}
        {/*        </div>*/}
        {/*        <TextField*/}
        {/*            autoFocus*/}
        {/*            label='Name pack'*/}
        {/*            fullWidth*/}
        {/*            variant='standard'*/}
        {/*            sx={{m: 2, width: '40ch'}}*/}
        {/*        />*/}
        {/*        <FormControlLabel control={<Checkbox defaultChecked/>} label='Private pack' style={{marginLeft: 10}}/>*/}
        {/*        <ButtonBlockModal*/}
        {/*            // closeModalHandler={closeModalHandler}*/}
        {/*            actionModalHandler={saveButtonHandler}*/}
        {/*            isDisable={isDisable}*/}
        {/*            buttonTitleModal={'Save'}*/}
        {/*        />*/}
        {/*    </div>*/}
        {/*</Dialog>*/}
    </div>
}