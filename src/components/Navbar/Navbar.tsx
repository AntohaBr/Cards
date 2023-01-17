import {Link} from "react-router-dom";
import style from"./Navbar.module.css"
import {URL} from "../../app/App";
import {useAppSelector} from "../../utils/Hooks";


export const Navbar = () => {
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)

    const imageStyle = {
        backgroundImage:`url(${avatar})`
    }

    return (
        <nav className={style.main}>
            <div className={style.forMe}>
                <Link to={URL.PROFILE}><div style={imageStyle}/></Link>
                <p>{name}</p>
            </div>
        </nav>
    )
}