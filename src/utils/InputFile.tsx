import React from 'react';
import {ChangeEvent} from "react";
import {convertFileToBase64} from "../features/Convert-fаile-to-base64";
import {setAppErrorAC} from "../redux/App-reducer";
import {useAppDispatch} from "./Hooks";


type InputFilePropsType = {
    saveFile: (file: string) => void
}


const InputFile = (props:InputFilePropsType) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 102400) {
                convertFileToBase64(file, (file64: string) => {
                    props.saveFile(file64)
                })
            } else {
                dispatch(setAppErrorAC('File too large'))
            }
        }
    }

    return <div>
        111
    </div>
}