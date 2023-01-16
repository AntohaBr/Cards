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
            <div className={style.forMe}>
                <Link to={URL.PROFILE}><div style={imageStyle}/></Link>
                <p>{name}</p>
            </div>
        </nav>
    )
}