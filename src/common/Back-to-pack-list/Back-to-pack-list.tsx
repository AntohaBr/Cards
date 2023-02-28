import {NavLink} from 'react-router-dom'
import {PATH} from '../../app/Routes/Routes'
import style from './Back-to-pack-list.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'


export const BackToPackList = () => {
    return (
        <div className={style.backToPackList}>
            <NavLink to={PATH.PACKS} className={style.navLink}>
                <ArrowBackIcon fontSize={'small'}/> Back to Packs List
            </NavLink>
        </div>
    )
}
