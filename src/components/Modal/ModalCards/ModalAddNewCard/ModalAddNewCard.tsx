import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import style from "../ModalDeleteCard/ModalDeleteCard.module.css";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../../../redux/Store";
import {Input} from "@mui/material";



export const ModalAddNewCard = () => {

    const isDisable = useSelector<RootReducerType, boolean>(state => state.app.isDisabled)
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState<string>('Text');
    const [file, setFile] = useState<string>('')

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMaxWidthChange = (event: SelectChangeEvent<typeof text>) => {
        setText(
            event.target.value,
        );
    };

    const photoUpload = (e: any): void => {
        e.preventDefault()
        const reader = new FileReader()
        const file = e.target.files[0]
        if (reader !== undefined && file !== undefined) {
            reader.onloadend = () => {
                setFile(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return <div>
            {/*<Button variant="outlined" onClick={handleClickOpen}>Add new card</Button>*/}
            {/*<Dialog open={open} onClose={handleClose}>*/}
            {/*        <div className={style.modalAddNewCardTitle}>Add new card</div>*/}
            {/*    <DialogContent>*/}
            {/*        <Box*/}
            {/*            noValidate*/}
            {/*            component="form"*/}
            {/*            sx={{*/}
            {/*                display: 'flex',*/}
            {/*                flexDirection: 'column',*/}
            {/*                m: 'auto',*/}
            {/*                width: 'fit-content',*/}
            {/*            }}*/}
            {/*        >*/}
            {/*            <FormControl sx={{mt: 2, minWidth: 350}}>*/}
            {/*                <Select autoFocus value={text} onChange={handleMaxWidthChange}>*/}
            {/*                    <MenuItem value="Text">Text</MenuItem>*/}
            {/*                    <MenuItem value="File">File</MenuItem>*/}
            {/*                </Select>*/}
            {/*            </FormControl>*/}
            {/*        </Box>*/}
            {/*        {text === 'Text'*/}
            {/*            ?*/}
            {/*            <FormControl>*/}
            {/*                <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">*/}
            {/*                    <InputLabel>Question</InputLabel>*/}
            {/*                    <Input/>*/}
            {/*                </FormControl>*/}
            {/*                <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">*/}
            {/*                    <InputLabel>Answer</InputLabel>*/}
            {/*                    <Input/>*/}
            {/*                </FormControl>*/}
            {/*            </FormControl>*/}
            {/*            : null}*/}
            {/*        {file === 'File'*/}
            {/*            ?*/}
            {/*        <input type={'file'} id='avatar' style={{display: 'none'}}*/}
            {/*               accept={'.jpg, .jpeg, .png, img'} multiple onChange={photoUpload}*/}
            {/*               src={file}/>*/}
            {/*            : null}*/}
            {/*    </DialogContent>*/}
            {/*    <div className={style.modalDeleteCardButton}>*/}
            {/*        <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'inherit'}*/}
            {/*                style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>*/}
            {/*            Cancel*/}
            {/*        </Button>*/}
            {/*        <Button onClick={handleClose} type={'submit'} variant={'contained'} color={'primary'}*/}
            {/*                style={{width: '120px', borderRadius: '90px'}} disabled={isDisable}>*/}
            {/*            Save*/}
            {/*        </Button>*/}
            {/*    </div>*/}
            {/*</Dialog>*/}
        </div>
}