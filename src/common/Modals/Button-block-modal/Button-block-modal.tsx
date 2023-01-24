import React from 'react';
import {Button} from '@mui/material';
import style from './Button-block-modal.module.css'
import {CardType} from "../../../api/cards-api";


type ButtonBlockModalPropsType = {
    onCloseModalHandler: () => void
    isDisable: boolean
    actionModalHandler: () => void
    buttonTitleModal : string
}


export const ButtonBlockModal = (props:ButtonBlockModalPropsType) => {
    return (
        <div className={style.buttonModalBlock}>
            <Button
                onClick={props.onCloseModalHandler}
                disabled={props.isDisable}
                variant={'contained'}
                color={'inherit'}
                style={{width: '120px', borderRadius: '90px'}}
            >
                Cancel
            </Button>
            <Button
                onClick={props.actionModalHandler}
                disabled={props.isDisable}
                variant={'contained'}
                color={'primary'}
                style={{width: '120px', borderRadius: '90px'}}
            >
                {props.buttonTitleModal}
            </Button>
        </div>
    )
}