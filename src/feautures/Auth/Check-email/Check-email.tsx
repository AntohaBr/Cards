import s from './Check-email.module.css'
import {Button} from 'collections'
import envelope from 'assets/Icon/envelope.jpg'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from 'utils'
import styleForms from 'common/Styles/Forms.module.css'
import {selectAuthRecoveryPassword} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'


export const CheckEmail = () => {
    const recoveryPassword = useAppSelector(selectAuthRecoveryPassword)

    const navigate = useNavigate()

    return (
        <div className={styleForms.block}>
            <div className={styleForms.container}>
                <div className={styleForms.form}>
                    <h2 className={styleForms.title}>Check Email</h2>
                    <div className={s.icon}>
                        <img src={envelope} alt='envelope' className={s.img}/>
                    </div>
                    <div className={styleForms.text}>
                        <p>We’ve sent an Email with instructions to </p>
                        <p style={{color: 'red'}}>{recoveryPassword}</p>
                    </div>
                    <div className={styleForms.buttonBlock}>
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