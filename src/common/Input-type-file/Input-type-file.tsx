import React, {ChangeEvent} from 'react';
import {Icon, IconButton} from '@mui/material';
import {convertFileToBase64} from "../../utils/Convert-fаile-to-base64";
import {setAppErrorAC} from "../../redux/App-reducer";
import {updateProfileTC} from "../../redux/Profile-reducer";
import {AddAPhoto} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {ThunkDispatchType} from "../../redux/Store";


type InputTypeFilePropsType = {
    name:string
    // setAvatar: string
}


export const InputTypeFile = (props:InputTypeFilePropsType) => {

    const dispatch = useDispatch<ThunkDispatchType>()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 102400) {
                convertFileToBase64(file, (file64: string) => {
                    // props.setAvatar(file64)
                    dispatch(updateProfileTC(props.name, file64))
                })
            } else {
                dispatch(setAppErrorAC('File too large'))
            }
        }
    }

    return (
        <label htmlFor='avatar'>
            <input type={'file'}
                   id='avatar'
                   style={{display: 'none'}}
                   accept={'.jpg, .jpeg, .png, img'}
                   multiple
                   onChange={uploadHandler}
            />
            <IconButton component='span'>
                <Icon
                    style={{
                        width: 35, height: 35, border: '1px solid white', borderRadius: 20,
                        backgroundColor: 'gray', display: 'flex', alignItems: 'center',
                        opacity: 0.7, cursor: 'pointer'
                    }}>
                    <AddAPhoto style={{color: 'white', width: '100%'}}/>
                </Icon>
            </IconButton>
        </label>
    )
}
