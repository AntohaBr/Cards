import styleForms from 'common/Styles/Forms.module.css'
import {Button} from 'collections-mui'
import {useAppSelector} from 'utils'
import {selectAppStatus} from 'store/Selectors'


type ButtonMUIPropsType = {
    buttonTitle: string
}


export const ButtonMui = (props: ButtonMUIPropsType) => {
    const status = useAppSelector(selectAppStatus)

    return (
        <div className={styleForms.buttonBlock}>
            <Button type={'submit'} variant={'contained'} color={'primary'}
                    style={{width: '100%', borderRadius: '90px'}}
                    disabled={status === 'loading'}>
                {props.buttonTitle}
            </Button>
        </div>
    )
}