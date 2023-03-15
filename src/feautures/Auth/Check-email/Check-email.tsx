import s from './Check-email.module.css'
import {Button} from 'collections-mui'
import envelope from 'assets/Icon/envelope.jpg'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from 'utils'
import f from 'common/Styles/Forms.module.css'
import {selectAuthRecoveryPassword} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'


export const CheckEmail = () => {
    const recoveryPassword = useAppSelector(selectAuthRecoveryPassword)

    const navigate = useNavigate()

    return (
        <div className={f.block}>
            <div className={f.container}>
                <div className={f.form}>
                    <h2 className={f.title}>Check Email</h2>
                    <div className={s.icon}>
                        <img src={envelope} alt='envelope' className={s.img}/>
                    </div>
                    <div className={f.text}>
                        <p>We’ve sent an Email with instructions to </p>
                        <p style={{color: 'red'}}>{recoveryPassword}</p>
                    </div>
                    <div className={f.buttonBlock}>
                        <Button type={'submit'} variant={'contained'} color={'primary'}
                                style={{width: '100%', borderRadius: '90px'}}
                                onClick={() => {
                                    navigate(PATH.LOGIN)
                                }}>
                            Back to login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}