import {useState, MouseEvent} from 'react'
import {NavLink} from 'react-router-dom'
import s from "./Header.module.css"
import {useAppDispatch, useAppSelector} from 'utils'
import {Avatar, Button, Popover, AccountBoxIcon, LogoutIcon} from 'collections'
import defaultAvatar from 'assets/Icon/default-avatar.jpg'
import styleIcon from '../Cards/Cards-menu/Cards-menu.module.css'
import styleMenu from '../Cards/Cards-menu/Cards-menu.module.css'
import {logOut} from 'reducers/Auth-reducer'
import {selectProfileAvatar, selectProfileName} from 'store/Selectors'
import {PATH} from 'constants/Routing/Rout-constants'
import styleForms from 'common/Styles/Forms.module.css'


export const Header = () => {
    const avatar = useAppSelector(selectProfileAvatar)
    const name = useAppSelector(selectProfileName)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const dispatch = useAppDispatch()
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const popoverCloseHandler = () => {
        setAnchorEl(null)
    }

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <div className={s.header}>
            <div className={`${styleForms.container} ${s.container}`}>
                <header className={s.headerWrapper}>
                <div className={s.userInfo}>
                    <a className={s.userName}>{name}</a>
                    <Popover
                        id={id}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={popoverCloseHandler}
                        anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                    >
                        <div className={styleMenu.menu}>
                            <NavLink to={PATH.PROFILE} style={{textDecoration: 'none'}}>
                                <Button>
                                    <div className={styleIcon.icon}>
                                        <AccountBoxIcon sx={{marginRight: '5px'}}/> Profile
                                    </div>
                                </Button>
                            </NavLink>
                            <Button onClick={logOutHandler}>
                                <div className={styleIcon.icon}>
                                    <LogoutIcon sx={{marginRight: '5px'}}/> log Out
                                </div>
                            </Button>
                        </div>
                    </Popover>
                    <Button onClick={buttonClickHandler}>
                        <Avatar
                            src={avatar ? avatar : defaultAvatar}
                            alt={'User Name'}
                            sx={{width: 50, height: 50}}
                        />
                    </Button>
                </div>
                </header>
            </div>
        </div>
    )
}