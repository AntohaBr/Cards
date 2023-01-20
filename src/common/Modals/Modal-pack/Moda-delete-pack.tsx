import React from 'react';
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {useAppSelector} from "../../../utils/Hooks";
import style from './ModalDeletePack.module.css'

type ModalDeletePackPropsType = {
    title: string
    open: boolean
    // name: string
    toggleOpenMode: (value: boolean) => void
    deleteItem: () => void
}


export const ModalDeletePack = (props: ModalDeletePackPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const deletePackButtonHandler = () => {
        props.deleteItem()
        props.toggleOpenMode(false)
    }

    return <div>
        <MainBlockModal
            title={props.title}
            open={props.open}
            toggleOpenMode={props.toggleOpenMode}
            onCloseModal={onCloseModalHandler}
        >
            <div className={style.modalDeletePackText}>
                <p>Do you really want to remove <b>{'props.name'}</b></p>
                <p>All cards will be deleted.</p>
            </div>
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={deletePackButtonHandler}
                buttonTitleModal={'Delete'}
            />
        </MainBlockModal>
    </div>
}




