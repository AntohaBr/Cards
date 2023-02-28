import React, {ChangeEvent, useState} from 'react'
import {Avatar, Badge, Button, Icon, IconButton, TextField} from '@mui/material'
import style from './Profile.module.css'
import {AddAPhoto, BorderColor, Logout} from '@mui/icons-material'
import {updateProfileTC} from '../../redux/Profile-reducer'
import {Navigate} from 'react-router-dom'
import {logOutTC} from '../../redux/Auth-reducer'
import {setAppErrorAC} from '../../redux/App-reducer'
import {convertFileToBase64} from '../../features/Convert-fаile-to-base64'
import {useAppDispatch, useAppSelector} from '../../utils/Hooks'
import {PATH} from '../../app/Routes/Routes'
import {BackToPackList} from '../../common/Back-to-pack-list/Back-to-pack-list'
import styleForms from '../../assets/Styles/Style-forms.module.css'
import defaultAvatar from '../../assets/Icon/defaultAvatar.jpg'
import {selectAuthIsLoggedIn, selectProfileAvatar, selectProfileEmail, selectProfileName} from '../../utils/Selectors'


export const Profile = React.memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const email = useAppSelector(selectProfileEmail)
    const avatar = useAppSelector(selectProfileAvatar)
    const name = useAppSelector(selectProfileName)

    const [userName, setUserName] = useState<string>(name)
    const [userAvatar, setUserAvatar] = useState<string>(avatar);
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    const dispatch = useAppDispatch()

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateUserHandler = () => {
        dispatch(updateProfileTC(userName, userAvatar))
        setEditNameMod(false)
    }

    const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value)
    }

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]
            if (file.size < 102400) {
                convertFileToBase64(file, (file64: string) => {
                    setUserAvatar(file64)
                })
            } else {
                dispatch(setAppErrorAC('File too large'))
            }
        }
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return <div className={styleForms.block}>
        <BackToPackList/>
        <div className={`${styleForms.container} ${style.container}`}>
            <h2 className={styleForms.title}>Personal information</h2>
            <Badge className={style.profileBadge}
                   overlap='circular'
                   anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                   badgeContent={
                       <label htmlFor='avatar'>
                           <input type={'file'} id='avatar' style={{display: 'none'}}
                                  accept={'.jpg, .jpeg, .png, img'} multiple onChange={uploadHandler}
                           />
                           <IconButton component='span'>
                               <Icon
                                   style={{
                                       width: 35, height: 35, border: '1px solid white', borderRadius: 20,
                                       backgroundColor: 'gray', display: 'flex', alignItems: 'center',
                                       opacity: 0.7, cursor: 'pointer'
                                   }}>
                                   <AddAPhoto style={{color: 'white', width: '100%'}}/>
                               </Icon>
                           </IconButton>
                       </label>
                   }
            >
                <Avatar alt={'avatar'} src={userAvatar === '' ? defaultAvatar : avatar}/>
            </Badge>
                {editNameMod
                    ?
                    <div className={style.profileSpan}>
                        <TextField
                            value={userName}
                            onChange={inputChangeHandler}
                            variant='standard'
                            autoFocus
                            label='NickName'
                        />
                        <Button onClick={updateUserHandler} size='small' variant='contained'
                                style={{width: 70, borderRadius: 20}}>Save</Button>
                    </div>
                    :
                    <div onClick={() => setEditNameMod(true)} className={style.userName}>
                        {userName}
                        <BorderColor className={style.borderColor}/>
                    </div>
                }
            <div className={`${styleForms.text} ${style.text}`}>{email}</div>
            <div className={styleForms.buttonBlock}>
                <Button onClick={logOutHandler} variant='outlined' style={{width: 130, borderRadius: 20}}
                        startIcon={<Logout/>}>Log out</Button>
            </div>
        </div>
    </div>
})
