import React from 'react';
import {
    Button, Checkbox,
    FormControlLabel,
    TextField
} from '@mui/material';
import {useSelector} from 'react-redux';
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {RootReducerType} from "../../../redux/Store";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";


type ModalAddPackType = {
    open: boolean
    title: string
    toggleOpen: (value: boolean) => void
}


export const ModalAddPack = (props: ModalAddPackType) => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true)
    }

    const closeModalHandler = () => {
        props.toggleOpen(false)
    }

    const saveButtonHandler = () => {

    }

    return <div>
        <Button variant='outlined' onClick={handleClickOpen}>(Add new pack)</Button>
        <MainBlockModal
            open={props.open}
            onClose={closeModalHandler}
            title={props.title}
            >
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
            <ButtonBlockModal
                closeModalHandler={closeModalHandler}
                isDisable={isDisable}
                actionModalHandler={saveButtonHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}