import React from 'react'
import {Button} from '@mui/material'
import style from './Button-block-modal.module.css'


type ButtonBlockModalPropsType = {
    onCloseModalHandler: () => void
    actionModalHandler: () => void
    buttonTitleModal : string
}


export const ButtonBlockModal = (props:ButtonBlockModalPropsType) => {
    return (
        <div className={style.buttonModalBlock}>
            <Button
                onClick={props.onCloseModalHandler}
                variant={'outlined'}
                style={{width: '120px', borderRadius: '90px'}}
            >
                Cancel
            </Button>
            <Button
                onClick={props.actionModalHandler}
                variant={'contained'}
                color={'primary'}
                style={{width: '120px', borderRadius: '90px'}}
            >
                {props.buttonTitleModal}
            </Button>
        </div>
    )
}