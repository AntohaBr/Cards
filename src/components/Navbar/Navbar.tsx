import {Link} from "react-router-dom";
import style from"./Navbar.module.css"
import {useAppSelector} from "../../utils/Hooks";
import {PATH} from "../../app/Routes/Routes";


export const Navbar = () => {
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)

    const imageStyle = {
        backgroundImage:`url(${avatar})`
    }

    return (
        <nav className={style.main}>
            <div className={style.forMe}>
                <Link to={PATH.PROFILE}><div style={imageStyle}/></Link>
                <p>{name}</p>
            </div>
        </nav>
    )
}