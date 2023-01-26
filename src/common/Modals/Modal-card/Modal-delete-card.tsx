import React from 'react';
import style from './Modal-delete-card.module.css'
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {useAppSelector} from "../../../utils/Hooks";


type ModalDeleteCardPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    deleteItem: () => void
}

export const ModalDeleteCard = (props: ModalDeleteCardPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const deleteCardButtonHandler = () => {
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
                <p>Do you really want to remove.</p>
                <p>All cards will be deleted.</p>
            </div>
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={deleteCardButtonHandler}
                buttonTitleModal={'Delete'}
            />
        </MainBlockModal>
    </div>
}
