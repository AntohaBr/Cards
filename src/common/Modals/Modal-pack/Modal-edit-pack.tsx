import React, {ChangeEvent, useState} from 'react';
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {TextField} from "@mui/material";
import {useAppSelector} from "../../../utils/Hooks";
import {InputFile} from "../../../utils/Input-file/Input-file";

type ModalEditPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    editItem: (name: string, deckCover: string) => void
    itemTitle: string
}

export const ModalEditPack = (props: ModalEditPackPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const [name, setName] = useState(props.itemTitle)
    const [deckCover, setDeckCover] = useState('')

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }
    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }
    const editPackButtonHandler = () => {
        props.editItem(name, deckCover)
        props.toggleOpenMode(false)
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
                title={'Change pack cover'}
                name={'editPackCoverFile'}
            />
            <TextField
                value={name}
                onChange={textFieldChangeHandler}
                autoFocus
                id='name'
                label='Edit pack'
                type='edit pack'
                fullWidth
                variant='standard'
                sx={{m: 2, width: '40ch'}}
            />
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={editPackButtonHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}