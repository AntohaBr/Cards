import {Link} from "react-router-dom";
import style from"./Navbar.module.css"

export const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style.item}>
                <Link to='login'>Login</Link>
            </div>
            <div className={style.item}>
                <Link to='registration'>Registration</Link>
            </div>
            <div className={style.item}>
                <Link to='profile'>Profile</Link>
            </div>
            <div className={style.item}>
                <Link to='recoveryPassword'>Recovery password</Link>
            </div>
            <div className={style.item}>
                <Link to='newPassword'>New password</Link>
            </div>
            <div className={style.item}>
                <Link to='superComponents'>Super components</Link>
            </div>
        </nav>
    )
}