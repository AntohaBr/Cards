import {ChangeEvent, FC} from 'react'
import {useAppDispatch, convertFileToBase64} from 'utils'
import {Button} from 'collections-mui'
import s from './Input-file.module.css'
import {appActions} from 'reducers/App-reducer'


type InputFilePropsType = {
    saveImg: (img: string) => void
    title: string
    img: string
    name: string
}


export const InputFile: FC<InputFilePropsType> = ({img, saveImg, title, name}) => {
    const dispatch = useAppDispatch()

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 102400) {
                convertFileToBase64(file, (img64: string) => {
                    saveImg(img64)
                })
            } else {
                dispatch(appActions.setAppError('File too large'))
            }
        }
    }

    return (
        <label>
            <Button
                variant='contained'
                component='label'
                style={{borderRadius: '20px', width: '100%', marginTop: '10px'}}
            >
                {title}
                <input
                    type={'file'}
                    style={{display: 'none'}}
                    accept={'.jpg, .jpeg, .png, img'} multiple
                    onChange={uploadHandler}
                />
            </Button>
            {img && <div className={s.file} style={{backgroundImage: `url(${img})`}}/>}
        </label>
    )
}
