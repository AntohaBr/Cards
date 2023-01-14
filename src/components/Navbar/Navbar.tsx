import {Link} from "react-router-dom";
import style from"./Navbar.module.css"
import {URL} from "../../app/App";
import {useSelector} from "react-redux";
import {RootReducerType} from "../../redux/Store";

export const Navbar = () => {
    const avatar=useSelector<RootReducerType,string>(state => state.profile.avatar)
    const name=useSelector<RootReducerType,string>(state => state.profile.name)

    const imageStyle = {
        backgroundImage:`url(${avatar})`

    }
    return (
        <nav className={style.main}>
            <div className={style.navbar}>
                <div className={style.item}>
                    <Link to={URL.LOGIN} className={style.link}>Login</Link>
                </div>
                <div className={style.item}>
                    <Link to={URL.REGISTRATION} className={style.link}>Registration</Link>
                </div>
                <div className={style.item}>
                    <Link to={URL.PROFILE} className={style.link}>Profile</Link>
                </div>
                <div className={style.item}>
                    <Link to={URL.RECOVERY_PASSWORD} className={style.link}>Recovery password</Link>
                </div>
                <div className={style.item}>
                    <Link to={URL.NEW_PASSWORD} className={style.link}>New password</Link>
                </div>
                <div className={style.item}>
                    <Link to={URL.PACKS} className={style.link}>Packs</Link>
                </div>
            </div>
            <div className={style.forMe}>
                <Link to={URL.PROFILE}><div style={imageStyle}/></Link>
                <p>{name}</p>
            </div>
        </nav>
    )
}