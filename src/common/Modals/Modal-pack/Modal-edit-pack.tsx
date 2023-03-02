import React, {ChangeEvent, useState} from 'react'
import {ButtonBlockModal} from '../Button-block-modal/Button-block-modal'
import {MainBlockModal} from '../Main-block-modal/Main-block-modal'
import TextField from '@mui/material/TextField'
import {InputFile} from '../../Input-file/Input-file'


type ModalEditPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    editItem: (name: string, deckCover: string) => void
    itemTitle: string
    img: string
}


export const ModalEditPack = (props: ModalEditPackPropsType) => {
    const [name, setName] = useState(props.itemTitle)
    const [deckCover, setDeckCover] = useState(props.img)

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
                    title={'Change pack cover'}
                    name={'editPackCoverImage'}
                />
                <TextField
                    value={name}
                    onChange={textFieldChangeHandler}
                    autoFocus
                    label='Edit pack'
                    variant='standard'
                    style={{width: '100%'}}
                />
                <ButtonBlockModal
                    onCloseModalHandler={onCloseModalHandler}
                    actionModalHandler={editPackButtonHandler}
                    buttonTitleModal={'Save'}
                />
            </MainBlockModal>
        </div>
    )
}