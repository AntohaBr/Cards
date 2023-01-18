import React, {ReactNode} from 'react';
import style from "../../../components/Modal/ModalPack/ModalAddNewPack/ModalAddNewPack.module.css";
import CloseIcon from "@mui/icons-material/Close";
import {Dialog} from "@mui/material";


type MainBlockModalType = {
    children?: ReactNode
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    onCloseModal: () => void
}


export const MainBlockModal = (props: MainBlockModalType) => {

    return (
        <div>
            <Dialog open={props.open} onClose={props.onCloseModal}>
                <div className={style.modalBlock}>
                    <div className={style.modalContainer}>
                        <div className={style.modalTitle}>{props.title}</div>
                        <CloseIcon fontSize={'medium'} style={{cursor: 'pointer'}} onClick={props.onCloseModal}/>
                    </div>
                    {props.children}
                </div>
            </Dialog>
        </div>
    )
}