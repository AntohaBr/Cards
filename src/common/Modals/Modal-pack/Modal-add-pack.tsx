import React from 'react';
import {
    Checkbox,
    FormControlLabel,
    TextField
} from '@mui/material';
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {useAppSelector} from "../../../utils/Hooks";


type ModalAddPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: (name: string, deckCover: string) => void
}


export const ModalAddPack = (props: ModalAddPackPropsType) => {

    const isDisable = useAppSelector(state => state.app.isDisabled)

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const saveButtonHandler = () => {
        // props.addItem(name, deckCover)
        props.toggleOpenMode(false)
    }

    return <div>
        <MainBlockModal
            title={props.title}
            open={props.open}
            toggleOpenMode={props.toggleOpenMode}
            onCloseModal={onCloseModalHandler}
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
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={saveButtonHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}