import React, {useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import style from "../../../components/Modal/ModalCards/ModalDeleteCard/ModalDeleteCard.module.css";
import {Input} from "@mui/material";
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {useAppSelector} from "../../../utils/Hooks";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";


type ModalAddNewCardPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: () => void
}


export const ModalAddNewCard = (props: ModalAddNewCardPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [typeOfQuestion, setTypeOfQuestion] = useState('Text')

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
        setQuestion('')
        setAnswer('')
    }

    const addCardButtonHandler = () => {

    }

    // const handleMaxWidthChange = (event: SelectChangeEvent<typeof text>) => {
    //     setText(
    //         event.target.value,
    //     );
    // };
    //
    // const photoUpload = (e: any): void => {
    //     e.preventDefault()
    //     const reader = new FileReader()
    //     const file = e.target.files[0]
    //     if (reader !== undefined && file !== undefined) {
    //         reader.onloadend = () => {
    //             setFile(reader.result as string)
    //         }
    //         reader.readAsDataURL(file)
    //     }
    // }

    return <div>
        <MainBlockModal
            title={props.title}
            open={props.open}
            toggleOpenMode={props.toggleOpenMode}
            onCloseModal={onCloseModalHandler}
        >
            <FormControl sx={{mt: 2, minWidth: 350}}>
                <InputLabel>Choose a question format</InputLabel>
                <Select
                    autoFocus
                    label="Choose a question format"
                    // value={text}
                    // onChange={handleMaxWidthChange}
                >
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="File">File</MenuItem>
                </Select>
            </FormControl>
            {typeOfQuestion === 'Text'
                ? <div>
                    <FormControl>
                            <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                                <InputLabel>Question</InputLabel>
                                <Input/>
                            </FormControl>
                            <FormControl sx={{m: 2, width: '40ch'}} variant="outlined">
                                <InputLabel>Answer</InputLabel>
                                <Input/>
                            </FormControl>
                        </FormControl>
                </div>
                :
                <div>
                    <input type={'file'} id='avatar' style={{display: 'none'}}
                           accept={'.jpg, .jpeg, .png, img'} multiple
                           src={'file'}/>
                    <input type={'file'} id='avatar' style={{display: 'none'}}
                           accept={'.jpg, .jpeg, .png, img'} multiple
                           src={'file'}/>
                </div>

            }
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={addCardButtonHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}