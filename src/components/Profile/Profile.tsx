import React, {ChangeEvent, useState} from 'react';
import {Avatar, Badge, Button, Icon, IconButton, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import style from "./Profile.module.css"
import {AddAPhoto, BorderColor, Logout} from "@mui/icons-material";
import {updateProfileTC} from "../../redux/Profile-reducer";
import {Navigate, useNavigate} from 'react-router-dom';
import {URL} from "../../app/App";
import {logOutTC} from "../../redux/Auth-reducer";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {setAppErrorAC} from "../../redux/App-reducer";
import {convertFileToBase64} from "../../features/Convert-fаile-to-base64";
import {useAppDispatch, useAppSelector} from "../../utils/Hooks";


export const Profile = React.memo(() => {

    const isDisable = useAppSelector(state => state.app.isDisabled)
    const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
    const email = useAppSelector(state => state.profile.email)
    const avatar = useAppSelector(state => state.profile.avatar)
    const name = useAppSelector(state => state.profile.name)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [userName, setUserName] = useState<string>(name)
    const [userAvatar, setUserAvatar] = useState<string>(avatar);
    const [editNameMod, setEditNameMod] = useState<boolean>(false)

    const logOutHandler = () => {
        dispatch(logOutTC())
    }

    const updateUserHandler = () => {
        dispatch(updateProfileTC(userName, userAvatar))
        setEditNameMod(false)
    }

    const onClickBackToPacksHandler = () => {
        navigate(URL.PACKS)
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
        return <Navigate to={URL.LOGIN}/>
    }

    return <div className={style.profileBlock}>
        <div className={style.profileBackToPacks}>
            <ArrowBackIcon color={'primary'}/>
            <span className={style.profileBackToPacksText} onClick={onClickBackToPacksHandler}>Back to Packs List</span>
        </div>
        <div className={style.profileContainer}>
            <h2 className={style.profileTitle}>Personal information</h2>
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
                <Avatar alt={'avatar'} src={userAvatar}/>
            </Badge>
            <div className={style.profileSpan}>
                {editNameMod
                    ?
                    <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                        <TextField
                            value={userName}
                            onChange={inputChangeHandler}
                            variant='standard'
                            autoFocus
                            label='NickName'
                        />
                    </Box>
                    :
                    <>
                        <span onDoubleClick={() => setEditNameMod(true)}><h3>{userName}</h3></span>
                        <IconButton>
                            <BorderColor onClick={() => setEditNameMod(true)}/>
                        </IconButton>
                    </>
                }
            </div>
            <div className={style.profileEmail}>{email}</div>
            <Button onClick={logOutHandler} variant="outlined" style={{width: 130, borderRadius: 20}}
                    startIcon={<Logout/>} disabled={isDisable}>Log out</Button>
            <Button sx={{ml: 2}} onClick={updateUserHandler} size='small' variant='contained'
                    style={{width: 70, borderRadius: 20}}>Save</Button>
        </div>
    </div>
})
