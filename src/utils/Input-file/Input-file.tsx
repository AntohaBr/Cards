import React from 'react';
import {ChangeEvent} from "react";
import {convertFileToBase64} from "../../features/Convert-fаile-to-base64";
import {setAppErrorAC} from "../../redux/App-reducer";
import {useAppDispatch} from "../Hooks";
import {Button} from "@mui/material";
import style from './Input-file.module.css'

type InputFilePropsType = {
    saveImg: (questionImg: string) => void
    title: string
    img: string
    name: string
}


export const InputFile = (props:InputFilePropsType) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 102400) {
                convertFileToBase64(file, (file64: string) => {
                    props.saveImg(file64)
                })
            } else {
                dispatch(setAppErrorAC('File too large'))
            }
        }
    }

    return <label>
        <Button
            variant="contained"
            component="label"
            style={{ borderRadius: '20px', width: '70%', marginTop: '10px' }}
        >
            {props.title}
            <input
                type={'file'}
                style={{display: 'none'}}
                accept={'.jpg, .jpeg, .png, img'} multiple
                onChange={uploadHandler}
            />
        </Button>
        {props.img && <div className={style.file} style={{ backgroundImage: `url(${props.img})`}}/>}
    </label>
}