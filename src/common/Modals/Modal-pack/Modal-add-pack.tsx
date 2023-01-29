import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {useAppSelector} from "../../../utils/Hooks";
import {InputFile} from "../../../utils/Input-file/Input-file";


type ModalAddPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: (name: string, deckCover: string) => void
}


export const ModalAddPack = (props: ModalAddPackPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)

    const [name, setText] = useState('')
    const [deckCover, setDeckCover] = useState('')

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
        setText('')
    }

    const saveButtonHandler = () => {
        props.addItem(name, deckCover)
        props.toggleOpenMode(false)
        setText('')
        setDeckCover('')
    }

    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return <div>
        <MainBlockModal
            title={props.title}
            open={props.open}
            toggleOpenMode={props.toggleOpenMode}
            onCloseModal={onCloseModalHandler}
        >
            <InputFile
                Img={deckCover}
                saveImg={setDeckCover}
                title={'Upload the pack cover'}
                name={'packCoverFile'}
            />
            <TextField
                value={name}
                onChange={textFieldChangeHandler}
                autoFocus
                id='name'
                label='Name pack'
                type='name pack'
                fullWidth
                variant='standard'
                sx={{m: 2, width: '40ch'}}
            />
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={saveButtonHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}