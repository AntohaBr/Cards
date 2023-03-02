import React, {ChangeEvent, useState} from 'react'
import TextField from '@mui/material/TextField'
import {MainBlockModal} from '../Main-block-modal/Main-block-modal'
import {ButtonBlockModal} from '../Button-block-modal/Button-block-modal'
import {InputFile} from '../../Input-file/Input-file'


type ModalAddPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: (name: string, deckCover: string) => void
}


export const ModalAddPack = (props: ModalAddPackPropsType) => {
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

    return (
        <div>
            <MainBlockModal
                title={props.title}
                open={props.open}
                toggleOpenMode={props.toggleOpenMode}
                onCloseModal={onCloseModalHandler}
            >
                <InputFile
                    img={deckCover}
                    saveImg={setDeckCover}
                    title={'Upload pack cover'}
                    name={'packCoverImage'}
                />
                <TextField
                    value={name}
                    onChange={textFieldChangeHandler}
                    autoFocus
                    style={{width: '100%'}}
                    label='Name pack'
                    variant='standard'
                />
                <ButtonBlockModal
                    onCloseModalHandler={onCloseModalHandler}
                    actionModalHandler={saveButtonHandler}
                    buttonTitleModal={'Save'}
                />
            </MainBlockModal>
        </div>
    )
}