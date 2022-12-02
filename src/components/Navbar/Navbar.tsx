import {Link} from "react-router-dom";
import style from"./Navbar.module.css"
import {URL} from "../../app/App";

export const Navbar = () => {
    return (
        <nav className={style.navbar}>
            <div className={style.item}>
                <Link to={URL.MODAL_NEW_PACK}>Modal new pack</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.MODAL_EDIT_PACK}>Modal edit pack</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.MODAL_DELETE_PACK}>Modal delete pack</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.MODAL_DELETE_CARD}>Modal delete card</Link>
            </div>
            <div className={style.item}>
                <Link to={URL.MODAL_NEW_CARD}>Modal new card</Link>
            </div>
        </nav>
    )
}