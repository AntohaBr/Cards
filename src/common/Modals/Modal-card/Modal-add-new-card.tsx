import React, {ChangeEvent, useState} from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {TextField} from "@mui/material";
import {MainBlockModal} from "../Main-block-modal/Main-block-modal";
import {useAppSelector} from "../../../utils/Hooks";
import {ButtonBlockModal} from "../Button-block-modal/Button-block-modal";
import {InputFile} from "../../../utils/Input-file/Input-file";
import {PostCardType} from "../../../api/cards-api";
import {useParams} from "react-router-dom";


type ModalAddNewCardPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: (postModel: PostCardType) => void
}


export const ModalAddNewCard = (props: ModalAddNewCardPropsType) => {
    const isDisable = useAppSelector(state => state.app.isDisabled)
    const {packId} = useParams()
    const [question, setQuestion] = useState('')
    const [questionImg, setQuestionImg] = useState('')
    const [answerImg, setAnswerImg] = useState('')
    const [answer, setAnswer] = useState('')
    const [questionType, setQuestionType] = useState('Text')

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
        setQuestion('')
        setAnswer('')
    }

    const onChangeQuestionTypeHandler = (event: SelectChangeEvent) => {
        setQuestionType(event.target.value)
    }

    const addCardHandler = () => {
        if (packId) {
            props.addItem({card:{cardsPack_id: packId ? packId : '',question, answer, questionImg, answerImg}})
            props.toggleOpenMode(false)
            setQuestion('')
            setAnswer('')
        }
    }

    const questionFileChangeHandler = (questionFile: string) => {
        setQuestionImg(questionFile)
    }

    const answerFileChangeHandler = (answerFile: string) => {
        setAnswerImg(answerFile)
    }

    const addQuestionHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const addAnswerHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

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
                    value={questionType}
                    onChange={onChangeQuestionTypeHandler}
                >
                    <MenuItem value="Text">Text</MenuItem>
                    <MenuItem value="File">File</MenuItem>
                </Select>
            </FormControl>
            {questionType === 'Text'
                ? <div>
                    <TextField
                        value={question}
                        onChange={addQuestionHandler}
                        autoFocus
                        label='Question'
                        variant='standard'
                        sx={{width: '100%'}}
                    />
                    <TextField
                        value={answer}
                        onChange={addAnswerHandler}
                        autoFocus
                        label='Answer'
                        variant='standard'
                        sx={{width: '100%'}}
                    />
                </div>
                :
                <div>
                    <InputFile
                        Img={questionImg}
                        saveImg={questionFileChangeHandler}
                        title={'Upload a question'}
                        name={'questionFile'}
                    />
                    <InputFile
                        Img={answerImg}
                        saveImg={answerFileChangeHandler}
                        title={'Upload a answer'}
                        name={'answerFile'}
                    />
                </div>
            }
            <ButtonBlockModal
                onCloseModalHandler={onCloseModalHandler}
                isDisable={isDisable}
                actionModalHandler={addCardHandler}
                buttonTitleModal={'Save'}
            />
        </MainBlockModal>
    </div>
}