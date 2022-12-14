import {Link} from "react-router-dom";
import style from"./Navbar.module.css"
import {URL} from "../../app/App";

export const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style.item}>
                <Link to={URL.LOGIN}>Login</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.REGISTRATION}>Registration</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.PROFILE}>Profile</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.RECOVERY_PASSWORD}>Recovery password</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.CHECK_EMAIL}>Check email</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.NEW_PASSWORD}>New password</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.SUPER_COMPONENTS}>Super components</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.CARDS}>Cards</Link>
            </div>
        </nav>
    )
}