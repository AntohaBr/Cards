import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import style from "./Header.module.css"
import {useAppDispatch, useAppSelector} from 'utils'
import {Avatar, Button, Popover} from '@mui/material'
import defaultAvatar from '../../assets/Icon/default-avatar.jpg'
import styleIcon from '../Cards/Cards-menu/Cards-menu.module.css'
import styleMenu from '../Cards/Cards-menu/Cards-menu.module.css'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import LogoutIcon from '@mui/icons-material/Logout'
import {logOut} from '../../reducers/Auth-reducer'
import {selectProfileAvatar, selectProfileName} from '../../store/Selectors'
import {PATH} from '../../constants/Routing/Rout-constants'


export const Header = () => {
    const avatar = useAppSelector(selectProfileAvatar)
    const name = useAppSelector(selectProfileName)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

    const dispatch = useAppDispatch()
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const buttonClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const popoverCloseHandler = () => {
        setAnchorEl(null)
    }

    const logOutHandler = () => {
        dispatch(logOut())
    }

    return (
        <div className={style.header}>
            <div className={'container'}>
                <header className={style.headerWrapper}>
                    <div className={style.userInfo}>
                        <a className={style.userName}>{name}</a>
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